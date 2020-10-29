<template>
	<view class="follows">
		<view class="follows-top" @click="handleBack">
			<text class="iconfont icon-fanhui icon-back"></text>
			<text class="top-title">关注</text>
		</view>
		<view class="follows-body">
			<block v-for="(item,index) in follow" :key='index'>
				<view class="follows-item">
					<view class="item-img">
						<image :src="item.avatarUrl"></image>
					</view>
					<view class="item-nickname">
						{{item.nickname}}
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {getFollows} from '../../service/follows.js'
	export default{
		data(){
			return {
				follow:[]
			}
		},
		onLoad() {
			this._getFollows(uni.getStorageSync('userId'))
		},
		methods:{
			// ------------------事件监听--------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			// ------------------网络请求--------------------------
			_getFollows(uid){
				getFollows(uid).then(res=>{
					console.log(res)
					this.follow=res.data.follow 
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.follows{
		width: 100%;
		height: 900rpx;
		
	}
	.follows-top{
		padding-top: var(--status-bar-height);
		height: 70rpx;
		line-height: 70rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		/* background-color: #334142; */
		z-index: 99;
	}
	.icon-back{
		font-size: 40rpx;
		padding: 0 30rpx 0 20rpx; 
	}
	.top-title{
		font-weight: 600;
	}
	.follows-body{
		width: 100%;
		margin-top: 150rpx;
		/* background-color: red; */
	}
	.follows-item{
		width: 100%;
		height: 130rpx;
		padding-left: 20rpx;
		display: flex;
		align-items: center;
	}
	.item-img{
		width: 90rpx;
		height: 90rpx;
	}
	.item-img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.item-nickname{
		flex: 1;
		height: 100%;
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #ccc;
	}
</style>
