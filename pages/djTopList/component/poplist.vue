<template>
	<view class="hours">  
		<view class="hours-body">
			<block v-for="(item,index) in poplist" :key='index'>
				<block v-if="index<3">
					<view class="hours-item">
						<view class="item-img">
							<image :src="item.avatarUrl"></image>
						</view>
						<view class="item-title">{{item.nickName}}</view>
						<view class="item-num">
							<text class="iconfont icon-remen"></text>
							{{item.score|numScore}}万
						</view>
					</view>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			poplist:{
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
	.hours{
		width: 100%;
		margin-top: 20rpx;
		padding-bottom: 30rpx;
		border-bottom: 10rpx solid #F4F4F4;
	}
	
	.hours-body{
		display: flex;
		justify-content: space-between;
	}
	.hours-item{
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		/* border: 1px solid #007AFF; */
	}
	.item-img{
		width: 200rpx;
		height: 200rpx;
		
	}
	.item-img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.item-title{
		width: 200rpx;
		margin-top: 8rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 24rpx;
		color: #212121;
		text-align: center;
	}
	.item-num{
		width: 200rpx;
		height: 50rpx;
		margin-top: 10rpx;
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		color: #969696;
		
	}
	.item-num text{
		margin-right: 8rpx;
	}
</style>
