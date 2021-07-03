<template>
	<!-- 头部标题 -->
	<view class="comm_title">
		<view class="comm_left">
			<image style="width: 60rpx;height: 60rpx;" :src="img"></image>
			<text style="margin-left: 10rpx;font-weight: 800;">{{ title }}</text>
		</view>
		<view class="show_more">
			<view>
				<text>更多</text>
				<text>></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				require:true,
				default:""
			},
			img:{
				type:String,
				required:true,
			}
		}
	}
</script>

<style lang="scss" scoped>
	//！ 公共样式
	.comm_title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.comm_left {
			display: flex;
			align-items: center;
		}
	}
</style>
