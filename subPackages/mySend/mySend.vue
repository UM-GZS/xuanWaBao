<template>
	<view class="info_wrap">
		<!-- 切换按钮 -->
		<view class="swiper_tab">
			<view class="tab_item" @click="changeTab(item.id,index)" v-for="(item,index) in tabList" :key="index">
				<image style="width: 40rpx;height: 40rpx;" :src="current === index ? item.activeImg : item.img"></image>
				<text style="margin-left: 10rpx;"
					:style="current === index ? 'color:black':'color:$gray_color'">{{ item.title }}</text>
			</view>
		</view>
		<!-- 内容区域 -->
		<swiper @change="change" :current="current" class="swiper_content"
			:style="{'padding-bottom':current==1?'115rpx':'0rpx'}" enable-flex>
			<swiper-item v-for="(swiperItem,swiperIndex) in tabList" :key="swiperIndex" class="swiper_wrap">
				<!-- 求职招聘 -->
				<scroll-view @scrolltolower="lower"  scroll-y v-if="swiperIndex==0"
					enable-flex style="width: 100%;height: 100%;padding-bottom:10rpx;">
					<view class="list">
						<view class="item" v-for="item in sendList" :key="item.id">
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

				<!-- 二手交易 -->
				<scroll-view @scrolltolower="lower"  scroll-y v-else
					enable-flex style="width: 100%;height: 100%;padding-bottom:10rpx;">

					<view class="second_hand">
						<view class="item" v-for="item in sendList" :key="item.id">
							<view class="left_cover">
								<image src="../../static/index/sw1.jpg"></image>
							</view>
							<view class="right_info">
								<view class="name"><text>商品名称称称称称称称称称</text> </view>
								<view class="price">
									<view>
										<image src="/static/publicImg/phone.png"  />
										10203040506
									</view>
									<view @click="clickPhone" >待交易</view>
								</view>
								<view class="info">￥2000</view>
							</view>
						</view>
					</view>

				</scroll-view>

			</swiper-item>

		</swiper>

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
						title: '求职招聘',
					},
					{
						id: 2,
						title: '二手交易',
					}
				],
				current: 0, //! 默认选中的swiper下标
				baseUrl: "",
				sendList: [{
						id: 1,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "jshfk",
						num: 99,
						price: "15-20k",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
					{
						id: 2,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "jshfk",
						num: 99,
						price: "15-20k",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
					{
						id: 3,
						cover: "../../static/index/sw1.jpg",
						name: '挖机司机',
						company: "jshfk",
						num: 99,
						price: "15-20k",
						address: "北京",
						year: "1年",
						limit: "学历不限"
					},
				]
			}
		},
		onLoad() {
			this.getList()
			this.baseUrl = getApp().globalData.requesturl
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
			
			goDetail(id) {
				console.log(id);
				console.log('跳转到详情');
				uni.navigateTo({
					url: "./secondHandDetail?id=" + id
				})
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
			padding: 0 10rpx 0 10rpx;
			box-sizing: border-box;

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
		.second_hand {
			padding: 22rpx;
			background-color: #fff;
			.item {
				display: flex;
				padding-bottom: 20rpx;
				.left_cover {
					width: 230rpx;
					height: 230rpx;
					@include flex-center;
					padding: 10rpx 10rpx;
					border: 2px  solid #e3e3e3;
					image {
						width: 200rpx;
						height: 200rpx;
					}
				}

				.right_info {
					width: 100%;
					padding: 20rpx 10rpx 0 15rpx;
					position: relative;
					background-color: #fff;

					.name {
						font-size: 32rpx;
						font-weight: 560;
						color: #38393B;
						height: 80rpx;
					}
				

					.price {
						width: 100%;
						margin-top: 10rpx;
						padding-right: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						view:nth-child(1){
							color: red;
							position: relative;
							padding-left: 40rpx;
							image{
								width:30rpx;
								height:30rpx;
								position: absolute;
								left:0;
								top:50%;
								transform: translateY(-50%);
							}
							
						}
						view:nth-child(2){
							color: #fff;
							background-color: #ffde2a;
							border-radius: 8rpx;
							padding: 8rpx 15rpx;
						}
					}

					.info {
						position: absolute;
						bottom: 0;
						left: 15rpx;
						color: #000;
						font-weight: 600;
					}
				}
			}
		}

	}
</style>
