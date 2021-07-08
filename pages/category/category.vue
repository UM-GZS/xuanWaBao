<template>
	<view class="cate_wrap">
		<view class="content_wrap">
			<!-- 左边的分类类别 -->
			<scroll-view class="left_cate"  scroll-y enable-flex>
				<!-- 显示分类的每一项 -->
				<view class="cate_item" v-for="(item,index) in cate_list" :key="index" :class="index === current ? 'active_cate'  :''" @click="changeCate(index)">{{ item.title }}</view>
			</scroll-view>
			<scroll-view class="cate_content" scroll-y enable-flex>
				<view class="content_item" v-for="item in cate_list" :key="item.id">
					<image style="width: 100%;height: 130rpx;" src="../../static/index/recruit.png"></image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//! 默认请求下标为1的数据
				current:0,
				//! 左边分类数据
				cate_list:[
					{id:1,title:'大车1'},
					{id:2,title:'大车2'},
					{id:3,title:'大车3'},
					{id:4,title:'大车4'},
					{id:5,title:'大车5'},
					{id:6,title:'大车6'},
					{id:7,title:'大车7'},
					{id:8,title:'大车8'},
					{id:9,title:'大车9'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					{id:10,title:'大车10'},
					
				]
			}
		},
		methods: {
			//! 组件显示的时候调用的网络请求
			ontrueGetList() {
				console.log("被调用");
			},
			//! 左边列表的切换
			changeCate(index) {
				this.current = index;
			}
		},
	}
</script>
<style lang="scss" scoped>
	.cate_wrap {
		width: 100%;
		.content_wrap {
			width: 100%;
			height: calc(100vh - 100rpx);
			display: flex;
			//! 左边列表数据
			.left_cate {
				width: 200rpx;
				height: 100%;
				padding: 20rpx 10rpx;
				background-color: #ffffff;
				.cate_item {
					width: 100%;
					@include flex-center;
					border-radius: 15rpx;
					margin-bottom: 20rpx;
					padding: 15rpx 0;
				}
				.active_cate{
					background-color: $page_color;
				}
			}
			.cate_content {
				flex: 1;
				width: 100%;
				height: 100%;
				padding-top: 20rpx;
				.content_item {
					box-sizing: border-box;
					float: left;
					width: 33.3%;
					padding: 20rpx 15rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
