<template>
	<view class="home_wrap">
		<!-- 置顶在上方的按钮 -->
		<head-search class="header_search" :location="locName" @clickLoc="clickLoc" ref="hh"></head-search>
		<view class="header">
			<!-- 背景轮播图 -->
			<u-swiper height="380" :list="list"></u-swiper>
			<!-- 定位在下方的工具栏 -->
			<view class="service_wrap">
				<view class="service_list">
					<view class="service_item" v-for="(item,index) in  serviceList" @click="serviceClick(item.id)"
						:key="item.id">
						<image :src="item.icon" class="s_icon"></image>
						<view class="desc">{{ item.title }}</view>
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
	// 引入SDK核心类，js文件根据自己业务，位置可自行放置
	let QQMapWX = require('../../utils/map/qqmap-wx-jssdk.js');
	let qqmapsdk;
	//! 网络请求
	import homeApi from "../../network/home/homeApi.js";
	//! 组件
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
				//! 是否重新请求判断
				flag:false,
				//!地理位置的名称
				locName: '',
				//! 记录用户的地理位置
				location: null,
				//! 服务列表
				serviceList: [{
						id: 1,
						title: '车辆买卖',
						icon: '../../static/index/vehicle_trading.png'
					},
					{
						id: 2,
						title: '设备维修',
						icon: '../../static/index/repair.png'
					},
					{
						id: 3,
						title: '旧机置换',
						icon: '../../static/index/substitution.png'
					},
					{
						id: 4,
						title: '求职招聘',
						icon: '../../static/index/recruit.png'
					}
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
		//! 实例化组件
		created() {
			// 实例化API核心类
			qqmapsdk = new QQMapWX({
				key: getApp().globalData.tx_map_key
			});
		},
		methods: {
			//! 组件的网络请求
			ontrueGetList() {
				if(!this.flag) {
					//! 获取用户地理位置
					this.userLocation();
					this.flag = true;//! 不在重新请求
				}
			},
			//! 子组件向父组件传递选择地理位置的事件
			clickLoc() {
				uni.navigateTo({
					url: "../../subPackages/home/location"
				})
			},
			//! 判断用户是否授权获取地理位置
			userLocation() {
				const _this = this;
				uni.getSetting({
					success: (res) => {
						// res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
						// res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
						// res.authSetting['scope.userLocation'] == true    表示 地理位置授权
						if (res.authSetting['scope.userLocation'] != undefined && res.authSetting[
								'scope.userLocation'] != true) {
							//未授权
							uni.showModal({
								title: '请求授权当前位置',
								content: '需要获取您的地理位置，请确认授权',
								success: function(res) {
									if (res.cancel) {
										console.log("拒绝了")
										//取消授权
										wx.showToast({
											title: '拒绝授权',
											icon: 'none',
											duration: 2000
										})
									} else if (res.confirm) {
										//确定授权，通过wx.openSetting发起授权请求
										uni.openSetting({
											success: function(res) {
												if (res.authSetting[
														"scope.userLocation"] ==
													true) {
													wx.showToast({
														title: '授权成功',
														icon: 'none',
														duration: 2000
													})
													//再次授权，调用wx.getLocation的API
													_this.goAddress();
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														duration: 2000
													})
													//! 用户拒绝地理位置则显示获取失败
													_this.locName = "获取失败";
												}
											}
										})
									}
								}
							})
						} else if (res.authSetting['scope.userLocation'] == undefined) {
							//用户首次进入页面,调用wx.getLocation的API
							_this.goAddress();
						} else {
							// console.log('授权成功')
							//调用wx.getLocation的API
							_this.goAddress();
						}
					}
				})
			},
			//! 获取用户经纬度并解析出地址
			goAddress() {
				const _this = this;
				uni.getLocation({
					type: 'wgs84',
					success(res) {
						//根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析,前面已引入SDK
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: function(addressRes) {
								console.log(addressRes);
								_this.location = addressRes.result.ad_info;
								_this.locName = addressRes.result.ad_info.city;
							}
						})
					},
					fail: function(err) {
						//! 说明用户拒绝了首次的获取地理位置
						_this.locName = "获取失败";
					}
				})
			},
			//! 切换对应的页面
			serviceClick(id) {
				//! 根据id对应跳转界面
				switch (id) {
					case 1:
						uni.navigateTo({

						});
						break;
					case 2:
						uni.navigateTo({
							url: "../../subPackages/home/repair"
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home_wrap {
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
				bottom: -140rpx;
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
							margin-top: 20rpx;
							font-weight: 400;
							font-size: 28rpx;
						}

						.s_icon {
							width: 85rpx;
							height: 110rpx;
						}
					}
				}
			}
		}

	}
</style>
