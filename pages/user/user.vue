<template>
	<view class="user_wrap">
		
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="left_info">
				<text class="name">用户名称</text>
				<text class="phone">12345678900</text>
			</view>
			<view class="right_cover">
				<image src="../../static/index/sw1.jpg" mode=""></image>
			</view>
		</view>
		<!-- 发布和收藏 -->
		<view class="send_collection_wrap">
			<view class="send_collection_ctrl">
					
				<view class="">
					<image src="../../static/uview/common/favicon.ico" mode=""></image>
					<text>我的发布</text>
				</view>
				<view>
					<image src="../../static/uview/common/favicon.ico" mode=""></image>
					<text>我的收藏</text>
				</view>
			</view>
		</view>
		<!-- 按钮控制 -->
		<view class="btn_control">
			<u-cell-group>
				<u-cell-item   title="个人中心" :arrow="false">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/uview/common/favicon.ico" slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item  title="我的车辆" :arrow="false">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/uview/common/favicon.ico" slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item  title="认证信息" :arrow="false">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/uview/common/favicon.ico" slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item  title="收货地址" :arrow="false">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/uview/common/favicon.ico" slot="icon"></u-image>
				</u-cell-item>
				<u-cell-item  title="联系客服" :arrow="false">
					<u-image width="40rpx" height="40rpx" style="margin-right: 15rpx;" src="/static/uview/common/favicon.ico" slot="icon"></u-image>
				</u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			ontrueGetList() {
				console.log("被调用");
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.user_wrap{
		width: 100vw;
		// 用户信息
		.user_info{
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:30rpx 80rpx 70rpx 80rpx;
			background-color: $page_color;
			border-bottom-left-radius: 50rpx;
			border-bottom-right-radius: 50rpx;
			.left_info{
				display: flex;
				flex-direction: column;
				.name{
					font-weight: 600;
					font-size: 30rpx;
				}
				.phone{
					padding-top: 10rpx;
					font-size: 30rpx;
				}
			}
			.right_cover{
				image{
					width: 110rpx;
					height: 110rpx;				
					border-radius: 50%;
				}
			}
		}
		// 发布和收藏
		.send_collection_wrap{
			width: 100%;
			margin-top: -70rpx;
			@include flex-center;
			.send_collection_ctrl{
				width: 500rpx;
				padding: 30rpx 50rpx;
				background-color: #FFFFFF;
				box-shadow: #dddddd 0px 0px 20rpx;
				@include flex-jcsb;
				view{
					@include flex-col;
					align-items: center;
					image{
						width: 60rpx;
						height: 60rpx;
						padding-bottom: 20rpx;
					}
				}
			}
			
		}
		// 按钮操作
		.btn_control{
			padding-top: 50rpx;
			/deep/ .u-border-bottom:after, .u-border-left:after, .u-border-right:after, .u-border-top-bottom:after, .u-border-top:after, .u-border:after {
				border-bottom: 5rpx solid #e3e3e3;
			}
		}
		
		
	}
</style>
