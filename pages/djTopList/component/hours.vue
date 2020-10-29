<template>
	<view class="hours">
		<tab>
			<view slot='title'>24小时榜</view>
		</tab>
		<view class="hours-body">
			<block v-for="(item,index) in hoursProgram" :key='index'>
				<block v-if="index<3">
					<view class="hours-item">
						<view class="item-img">
							<image :src="item.program.coverUrl"></image>
						</view>
						<view class="item-title">{{item.program.mainSong.name}}</view>
					</view>
				</block>
			</block>
		</view>
	</view>
</template>
 
<script>
	import tab from './tab.vue'
	export default{
		props:{
			hoursProgram:{
				type:Array
			}
		},
		components:{
			tab
		}
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
		border-radius: 10rpx;
	}
	.item-title{
		width: 200rpx;
		margin-top: 8rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 24rpx;
		color: #212121;
	}
	
</style>
