<template>
	<view class="info_wrap">
		<!-- 切换按钮 -->
		<view class="swiper_tab">
			<view class="tab_item" @click="changeTab(item.id,index)" v-for="(item,index) in tabList" :key="index">
				<text style="margin-left: 10rpx;"
					:style="current === index ? 'color:black':'color:$gray_color'">{{ item.title }}</text>
			</view>
		</view>
		<!-- 内容区域 -->
		<swiper @change="change" :current="current" class="swiper_content"
			:style="{'padding-bottom':current==1?'115rpx':'0rpx'}" enable-flex>
			<swiper-item v-for="(swiperItem,swiperIndex) in tabList" :key="swiperIndex" class="swiper_wrap">
				<!-- 全部 -->
				<scroll-view @scrolltolower="lower" style="width: 100%;height: 100%;box-sizing: border-box;" scroll-y
					enable-flex v-if="swiperIndex==0">
					<view class="list" v-for="item in list" :key="item.id">
						<view class="item">
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
				</scroll-view>

				<!-- 我的 -->
				<scroll-view @scrolltolower="lower" style="width: 100%;height: 100%;padding-bottom:110rpx;" scroll-y
					enable-flex v-else>
					<view class="list" v-for="item in list" :key="item.id">
						<view class="item">
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
				</scroll-view>

			</swiper-item>

		</swiper>

		<view class="send_secondHand" v-if="current === 1" @click="goSecondHand">
			<view class="text">
				添加求职信息
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				//! 数据切换标题数据
				tabList: [{
						id: 1,
						title: '全部'
					},
					{
						id: 2,
						title: '我的求职'
					}
				],
				current: 0, //! 默认选中的swiper下标
				baseUrl: "",
				list: [{
						id: 1,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "xxx",
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
						company: "xxx",
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
						company: "xxx",
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
						company: "xxx",
						num: 99,
						price: "15-20",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					}, {
						id: 3,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "xxx",
						num: 99,
						price: "15-20",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					}, {
						id: 3,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "xxx",
						num: 99,
						price: "15-20",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
				]
			}
		},
		onLoad() {
			this.baseUrl = getApp().globalData.requesturl
		},
		onShow() {
			console.log("onshow处理重新加载数据")
		},
		methods: {

			getList() {
				let query = {
					page_num: 1,
					page_size: 99,
				}

			},
			//! 按钮点击的切换
			changeTab(id, index) {
				console.log(id);
				this.current = index;
			},
			//! 滑动页面的切换
			change(e) {
				this.current = e.target.current;
			},
			//! 数据滚动到底部的监听
			lower() {
				console.log("到达底部");
			},
			goSecondHand() {
				uni.navigateTo({
					url:"./addJob"
				})
			},
			goDetail(id) {
				console.log('跳转到详情');
				// uni.navigateTo({
				// 	url:"./secondHandDetail?id="+id
				// })
			}
		},

	}
</script>

<style lang="scss">
	.info_wrap {
		width: 100%;
		height: 100%;
		padding-bottom: 100rpx;
		overflow-y: hidden;

		.swiper_tab {
			margin-top: 10rpx;
			width: 100%;
			height: 90rpx;
			background-color: #ffffff;
			display: flex;

			.tab_item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 600;
				font-size: 30rpx;
				color: $gray_color;
			}
		}

		//! 内容区域
		.swiper_content {
			width: 100%;
			margin-top: 30rpx;
			height: 100%;
			overflow-y: scroll;
			padding: 0 20rpx 190rpx 20rpx;
			box-sizing: border-box;

			.info_item {
				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #ffffff;
				border-radius: 15rpx;
				padding: 0 30rpx;
				margin-bottom: 10rpx;

				//! 图片以及文字内容
				.info_content {
					width: 100%;
					margin: 20rpx 0;
					display: flex;
					align-items: center;

					.left_pic {
						width: 210rpx;
						height: 230rpx;
						border: 1rpx solid #bbbbbb;
						@include flex-center;
					}

					.right_msg {
						flex: 1;
						margin-left: 10rpx;
						display: flex;
						height: 100%;
						flex-direction: column;

						.desc {
							width: 100%;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							font-size: 30rpx;
							font-weight: 600;
							overflow: hidden;
						}

						.share {
							margin: 0;
							padding: 0;
							background: transparent;
							// font-size: 25rpx;
							color: $gray_color;

							&::after {
								border: none;
							}
						}

						//! 公共样式
						.common {
							display: flex;
							font-size: 28rpx;
							align-items: center;
						}

						.user_info {
							margin: 10rpx 0;
							display: flex;
							justify-content: space-between;
							align-items: center;
							color: $gray_color;
						}

						//! 操作
						.edit {
							width: 100%;
							display: flex;
							color: $gray_color;
							flex-direction: column;
							align-items: flex-start;

							.userBg {
								background-color: #ffa02e;
								color: #ffffff;
								min-width: 80rpx;
								padding-right: 10rpx;
								@include flex-center;
							}
						}

					}

				}

				// 发布二手信息


			}
		}

		.send_secondHand {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 110rpx;
			width: 100%;
			@include flex-center;
			background-color: #fff;

			.text {
				width: 80%;
				background-color: $page_color;
				@include flex-center;
				height: 70%;
				font-size: 34rpx;
				color: #38393B;
				border-radius: 20rpx;
			}
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
						margin-top: 20rpx;
						font-size: 28rpx;
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

		// .list:nth-last-child(1) {
		// 	padding-bottom: 160rpx;
		// }

	}
</style>
