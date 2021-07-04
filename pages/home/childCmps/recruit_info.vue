<template>
	<view class="recruit_wrap">
		<view class="recruit_info">
			<head-title title="招聘信息" img="../../static/tabBar/33.png"></head-title>
			<view class="recruit_list">
				<view class="recruit_item">
					<!-- 左边产品图片 -->
					<view class="left_img">
						<image style="width: 100%;height: 100%;" src="../../../static/uview/common/logo.png"></image>
					</view>
					<!-- 右边产品信息 -->
					<view class="right_info">
						<view class="head">
							<view class="title">标题</view>
							<view class="time">2021年4月25日</view>
						</view>
						<view class="content">xxx公司 200人</view>
						<!-- 操作描述 -->
						<view class="other">
							<view class="location common">北京</view>
							<view class="experience common">1年</view>
							<view class="educator common">学历不限</view>
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
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.recruit_wrap {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;

		.recruit_info {
			width: 100%;

			.recruit_list {
				width: 100%;
				padding: 30rpx 50rpx;

				.recruit_item {
					width: 100%;
					background-color: #ffffff;
					border-radius: 15rpx;
					padding: 20rpx 10rpx;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;

					.left_img {
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
							justify-content: flex-start;
							align-items: center;
							font-size: 26rpx;
						}
						//! 公共样式
						.common {
							padding:0 20rpx;
							border-right: 2rpx solid $gray_color;
						}
					}
				}
			}
		}
	}
</style>
