<template>
	<view class="banner">
		 <swiper circular='true'
		 		class="swiper-banner"
		 		:indicator-dots="true" 
		 		:autoplay="true" 
		 		:interval="3000" 
		 		:duration="1000">
		 	<block v-for="(item,index) in banner" :key='index'>
		 		<swiper-item>
		 			<view class="swiper-item">
		 				<image :src="item.imageUrl" mode="widthFix" class="banners-image"></image>
		 				<view class="banners-title" :style="{'background-color':item.titleColor}">
		 					{{item.typeTitle}}
		 				</view>
		 			</view>
		 		</swiper-item> 
		 	</block> 
		 </swiper>
	</view> 
</template>

<script>
	export default{
		props:{
			banner:{
				type:Array
			}
		}
	}
</script>

<style>
	.banner{
		margin-top: 180rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}
	.swiper-banner {
		height: 250rpx;
		border-radius: 15rpx;
		overflow: hidden;
		position: relative;
	}
	
	.banners-image {
		width: 100%;
	}
	
	.banners-title {
		position: absolute;
		right: 2rpx;
		bottom: 1rpx;
		font-size: 22rpx;
		padding: 6rpx;
		color: #fff;
		border-radius: 6rpx;
	}
</style>
