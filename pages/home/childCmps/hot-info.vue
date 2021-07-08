<template>
	<view class="hot_wrap">
		<view class="hot_info">
			<head-title title="热点推送" img="../../static/index/hot.png"></head-title>
			<view class="hot_list">
				<view class="hot_item">
					<!-- 左边产品图片 -->
					<view class="left_img">
						<image style="width: 100%;height: 100%;"  src="../../../static/uview/common/logo.png" ></image>
					</view>
					<!-- 右边产品信息 -->
					<view class="right_info">
						<view class="head">
							<view class="title">标题</view>
							<view class="time">2021年4月25日</view>
						</view>
						<view class="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
						<!-- 操作描述 -->
						<view class="other">
							<view class="name">用户名称</view>
							<view class="through">2036</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headTitle from "@/components/head-title/head-title.vue"
	export default {
		components: {
			headTitle
		},
		data() {
			return {
			}
		},
	}
</script>

<style lang="scss" scoped>
	//! 热点推送
	.hot_wrap {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		margin-top: 160rpx;
		.hot_info {
			width: 100%;
			.hot_list {
				width: 100%;
				padding: 30rpx 50rpx;
				.hot_item {
					width: 100%;
					background-color: #ffffff;
					border-radius: 15rpx;
					padding: 20rpx 10rpx;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
					.left_img{
						width: 150rpx;
						height: 150rpx;
					}
					.right_info {
						flex: 1;
						width: 100%;
						height: 100%;
						margin-left: 10rpx;
						//! 头部标题
						.head {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.title {
								font-weight: 700;
								font-size: 30rpx;
							}
							.time {
								font-weight: 500;
								font-size: 25rpx;
								color: $gray_color;
							}
						}
						//! 中间内容
						.content {
							width: 100%;
							margin-top: 15rpx;
							margin-bottom: 15rpx;
							color: $gray_color;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
						.other {
							width: 100%;
							color: $gray_color;
							display: flex;
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
		}
	}
</style>
