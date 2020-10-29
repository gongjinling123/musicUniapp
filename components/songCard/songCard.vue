<template>
	<view class="song">
		<view class="play-title">
			<view class="play-front">
				{{blocks.uiElement.subTitle.title}}
			</view>
			<view class="play-after" @click="playAll">
				<text class="iconfont icon-arrow- iconmore"></text>
				{{blocks.uiElement.button.text}}
			</view>
		</view>
		<view class="play-body">
			<scroll-view style="width: 100%;" scroll-x="true" class="scroll-view">
				<view class="play-body-outside" v-for="(items,index) in blocks.creatives" :key='index'>
					<block v-for="(item,index) in items.resources" :key='index'>
						<view class="play-box" @click="handleItem" :data-musicid='item.resourceId'>
							<view class="play-box-image">
								<image class="play-box-img" :src="item.uiElement.image.imageUrl" mode=""></image>
							</view>
							<view class="play-box-title">
								<view class="play-box-title-top">
									<text class="play-box-first-title">{{item.uiElement.mainTitle.title}}</text>
									<text class="play-box-last-title"> -{{item.resourceExtInfo.artists[0].name}}</text>
								</view>
								<block v-if='item.uiElement.subTitle'>
									<view class="song-info">
										{{item.uiElement.subTitle.title}}
									</view>
								</block>
							</view>
							<view class="iconfont icon-bofang play-box-icon"></view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			blocks:{
				type:Object
			} 
		},
		methods:{
			playAll(){
				this.$emit('playAll6')
				this.$emit('playAll1')
			},
			handleItem(e){
				// console.log(e.currentTarget.dataset.musicid)
				this.$emit('handleItem',e.currentTarget.dataset.musicid)
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.song{
		margin-top: 30rpx;
	}
	.play-title {
		display: flex;
		justify-content: space-between;
	}
	.play-front{
		font-size: 30rpx;
	}
	.play-after {
		font-size: 24rpx;
		padding: 10rpx 20rpx;
		border-radius: 50rpx;
		border: 1rpx solid #ccc;
	}
	
	.iconmore {
		font-size: 20rpx;
	}
	
	.scroll-view {
		white-space: nowrap;
		width: 750rpx;
		margin-right: -20rpx;
	}
	
	.play-body {
		margin-top: 10rpx;
	}
	
	.play-body-outside {
		width: 95%;
		display: inline-block;
		/* border: 1rpx solid red; */
	}
	
	.play-box {
		display: flex;
		margin-top: 10rpx;
	}
	
	.play-box-image {
		width: 150rpx;
		height: 150rpx;
		/* background-color: green; */
	}
	
	.play-box-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 20rpx;
	}
	
	.play-box-title {
		width: 440rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
	}
	
	.play-box-title-top {
		/* background-color: red; */
	}
	
	.play-box-first-title {
		font-size: 30rpx;
	}
	
	.play-box-last-title {
		font-size: 24rpx;
		color: #ccc;
	}
	
	.song-info {
		font-size: 24rpx;
		color: #ccc;
	}
	
	.play-box-icon {
		width: 60rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 50rpx;
		margin: 30rpx;
	}
</style>
