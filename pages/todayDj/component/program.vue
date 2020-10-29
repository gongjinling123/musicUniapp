<template>
	<view class="program">
		<text class="title">共{{count}}期</text>
		<view class="program-body">
			<block v-for="(item,index) in programs" :key='index'>
				<view class="program-item">
					<view class="program-left">
						<view class="program-name">{{item.mainSong.name}}</view>
						<view class="program-num">
							<text class="iconfont icon-arrow- icon-program"></text>
							<text class="num">{{item.listenerCount}}</text>
						</view>
					</view>
					<view class="program-right">
						<text class="iconfont icon-ziyuan1 icon-more"></text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			count:{
				type:Number
			},
			programs:{
				type:Array
			}
		}
	}
</script>

<style>
	.title{
		margin-left: 20rpx;
		font-weight: 600;
		font-size: 36rpx;
	}
	.program-body{
		width: 100%;
		margin-top: 50rpx;
		/* background-color: red; */
	}
	.program-item{
		width: 100%;
		height: 130rpx;
		margin-top: 20rpx;
		/* background-color: pink; */
		display: flex;
		justify-content: space-between;
	}
	.program-left{
		padding-left: 20rpx;
	}
	.program-name{
		font-size: 36rpx;
		margin-top: 30rpx;
	}
	.program-num{
		color: #535353;
	}
	.icon-program{
		font-size: 28rpx;
		margin-right: 10rpx;
	}
	.num{
		font-size: 24rpx;
	}
	.program-right{
		width: 100rpx;
		height: 130rpx;
		line-height: 130rpx;
		text-align: center;
	}
	.icon-more{
		font-size: 40rpx;
	}
	
	
</style>
