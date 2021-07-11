<template>
	<view class="repair_wrap">
		<view class="form">
			<u-form ref="uForm" :rules="rules" :model="form">
				<u-form-item label-width="150" label="姓名" prop="name">
					<u-input placeholder="请输入联系人姓名" v-model="form.name" />
				</u-form-item>
				<u-form-item label-width="150" label="联系电话" prop="phone">
					<u-input placeholder="请输入联系人电话号码" v-model="form.phone" />
				</u-form-item>
				<u-form-item label-width="150" label="设备类型">
					<u-input v-model="typeLabel" @click="selectType" placeholder="请选择设备类型" type="select" />
					<u-select label-name="name" value-name="id" v-model="showDevice" :list="typeList"
						@confirm="confirmType"></u-select>
				</u-form-item>
				<u-form-item label-width="150" label="设备品牌">
					<u-input v-model="brandLabel" @click="selectBrand" placeholder="请输入设备品牌" type="select" />
					<u-select label-name="name" value-name="id" v-model="showDeviceBrand" @confirm="confirmBrand"
						:list="brandList"></u-select>
				</u-form-item>
				<u-form-item label-width="150" label="设备型号">
					<u-input v-model="modelLabel" @click="selectModel" placeholder="请选择设备型号" type="select" />
					<u-select label-name="name" value-name="id" v-model="showDeviceType" @confirm="confirmModel"
						:list="modelList"></u-select>
				</u-form-item>
				<u-form-item label-position="top" label-width="150" label="故障说明:">
					<u-input clearable type="textarea" :border="true" height="140" :auto-height="true"
						v-model="form.info" placeholder="请详细说明故障信息和说明,方便维修技师进行沟通" />
				</u-form-item>
				<u-form-item label-position="top" label-width="150" label="附件:请选择正前方,侧方,后方照片上传">
					<u-upload multiple :file-list="fileList" :show-progress="false" ref="uUpload" :action="action"
						:auto-upload="true" @on-remove="onRemove" @on-success="onSuccess"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<!-- 提交维修订单 -->
		<view class="footer">
			<view class="submit" @click="submit">确认提交维修订单</view>
		</view>
	</view>
</template>

<script>
	import repair from '../../network/repair/repair.js';
	export default {
		data() {
			return {
				//! 自动上传图片的地址
				action: '',
				//默认显示的图片列表
				fileList: [],
				//! 控制显示组件
				showDevice: false,
				showDeviceBrand: false,
				showDeviceType: false,
				/**
				 * 用于显示选择的名称
				 */
				typeLabel: '',
				brandLabel: '',
				modelLabel: '',
				// 校验规则
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]

				},
				/**
				 * 数据列表
				 */
				// 设备类型列表
				typeList: [],
				// 品牌类型列表
				brandList: [],
				// 型号列表
				modelList: [],
				//! 设备维修订单参数
				form: {
					user_id: '', // 用户id
					name: '', // 名称
					phone: '', // 手机号码
					types_id: '', // 设备类型id
					brand_id: '', // 设备品牌id
					model_id: '', // 设备型号id
					info: '', // 维修说明
					urls: [], // 维修设备图片
				}
			}
		},
		onLoad() {
			this.form.user_id = getApp().globalData.wxuser.id
			//! 上传地址
			this.action = getApp().globalData.requesturl + '/api/upload/pic';
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			//! 提交按钮
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						let form = {...this.form,urls:JSON.stringify(this.form.urls)};
						console.log(form);
						const orderRes = await repair.deviceOrder(form);
						if(orderRes.data.id) {
							getApp().globalData.global_Toast(true,"设备维修订单提交成功",(res)=> {
								//! 清除数据
								this.clearForm();
							})
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			/**
			 * 点击各种类型切换时判断上一个是否已经选择
			 * 品牌选择
			 */
			async selectType() {
				let queryInfo = {
					sort: 'id desc'
				}
				const typeRes = await repair.deviceType(queryInfo);
				this.typeList = typeRes.data.list;
				this.showDevice = true
			},
			async selectBrand() {
				if (!this.form.types_id) {
					getApp().globalData.global_Toast(true, "请完成上一个设备选择", function(res) {});
					return;
				}
				//! 请求数据
				let queryInfo = {
					types_id: this.form.types_id,
					sort: 'id desc'
				};
				const brandRes = await repair.deviceBrand(queryInfo);
				this.brandList = brandRes.data.list;
				this.showDeviceBrand = true;
			},
			// 类型选择
			async selectModel() {
				if (!this.form.types_id || !this.form.brand_id) {
					getApp().globalData.global_Toast(true, "请完成上一个设备选择", function(res) {});
					return;
				}
				let queryInfo = {
					types_id: this.form.types_id,
					brand_id: this.form.brand_id,
					sort: 'id desc'
				}
				const modelRes = await repair.deviceModel(queryInfo);
				this.modelList = modelRes.data.list;
				this.showDeviceType = true;
			},
			// 对应的选中事件
			// 设备类型
			confirmType(e) {
				//! 当设备的类型切换后清除之前选中的数据，实现数据的联动
				this.brandLabel = '';
				this.modelLabel = '';
				this.form.brand_id = '';
				this.form.types_id = '';
				//! 赋值显示
				this.typeLabel = e[0].label;
				this.form.types_id = e[0].value;
			},
			// 品牌选择
			confirmBrand(e) {
				this.brandLabel = e[0].label;
				this.form.brand_id = e[0].value;
			},
			// 型号选择
			confirmModel(e) {
				this.modelLabel = e[0].label;
				this.form.model_id = e[0].value;
			},
			//! 监听图片的上传
			onSuccess(data, index, lists, name) {
				//! 追加数据
				this.form.urls.push({
					img: data.data.url
				})
				this.fileList = lists;
			},
			//! 监听图片的删除函数
			onRemove(index, lists, name) {
				this.form.urls.splice(index, 1)
				this.fileList = lists;
			},
			//! 清除数据
			clearForm() {
			 this.form = {
					user_id: getApp().globalData.wxuser.id, // 用户id
					name: '', // 名称
					phone: '', // 手机号码
					types_id: '', // 设备类型id
					brand_id: '', // 设备品牌id
					model_id: '', // 设备型号id
					info: '', // 维修说明
					urls: [] // 维修设备图片
				}
				this.$refs.uUpload.clear();
				this.typeLabel = '';
				this.brandLabel = '';
				this.modelLabel = '';
				this.fileList = [];
			}
		},
	}
</script>

<style lang="scss" scoped>
	.repair_wrap {
		width: 100%;
		height: 100%;

		.form {
			width: 100%;
			padding: 20rpx;
			margin-top: 30rpx;
			background-color: #ffffff;
		}

		.footer {
			margin-top: 30rpx;
			width: 100%;
			padding: 10rpx 30rpx;
			height: 90rpx;
			background-color: #ffffff;

			.submit {
				width: 100%;
				height: 100%;
				@include flex-center;
				font-weight: 800;
				font-size: 30rpx;
				border-radius: 30rpx;
				background-color: $page_color;
			}
		}
	}
</style>
