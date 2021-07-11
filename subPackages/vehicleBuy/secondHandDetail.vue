<template>
<view class="container">
    <view class="userInfo_wrap">
        <view class="user_cover">
            <image :src="userCover"  />
        </view>
        <view class="user_info">
            <view>网友:{{detail.user_name}}</view>
            <view>发布于:{{detail.position}}</view>
        </view>
    </view>

    <view class="info">
        <view class="personal">{{detail.person_type_name}}</view>
        <view class="tag">{{detail.name}}</view>
    </view>
    <view class="price">
        ￥{{detail.price}}
    </view>
    <view class="detal">
        <text>{{detail.info}}</text>
    </view>
    <view class="img">
        <image :src="item.img"  v-for="(item,index) in detail.img_urls" :key="index" />
    </view>


</view>
</template>

<script>
    import API from "../../network/secondHand/secondHand"
    import userApi from "../../network/user/userApi.js"
export default {
    data() {
        return {
            pageId:'',
            detail:{},
            userCover:""
        };
    },
    onLoad(options){
        this.pageId = options.id
        this.getDetai()
    },
    methods: {
        getDetai(){
            let query = {
                id:6
            }
            
            API.detail(query).then(res=>{
                res.data.img_urls = JSON.parse( res.data.img_urls)
                this.detail = res.data

                let userQuery = {
                    id:res.data.user_id
                }
                userApi.detail(userQuery).then(res=>{
                    this.userCover = res.data.headpic_url
                })

            })
            


        }

    }
};
</script>

<style scoped lang="scss">
    .container{
        padding: 30rpx 30rpx;
        .userInfo_wrap{
            display: flex;

            .user_cover{
                @include flex-center;
                image{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                }
            }
            .user_info{
                padding: 5rpx 20rpx 5rpx  20rpx;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                view:nth-child(1){
                    color: #000;
                }
                view:nth-child(2){
                    color: #808080;
                }
            }
        }
        .info{
            display: flex;
            align-items: center;
            margin-top: 20rpx;
            flex-wrap: wrap;
            .personal{
                background-color: #ffa02e;
                border-radius: 10rpx;
                padding: 5rpx 30rpx;
                color: #ffffff;
                margin-right: 30rpx;
                margin-top: 30rpx;
            }
            .tag{
                font-size: 30rpx;
                font-weight: 600;
                margin-right: 30rpx;
                margin-left: 30rpx;
                margin-top: 30rpx;
            }
        }
        .price{
            margin-top: 20rpx;
            width: 100%;
            color: red;
            font-size: 40rpx;
            font-weight: 600;
        }
        .detal{
            margin-top: 20rpx;
            margin-bottom: 20rpx;
        }
        .img{
            @include flex-center;
            width: 100%;
            flex-wrap: wrap;
            image{
                width: 100%;
                border-radius: 10rpx;
                margin-bottom: 15rpx;
            }
        }


    }

</style>
