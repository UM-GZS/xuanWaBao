<template>
	<view class="info_detail_wrap">
		<view class="info_title">
			这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题
		</view>
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="left_box">
				<image src="../../static/information/industry_active.png" style="width: 40rpx;height: 40rpx;border-radius: 50%;"></image>
				<view class="user_msg">
					<view class="name">
						用户名称
					</view>
					<view class="time">
						2021年4月5日
					</view>
				</view>
			</view>
			<view class="right_box">
				<view class="preview common">
					<image src="../../static/index/see.png" style="width: 30rpx;height: 20rpx;margin-right: 10rpx;" ></image>
					<text>3567</text>
				</view>
				<view class="collect common">
					<image src="../../static/information/collect.png" style="width: 25rpx;height: 25rpx;margin-right: 10rpx;" ></image>
					<text>收藏</text>
				</view>
				<view class="share common">
					<image src="../../static/information/share.png" style="width: 25rpx;height: 25rpx;margin-right: 10rpx;" ></image>
					<text>分享</text>
				</view>
			</view>
		</view>
		<!-- 详情内容 -->
		<view class="content">
			我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
			<image src="../../static/index/sw1.jpg" style="width: 100%;border-radius: 30rpx;"></image>
			我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
	}
</script>

<style lang="scss" scoped>
	.info_detail_wrap {
		width: 100%;
		padding: 30rpx;
		.info_title {
			font-size: 38rpx;
			font-weight: 500;
		}
		.user_info{
			width: 100%;
			margin:20rpx 0;
			padding: 10rpx 0;
			@include flex-jcsb;
			.left_box {
				display: flex;
				align-items: center;
				.user_msg {
					display: flex;
					font-size: 23rpx;
					color: $gray_color;
					margin-left: 10rpx;
					flex-direction: column;
				}
			}
			.right_box {
				display: flex;
				align-items: center;
				color: $gray_color;
				font-size: 20rpx;
				.common {
					margin-left: 20rpx;
					display: flex;
					align-items: center;
				}
			}
		}
		.content {
			font-size: 30rpx;
			font-weight: 300;
		}
	}
</style>
