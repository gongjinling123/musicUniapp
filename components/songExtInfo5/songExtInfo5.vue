<template>
	<view class="song">
		<view class="select-title">
			<view class="title-front">
				{{blocks.uiElement.subTitle.title}}
			</view>
			<view class="title-after" @click="handleSongList">
				{{blocks.uiElement.button.text}}
			</view>
		</view>
		<view class="select-body">
			<scroll-view scroll-x="true" style="width: 100%;" class="scroll-view">
				<block v-for="(item,index) in blocks.extInfo">
					<view class="select-box">
						<image :src="item.verticalCover" class="box-img"></image>
						<view class="box-title">{{item.title}}</view>
					</view>
				</block>
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
			handleSongList(){
				this.$emit('handleSongList')
			}
		}
	}
</script>

<style>
	.song{
		margin-top: 30rpx;
	}
	.select-title {
		display: flex;
		justify-content: space-between;
	}
	.title-front{
		font-size: 30rpx;
	}
	.title-after {
		font-size: 24rpx;
		padding: 10rpx 20rpx;
		border-radius: 50rpx;
		border: 1rpx solid #ccc;
	}
	
	.select-body {
		margin-top: 10rpx;
	}
	.scroll-view{
		width: 750rpx;
		white-space: nowrap;
		margin-right: 20rpx;
	}
	.select-box{
		display: inline-block;
		width: 200rpx;
		height: 300rpx;
		margin-right: 20rpx;
		vertical-align: middle;
	}
	.box-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	
	.box-title {
		display: block;
		width: 200rpx;
		font-size: 24rpx;
		white-space: pre-line;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
