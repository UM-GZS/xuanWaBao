<template>
	<view class="container">
		<view  v-for="(item,index) in addressList" :key="item.id" class="address_list" @click="clickAddressItem(item)">
			<view class="address_item">
				<view class="address_label">收货人名字:</view>
				<view class="address_content">{{item.name}}</view>
			</view>
			<view class="address_item">
				<view class="address_label">收货人电话:</view>
				<view class="address_content">{{item.phone}}</view>
			</view>
			<view class="address_item">
				<view class="address_label">收货人地址:</view>
				<view class="address_area">{{item.address}}</view>
			</view>
			<view class="btn_ctrl">
				<view class="btn_default"  @click="setDefault">
					<u-icon name="checkmark-circle-fill" color="#fddf2f" size="40" v-if="item.isDefault==1"></u-icon>
					<view class="circle" v-else></view>
					<text :class="item.isDefault==1?'active':''">设为默认</text>
				</view>
				<view class="del_edit">
					<text>删除</text>
					<text>修改</text>
				</view>
			</view>
		</view>
		<view class="bottom" @click="addAddress">
			<image src="../../static/uview/example/min_button_select.png" class="add_icon"></image>
			添加收货地址
		</view>
		
		<u-popup v-model="showAdd" mode="center" border-radius="10"  width="650rpx" height="340px" class="dialog_wrap">
			<view class="label">添加收货地址</view>
			<view class="cell_row">
				<text>收货人:</text>
				<input class="content" type="text" placeholder="请输入收货人名称" v-model="addData.name" />
			</view>
			<view class="cell_row">
				<text>联系电话:</text>
				<input class="content" type="text" placeholder="请输入收货人联系电话" v-model="addData.phone" />
			</view>
			<view class="cell_row" @click="selectAddress">
				<text>选择地区:</text>
				<text class="select_address">{{addData.address}}</text>
				<u-icon name="arrow-right" size="30" class="arrow"></u-icon>
			</view>
			<view class="cell_row">
				<text>详细地址:</text>
				<!-- <text class="select_address">{{addData.detail}}</text> -->
				<input class="content" type="text" placeholder="填写详细地址" v-model="addData.detail" />
				<view class="position" @click="clickPosition">
					<image src="../../static/user/address_position.png" ></image>
					<view>定位</view>
				</view>
			</view>
			<view class="default_set">
					<u-checkbox  v-model="addData.isDefault" shape="circle">设为默认</u-checkbox>
			</view>
			<view class="save_btn" @click="addSubmit">
				<view class="btn" hover-class="save_hover">保存</view>
			</view>
			
		</u-popup>
		
		<u-picker mode="region" v-model="addressShow" :area-code='["11", "1101", "110101"]' @confirm="fonfirmAddress"></u-picker>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[
					
						{
							id:1,
							name:'nameeee',
							phone:'nameeee',
							address:'nameeee',
							isDefault:1,
						},{
							id:2,
							name:'nameeee',
							phone:'nameeee',
							address:'nameeee',
							isDefault:0,
						},{
							id:3,
							name:'nameeee',
							phone:'nameeee',
							address:'nameeee',
							isDefault:0,
						}
				],
				showAdd:true,
				addressShow:false,// 选择地区控件显示
				addData:{
					name:"",
					phone:"",
					address:"",
					detail:"",
					isDefault:false
				},
				type:'',//页面类型
			}
		},
		onLoad(options) {
			this.type = options.type
		},
		methods: {
			// 添加地址模态框
			addAddress(){
				this.showAdd = true
			},
			clickPosition(){
				console.log('点击定位')
			},
			// 选择地址打开
			selectAddress(){
				this.addressShow = true
			},
			// 拿取选择的地址
			fonfirmAddress(e){
				this.addData.address = e.province.label + e.city.label + e.area.label
			},
			// 添加地址的提交
			addSubmit(){
				console.log(this.addData)
			},
			// 首页设为默认
			setDefault(){
				console.log('设置成默认地址')
			},
			// 点击地址项
			clickAddressItem(item){
				uni.setStorage({key: 'address',data: item})
				if(this.type==''){
					return
				}
				// uni.redirectTo({
				// 	url:""
				// })
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		// 列表
		.address_list{
			background-color: #FFFFFF;
			padding: 30rpx 80rpx;
			border-bottom: 3rpx solid #e3e3e3;
		
			.address_item {
				display: flex;
				margin: 20rpx 0;
				.address_label {
					width: 190rpx;
					font-size: 30rpx;
					font-weight: bold;
					color: #808080;
				}
				.address_area{
					flex: 1;
				}
			}
			// 按钮
			.btn_ctrl{
				@include  flex-jcsb;
				.btn_default{
					display: flex;	
					align-items: center;
				}
				.del_edit{
					text{
						padding-left: 10rpx;
						margin-left: 5rpx;
					}
				}
				.circle{
					width: 40rpx;
					height: 40rpx;
					background-color: #FFFFFF;
					border-radius: 50%;
					border: 1px solid #e3e3e3;
					margin-right: 15rpx;
				}
				.active{
					color: $page_color;
				}
			}
		}
		// 底部按钮
		.bottom{
			position: fixed;
			 bottom: 0;
			 width: 100%;
			 background-color: $page_color;
			 height: 90rpx;
			 @include flex-center;
			 .add_icon{
				 width: 40rpx;
				 height: 40rpx;
				 margin-right: 18rpx;
			 }
		}
		// 添加收货地址
		.dialog_wrap{
			padding: 20rpx;
			position: relative;
			.label{
				text-align: center;
				font-size: 30rpx;
				font-weight: 700;
				padding-top: 30rpx;
			}
			.cell_row{
				padding: 40rpx 50rpx 20rpx 50rpx;
				border-bottom: 4rpx solid #e3e3e3;
				display: flex;
				align-items: center;
				position: relative;
				text{
					font-size: 26rpx;
					color: #808080;
					width: 150rpx;
				}
				.arrow{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 20rpx;
					top: 50%;
					transform: translateY(-30%);
				}
				.select_address{
					padding-right: 20rpx;
					flex: 1;
					display: flex;
					flex-wrap: wrap;
				}
				.position{
					position: absolute;
					right: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
			.default_set{
				display: flex;
				justify-content: flex-end;
				margin-top: 20rpx;
			}
			.save_btn{
				width: 100%;
				@include  flex-center;
				position: absolute;
				bottom: 30rpx;
				.btn{
					padding: 10rpx 0;
					width: 60%;
					height: 100%;
					background-color: $page_color;
					text-align: center;
					color: #FFFFFF;
					border-radius: 10rpx;
				}
				.save_hover{
					background-color: #fde66f;
				}
			}
		}
	}
</style>
