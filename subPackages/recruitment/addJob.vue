<template>
	<!-- 	添加求职页面 -->
	<view class="addJob">
		<view class="user_info">
			<view class="title">基本信息</view>
			<view class="info_form">
				<view class="info_item">
					<view class="name" style="width: 200rpx;text-align: center;">
						姓名:
					</view>
					<u-input trim height="60" type="text" :border="true" v-model="formData.name" :clearable="false"/>
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;">
						联系电话:
					</view>
					<u-input trim height="60" type="text" :border="true"  v-model="formData.phone" :clearable="false"/>
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;text-align: center;">
						性别:
					</view>
					<u-input trim height="60" type="text" :border="true"  v-model="formData.gender" :clearable="false"/>
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;">
						电子邮箱:
					</view>
					<u-input trim height="60" type="text" :border="true"  v-model="formData.emain"  :clearable="false"/>
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;text-align: center;">
						年龄:
					</view>
					<u-input trim height="60" type="text" :border="true"  v-model="formData.age"  :clearable="false"/>
				</view>
			</view>
		</view>
		<!--求职意向 -->
		<view class="job_intention">
			<view class="title">求职意向</view>
			<view class="intention_form">
				<u-form ref="uForm">
					<u-form-item label="意向岗位" label-width="150">
						<u-input type="select" @click="showPurpose = true"   v-model="formData.post" />
					</u-form-item>
					<u-form-item label="意向地点" label-width="150">
						<u-input type="select" @click="showAddress = true"  v-model="formData.address"/>
						<u-picker mode="region" v-model="showAddress" :area-code='["11", "1101", "110101"]'
							@confirm="confirmAddress">
						</u-picker>
					</u-form-item>
					<u-form-item label="期望薪资" label-width="150">
						<u-input type="select" @click="showSalary = true"  v-model="formData.salary"  />
					</u-form-item>
					<u-form-item label="求职状态" label-width="150">
						<u-input type="select" @click="showStatus = true" v-model="formData.status"  />
					</u-form-item>
				</u-form>
			</view>
		</view>
		<!--工作经验 -->
		<view class="experience">
			<view class="title">
				工作经验
			</view>
			<view class="area">
				<u-input maxlength="500" height="300" placeholder="请输入工作经验" type="textarea" :border="true"
					:autoHeight="true" trim   v-model="formData.description" />
			</view>
		</view>
		<!--附件内容-->
		<view class="enclosure">
			<view class="title" style="font-size: 30rpx;color: gray;">附件:请选择文件上传</view>
			<view class="enclosure_upload">
				<u-upload multiple :file-list="fileList" :show-progress="false" ref="uUpload" :action="action"
					:auto-upload="true" @on-remove="onRemove" @on-success="onSuccess"></u-upload>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="footer">
			<view class="beforeSubmit" @click="submitForm">
				确认提交
			</view>
		</view>
		<!-- 以下为弹窗提示用户输入 -->
		<!--意向岗位 -->
		<u-mask :show="showPurpose" @click="showPurpose = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="title">
						意向岗位
					</view>
					<view class="salary">
						<text>意向岗位</text>
						<u-input placeholder="请输入意向岗位" trim height="60" type="text" :border="true"  v-model="formData.post"  />
					</view>
					<view class="save" @click.stop="postSave">
						确认
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 薪资弹窗 -->
		<u-mask :show="showSalary" @click="showSalary = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="title">
						期望薪资
					</view>
					<view class="salary">
						<text>期望薪资</text>
						<u-input placeholder="如:5k-8k" trim height="60" type="text" :border="true" v-model="formData.salary" />
					</view>
					<view class="save" @click.stop="salarySave" >
						确认
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 求职状态弹窗 -->
		<u-mask :show="showStatus" @click="showStatus = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="title">
						求职状态
					</view>
					<view class="radio_list">
						<u-radio-group active-color="#40df9c" width="50%" v-model="formData.status" @change="radioGroupChange">
							<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<view class="save" @click.stop="statusSave">
						确认
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
import jobApi from "../../network/job/jobApi"
	export default {
		data() {
			return {
				//！ 弹窗显示组件
				showSalary: false,
				showPurpose: false,
				showAddress: false,
				showStatus: false,
				//! 自动上传图片的地址
				action: '',
				//! 选择的列表
				list: [{
						name: '在职-随时到岗',
						disabled: false
					},
					{
						name: '在职-月内到岗',
						disabled: false
					},
					{
						name: '离职-随时到岗',
						disabled: false
					},
					{
						name: '离职-月内到岗',
						disabled: false
					}
				],
				//! 在职状态的value
				value:'',
				//默认显示的图片列表
				fileList: [],
				formData:{
					name:"",
					phone:"",
					gender:"",
					emain:"",
					age:"",
					post:"",
					address:"",
					salary:"",
					status:"",
					description:"",
				}
			}
		},
		onLoad() {
			//! 上传地址
			this.action = getApp().globalData.requesturl + '/api/upload/pic';
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			confirmAddress(e) {
				console.log("地址选择", e);
				let province = e.province.label
				let city = e.city.label
				let area = e.area.label
				this.formData.address = province+city+area
				console.log(this.formData.address);
			},
			//! 监听图片的上传
			onSuccess(data, index, lists, name) {
				this.fileList = lists;
			},
			//! 监听图片的删除函数
			onRemove(index, lists, name) {
				this.fileList = lists;
			},
			// 表单提交
			submitForm(){
				console.log(this.formData);
				console.log(this.fileList);
				let wxuser = uni.getStorageSync('wxuser')
				// ! 图片
				let urls = this.fileList 
				let query = {
					user_id:wxuser.id,
					name:this.formData.name,
					phone:this.formData.phone,
					gender:this.formData.gender,
					age:this.formData.age,
					post:this.formData.post,
					address:this.formData.address,
					salary:this.formData.salary,
					status:this.formData.status,
					description:this.formData.description,
					urls
				}

				// jobApi.addJob(query)

			},
			// 岗位确定按钮
			postSave(){
				console.log(this.formData.post);
				this.showPurpose = false
			},
			// 状态确定按钮
			statusSave(){
				console.log(this.formData.status);
				this.showStatus = false
			},
			// 意向工资确定按钮
			salarySave(){
				console.log(this.formData.salary);
				this.showSalary = false
			}
				
		},
	}
