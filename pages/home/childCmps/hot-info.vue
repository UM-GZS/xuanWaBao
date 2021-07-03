<template>
	<view class="hot_wrap">
		<view class="hot_info">
			<head-title title="热点推送" img="../../static/tabBar/33.png"></head-title>
			<view class="hot_list">
				<view class="hot_item">
					
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
	//! 热点推送
	.hot_wrap {
		width: 100%;
		padding: 0 30rpx;
		margin-top: 160rpx;
		.hot_info {
			width: 100%;
			.hot_list {
				width: 100%;
				height: 150rpx;
				padding: 30rpx 58rpx;
				.hot_item {
					width: 100%;
					background-color: #ffffff;
					border-radius: 15rpx;
					padding: 20rpx 10rpx;
				}
			}
		}
	}
</style>
