<template>
<view class="user_tenter_wrap">
	
	<view class="cover_wrap">
		<image class="cover" src="/static/index/sw1.jpg" mode=""></image>
	</view>
	<!-- 操作行 -->
	<view class="user_cell">
		
		<view class="cell_row">
			<view class="label">用户名称:</view>
			<view class="content">请输入用户名称</view>
		</view>
		<view class="cell_row">
			<view class="label">手机号:</view>
			<view class="content">请输入用户名称</view>
		</view>
		<view class="cell_row">
			<view class="label">企业身份:</view>
			<view class="content" @click="show_company=true">
				{{companyTitle}}
			</view>
		</view>
		<view class="cell_row">
			<view class="label">个人身份:</view>
			<view class="content" @click="user_show=true">
				{{userTitle}}
			</view>
		</view>
		
		<u-cell-group>
			<u-cell-item icon="none" title="购买记录"  :border-top="false"></u-cell-item>
			<u-cell-item icon="none" title="求职记录"  :border-top="false"></u-cell-item>
			<u-cell-item icon="none" title="维修记录"  :border-top="false"></u-cell-item>
		</u-cell-group>
		<u-picker v-model="show_company" mode="selector" :range="company_options" @confirm="companyClick"></u-picker>
		<u-picker v-model="user_show" mode="selector" :range="user_options" @confirm="userClick"></u-picker>
		
 </view>
	
	
</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
				show_company:false,
				user_show:false,
				company_options: ['文员', '技工', '管理','销售'],
				user_options: ['个人身份1', '个人身份2', '个人身份3','个人身份4'],
				companyTitle:"身份",
				userTitle:"身份"
			}
		},
		methods: {
			companyClick(e){
				let value = this.company_options[e[0]]
				this.companyTitle = value
			},
			userClick(e){
				let value = this.user_options[e[0]]
				this.userTitle = value
			},
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
		width: 100vw;
	}
	// 头像
	.cover_wrap{
		width: 100%;
		padding: 50rpx 0;
		@include  flex-center;
		.cover{
			border-radius: 50%;
			width:120rpx;
			height:120rpx
		}
	}
	// 信息
	.user_cell{
		.cell_row{
			padding: 40rpx 50rpx;
			border-bottom: 4rpx solid #e3e3e3;
			display: flex;
			.label{
				font-weight: 600;
				color: #606266;	
				padding-right: 30rpx;
				min-width: 150rpx !important;
			}
			.content{
				flex: 1;
				color: #d0d0d0;
			}
		}
		/deep/ .u-border-bottom:after, .u-border-left:after, .u-border-right:after, .u-border-top-bottom:after, .u-border-top:after, .u-border:after {
			border-bottom: 8rpx solid #e3e3e3;
		}
		/deep/ .u-cell_title{
			font-weight: 600;
			color: #606266;	
		}
	}
		
		
</style>
