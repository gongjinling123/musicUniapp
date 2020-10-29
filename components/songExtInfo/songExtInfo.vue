<template>
	<view class="song">
		<view class="card-title">
			<view class="card-front">
				{{blocks.uiElement.subTitle.title}}
			</view>
			<view class="card-after" @click="handleYun">
				{{blocks.uiElement.button.text}}
			</view>
		</view>
		<view class="card-body">
			<scroll-view scroll-x="true" style="width: 100%;" class="scroll-view">
				<block v-for="(item,index) in blocks.extInfo.squareFeedViewDTOList" :key='index'>
					<view class="card-item">
						<image class="card-item-img" :src="item.resource.mlogBaseData.coverUrl"></image>
						<view class="card-item-text">
							{{item.resource.mlogBaseData.text}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			blocks: {
				type: Object
			}
		},
		methods:{
			handleYun(){
				this.$emit('handleYun')
			}
		}
	}
</script>

<style>
	.song{
		margin-top: 30rpx;
	}
	.card-title {
		display: flex;
		justify-content: space-between;
	}
	.card-front{
		font-size: 30rpx;
	}
	.card-after {
		font-size: 24rpx;
		padding: 10rpx 20rpx;
		border-radius: 50rpx;
		border: 1rpx solid #ccc;
	}
	.card-body{
		margin-top: 10rpx;
	}
	.scroll-view {
		white-space: nowrap;
		width: 750rpx;
		margin-right: -20rpx;
	}
	.card-item{
		display: inline-block; 
		width: 300rpx;
		height: 480rpx;
		margin: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: #dedede;
	}
	.card-item-img{
		width: 300rpx;
		height: 400rpx;
	}
	.card-item-text{
		padding: 0 10rpx;
		font-size: 24rpx;
		white-space:normal;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
</style>
