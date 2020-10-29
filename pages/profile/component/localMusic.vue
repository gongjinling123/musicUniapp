<template>
	<view class="local-music-row">
		<view class="local-music-item">
			<text class="iconfont icon-download music-icon"></text>
			<text class="music-title">本地音乐</text>
		</view>
		<view class="local-music-item">
			<text class="iconfont icon-shangchuan music-icon"></text>
			<text class="music-title">云盘</text>
		</view>
		<view class="local-music-item">
			<text class="iconfont icon-dagou music-icon"></text>
			<text class="music-title">已购</text>
		</view>
		<view class="local-music-item" @click="recently">
			<text class="iconfont icon-bofang1 music-icon"></text>
			<text class="music-title">最近播放</text>
		</view>
		<view class="local-music-item">
			<text class="iconfont icon-guanzhu1 music-icon"></text>
			<text class="music-title">关注</text>
		</view>
		<view class="local-music-item">
			<text class="iconfont icon-guanzhu music-icon"></text>
			<text class="music-title">收藏和赞</text>
		</view>
		<view class="local-music-item">
			<text class="iconfont icon-kefu music-icon"></text>
			<text class="music-title">我的电台</text>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			recently(){
				this.$emit('recently')
			}
		}
	}
</script>

<style>
	.local-music-row{
		width: 90%;
		margin: 20rpx auto;
		padding: 20rpx 0;
		border-radius: 20rpx;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
	}
	.local-music-item{ 
		width: 24%;
		height: 150rpx;
		/* border: 1rpx solid #000; */
		vertical-align: top;
		display: flex;
		flex-direction: column;
	}
	.music-icon{
		font-size: 70rpx;
		color: #DD011C;
		flex: 3;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.music-title{
		font-size: 28rpx;
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
