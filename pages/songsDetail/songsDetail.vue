<template>
	<view class="songsDetail">
		<view class="bg"></view>
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">歌单</text>
		</view>
		<view class="songs-info">
			<view class="songs-img">
				<image :src="coverImgUrl"></image>
			</view>
			<view class="songs-title">
				<view class="songs-name">{{name}}</view>
				<view class="songs-description">
					<view class="songs">{{description}}</view>
					<text class="iconfont icon-fanhui1"></text>
				</view>
			</view>
		</view>
		<view class="songs-content">
			<view class="content-top" @click="handlePlayAll">
				<text class="iconfont icon-bofang1"></text>
				<text class="playAll">播放全部</text>
				<text class="playCount">(共{{songs.length}}首)</text>
			</view>
			<view class="content-body">
				<block v-for="(item,index) in songs" :key='index'>
					<view class="content-item" @click="handlePlay(item.id)">
						<view class="item-index">{{index+1}}</view>
						<view class="item-info">
							<view class="song-name">{{item.name}}</view>
							<view class="singer">{{item.ar[0].name}} - {{item.name}}</view>
						</view>
						<view class="item-icon">
							<text class="iconfont icon-ziyuan1"></text>
						</view>
					</view>
				</block>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import {getSongsId,getSongList} from '../../service/songsList.js'
	import app from '../../App.vue'
	export default{
		data(){
			return{
				trackIds:[],
				coverImgUrl:'',
				name:'',
				description:'',
				songs:[]
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getSongsId(option.id)
		},
		methods:{
			// ----------------------------事件监听--------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handlePlay(music){
				uni.navigateTo({
					url:`/pages/play/play?music=${music}`
				})
			},
			handlePlayAll(){
				let musicId=this.songs[0].id
				for(var i=0;i<this.songs.length;i++){
					app.globalData.waitForPlaying.push(this.songs[i].id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			// ----------------------------网络请求--------------------------------
			_getSongsId(id){
				getSongsId(id).then(res=>{
					this.name=res.data.playlist.name
					this.coverImgUrl=res.data.playlist.coverImgUrl
					this.description=res.data.playlist.description
					for(var i=0;i<res.data.playlist.trackIds.length;i++){
						this.trackIds.push(res.data.playlist.trackIds[i].id)
					}
					// console.log(this.trackIds.toString(),'ddddfffffffggggggggg')
					this._getSongList(this.trackIds.toString())
				})
			},
			_getSongList(ids){
				getSongList(ids).then(res=>{
					console.log(res)
					this.songs=res.data.songs
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.songsDetail{
		width: 100%; 
		box-sizing: border-box;
		margin: 0 auto;
		position: relative;
	}
	.bg{
		width: 100%;
		height: 600rpx;
		background-color: #483C46; 
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
	.tab{
		padding-top: 50rpx;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 20rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		color: #fff;
		background-color: #483C46; 
	}
	.icon-tab{
		font-size: 50rpx;
		margin-right: 20rpx;
		vertical-align: middle;
	}
	.tab-title{
		font-size: 30rpx;
		font-weight: 600;
	}
	.songs-info{
		width: 100%;
		height: 200rpx;
		margin-top: 200rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		display: flex;
	}
	.songs-img{
		width: 200rpx;
		height: 200rpx;
	}
	.songs-img image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.songs-title{
		width: 450rpx;
		height: 200rpx;
		margin-left: 40rpx;
		/* background-color: pink; */
	}
	.songs-name{
		font-weight: 600;
		color: #fff;
	}
	.songs-description{
		width: 100%;
		/* background-color: green; */
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		color: #fff;
	}
	.songs{
		width: 400rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 20rpx;
		/* background-color: purple; */
	}
	.icon-fanhui1{
		font-size: 26rpx;
		margin-left: 20rpx;
	}
	.songs-content{
		width: 100%;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		/* background-color: green; */
		position: absolute;
		top: 250rpx;
		left: 0;
		right: 0;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}
	.content-top{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		/* background-color: purple; */
	}
	.icon-bofang1{
		font-size: 40rpx;
	}
	.playAll{
		margin-left: 20rpx;
	}
	.playCount{
		font-size: 24rpx;
		color: #9E9E9E;
	}
	.content-body{
		width: 100%;
		/* background-color: pink; */
	}
	.content-item{
		width: 100%;
		height: 100rpx;
		display: flex;
		/* background-color: red; */
		margin-bottom: 20rpx;
	}
	.item-index{
		width: 80rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #9E9E9E;
	}
	.item-info{
		width: 550rpx;
		display: flex;
		flex-direction: column;
		/* background-color: green; */
	}
	.song-name{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.singer{
		font-size: 24rpx;
		color: #9E9E9E;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.item-icon{
		width: 80rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		/* background-color: #1B1B1B; */
	}
</style>
