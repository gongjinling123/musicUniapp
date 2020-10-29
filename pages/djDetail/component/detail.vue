<template>
	<view class="dj-user">
		<view class="dj-user">
			<view class="user-job">
				主播
			</view>
			 <view class="user-row">
				<view class="user-avatar">
				 	<image :src="avatarUrl" mode=""></image>
				</view>
				<view class="user-info">
					<view class="user-name">
						{{nickname}}
					</view>
					<view class="user-desc">
						网易音乐人
					</view>
				</view>
				<view class="appreciate">
					<view class="appreciate-box">
						<text>赞赏</text>
					</view>
				</view>
			 </view> 
		</view>
		<view class="dj-info">
			<text class="dj-title">电台内容简介</text>
			<view class="dj-category">
				分类：<text>{{category}}</text>
			</view>
			<view class="dj-desc">
				<text>{{desc}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			avatarUrl:{
				type:String
			},
			nickname:{
				type:String
			},
			category:{
				type:String
			},
			desc:{
				type:String
			}
		}
	}
</script>

<style>
	.user-job{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 20rpx;
		font-weight: 600;
	}
	.user-row{
		width: 100%;
		height: 100rpx;
		display: flex;
	}
	.user-avatar{
		width: 100rpx;
		height: 100rpx;
		margin-left: 20rpx;
	}
	.user-avatar image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user-info{
		flex: 1;
		margin-left: 20rpx;
	}
	.user-name{
		font-size: 34rpx;
	}
	.user-desc{
		font-size: 24rpx;
		color: #ccc;
	}
	.appreciate{
		width: 150rpx;
		height: 100rpx;
		padding-right: 20rpx;
		/* background-color: red; */
	}
	.appreciate-box{
		width: 130rpx;
		height: 45rpx;
		border-radius: 50rpx;
		margin-top: 20rpx;
		text-align: center;
		border: 2rpx solid red;
		color: red;
	}
	.appreciate-box text{
		font-size: 24rpx;
	}
	.dj-info{
		width: 100%;
		height: 400rpx;
		margin-top: 30rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		/* background-color: red; */
	}
	.dj-title{
		font-weight: 600;
	}
	.dj-category{
		font-size: 28rpx;
		color: #ccc;
		margin-top: 20rpx;
	}
	.dj-category text{
		font-size: 20rpx;
		padding: 0 8rpx;
		color: red;
		border: 1rpx solid red;
		border-radius: 8rpx;
	}
	.dj-desc{
		margin-top: 20rpx;
	}
	.dj-desc text{
		font-size: 28rpx;
		color: #ccc;
	}
</style>
