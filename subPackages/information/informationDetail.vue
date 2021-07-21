<template>
	<view class="info_detail_wrap" v-if="detail">
		<view class="info_title">
			{{ detail.name }}
		</view>
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="left_box">
				<image src="../../static/information/industry_active.png" style="width: 40rpx;height: 40rpx;border-radius: 50%;"></image>
				<view class="user_msg">
					<view class="name">
						{{ detail.user_name }}
					</view>
					<view class="time">
						{{ detail.create_time | filterDate }}
					</view>
				</view>
			</view>
			<view class="right_box">
				<view class="preview common">
					<image src="../../static/index/see.png" style="width: 30rpx;height: 20rpx;margin-right: 10rpx;" ></image>
					<text>{{ detail.comments }}</text>
				</view>
				<view class="collect common" @click.stop="collect">
					<image src="../../static/information/collect.png" style="width: 25rpx;height: 25rpx;margin-right: 10rpx;" v-if="isCollect"></image>
					<image src="../../static/uview/common/collect.png" style="width: 25rpx;height: 25rpx;margin-right: 10rpx;" v-else></image>
					<text>收藏</text>
				</view>
				<view class="share common" @click.stop="share">
					<image src="../../static/information/share.png" style="width: 25rpx;height: 25rpx;margin-right: 10rpx;" ></image>
					<text>分享</text>
				</view>
			</view>
		</view>
		<!-- 详情内容 -->
		<view class="content">
			{{ detail.info1 }}
			<image v-for="(item,index) in imgList" :key="index" :src="item.img" style="width: 100%;border-radius: 30rpx;"></image>
			{{ detail.info2 }}
			{{ detail.info3 }}
		</view>
	</view>
</template>

<script>
	import articleApi from "../../network/article/article.js";
	import collectApi from "../../network/user/collect.js";
	export default {
		data() {
			return {
				url:getApp().globalData.requesturl,
				detail:null,
				//! 图片列表
				imgList:[],
				//! 记录当前文章的id
				articleId:null,
				//! 通过isCollect来判断用户是否时候收藏当前文章
				isCollect:null
			}
		},
		onLoad(options) {
			if(options.id) {
				this.getArticle(options.id)
			}
		},
		filters: {
			filterDate: function(value) {
				return getApp().globalData.formatDate(value);
			}
		},
		methods: {
			async getArticle(id) {
				let params = {
					id,
					user_id:getApp().globalData.wxuser.id
				}
				const res = await articleApi.articleDetail(params);
				const list = JSON.parse(res.data.urls);
				for(let i = 0; i < list.length; i++) {
					this.imgList.push({img:this.url + list[i].img})
				}
				//! 调用查询用户的个人收藏
				this.getUserCollect(res.data.id);
				this.articleId = res.data.id;
				this.detail = res.data;
			},
			//! 获取当前用户的个人收藏列表
			//! 接收传递过来收藏或者商品的id
			async getUserCollect(collection_id) {
				let params = {
					user_id:getApp().globalData.wxuser.id,
					collection_id,
					collection_status:0 //!收藏类型
				}
				const res = await collectApi.getCollect(params);
				if(res.data.list.length) {
					this.isCollect = res.data.list[0];
				}else {
					this.isCollect = null;
				}
			},
			//! 收藏按钮点击事件
			collect() {
				//! 判断当前用户是否已经收藏对应调用其相应接口
				if(this.isCollect) {
					//! 取消收藏
					collectApi.deleteCollect({id:this.isCollect.id}).then(delRes => {
						//! 重新获取数据
						this.getUserCollect(this.articleId);
					})
				}else {
					let data = {
						user_id:getApp().globalData.wxuser.id,
						collection_id:this.articleId,
						collection_status:0
					}
					//! 添加收藏
					collectApi.addCollect(data).then(addRes => {
						this.getUserCollect(this.articleId);
					})
				}
			},
			//! 分享按钮点击
			share() {
				console.log("分享")
			}
		},
	}
</script>

<style lang="scss" scoped>
	.info_detail_wrap {
		width: 100%;
		padding: 30rpx;
		.info_title {
			font-size: 38rpx;
			font-weight: 500;
		}
		.user_info{
			width: 100%;
			margin:20rpx 0;
			padding: 10rpx 0;
			@include flex-jcsb;
			.left_box {
				display: flex;
				align-items: center;
				.user_msg {
					display: flex;
					font-size: 23rpx;
					color: $gray_color;
					margin-left: 10rpx;
					flex-direction: column;
				}
			}
			.right_box {
				display: flex;
				align-items: center;
				color: $gray_color;
				font-size: 20rpx;
				.common {
					margin-left: 20rpx;
					display: flex;
					align-items: center;
				}
			}
		}
		.content {
			font-size: 30rpx;
			font-weight: 300;
		}
	}
</style>
