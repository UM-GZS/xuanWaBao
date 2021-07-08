<template>
	<view class="discount_wrap">
		<view class="discount_info">
			<head-title title="商品特惠" img="../../static/index/car.png"></head-title>
			<!--商品打折内容 -->
			<view class="discount_list">
				<view class="discount_item">
					<!--  头部照片 -->
					<view class="pic">
						<image style="width: 100%;height: 100%;" src="../../../static/uview/common/logo.png" ></image>
					</view>
					<!-- 产品描述 -->
					<view class="info">
						商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称
					</view>
					<!-- 产品价格 -->
					<view class="price">
						￥1624
					</view>
				</view>
				<view class="discount_item">
					<!--  头部照片 -->
					<view class="pic">
						<image style="width: 100%;height: 100%;" src="../../../static/uview/common/logo.png" ></image>
					</view>
					<!-- 产品描述 -->
					<view class="info">
						商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称
					</view>
					<!-- 产品价格 -->
					<view class="price">
						￥1624
					</view>
				</view>
				<view class="discount_item">
					<!--  头部照片 -->
					<view class="pic">
						<image style="width: 100%;height: 100%;" src="../../../static/uview/common/logo.png" ></image>
					</view>
					<!-- 产品描述 -->
					<view class="info">
						商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称
					</view>
					<!-- 产品价格 -->
					<view class="price">
						￥1624
					</view>
				</view>
				<view class="discount_item">
					<!--  头部照片 -->
					<view class="pic">
						<image style="width: 100%;height: 100%;" src="../../../static/uview/common/logo.png" ></image>
					</view>
					<!-- 产品描述 -->
					<view class="info">
						商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称商品名称名称
					</view>
					<!-- 产品价格 -->
					<view class="price">
						￥1624
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
	.discount_wrap {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		.discount_info {
			width: 100%;
			.discount_list {
				width: 100%;
				padding: 30rpx 50rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.discount_item {
					flex: 0 0 30%;
					padding: 20rpx 25rpx;
					margin-bottom: 25rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: #ffffff;
					border-radius: 15rpx;
					.pic {
						width: 100%;
						height: 150rpx;
						margin-bottom: 10rpx;
					}
					.info {
						width: 100%;
						margin-top: 15rpx;
						margin-bottom: 15rpx;
						font-size: 22rpx;
						color: $gray_color;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.price{
						align-self: flex-end;
						font-size: 28rpx;
						color: #eb2d0d;
						font-weight: 700;
					}
				}
			}
		}
	}
</style>
