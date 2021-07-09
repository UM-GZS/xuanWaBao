<template>
	<view class="content">
		<!-- 首页 -->
		<view :style="{'display':show_index == 0 ?'block':'none'}">
			<home ref="home"></home>
		</view>
		<!-- 资讯 -->
		<view :style="{'display':show_index == 1 ?'block':'none'}">
			<information ref="information"></information>
		</view>
		<!-- 弹窗按钮 -->
		<view :style="{'display':show_index == 2? 'block':'none'}">
		</view>
		<!-- 分类 -->
		<view :style="{'display':show_index == 3 ?'block':'none'}">
			<category ref="category"></category>
		</view>
		<!-- 个人中心 -->
		<view :style="{'display':show_index == 4 ? 'flex':'none'}">
			<user :style="{'display':show_index == 4 ? 'flex':'none'}" ref="user"></user>
		</view>
		<!-- is_lhp判断是否为刘海屏在main.js里，好像uniapp有一个css变量获取刘海屏的安全区域 -->
		<view class="tabBar" :style="{height:is_lhp?'140rpx':'98rpx'}">
			<!-- 导航的中间圆圈 -->
			<view class="border_box" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view class="tabBar_miden_border"></view>
			</view>
			<view class="tabBar_list" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view v-for="(item) in tab_nav_list" :key="item.id"
					:class="{'tabBar_item':item.id!=2,'tabBar_item2':item.id==2}" @tap="cut_index(item.id)">
					<image v-if="show_index == item.id" :src="`../../static/tabBar/${item.id+1}${item.id+1}.png`">
					</image>
					<image v-else :src="`../../static/tabBar/${item.id+1}.png`"></image>
					<view :class="{'tabBar_name':true,'nav_active':show_index == item.id}">{{item.name}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import home from "@/pages/home/home.vue";
	import information from "@/pages/information/information.vue";
	import category from "@/pages/category/category.vue";
	import user from "@/pages/user/user.vue";
	export default {
		components: {
			home,
			category,
			information,
			user
		},
		data() {
			return {
				//! 控制是否显示弹窗
				showToast: false,
				show_index: 0, //控制显示那个组件
				tab_nav_list: [{
					'id': 0,
					'name': '首页'
				}, {
					'id': 1,
					'name': '资讯'
				}, {
					'id': 2,
					'name': ''
				}, {
					'id': 3,
					'name': '分类'
				}, {
					'id': 4,
					'name': '我的'
				}], //菜单列表
				is_lhp: false
			}
		},
		onLoad(options) {
			console.log("参数", options);
			let _this = this
			this.is_lhp = this.$is_bang
			this.$nextTick(function() {
				// 一定要等视图更新完再调用方法   -----------++++++++++++++++重要
				setTimeout(function() {
					_this.$refs.home.ontrueGetList() //初次加载第一个页面的请求数据
				}, 100)
			})

			console.log("是否为刘海屏", this.is_lhp)
		},
		methods: {
			// 切换组件
			cut_index(type) {
				let _this = this
				//! 判断是否中间点击
				if (type === 2) {
					_this.showToast = !_this.showToast;
					return;
				}
				//! 记录选中的值
				_this.show_index = type

				if (_this.show_index == 0) {
					//! 调用home的方法
					_this.$refs.home.ontrueGetList()
				} else if (_this.show_index == 1) {
					_this.$refs.information.ontrueGetList()
				} else if (_this.show_index == 3) {
					_this.$refs.category.ontrueGetList()

				} else if (_this.show_index == 4) {
					_this.$refs.user.ontrueGetList()
				}
			},
			onPullDownRefresh() {
				uni.showToast({
					title: `第${this.show_index+1}个页面的刷新`
				})
				setTimeout(function() {
					uni.stopPullDownRefresh()
				}, 2000)
				console.log('下拉刷新四个组件公用的下拉刷新方法,根据在哪个页面下拉执行哪个页面的刷新方方法即可')
				console.log('如果想要自定义刷新的话，插件市场就有一个   非常好用也非常容易入手')
			}
		},
		onShareAppMessage(options) {
			if (options.from === "button") {
				console.log(options)
				//! 获取缓存中的数据，编辑转发的内容显示数据
				let sharInfo = uni.getStorageSync("shareInfo");
				return {
					title: `${sharInfo.msg}`,
					path: '/pages/index/index',
					success: function(res) {
						// 转发成功
						console.log("成功转发")
					},
					fail: function(res) {
						// 转发失败
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.tabBar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;

		.tabBar_list {
			width: 86%;
			display: flex;
			justify-content: space-between;

			image {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 2rpx
			}

			.tabBar_item {
				width: 68rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
			}

			.tabBar_item2 {
				width: 68rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
				margin-top: -20rpx;
				position: relative;
				z-index: 101;

				image {
					width: 68rpx;
					height: 68rpx;
				}
			}
		}
	}

	.border_box {
		// pointer-events: none; 事件穿透解决z-index层级问题
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0px;
		bottom: 50rpx;
		z-index: 100;
		pointer-events: none;

		.tabBar_miden_border {
			width: 100rpx;
			height: 50rpx;
			border-top: 2rpx solid #E5E5E5;
			border-radius: 50rpx 50rpx 0 0;
			/* 左上、右上、右下、左下 */
			background: #fff;
		}
	}

	.nav_active {
		color: $black_color;
	}
</style>
