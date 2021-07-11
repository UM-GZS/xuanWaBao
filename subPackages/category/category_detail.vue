<template>
	<view class="detail_wrap">
		<!-- 头部轮播图 -->
		<view class="header">
			<u-swiper mode="number" height="500" indicator-pos="bottomRight" :list="list" duration="2500"
				:circular="true"></u-swiper>
		</view>
		<!-- 商品详情 -->
		<view class="goods_info">
			<view class="price">￥20000</view>
			<view class="desc">
				<view class="desc_item">直营汽车</view>
				<view class="desc_item">分期</view>
			</view>
			<view class="title">
				商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称
			</view>
		</view>
		<!-- 运费 -->
		<view class="freight">
			<view class="post">
				<view>运费</view>
				<view class="freight_price">无需运费</view>
			</view>
			<view class="sale">
				<view>已售</view>
				<view class="count">2335</view>
			</view>
		</view>
		<!-- 服务 -->
		<view class="service">
			<view class="delivery">
				<view>
					<text style="color: #b5b5b5;">服务</text>
					<text style="margin-left: 15rpx;">送货上门 48小时内容发货</text>
				</view>
				<view>
					<image src="../../static/index/more.png" style="width: 20rpx;height: 30rpx;"></image>
				</view>
			</view>
			<view class="delivery">
				<view>
					<text style="color: #b5b5b5;">选择</text>
					<text style="margin-left: 15rpx;">型号</text>
				</view>
				<view>
					<image src="../../static/index/more.png" style="width: 20rpx;height: 30rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods_detail">
			<view class="title">商品详情</view>
			<!-- 详情内容 -->
			<view class="detail_content">
				<image style="width: 100%;" src="../../static/index/sw1.jpg"></image>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="collect common">
				<image src="../../static/uview/common/collect.png" style="width: 55rpx; height: 55rpx;"></image>
				<text>收藏</text>
			</view>
			<button open-type="contact" class="contact common" style="margin-left: 30rpx;">
				<image src="../../static/user/server.png" style="width: 50rpx; height: 50rpx;"></image>
				<text>客服</text>
			</button>
			<view class="buy" @click="showSelect = true">立刻购买</view>
		</view>
		<!-- 弹出层给用户选择 -->
		<u-mask :show="showSelect" @click="showSelect = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="info">
						<view class="left">
							<image src="../../static/uview/common/logo.png" style="width: 100%;height: 100%;" mode=""></image>
						</view>
						<view class="right">
							<view class="price">￥25000</view>
							<view class="select_type">
								<text>已选择</text>
								<text style="margin-left: 15rpx;">型号1</text>
							</view>
						</view>
					</view>
					<!-- 型号 -->
					<view class="model">
						<view class="title">型号</view>
						<view class="model_list">
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
							<view class="model_item">型号1</view>
						</view>
					</view>
					<!-- 购买数量 -->
					<view class="buy_count">
						<view>购买数量</view>
						<u-number-box v-model="value" @change="valChange"></u-number-box>
					</view>
					<!-- next step-->
					<view class="next_step" @click="nextStep">
						下一步
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
				//! 数量
				value:0,
				//!显示订单弹窗
				showSelect: false,
				//! 轮播图
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		methods: {
			//! 步进器的改变
			valChange(e) {
				console.log(e);
			},
			//!跳转订单界面
			nextStep() {
				this.showSelect = false;
				uni.navigateTo({
					url:"../order/order"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.detail_wrap {
		width: 100%;

		//!商品详情
		.goods_info {
			width: 100%;
			padding: 30rpx;
			background-color: #ffffff;

			.price {
				color: #ff0101;
				font-weight: 600;
				font-size: 45rpx;
				margin-bottom: 15rpx;
			}

			.desc {
				width: 100%;
				display: flex;
				margin-bottom: 15rpx;

				.desc_item {
					padding: 10rpx 20rpx;
					font-size: 25rpx;
					@include flex-center;
					color: #ffffff;
					border-radius: 10rpx;
					margin-right: 30rpx;
					background-color: #ffa02e;
				}
			}

			.title {
				width: 100%;
				font-weight: 700;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-size: 30rpx;
				overflow: hidden;
			}
		}

		//! 运费
		.freight {
			width: 100%;
			@include flex-jcsb;
			padding: 20rpx 30rpx;
			margin-top: 30rpx;
			background-color: #ffffff;
			color: $gray_color;

			.post {
				@include flex-center;

				.freight_price {
					color: $black_color;
					margin-left: 30rpx;
					font-weight: 400;
					font-size: 28rpx;
				}
			}

			.sale {
				@include flex-center;

				.count {
					color: $black_color;
					margin-left: 30rpx;
					font-weight: 400;
					font-size: 28rpx;
				}
			}
		}

		//!服务
		.service {
			width: 100%;
			margin-top: 30rpx;
			background-color: #ffffff;
			@include flex-col;

			.delivery {
				width: 100%;
				padding: 20rpx 30rpx;
				@include flex-jcsb;
			}
		}

		//!商品详情
		.goods_detail {
			margin-top: 30rpx;
			width: 100%;

			.title {
				width: 100%;
				margin-bottom: 10rpx;
				padding: 20rpx 0;
				@include flex-center;
				background-color: #ffffff;
			}

			.detail_content {
				width: 100%;
			}
		}

		//! 底部按钮
		.footer {
			width: 100%;
			height: 90rpx;
			position: fixed;
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
			background-color: #ffffff;
			font-size: 25rpx;
			color: $gray_color;

			.common {
				padding: 30rpx 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.contact {
				line-height: 1.1;
				margin: 0;
				padding: 0;
				font-size: 25rpx;
				color: $gray_color;
				background-color: transparent;

				&::after {
					border: none;
				}
			}

			.buy {
				height: 100%;
				margin-left: 30rpx;
				flex: 1;
				background-color: $page_color;
				@include flex-center;
				font-weight: 500;
				color: black;
				font-size: 35rpx;
				border-radius: 50rpx;
			}
		}

		.warp {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: flex-end;
			height: 100%;

			.rect {
				width: 100%;
				// height: 680rpx;
				padding: 30rpx;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
				background-color: #ffffff;
				padding-bottom: 20rpx;
				.info {
					width: 100%;
					display: flex;
					.left {
						width: 160rpx;
						height: 160rpx;
						border: 1rpx solid $gray_color;
					}
					.right {
						margin-left: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						.price {
							color: #ff0000;
							font-weight: 800;
							font-size: 35rpx;
						}
						.select_type {
							display: flex;
							font-size: 25rpx;
							margin-top: 10rpx;
							font-weight: 600;
							color: $gray_color;
						}
					}
				}
				//!型号
				.model {
					width: 100%;
					margin-top: 20rpx;
					margin-bottom: 10rpx;
					.model_list {
						width: 100%;
						margin-top: 20rpx;
						margin-bottom: 20rpx;
						display: flex;
						flex-wrap: wrap;
						.model_item {
							padding: 10rpx 25rpx;
							border-radius: 15rpx;
							margin-right: 15rpx;
							margin-bottom: 15rpx;
							background-color: #f2f2f2;
						}
					}
				}
				//!购买数量
				.buy_count {
					width: 100%;
					@include  flex-jcsb;
					margin-top: 10rpx;
					margin-bottom:30rpx;
				}
				.next_step {
					margin: 30rpx auto;
					width: 80%;
					height: 60rpx;
					background-color: $page_color;
					border-radius:50rpx;
					@include flex-center;
				}
			}
		}

	}
</style>
