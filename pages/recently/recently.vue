<template>
	<view class="recontly">
		 <view class="recontly-top" @click="handleBack">
		 	<text class="iconfont icon-fanhui icon-back"></text>
			<text class="top-title">最近播放</text>
		 </view>
		 
		 <scroll-view scroll-x="true" class="recontly-nav" style="width: 100%;">
		 	<view class="nav-item">
				<view class="nav-item-title"><text>歌曲</text></view>
				<view class="nav-item-num">{{total}}</view>
			</view>
			<view class="nav-item">
				<view class="nav-item-title">直播</view>
				<view class="nav-item-num">0</view>
			</view>
			<view class="nav-item">
				<view class="nav-item-title">视频</view>
				<view class="nav-item-num">1</view>
			</view>
			<view class="nav-item">
				<view class="nav-item-title">歌单</view>
				<view class="nav-item-num">3</view>
			</view>
			<view class="nav-item">
				<view class="nav-item-title">专辑</view>
				<view class="nav-item-num">0</view>
			</view>
			<view class="nav-item">
				<view class="nav-item-title">电台</view>
				<view class="nav-item-num">0</view>
			</view>
		 </scroll-view>
		 
		 <scroll-view scroll-y="true" style="height: 100%;" class="recontly-body">
			<view class="body-top">
				<view class="top-left" @click="handleAllSong">
					<text class="iconfont icon-bofang1 icon-play"></text>
					<text class="play-all">播放全部</text>
					<text class="total">(共{{total}}首)</text>
				</view>
				<view class="top-right">
					<text class="iconfont icon-gengduo icon-more"></text>
					<text class="more-title">多选</text>
				</view>
			</view>
			<view class="body-content">
				<block v-for="(item,index) in allData" :key='index'>
					<view class="content-item" @click="handleSong" :data-songid='item.song.id' :data-singerid='item.song.ar[0].id'>
						<view class="song-info">
							<view class="song-name">
								{{item.song.name}}
								<block v-if='item.song.alia[0].length>1'>
									<text class="song-alia">({{item.song.alia[0]}})</text>
								</block>
							</view>
							<view class="singer-info">
								{{item.song.ar[0].name}} - {{item.song.al.name}}
							</view>
						</view>
						<view class="song-more" @click.stop="Delete(item.song.id)">
							<text class="iconfont icon-ziyuan1 icon-song-more"></text>
						</view>
					</view>
				</block>
			</view>
		 </scroll-view>
	</view>
</template>

<script>
	import {getRecord} from '../../service/recently.js'
	import app from '../../App.vue'
	export default{
		data(){
			return {
				allData:[],
				total:0
			}
		},
		onLoad() {
			const id=uni.getStorageSync('userId')
			console.log(id)
			this._getRecord(id,0)
		},
		methods:{
			// -----------------事件监听---------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			play(musicId){
				for(var i=0;i<this.allData.length;i++){
					app.globalData.waitForPlaying.push(this.allData[i].song.id)//等待播放的音乐
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)//在等待播放数组中删除已经播放的音乐
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`	
				})
			},
			handleSong(e){
				// console.log(e.currentTarget.dataset.songid)
				// console.log(e.currentTarget.dataset.singerid)
				const musicId=e.currentTarget.dataset.songid
				this.play(musicId)
			},
			handleAllSong(){
				const musicId=this.allData[0].song.id
				this.play(musicId)
			},
			Delete(id){
				// console.log(id)
				// console.log(app.globalData.userId)
				this._getLike(3906297049,uni.getStorageSync('login_token'))
			},
			// -----------------网络请求---------------------------
			_getRecord(uid,type){
				getRecord(uid,type).then(res=>{
					this.allData=res.data.allData
					this.total=res.data.allData.length
				})
			},
			
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.recontly-top{
		padding-top: var(--status-bar-height);
		height: 70rpx;
		line-height: 70rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 99;
	}
	.icon-back{
		font-size: 40rpx;
		padding: 0 30rpx 0 20rpx; 
	}
	.top-title{
		font-weight: 600;
	}
	.recontly-nav{
		width: 750rpx;
		white-space: nowrap;
		border-bottom: 1rpx solid #ccc;
		position: fixed;
		top: 120rpx;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 99;
	}
	.nav-item{
		width: 180rpx;
		height: 80rpx;
		display: inline-block;
	}
	.nav-item-title{
		width: 90rpx;
		height: 75rpx;
		line-height: 75rpx;
		text-align: right;
		font-size: 26rpx;
		display: inline-block;
	}
	.nav-item-title text{
		padding-bottom: 22rpx;
		border-bottom: 4rpx solid red;
		color: red;
	}
	.nav-item-num{
		width: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 18rpx;
		display: inline-block;
	}
	.recontly-body{
		padding-top: 240rpx;
	}
	.body-top{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
	}
	.icon-play{
		font-size: 40rpx;
		margin: 0 20rpx;
		vertical-align: middle;
	}
	.play-all{
		font-size: 32rpx;
		margin-right: 10rpx;
	}
	.total{
		font-size: 28rpx;
		color: #757575;
	}
	.top-right{
		width: 120rpx;
		height: 80rpx;
	}
	.icon-more{
		font-size: 30rpx;
		margin-right: 14rpx;
	}
	.more-title{
		font-size: 28rpx;
	}
	.body-content{
		margin-top: 20rpx;
	}
	.content-item{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.song-info{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.song-name{
		flex: 3;
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}
	.song-alia{
		font-size: 28rpx;
		color: #787878;
		margin-left: 10rpx;
	}
	.singer-info{
		flex: 2;
		font-size: 24rpx;
		color: #787878;
	}
	.song-more{
		width: 90rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.icon-song-more{
		font-size: 40rpx;
		color: #787878;
	}
</style>
