<template>
	<view class="container">
		<view class="label">求职招聘</view>
		<view class="list">
			<view class="item" v-for="(item,index) in sendList" :key="item.id">
				<view class="left_cover">
					<image :src="item.cover"></image>
				</view>
				<view class="right_info">
					<view class="name">{{item.name}}</view>
					<view class="subtitle">{{item.company}}公司 {{item.num}} 人</view>
					<view class="price">{{item.price}}</view>
					<view class="info">{{item.address}} | {{item.year}} | {{item.limit}}</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	// import addressApi from "../../network/user/addressApi.js";
	export default {
		data() {
			return {
				sendList: [{
						id: 1,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "噶发k",
						num: 99,
						price: "15-20",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
					{
						id: 2,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "噶发k",
						num: 99,
						price: "15-20",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
					{
						id: 3,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "噶发k",
						num: 99,
						price: "15-20",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
				]
			}
		},
		onLoad(options) {},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.label {
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		padding-top: 20rpx;
		color: #888888;
		font-weight: 560;
		background-color: #fff;
	}

	.list {
		padding: 22rpx;
		background-color: #fff;

		.item {
			display: flex;
			padding-bottom: 20rpx;
			.left_cover {
				width: 210rpx;
				@include flex-center;
				padding: 10rpx 0;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.right_info {
				flex: 1;
				padding: 0 10rpx 0 15rpx;
				position: relative;

				.name {
					font-size: 34rpx;
					font-weight: 560;
					color: #38393b;
				}

				.subtitle {
					margin-top: 15rpx;
					font-size: 30rpx;
					font-weight: 560;
					color: #888888;
				}

				.price {
					width: 100%;
					font-weight: 560;
					text-align: right;
					color: #ffdf2c;
					padding-right: 10rpx;
				}

				.info {
					position: absolute;
					bottom: 0;
					left: 15rpx;
				}
			}
		}
	}
</style>
