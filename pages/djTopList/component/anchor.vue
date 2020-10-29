<template>
	<view class="">
		<block v-for="(item,index) in popTopList" :key='index'>
			<view class="content-item">
				<view class="item-left" :class="index>2?'grey':'red'">
					{{index+1}}
				</view>
				<view class="item-right">
					<view class="item-image">
						<image :src="item.avatarUrl"></image>
					</view>
					<view class="item-name">
						{{item.nickName}}
					</view>
					<view class="item-num">
						<text class="iconfont icon-remen"></text>
						{{item.score|numScore}}万
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			popTopList:{
				type:Array
			}
		},
		filters:{
			numScore(value){
				let transformVal=Number(value/1000).toFixed(0)
				let realVal=transformVal.substring(0,transformVal.length-1)
				return Number(realVal)
			}
		},
	}
</script>

<style>
	.content-item{
		width: 100%;
		height: 120rpx;
		/* background-color: #007AFF; */
		margin-top: 20rpx;
		display: flex;
	}
	.item-left{
		width: 70rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		/* color: #FF3536; */
		font-weight: 600;
	}
	.red{
		color: red;
	}
	.grey{
		color: #929292;
	}
	.item-right{
		flex: 1;
		display: flex;
	}
	.item-image{
		width: 120rpx;
		height: 120rpx;
	}
	.item-image image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.item-name{
		width: 370rpx;
		margin-left: 20rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	
	.item-num{
		width: 150rpx;
		height: 120rpx;
		text-align: center;
		line-height: 120rpx;
		font-size: 24rpx;
		color: #969696;
	}
	
</style>
