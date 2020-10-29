<template>
	<view class="rankList">
		<view class="rankList-head" @click="handleBack">
			<text class="iconfont icon-fanhui"></text>
			<text class="rankList-title">排行榜</text>
		</view>
		<view class="rankList-body">
			<block v-for="(item,index) in list" :key='index'>
				<view class="rankList-item" @click="handlePlayList(item.id)">
					<view class="rankList-img">
						<image :src="item.coverImgUrl"></image>
					</view>
					<view class="rankList-info">
						<view class="listname">{{item.name}}</view>
						<view class="desc">{{item.description}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>
  
<script>
	import {getTopList} from '../../service/rankList.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this._getTopList()
		},
		methods:{
			// ----------------------------事件监听-------------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handlePlayList(id){
				uni.navigateTo({
					url:`/pages/playList/playList?id=${id}`
				})
			},
			// ----------------------------网络请求-------------------------------------
			_getTopList(){
				getTopList().then(res=>{
					console.log(res)
					this.list=res.data.list
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.song-rankList-row {
		width: 90%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		background-color: #fff;
	}

	.rankList-head {
		height: 90rpx;
		line-height: 90rpx;
		padding: 10rpx 30rpx 0;
		background-color: #fff; 
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}  
	
	.rankList-title {
		font-size: 32rpx;
		font-weight: 900; 
	}

	.icon-fanhui {
		font-size: 40rpx;
	}

	.rankList-body {
		margin-top: 100rpx;
	}

	.rankList-item {
		height: 150rpx;
		/* border: 1px solid green; */
		margin-bottom: 10rpx;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		display: flex;
	}

	.rankList-img {
		width: 120rpx;
		height: 120rpx;
	}

	.rankList-img image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
	}

	.rankList-info {
		height: 90rpx;
		margin: 15rpx 20rpx;
	}

	.listname {
		width: 480rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 34rpx;
	}

	.desc {
		width: 520rpx;
		font-size: 30rpx;
		color: #ccc;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
