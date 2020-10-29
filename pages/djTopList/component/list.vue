<template>
	<view class="">
		<block v-for="(item,index) in topList" :key='index'>
			<view class="content-item">
				<view class="item-left" :class="index>2?'grey':'red'">
					{{index+1}}
				</view>
				<view class="item-right">
					<view class="item-img">
						<image :src="item.program.coverUrl"></image>
					</view>
					<view class="item-info">
						<view class="info-title">
							{{item.program.mainSong.name}}
						</view>
						<view class="info-user">
							<view class="user-desc">
								<view class="user-img">
									<image :src="item.program.dj.avatarUrl"></image>
								</view>
								<text>{{item.program.mainSong.artists[0].name}}</text>
							</view>
							<view class="num">
								<text class="iconfont icon-remen"></text>
								{{item.score}}
							</view>
						</view>
					</view>
					<view class="item-play">
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		props:{
			topList:{ 
				type:Array
			}
		}
	}
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");
	.content-item{
		width: 100%;
		height: 120rpx;
		/* background-color: #007AFF; */
		margin-top: 40rpx;
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
	.item-img{
		width: 120rpx;
		height: 120rpx;
	}
	.item-img image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.item-info{
		width: 450rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.info-title{
		line-height: 70rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		flex: 2;
	}
	.info-user{
		flex: 1;
		display: flex;
	}
	.user-desc{
		/* width: 200rpx; */
		margin-right: 20rpx;
		/* background-color: pink; */
		display: flex;
	}
	.user-img{
		width: 40rpx;
		height: 40rpx;
	}
	.user-desc image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user-desc text{
		max-width: 200rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 28rpx;
		color: #656565;
		margin-left: 10rpx;
	}
	.num{
		color: #656565;
		font-size: 26rpx;
		border-left: 2rpx solid #E9E9E9;
		padding-left: 30rpx;
	}
	.item-play{
		width: 90rpx;
		height: 120rpx;
		text-align: center;
		line-height: 120rpx;
	}
	.item-play text{
		font-size: 60rpx;
	}
</style>