</script>

<style lang="scss" scoped>
	.addJob {
		width: 100%;
		padding-top: 30rpx;
		padding-bottom: 90rpx;

		.title {
			font-size: 35rpx;
			font-weight: 800;
			padding-left: 20rpx;
			margin-bottom: 20rpx;
		}

		.user_info {
			width: 100%;

			.info_form {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;
				background-color: #ffffff;
				padding: 30rpx 20rpx;

				.info_item {
					display: flex;
					align-items: center;
					width: 48%;
					margin-bottom: 25rpx;
				}
			}
		}

		//!求职意向
		.job_intention {
			margin-top: 30rpx;
			width: 100%;

			.intention_form {
				width: 100%;
				background-color: #ffffff;
				padding: 30rpx 20rpx;
			}
		}

		//! 工作经验
		.experience {
			margin-top: 30rpx;
			width: 100%;

			.area {
				width: 100%;
				background-color: #ffffff;
				padding: 30rpx 20rpx;
			}
		}

		//! 附件内容
		.enclosure {
			width: 100%;
			margin-top: 30rpx;

			.enclosure_upload {
				width: 100%;
				padding: 30rpx 20rpx;
				background-color: #ffffff;
			}
		}

		//! 提交按钮
		.footer {
			@include flex-center;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 90rpx;
			padding: 10rpx 0;
			background-color: #ffffff;
			z-index: 1000;

			.beforeSubmit {
				width: 70%;
				@include flex-center;
				color: #ffffff;
				height: 60rpx;
				border-radius: 30rpx;
				background-color: $page_color;
			}
		}

		//! 弹窗组件内容
		.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			padding: 0 30rpx;

			.rect {
				border-radius: 15rpx;
				width: 100%;
				padding: 30rpx;
				background-color: #fff;

				.title {
					width: 100%;
					text-align: center;
					font-size: 30rpx;
					font-weight: 800;
					margin-bottom: 20rpx;
				}

				.save {
					margin: 30rpx auto;
					width: 70%;
					@include flex-center;
					color: #ffffff;
					height: 60rpx;
					border-radius: 30rpx;
					background-color: $page_color;
				}
			}
		}

		//！薪资
		.salary {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 50rpx;
			margin-bottom: 50rpx;
		}
	}
</style>
