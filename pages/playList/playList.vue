<template>
	<view class="playList">
		<view class="tab">
			<view class="tab-back" @click="handleBack">
				<text class="iconfont icon-fanhui icon-tab"></text>
				<text class="tab-title">{{name}}</text>
			</view>
			<view class="bg-img">
				<image :src="coverImgUrl" mode=""></image>
			</view>
			<view class="song-count">
				<view class="count-item">
					<text class="iconfont icon-pinglun1 item-icon"></text>
					<text class="item-title">{{commentCount|numScore}}万</text>
				</view>
				<view class="count-item">
					<text class="iconfont icon-fenxiang item-icon"></text>
					<text class="item-title">{{shareCount}}</text>
				</view>
				<view class="count-item">
					<text class="iconfont icon-download item-icon"></text>
					<text class="item-title">下载</text>
				</view>
			</view>
		</view>
		<view class="playList-body">
			<view class="play-all-row">
				<view class="play-all" @click="playAll">
					<text class="iconfont icon-bofang1 icon-play"></text>
					<text class="title">播放全部</text>
					<text class="total">(共{{trackCount}}首)</text>
				</view>
				<view class="collect">
					<text>+ 收藏（{{subscribedCount|numScore}}万）</text>
				</view>
			</view>
			<view class="play-songs">
				
				<block v-for="(item,index) in tracks" :key='index'>
					<view class="songs-item" :data-id='item.id' @click="handleSongs">
						<view class="songs-index" :class="index<3?'hotTop1':'hotTop2'">
							{{index+1}}
						</view>
						<view class="songs-info">
							<view class="songs-name">
								{{item.name}}
							</view>
							<view class="singer">
								{{item.ar[0].name}}-{{item.name}}
							</view>
						</view>
						<view class="songs-play">
							<text class="iconfont icon-ziyuan1"></text>
						</view>
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {getPlayList} from '../../service/playList.js'
	import app from '../../App.vue'
	export default{
		data(){ 
			return{
				tracks:[],//排行的歌曲
				name:'',//标题
				trackCount:0,//歌曲数量
				shareCount:0,//分享数量
				commentCount:0,//评论量
				coverImgUrl:'',//背景
				subscribedCount:'',//收藏
			}
		},
		onLoad(option) {
			// console.log(option)
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getPlayList(option.id)
			// this._getPlayList(19723756)
		},
		filters:{
			numScore(value){
				let transformVal=Number(value/10000).toFixed(1)
				return Number(transformVal)
			}
		},
		methods:{
			// -----------------------事件监听-------------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handleSongs(e){
				let musicId=e.currentTarget.dataset.id
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			playAll(){
				let musicId=this.tracks[0].id
				for(var i=0;i<this.tracks.length;i++){
					app.globalData.waitForPlaying.push(this.tracks[i].id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)//在等待播放数组中删除已经播放的音乐
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			// -----------------------网络请求-------------------------------------
			_getPlayList(id){
				getPlayList(id).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.tracks=res.data.playlist.tracks
					this.name=res.data.playlist.name
					this.trackCount=res.data.playlist.trackCount
					this.shareCount=res.data.playlist.shareCount
					this.commentCount=res.data.playlist.commentCount
					this.coverImgUrl=res.data.playlist.coverImgUrl
					this.subscribedCount=res.data.playlist.subscribedCount
					// console.log(this.tracks,this.name,this.trackCount,this.shareCount,this.commentCount,this.coverImgUrl)
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.tab{
		width: 100%;
		height: 500rpx;
		position: relative;
	}
	.tab-back{
		width: 100%;
		height: 100rpx;
		line-height: 120rpx;
		padding-left: 20rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		font-weight: 600;
		/* background-color: #fff; */
	}
	.tab-title{
		margin-left: 15rpx;
		font-size: 30rpx;
	}
	.bg-img{
		width: 100%;
		height: 500rpx;
	}
	.bg-img image{
		width: 100%;
		height: 100%;
	}
	.song-count{
		width: 60%;
		height: 100rpx;
		position: absolute;
		left: 50rpx;
		bottom: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.count-item{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.item-icon{
		font-size: 40rpx;
	}
	.item-title{
		font-size: 28rpx;
	}
	.playList-body{
		width: 100%;
		background-color: #F0F0F0;
		position: absolute;
		top: 450rpx;
		left: 0;
		right: 0;
		border-radius: 30rpx 30rpx 0 0;
	}
	.play-all-row{
		width: 96%;
		height: 80rpx;
		/* background-color: pink; */
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.play-all{
		color: #252525;
	}
	.icon-play{
		margin-right: 20rpx;
		font-size: 40rpx;
		vertical-align: middle;
	}
	.title{
		font-size: 24rpx;
	}
	.total{
		font-size: 24rpx;
		color: #888888;
	}
	.collect{
		width: 300rpx;
		font-size: 22rpx;
		/* background-color: purple; */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.collect text{
		padding: 10rpx 20rpx;
		border-radius: 50rpx;
		color: #fff;
		background-color: red;
	}
	.play-songs{
		width: 96%;
		/* background-color: pink; */
		margin: 0 auto;
	}
	.songs-item{
		width: 100%;
		height: 100rpx;
		/* background-color: red; */
		display: flex;
		margin-bottom: 20rpx;
	}
	.songs-index{
		width: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: purple; */
	}
	.hotTop1{
		color: #EA6B63;
		font-weight: 600;
	}
	.hotTop2{
		color: #838383;
	}
	.songs-info{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* background-color: #008000; */
	}
	.songs-name{
		width: 520rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #292929;
		font-size: 28rpx;
	}
	.singer{
		width: 520rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #7F7F7F;
		font-size: 26rpx;
	}
	.songs-play{
		width: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: #007AFF; */
	}
	.songs-play text{
		font-size: 40rpx;
	}
</style>
