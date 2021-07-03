<template>
	<view class="headerSearchs">
		<view class="left_loc">
			<u-icon name="map" size="40"></u-icon>
			<text class="location">珠海</text>
		</view>
		<view class="center_input">
			<u-search :show-action="false" input-align="center" height="65" placeholder="输入内容搜索" disabled></u-search>
		</view>
		<view class="scan">
			<u-icon name="scan" size="60"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
	}
</script>

<style lang="scss" scoped>
	.headerSearchs {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		align-items: center;
		color: #ffffff;
		.center_input {
			flex: 1;
			margin: 0 20rpx ;
		}
		.left_loc {
			display: flex;
			justify-content: center;
			align-items: center;
			.location {
				margin-left: 10rpx;
			}
		}
	}
</style>
