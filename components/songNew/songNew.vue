<template>
	<view class="song">
		<view class="play-title">
			<view class="title-front">
				<text class="first-title">新歌</text>
				<text class="line">|</text>
				<text class="last-title">新碟</text>
			</view>
			<view class="title-after" @click="handleTo">
				更多新歌 
			</view>   
		</view> 
		<view class="play-body">
			<scroll-view scroll-x="true" style="width: 100%;" class="scroll-view">
				<view class="play-body-outside" v-for="(items,index) in blocks.creatives" :key='index'>
					<block v-for="(item,index) in items.resources" :key='index'>
						<view class="play-box" @click="handlePlay(item.resourceId)">
							<view class="play-box-image">
								<image :src="item.uiElement.image.imageUrl" class="play-box-img"></image>
							</view>
							<view class="play-box-title">
								<view class="play-box-title-top">
									<text class="play-box-first-title">{{item.uiElement.mainTitle.title}}</text>
									<block v-if="item.resourceExtInfo"> 
										<text class="play-box-last-title">- {{item.resourceExtInfo.artists[0].name}}</text>
									</block>  
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
			handleTo(){
				this.$emit('handleTo')
			},
			handlePlay(id){
				this.$emit('handlePlay',id)
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.song {
		margin: 30rpx;
	}
	.play-title{
		display: flex;
		justify-content: space-between;
	}
	.title-front{
		font-size: 30rpx;
	}
	.line{
		margin: 0 20rpx;
		color: #ccc;
	}
	.last-title{
		color: #ccc;
	}
	.title-after{
		font-size: 24rpx;
		padding: 10rpx 20rpx;
		border-radius: 50rpx;
		border: 1rpx solid #ccc;
	}
	.play-body{
		margin-top: 10rpx;
	}
	.scroll-view{
		width: 750rpx;
		white-space: nowrap;
		margin-right: -20rpx;
	}
	.play-body-outside{
		width: 95%;
		display: inline-block;
	}
	.play-box{
		display: flex;
		margin-top: 10rpx;
	}
	.play-box-image{
		width: 150rpx;
		height: 150rpx;
	}
	.play-box-img{
		width: 150rpx;
		height: 150rpx;
		border-radius: 20rpx;
	}
	.play-box-title{
		width: 440rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
	}
	.play-box-first-title{
		font-size: 30rpx;
	}
	.play-box-last-title{
		font-size: 24rpx;
		color: #ccc;
	}
	.song-info{
		font-size: 24rpx;
		color: #ccc;
	}
	.play-box-icon{
		width: 60rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 50rpx;
		margin: 30rpx;
	}
</style>
