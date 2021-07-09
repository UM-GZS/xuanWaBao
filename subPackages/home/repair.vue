<template>
	<view class="repair_wrap">
		<view class="form">
			<u-form ref="uForm">
				<u-form-item label-width="150" label="姓名">
					<u-input placeholder="请输入联系人姓名" />
				</u-form-item>
				<u-form-item label-width="150" label="联系电话">
					<u-input placeholder="请输入联系人电话号码" />
				</u-form-item>
				<u-form-item label-width="150" label="设备类型">
					<u-input @click="showDevice = true" placeholder="请选择设备类型" type="select" />
					<u-select v-model="showDevice" :list="list"></u-select>
				</u-form-item>
				<u-form-item label-width="150" label="设备品牌">
					<u-input @click="showDeviceBrand = true"  placeholder="请输入设备品牌" type="select" />
					<u-select v-model="showDeviceBrand" :list="list"></u-select>
				</u-form-item>
				<u-form-item label-width="150" label="设备型号">
					<u-input @click="showDeviceType = true" placeholder="请选择设备型号" type="select" />
					<u-select v-model="showDeviceType" :list="list"></u-select>
				</u-form-item>
				<u-form-item label-position="top" label-width="150" label="故障说明:">
					<u-input clearable type="textarea" :border="true" height="140" :auto-height="true"
						placeholder="请详细说明故障信息和说明,方便维修技师进行沟通" />
				</u-form-item>
				<u-form-item label-position="top" label-width="150" label="附件:请选择正前方,侧方,后方照片上传">
					<u-upload multiple :file-list="fileList" :show-progress="true" ref="uUpload" :action="action"
						:auto-upload="true" @on-remove="onRemove" @on-success="onSuccess"></u-upload>
				</u-form-item>
			</u-form>
		</view>
		<!-- 提交维修订单 -->
		<view class="footer">
			<view class="submit">确认提交维修订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//! 自动上传图片的地址
				action: '',
				//默认显示的图片列表
				fileList: [],
				//! 控制显示组件
				showDevice:false,
				showDeviceBrand:false,
				showDeviceType:false,
				//! 对应的数据列表
				list: [{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			}
		},
		onLoad() {
			//! 上传地址
			this.action = getApp().globalData.requesturl + '/api/upload/pic';
		},
		methods: {
			//! 监听图片的上传
			onSuccess(data, index, lists, name) {
				//! 追加数据
				this.fileList = lists;
			},
			//! 监听图片的删除函数
			onRemove(index, lists, name) {
				this.fileList = lists;
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
