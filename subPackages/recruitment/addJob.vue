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
					<u-input trim height="60" type="text" :border="true" />
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;">
						联系电话:
					</view>
					<u-input trim height="60" type="text" :border="true" />
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;text-align: center;">
						性别:
					</view>
					<u-input trim height="60" type="text" :border="true" />
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;">
						电子邮箱:
					</view>
					<u-input trim height="60" type="text" :border="true" />
				</view>
				<view class="info_item">
					<view class="name" style="width: 200rpx;text-align: center;">
						年龄:
					</view>
					<u-input trim height="60" type="text" :border="true" />
				</view>
			</view>
		</view>
		<!--求职意向 -->
		<view class="job_intention">
			<view class="title">求职意向</view>
			<view class="intention_form">
				<u-form ref="uForm">
					<u-form-item label="意向岗位" label-width="150">
						<u-input type="select" />
					</u-form-item>
					<u-form-item label="意向地点" label-width="150">
						<u-input type="select" />
					</u-form-item>
					<u-form-item label="期望薪资" label-width="150">
						<u-input type="select" @click="showSalary = true" />
					</u-form-item>
					<u-form-item label="求职状态" label-width="150">
						<u-input type="select" />
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
					:autoHeight="true" trim />
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
			<view class="beforeSubmit">
				确认提交
			</view>
		</view>
		<!-- 以下为弹窗提示用户输入 -->
		<u-mask :show="showSalary" @click="showSalary = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="title">
						期望薪资
					</view>
					<view class="salary">
						<text>期望薪资</text>
						<u-input placeholder="如:5k-8k" trim height="60" type="text" :border="true" />
					</view>
					<view class="save">
						确认
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//！ 弹窗显示组件
				showSalary: false,

				//! 自动上传图片的地址
				action: '',
				//默认显示的图片列表
				fileList: [],
			}
		},
		onLoad() {
			//! 上传地址
			this.action = getApp().globalData.requesturl + '/api/upload/pic';
		},
		methods: {
			//! 监听图片的上传
			onSuccess(data, index, lists, name) {

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
