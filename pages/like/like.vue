<template>
	<view class="like">
		<view class="recontly-top" @click="handleBack">
			<text class="iconfont icon-fanhui icon-back"></text>
			<text class="top-title">歌单</text>
		</view>
		<view class="user">
			<view class="title">
				我喜欢的音乐
			</view>
			<view class="user-info">
				<view class="user-img">
					<image :src="avatarUrl" mode=""></image>
				</view>
				<view class="user-name">
					{{nickname}}
				</view>
			</view>
		</view>
		<view class="like-body">
			<view class="content-top" @click="handlePlayAll">
				<text class="iconfont icon-bofang1 icon-playall"></text>
				<text class="playall-title">播放全部</text>
				<text class="count">(共{{count}}首)</text>
			</view>
			
			<view class="content-body">
				<block v-for="(item,index) in likeSongs" :key='index'>
					<view class="like-item" @click="handleItem(item.id)">
						<view class="like-index">{{index+1}}</view>
						<view class="song-info">
							<view class="song-name">{{item.name}}</view>
							<view class="singer">
								<text>{{item.ar[0].name}} - {{item.al.name}}</text>
							</view>
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
	import app from '../../App.vue'
	import {getLike,getSongDetail} from '../../service/like.js'
	import {getUserDetail} from '../../service/profile.js'
	export default {
		data(){
			return {
				likeSongs:[],
				userId:'',
				avatarUrl:'',
				nickname:'',
				count:0
			}
		},
		onLoad() {
			this.userId=uni.getStorageSync('userId')
			console.log(this.userId)
			this._getUserDetail(this.userId)
			this._getLike(app.globalData.userId,uni.getStorageSync('login_token'))
		},
		methods:{
			//----------------------------事件监听-----------------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleItem(musicid){
				console.log(musicid)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicid}`
				})
			},
			handlePlayAll(){
				const musicId=this.likeSongs[0].id
				for(var i=0;i<this.likeSongs.length;i++){
					app.globalData.waitForPlaying.push(this.likeSongs[i].id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			//----------------------------网络请求-----------------------------------------
			// 获取用户详情
			_getUserDetail(uid){
				getUserDetail(uid).then(res=>{
					console.log(res)
					this.avatarUrl=res.data.profile.avatarUrl
					this.nickname=res.data.profile.nickname
				}).catch(err=>{
					console.log(err)
				})
			},
			//喜欢的歌单（请求的是歌单的id）
			_getLike(id,cookie){
				getLike(id,cookie).then(res=>{
					this.count=res.data.ids.length
					// console.log(res.data.ids.toString(),'喜欢歌单')
					this._getSongDetail(res.data.ids.toString())
				})
			},
			_getSongDetail(ids){
				getSongDetail(ids).then(res=>{
					console.log(res)
					this.likeSongs=res.data.songs
					console.log(this.likeSongs)
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.like{
		/* padding: 20rpx; */
		height: 400rpx;
		background-color: #334142;
		color: #fff;
	}
	.recontly-top{
		padding-top: var(--status-bar-height);
		height: 70rpx;
		line-height: 70rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #334142;
		z-index: 99;
	}
	.icon-back{
		font-size: 40rpx;
		padding: 0 30rpx 0 20rpx; 
	}
	.top-title{
		font-weight: 600;
	}
	.user{
		margin: 120rpx 30rpx 0;
		padding: 20rpx;
	}
	.title{
		font-size: 38rpx;
		font-weight: 600;
	}
	.user-info{
		margin-top: 20rpx;
		display: flex;
	}
	.user-img{
		width: 90rpx;
		height: 90rpx;
	}
	.user-img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user-name{
		margin-left: 30rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}
	.like-body{
		width: 100%;
		height: 800rpx;
		margin-top: 40rpx;
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
		padding: 20rpx;
		box-sizing: border-box;
		color: #333;
	}
	.content-top{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
	}
	.icon-playall{
		font-size: 40rpx;
		vertical-align: middle;
	}
	.playall-title{
		margin-left: 10rpx;
	}
	.count{
		font-size: 28rpx;
		color: #939393;
		margin-left: 6rpx;
	}
	.content-body{
		/* background-color: #007AFF; */
		width: 100%;
	}
	.like-item{
		width: 100%;
		height: 120rpx;
		display: flex;
		/* background-color: #008000; */
	}
	.like-index{
		width: 90rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		color: #999999;
		/* background-color: pink; */
	}
	.song-info{
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.singer{
		font-size: 24rpx;
		color: #999999;
	}
	.item-icon{
		width: 90rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		/* background-color: purple; */
	}
	.item-icon text{
		font-size: 60rpx;
		color: #999999;
	}
</style>
