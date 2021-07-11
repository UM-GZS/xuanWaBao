<template>
	<view class="info_wrap">
		<!-- 切换按钮 -->
		<view class="swiper_tab">
			<view class="tab_item" @click="changeTab(item.id,index)" v-for="(item,index) in tabList" :key="index">
				<image style="width: 40rpx;height: 40rpx;" :src="current === index ? item.activeImg : item.img" ></image>
				<text style="margin-left: 10rpx;" :style="current === index ? 'color:black':'color:$gray_color'">{{ item.title }}</text>
			</view>
		</view>
		<!-- 内容区域 -->
		<swiper @change="change" :current="current" class="swiper_content" :style="{'padding-bottom':current==1?'115rpx':'0rpx'}"  enable-flex>
			<swiper-item v-for="(swiperItem,swiperIndex) in tabList" :key="swiperIndex" class="swiper_wrap">
				<!-- 每一项内容区域 -->
				<scroll-view @scrolltolower="lower" style="width: 100%;height: 100%;" scroll-y enable-flex>
					<view class="info_item" v-for="(item,index) in list" :key="index">
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
									<view class="base_info">
										基础信息基础信息基础信息基础信息基础信息基础信息基础信息
									</view>
								</view>
								<!-- 收藏以及分享 -->
								<view class="edit">
									<!-- 收藏 -->
									<view class="collect common" >
										<text style="margin-left: 10rpx;">个人</text>
									</view>
									<!-- 分享 -->
									<view  class="share common"  >
										<text style="margin-left: 10rpx;">￥200</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			
		</swiper>
		
		<view class="send_secondHand" v-if="current==1" @click="goSecondHand">
			<view class="text">
				发布交易信息
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				//! 数据切换标题数据
				tabList:[
					{id:1,title:'新机置换',img:'../../static/information/hotInfo.png',activeImg:'../../static/information/hotInfo_active.png'},
					{id:2,title:'二手交易',img:'../../static/vehicle/ershou.png',activeImg:'../../static/vehicle/ershou2.png'},
					{id:2,title:'车辆租赁',img:'../../static/information/industry.png',activeImg:'../../static/vehicle/chuzu2.png'}
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
			},
			goSecondHand(){
				uni.navigateTo({
					url:"../vehicleBuy/secondHand"
				})
			}
		},	
		
	}
</script>

<style lang="scss">
	.info_wrap {
		width: 100%;
		height: 100%;
		padding-bottom: 100rpx;
		overflow-y: hidden;
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
			height: 100%;
			overflow-y: scroll;
			padding: 0 20rpx 0 20rpx;
			box-sizing: border-box;
			.info_item {
				width: 100%;
				display: flex;
				flex-direction: column;
				background-color: #ffffff;
				border-radius: 15rpx;
				padding: 0 30rpx;
				margin-bottom: 10rpx;

				//! 图片以及文字内容
				.info_content {
					width: 100%;
					margin: 20rpx 0;
					display: flex;
					align-items: center;

					.left_pic {
						width: 210rpx;
						height: 230rpx;
						border: 1rpx solid #bbbbbb;
						@include  flex-center;
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
							margin: 10rpx 0;
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
							flex-direction: column;
							align-items: flex-start;
						}
						
					}
					
				}
				// 发布二手信息
				
				
			}
		}
		
		.send_secondHand{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 110rpx;
			width: 100%;
			@include  flex-center;
			background-color: #fff;
			.text{
					width: 80%;
					background-color: $page_color;
					@include  flex-center;
					height: 70%;
					font-size: 34rpx;
					font-weight: 600;
					color: #38393B;
					border-radius: 50rpx;
				}
			}
		
	}
</style>
