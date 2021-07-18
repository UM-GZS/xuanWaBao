<template>
	<view class="info_wrap">
		<!-- 头部搜索框 -->
		<head-search :location="locName"></head-search>
		<!-- 切换按钮 -->
		<view class="swiper_tab">
			<view class="tab_item" @click="changeTab(item.id,index)" v-for="(item,index) in tabList" :key="index">
				<image style="width: 40rpx;height: 40rpx;" :src="current === index ? item.activeImg : item.img" ></image>
				<text style="margin-left: 10rpx;" :style="current === index ? 'color:black':'color:$gray_color'">{{ item.title }}</text>
			</view>
		</view>

		<!-- 内容区域 -->
		<swiper @change="change" :current="current" class="swiper_content" enable-flex>
			<swiper-item v-for="(swiperItem,swiperIndex) in tabList" :key="swiperIndex">
				<!-- 每一项内容区域 -->
				<scroll-view @scrolltolower="lower" style="width: 100%;height: 100%;" scroll-y enable-flex>
					<view class="info_item" @click="infoDetail(item)" v-for="(item,index) in list" :key="index">
						<view class="info_title">
							文章标题文章标题文章标题文章标题文章标题文章标题 文章标题文章标题
						</view>
						<!-- 图片以及文字内容 -->
						<view class="info_content">
							<view class="left_pic">
								<image style="width: 100%;height: 100%;" src="../../static/uview/common/logo.png">
								</image>
							</view>
							<view class="right_msg">
								<view class="desc">
									这是文章内容这是文章内容这是文章内容这是这是文章内容这是文章内容这是文章内容这是这是文章内容这是文章内容这是文章内容这是这是文章内容这是文章内容这是文章内容这是
								</view>
								<!-- 用户信息 -->
								<view class="user_info">
									<view class="name common">
										<image style="width: 30rpx;height: 30rpx;" src="../../static/user/usercenter.png">
										</image>
										<text style="margin-left: 10rpx;">用户名称</text>
									</view>
									<view class="time">
										2021年4月5日
									</view>
								</view>
								<!-- 收藏以及分享 -->
								<view class="edit">
									<!-- 收藏 -->
									<view class="collect common" @click.stop="collect">
										<image src="../../static/information/collect.png" style="width: 30rpx;height: 30rpx;">
										</image>
										<text style="margin-left: 10rpx;">收藏</text>
									</view>
									<!-- 分享 -->
									<button open-type="share" class="share common" style="margin-left: 30rpx;" @click.stop="share">
										<image src="../../static/information/share.png" style="width: 30rpx;height: 30rpx;">
										</image>
										<text style="margin-left: 10rpx;">分享</text>
									</button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import headSearch from "@/components/head-search/head-search.vue";
	export default {
		components: {
			headSearch
		},
		props: {
			locName: {
				type: String,
				default: '正在获取'
			},
		},
		data() {
			return {
				//! 数据切换标题数据
				tabList:[
					{id:1,title:'热点推送',img:'../../static/information/hotInfo.png',activeImg:'../../static/information/hotInfo_active.png'},
					{id:2,title:'行业动态',img:'../../static/information/industry.png',activeImg:'../../static/information/industry_active.png'}
				],
				current: 0, //! 默认选中的swiper下标
				list: [{}, {}, {}, {}, {}]
			}
		},
		methods: {
			//! 用于当前组件的网络请求函数
			ontrueGetList() {
				console.log("被调用");
			},
			// 跳转详情页面
			infoDetail(item) {
				uni.navigateTo({
					url:"../../subPackages/information/informationDetail"
				})
			},
			//! 点击收藏按钮
			collect() {
				console.log("收藏按钮");
			},
			//! 点击分享按钮
			share() {
				console.log("share调用")
				let data = {
					msg:'旋挖宝资讯'
				}
				uni.setStorageSync("shareInfo",data);
				uni.showShareMenu({
				  withShareTicket: true,
				  menus: ['shareAppMessage', 'shareTimeline'],
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.warn(err)
					}
				})
			},
			//! 按钮点击的切换
			changeTab(id,index) {
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
			}
		},	
		
	}
</script>

<style lang="scss">
	.info_wrap {
		width: 100%;
		height: 100%;
		padding-bottom: 100rpx;

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
			height: calc(100vh - 328rpx);
			overflow-y: scroll;
			padding: 0 20rpx;
			box-sizing: border-box;
			
			.info_item {
				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #ffffff;
				border-radius: 15rpx;
				padding: 30rpx;
				margin-bottom: 10rpx;

				.info_title {
					width: 100%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					font-size: 30rpx;
					font-weight: 600;
					overflow: hidden;
				}

				//! 图片以及文字内容
				.info_content {
					width: 100%;
					margin: 20rpx 0;
					display: flex;
					align-items: center;

					.left_pic {
						width: 200rpx;
						height: 200rpx;
						border: 1rpx solid #bbbbbb;
					}

					.right_msg {
						flex: 1;
						margin-left: 10rpx;
						display: flex;
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
							&::after{
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
							margin: 20rpx 0;
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
							justify-content: flex-end;
							align-items: center;
						}
					}
				}
			}
		}
	}
</style>
