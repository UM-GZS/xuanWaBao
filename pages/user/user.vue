<template>
	<view class="user_wrap">

		<!-- 用户信息 -->
		<view class="user_info">
			<view class="left_info" @click="login">
				<text class="name">{{userInfo.uname}}</text>
				<text class="phone">{{userInfo.phone}}</text>
			</view>
			<view class="right_cover" @click="login">
				<image :src="userInfo.headpic_url" mode=""></image>
			</view>
		</view>
		<!-- 发布和收藏 -->
		<view class="send_collection_wrap">
			<view class="send_collection_ctrl">

				<view class="" @click="goMySend">
					<image src="/static/user/send.png" mode=""></image>
					<text>我的发布</text>
				</view>
				<view>
					<image src="/static/user/collaction.png" mode=""></image>
					<text>我的收藏</text>
				</view>
			</view>
		</view>
		<!-- 按钮控制 -->
		<view class="btn_control">
			<u-cell-group>
				<u-cell-item title="个人中心" :arrow="false" @click="goUserCenter">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/user/usercenter.png"
						slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item title="我的车辆" :arrow="false" @click="goMyVehicle">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/user/cheliang.png"
						slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item title="认证信息" :arrow="false">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;"
						src="/static/user/renzhengxinxi.png" slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item title="收货地址" :arrow="false" @ @click="goAddress">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;"
						src="/static/user/address_position.png" slot="icon"></u-image>
				</u-cell-item>
				<button class="customer" open-type="contact">
					<u-cell-item title="联系客服" :arrow="false">
						<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/user/server.png"
							slot="icon"></u-image>
					</u-cell-item>
				</button>
			</u-cell-group>
		</view>
		<!-- 登陆后没有手机号时弹出 -->
		<u-modal v-model="addPhoneShow" :show-cancel-button="true" confirm-text="确定" title="完善手机号" @cancel="cancel"
			@confirm="edituserInfo">
			<view style="padding:40rpx">
				<input type="number" v-model="phone" placeholder="填写手机号" />
			</view>
		</u-modal>


	</view>
</template>

<script>
	import userApi from "../../network/user/userApi.js"
	export default {
		data() {
			return {
				code: "",
				userInfo: {
					uname: "未登录",
					headpic_url: "../../static/tabBar/5.png",
					phone: "请登录获取手机号码"
				},
				addPhoneShow: false,
				phone: "" //用户手机号
			}
		},
		methods: {
			ontrueGetList() {
				let that = this
				let wxuser = uni.getStorageSync('wxuser')
				if (wxuser) {
					this.userInfo = wxuser
				}
			},
			//! 用户登录
			async login() {
				let that = this
				let wxuser = uni.getStorageSync('wxuser')
				if (wxuser.phone) {
					return
				}

				let code = ''
				uni.login({
					success(resCode) {
						code = resCode.code
					}
				})
				uni.getUserProfile({
					desc: '微信一键登录',
					lang: 'zh_CN',
					success: async res => {
						let query = {
							code: code,
							userHead: res.userInfo.avatarUrl,
							userName: res.userInfo.nickName,
							userGender: res.userInfo.gender, // 0:未知,1:男,2:女
							userCity: res.userInfo.city,
							userProvince: res.userInfo.province
						}
						let resData = await userApi.login(query)
						//! 存储到全局
						uni.setStorageSync('wxuser', resData.data)
						getApp().globalData.wxuser = resData.data
						that.userInfo = resData.data
						if (!resData.data.phone) {
							that.addPhoneShow = true
						}
					}
				}) //getUserProfile end
			},
			goAddress() {
				uni.navigateTo({
					url: "/pages/address/address"
				})
			},
			goUserCenter() {
				//! 判断用户是否登录
				if (!getApp().globalData.wxuser) {
					getApp().globalData.global_Toast(true, "请先完成登录", function(res) {});
					return;
				}else {
					uni.navigateTo({
						url:"/pages/user/user_tenter"
					})
				} 
				
			},
			// 修改用户信息
			edituserInfo() {
				let query = {
					phone: this.phone,
					id: this.userInfo.id
				}
				userApi.editUserInfo(query).then(res => {
					// console.log("查看修改结果",res)
					uni.setStorageSync('wxuser', res.data)
					this.userInfo = res.data
				})
			},
			cancel() {
				uni.showToast({
					title: "请在个人中心页完善信息",
					icon: "none"
				})
			},
			goMySend(){
				uni.navigateTo({
					url: "../../subPackages/mySend/mySend"
				})
			},
			goMyVehicle(){
				uni.navigateTo({
					url: "../../subPackages/vehicleBuy/MyVehicle"
				})
			}



		}

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	.user_wrap {
		width: 100vw;

		// 用户信息
		.user_info {
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 80rpx 70rpx 80rpx;
			background-color: $page_color;
			border-bottom-left-radius: 50rpx;
			border-bottom-right-radius: 50rpx;

			.left_info {
				display: flex;
				flex-direction: column;

				.name {
					font-weight: 600;
					font-size: 30rpx;
				}

				.phone {
					padding-top: 10rpx;
					font-size: 30rpx;
				}
			}

			.right_cover {
				height: 120rpx;
				width: 120rpx;
				border-radius: 50%;
				border: 2rpx solid #e3e3e3;
				@include flex-center;

				image {
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
				}
			}
		}

		// 发布和收藏
		.send_collection_wrap {
			width: 100%;
			margin-top: -70rpx;
			@include flex-center;

			.send_collection_ctrl {
				width: 500rpx;
				padding: 30rpx 50rpx;
				background-color: #FFFFFF;
				box-shadow: #dddddd 0px 0px 20rpx;
				@include flex-jcsb;

				view {
					@include flex-col;
					align-items: center;

					image {
						width: 60rpx;
						height: 60rpx;
						padding-bottom: 20rpx;
					}
				}
			}

		}

		// 按钮操作
		.btn_control {
			padding-top: 40rpx;
			// 去除联系客服样式
			.customer {
				margin: 0;
				padding: 0;
				background-color: transparent;
				&::after{
					border: none;
				}
			}
			/deep/ .u-border-bottom:after,
			.u-border-left:after,
			.u-border-right:after,
			.u-border-top-bottom:after,
			.u-border-top:after,
			.u-border:after {
				border-bottom: 5rpx solid #e3e3e3;
			}
		}



	}
</style>
