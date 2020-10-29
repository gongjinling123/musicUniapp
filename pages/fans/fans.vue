<template>
	<view class="fans">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">粉丝</text>
		</view>
		<view class="fans-body">
			123
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad() {
			
		},
		methods:{
			// -----------------------事件监听--------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			}
			// -----------------------网络请求--------------------------------
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.fans{
		width: 100%; 
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #F5F5F5; 
	}
	.tab{
		padding-top: 50rpx;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 20rpx;
		position: fixed;
		top: 0;
		left: 0;
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
	.fans-body{
		width: 100%;
		height: 900rpx;
		margin-top: 150rpx;
		background-color: red;
	}
</style>
