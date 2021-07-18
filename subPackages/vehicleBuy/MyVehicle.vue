<template>
<view>
        <view class="add_btn">
            <view>添加</view>
        </view>

        <view class="list">
            <view class="item" v-for="item in vehicleList" :key="item.id">
                <view class="left">
                    <u-image width="60rpx" height="55rpx" src="/static/index/vehicle_trading.png" />
                    <view>ASD883788D3</view>
                </view>
                <view class="right" @click="editInfo(item.id)">
                    编辑
                </view>
            </view>
        </view>

        <u-popup v-model="show" class="popup_wrap" mode="center" width="90%" height="680rpx"
                closeable close-icon-pos="top-right" close-icon-size="36" border-radius="20"
                close-icon-color="#000">
			<view class="title">编辑车辆</view>

            <view class="content">
                <view class="left_label">
                    <u-image src="/static/index/vehicle_trading.png"  width="50rpx"  height="50rpx" />
                    <view>厂家型号:</view>
                </view> 
                <view class="right_info">
                    <u-input v-model="form.name" type="text" border placeholder="请输入厂家型号" 
                          :clearable="false" input-align="center" />
                </view>
            </view>

            <view class="content">
                <view class="left_label">
                    <u-image src="/static/index/vehicle_trading.png"  width="50rpx"  height="50rpx"   />
                    <view>车牌号:</view>
                </view> 
                <view class="right_info">
                    <u-input v-model="form.carNum" type="text" border placeholder="请输入车牌号" 
                            :clearable="false"  input-align="center"  />
                </view>
            </view>

            <view class="content">
                <view class="left_label">
                    <u-image src="/static/index/vehicle_trading.png"  width="50rpx"  height="50rpx" />
                    <view>购买时间:</view>
                </view> 
                <view class="right_info">
                    <u-input v-model="form.buyTime" type="select" border placeholder="请选择时间"
                        input-align="center" 
                        @click="buyTimeShow=true" />
                </view>
            </view>

            <view class="content">
                <view class="left_label">
                    <u-image src="/static/index/vehicle_trading.png"  width="50rpx"  height="50rpx"  input-align="center"  />
                    <view>保养时间:</view>
                </view> 
                <view class="right_info">
                    <u-input v-model="form.upkeepTime" type="select" border placeholder="请选择时间"
                        input-align="center" 
                        @click="upkeepTimeShow=true"     />
                </view>
            </view>
            
            <view class="btn_ctrl" >
                <view class="text" @click="submit">保存</view>
            </view>

		</u-popup>

        <u-picker v-model="buyTimeShow" mode="time" :params="params" @confirm="handelBuyTime"></u-picker>
        <u-picker v-model="upkeepTimeShow" mode="time" :params="params" @confirm="handelUpkeepTime"> </u-picker>


</view>
</template>

<script>
export default {

    data() {
        return {
            vehicleList:[],
            show:false,
            form:{
                name:'',
                carNum:'',
                buyTime:'',
                upkeepTime:''
            },
            itemId:-1, // 记录当前选择的id
            buyTimeShow:false,// 购买时间
            upkeepTimeShow:false,// 保养时间
            // 时间选择控件的年月日时分秒属性
            params: {
                year: true,
                month: true,
                day: true,
                hour: false,
                minute: false,
                second: false
            },

        };
    },
    onLoad(){
        this.getList()
    },
    methods: {
        getList(){
            let list = [{},{},{},{}]
            this.vehicleList = list
        },
        editInfo(id){
            this.itemId = id
            this.show = true
        },
        submit(){
            let data = this.form
            if(!data.name){
                this.$u.toast("请输入厂家型号")
                return
            }
            if(!data.carNum){
                this.$u.toast("请输入车牌号")
                return
            }
            if(!data.buyTime){
                this.$u.toast("请选择购买时间")
                return
            }
            if(!data.upkeepTime){
                this.$u.toast("请选择保养时间")
                return
            }
            console.log(data);
        },
        handelBuyTime(e){
            this.form.buyTime = e.year+"--"+e.month+"--"+e.day
        },
        handelUpkeepTime(e){
            this.form.upkeepTime = e.year+"--"+e.month+"--"+e.day
        }



    }
};
</script>

<style scoped lang="scss">
    .add_btn{
        width: 100%;
        background-color: #fff;
        @include flex-center;
        border-bottom: 2rpx solid #cccccc;
        padding: 30rpx 0;
        view{
            width: 150rpx;
            padding: 7rpx 0;
            background-color: $page_color;
            text-align: center;
            border-radius: 5rpx;
            color: #fff;
        }
    }
    .list{
        background-color: #fff;
        .item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40rpx 30rpx 30rpx 30rpx ;
            border-bottom: 2rpx  solid #cccccc;
            .left{
                display: flex;
                align-items: center;
                view{
                    margin-left: 20rpx;
                    color: #000;
                    font-weight: 600;
                    font-size: 30rpx;
                }
            }
            .right{
                padding: 8rpx 20rpx;
                background-color: #cccccc;
                border-radius: 10rpx;
                color: #FFFFFF;
            }
        }
    }
    .popup_wrap{
        .title{
            width: 100%;
            text-align: center;
            font-size:34rpx;
            font-weight: 600;
            padding: 50rpx 0 40rpx 0;
        }
        .content{
            display: flex;
            align-items: center;
            margin: 15rpx 40rpx;
            padding-left: 10rpx;
            justify-content: space-between;
            .left_label{
                display: flex;
                align-items: center;
                view{
                    font-size: 28rpx;
                    color: #000;
                    margin-left: 15rpx;
                }
            }
            .right_info{
                width: 340rpx !important;
            }
            
        }
        .btn_ctrl {
            margin-top: 20rpx;
			height: 150rpx;
			width: 100%;
			@include flex-center;
            background-color: #fff;
			.text {
				width: 80%;
				background-color: $page_color;
				@include flex-center;
                font-size: 34rpx;
                padding: 10rpx 0;
				font-weight: 600;
				color: #ffffff;
				border-radius: 15rpx;
			}
		}



    }




</style>
