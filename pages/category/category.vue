<template>
	<view class="cate_wrap">
		<view class="content_wrap">
			<!-- 左边的分类类别 -->
			<scroll-view class="left_cate" scroll-y enable-flex>
				<!-- 显示分类的每一项 -->
				<view class="cate_item" v-for="(item,index) in cate_list" :key="index"
					:class="index === current ? 'active_cate'  :''" @click="changeCate(index)">{{ item.title }}</view>
			</scroll-view>
			<scroll-view class="cate_content" scroll-y enable-flex>
				<view @click="detail(item.id)" class="content_item" v-for="item in imgList" :key="item.id">
					<image style="width: 100%;height: 130rpx;border: 1rpx solid #b5b5b5;" :src="url + item.img"></image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 图片地址前缀
				url: getApp().globalData.requesturl,
				//! 默认请求下标为1的数据
				current: 0,
				//! 左边分类数据
				cate_list: [{
						id: 1,
						title: '钢锯'
					},
					{
						id: 2,
						title: '三通'
					},
					{
						id: 3,
						title: '合页'
					},
					{
						id: 4,
						title: '齿轮'
					},
					{
						id: 5,
						title: '弹簧'
					},
					{
						id: 5,
						title: '轴承'
					}
				],
				// 右边图片数据
				imgList: []
			}
		},
		methods: {
			//! 组件显示的时候调用的网络请求
			ontrueGetList() {
				this.changeCate(0);
				console.log("被调用");
			},
			//! 左边列表的切换
			changeCate(index) {
				if (index === 0) {
					this.imgList = [{
							img: '/dl/img/201ca44c4a5529dd723b31fab613906fed1d0ddc.jpeg@360w_360h.jpeg'
						},
						{
							img: '/dl/img/804352193601428daa1d616662551710b13e7fcb.jpeg@360w_360h.jpeg'
						},
						{
							img: '/dl/img/dd9e70770f73acbc871b2e11f906353614d0d366.jpeg@360w_360h.jpeg'
						},
						{
							img: '/dl/img/b52213d5b34cdc7dedfae616158ba743d3867705.jpeg@360w_360h.jpeg'
						},
						{
							img: '/dl/img/4a8cb6ae7cb4f8dd0658cf730841dec67939eaee.jpeg@360w_360h.jpeg'
						}
					]
				} else if (index === 1) {
					this.imgList = [{
							img: '/dl/img/1f069cbd8b542f98798db34a1656f1ee12337c6a.jpeg@525w_360h.jpeg'
						},
						{
							img: '/dl/img/d07da3159ec8527df5475b97dd79956061c0e976.jpeg@480w_360h.jpeg'
						},
						{
							img: '/dl/img/6388648da967386f1c567724f0c6074b18abb132.jpeg@360w_360h.jpeg'
						},
					]
				} else if (index === 2) {
					this.imgList = [{
							img: '/dl/img/1cb4562e0699c08d0ea5a3a3b9327b9525714ec6.jpeg@480w_360h.jpeg'
						},
						{
							img: '/dl/img/6e535e43916898096a4e7ee2f5885be8b7dc8847.jpeg@360w_360h.jpeg'
						},
						{
							img: '/dl/img/5aeb4296b8ded12ed17c5e7f9451e708d696e9d7.jpeg@360w_360h.jpeg'
						},
					]
				} else if (index === 3) {
					this.imgList = [{
							img: '/dl/img/2c5ee10139f06313ace43fb79dfd16b33bbd7e7f.jpeg@385w_360h.jpeg'
						},
						{
							img: '/dl/img/bd854ffe16e5c6396820f1cb3e0234b068c9e691.jpeg@360w_402h.jpeg'
						},
						{
							img: '/dl/img/0fce04146d9e714215153182c769c9b2271c3dd2.jpeg@480w_360h.jpeg'
						},
					]
				} else if (index === 4) {
					this.imgList = [{
							img: '/dl/img/89434c44cb183241c569dd4b233a6852bdcb1e20.jpeg@360w_360h.jpeg'
						},
						{img:'/dl/img/8810af5ebde1da4fc1a7925c5b87cf07d1554f23.jpeg@429w_360h.jpeg'},
						{img:'/dl/img/d6e43a5e9da353d26d8b602d0ed2004c6ad09f2c.jpeg@360w_360h.jpeg'}
					]
				}else if (index === 5) {
					this.imgList = [{
							img: '/dl/img/9fa6ab91e271021c4e52282ed5a6948729759f45.jpeg@360w_360h.jpeg'
						},
						{img:'/dl/img/c4f24eda508fdf2c949f54fe7a81cfe8a2b339af.jpeg@360w_360h.jpeg'},
						{img:'/dl/img/6b966849a8e6b7c7002073d4001a02d7aacd4b7f.jpeg@360w_480h.jpeg'}
					]
				}
				this.current = index;
			},
			//! 跳转详情界面
			detail(id) {
				uni.navigateTo({
					url: "../../subPackages/category/category_detail"
				})
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

				.active_cate {
					background-color: $page_color;
				}
			}

			.cate_content {
				flex: 1;
				width: 100%;
				height: 100%;
				padding-top: 50rpx;

				.content_item {
					box-sizing: border-box;
					float: left;
					width: 33.3%;
					padding: 10rpx 15rpx;
					margin-bottom: 5rpx;
				}
			}
		}
	}
</style>
