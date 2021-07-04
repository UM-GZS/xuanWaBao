<template>
	<view class="home_wrap">
		<!-- 置顶在上方的按钮 -->
		<head-search class="header_search"></head-search>
		<view class="header">
			<!-- 背景轮播图 -->
			<u-swiper height="380"  :list="list"></u-swiper>
		 <!-- 定位在下方的工具栏 -->
			<view class="service_wrap">
				<view class="service_list">
					<view class="service_item">
						<image src="../../static/uview/example/js_bak.png" class="s_icon"></image>
						<view class="desc">车辆买卖</view>
					</view>
					<view class="service_item">
						<image src="../../static/uview/example/js_bak.png" class="s_icon"></image>
						<view class="desc">车辆买卖</view>
					</view>
					<view class="service_item">
						<image src="../../static/uview/example/js_bak.png" class="s_icon"></image>
						<view class="desc">车辆买卖</view>
					</view>
					<view class="service_item">
						<image src="../../static/uview/example/js_bak.png" class="s_icon"></image>
						<view class="desc">车辆买卖</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 热点推送 -->
		<hot-info></hot-info>
		<!-- 招聘信息 -->
		<recruit-info></recruit-info>
		<!-- 商品特惠 -->
		<discount-info></discount-info>
	</view>
</template>

<script>
	import headSearch from "../../components/head-search/head-search.vue";
	import hotInfo from "./childCmps/hot-info.vue";
	import recruitInfo from "./childCmps/recruit_info.vue";
	import discountInfo from "./childCmps/discount_info.vue";
	export default {
		components: {
			headSearch,
			hotInfo,
			recruitInfo,
			discountInfo
		},
		data() {
			return {
				//! 服务列表
				serviceList:[
					{}
				],
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
			ontrueGetList() {
				console.log("被调用");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.home_wrap{
		width: 100%;
		height: 100%;
		padding-bottom: 110rpx;
		position: relative;
		//! 头部内容
		.header {
			width: 100%;
			position: relative;
			//! 头部搜索
			
			.service_wrap {
				position: absolute;
				box-sizing: border-box;
				left: 0;
				bottom: -120rpx;
				z-index: 100;
				width: 100%;
				padding: 0 30rpx;
				height: 170rpx;
				.service_list {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: flex-start;
					padding: 20rpx;
					align-content: center;
					border-radius: 20rpx;
					background-color: #ffffff;
					.service_item {
						width: 25%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.desc {
							margin-top: 10rpx;
							font-weight: 700;
							font-size: 28rpx;
						}
						.s_icon {
							width: 110rpx;
							height: 130rpx;
						}
					}
				}
			}
		}
		
	}
</style>
