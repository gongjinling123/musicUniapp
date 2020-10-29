<template>
	<view class="djPay">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">付费精品</text>
		</view>
		<view class="djPay-content">
			<block v-for="(item,index) in list" :key='index'>
				<view class="djPay-item">
					<view class="djPay-img">
						<image :src="item.picUrl"></image>
					</view>
					<view class="djPay-info">
						<view class="djPay-name">
							{{item.name}}
						</view>
						<view class="djPay-desc">
							<text>{{item.rcmText}}</text>
							<text>最新上架</text>
						</view>
						<view class="djPay-price">
							<text v-if="item.originalPrice/100>1">￥{{item.originalPrice/100}}</text>
							<text v-else>￥{{item.originalPrice/100}}/期</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {getPay} from '../../service/dj.js'
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this._getPay()
		},
		methods:{
			// --------------事件监听-------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// --------------网络请求-------------------------
			_getPay(){
				getPay().then(res=>{
					console.log(res)
					this.list=res.data.data.list
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.tab{
		padding-top: 50rpx;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		position: fixed;
		top: 0;
		left: 20rpx;
		right: 0;
		z-index: 99;
		background-color: #fff;
	}
	.icon-tab{
		font-size: 50rpx;
		margin-right: 20rpx;
		vertical-align: middle;
	}
	.tab-title{
		font-size: 30rpx;
		font-weight: 600;
	}
	.djPay-content{
		width: 100%;
		margin-top: 160rpx;
	}
	.djPay-item{
		width: 100%;
		height: 250rpx;
		margin-top: 20rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		/* background-color: #007AFF; */
		display: flex;
	}
	.djPay-img{
		width: 250rpx;
		height: 250rpx;
		/* background-color: #008000; */
	}
	.djPay-img image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.djPay-info{
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.djPay-name{
		flex: 2;
		display: flex;
		align-items: center;
		font-size: 36rpx;
		font-weight: 600;
		/* background-color: purple; */
	}
	.djPay-desc{
		flex: 3;
		font-size: 28rpx;
		color: #8C8C8C;
		display: flex;
		justify-content: center;
		flex-direction: column;
		/* background-color: pink; */
	}
	.djPay-price{
		flex: 2;
		font-size: 36rpx;
		color: #ED2D41;
		/* background-color: green; */
	}
</style>
