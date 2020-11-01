<template>
	<view class="recommend">
		<view class="recommend-head">
			<image :src="dailySongs[0].al.picUrl" mode=""></image>
			<view class="head-icon" @click="handleback">
				<text class="iconfont icon-fanhui"></text>
				<text class="iconfont icon-iconset0143"></text>
			</view>
			<view class="recommend-time">
				<text class="day">{{day}}</text>
				<text class="month">/{{month}}</text>
			</view>   
			<view class="recommend-history">
				历史日推
			</view>
		</view>
		<view class="recommend-body">
			<view class="body-top">
				<view class="top-left" @click="playAll">
					<text class="iconfont icon-bofang1 icon-play"></text>
					<text class="playAll">播放全部</text>
				</view>
				<view class="top-right">
					<text class="iconfont icon-gengduo icon-more"></text>
					<text class="more">多选</text>
				</view>
			</view>
			<view class="body-content">
				<block v-for="(item,index) in dailySongs" :key='index'>
					<view class="song-item" @click="handlePlay" :data-musicid='item.id'>
						<view class="song-img">
							<image :src="item.al.picUrl"></image>
						</view>
						<view class="song-info">
							<view class="song-name">
								{{item.name}}
								<block v-if='item.alia[0].length>1'>
									<text class="song-alia">({{item.alia[0]}})</text>
								</block>
							</view>
							<view class="singer-desc">
								{{item.ar[0].name}} - {{item.al.name}}
							</view>
						</view>
						<view class="song-more">
							<text class="iconfont icon-ziyuan1"></text>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {getRecommend} from '../../service/recommend.js'
	import app from '../../App.vue'
	export default{
		data(){
			return {
				month:1,
				day:1,
				dailySongs:[]
			}
		},
		onLoad() {
			const cookie=uni.getStorageSync('login_token')
			this.verification()
		},
		methods:{
			// ----------------事件监听--------------------------
			//验证用户是否登录
			verification(){
				let login_token=uni.getStorageSync('login_token')
				if(login_token==''){
					uni.showModal({
						content:'未登录',
						confirmColor:'去登陆',
						cancelColor:'#de655c',
						confirmColor:'#de655c',
						showCancel:true,
						cancelText:'取消',
						success(res) {
							if(res.confirm){
								uni.navigateTo({
									url:'/pages/login/login'
								})
							}else if(res.cancel){
								uni.navigateTo({
									url:'/pages/find/find'
								})
								app.globalData.navId=2
							}
						}
					})
				}else{ 
					this.userId=app.globalData.userId
					this.login_token=login_token
					this._getRecommend(cookie)
					this.getDate()
				}
			},
			handleback(){
				uni.navigateBack({
					delta:1
				})
			},
			getDate(){
				const date=new Date()
				const month=date.getMonth()+1
				const day=date.getDate()
				
				this.month=month>9?month:'0'+month
				this.day=day>9?day:'0'+day
			},
			play(musicId){
				for(var i=0;i<this.dailySongs.length;i++){
					app.globalData.waitForPlaying.push(this.dailySongs[i].id)//等待播放的音乐
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)//在等待播放数组中删除已经播放的音乐 
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`	
				})
			},
			handlePlay(e){
				const musicId=e.currentTarget.dataset.musicid 
				// console.log(e.currentTarget.dataset.musicid)
				this.play(musicId)
			},
			playAll(){
				const musicId=this.dailySongs[0].id
				console.log(musicId)
				this.play(musicId)
			},
			// ----------------网络请求--------------------------
			_getRecommend(cookie){
				getRecommend(cookie).then(res=>{
					console.log(res,'dddddddddddd')
					this.dailySongs=res.data.data.dailySongs
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.recommend{
		position: relative;
	}
	.recommend-head{
		width: 100%;
		height: 350rpx;
		/* background-color: pink; */
	}
	.recommend-head image{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
		margin-top: 70rpx;
	}
	.head-icon{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding-top: var(--status-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		background-color: #fff; 
		z-index: 9;
	}
	.head-icon text{
		width: 60rpx;
		height: 80rpx;
		font-size: 40rpx;
		text-align: center;
	}
	.recommend-time{
		margin: 60rpx 20rpx 0;
	}
	.month{
		color: #fff;
	}
	.day{
		font-size: 68rpx;
		color: #fff;
		font-weight: 400;
	}
	.recommend-history{
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 24rpx;
		margin: 10rpx 10rpx 0;
		background-color: rgba(255,255,255,.6);
		border-radius: 50rpx;
	}
	.recommend-body{
		width: 100%;
		height: 800rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
		position: absolute;
		top: 380rpx;
		left: 0;
		right: 0;
	}
	.body-top{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.top-left{
		width: 250rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.icon-play{
		font-size: 40rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}
	.playAll{
		font-size: 28rpx;
	}
	.top-right{
		width: 150rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.icon-more{
		font-size: 40rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}
	.more{
		font-size: 28rpx;
	}
	.body-content{
		margin-top: 20rpx;
		padding: 0 20rpx;
	}
	.song-item{
		width: 100%;
		height: 100rpx;
		display: flex;
		margin-top: 20rpx;
	}
	.song-img{
		width: 100rpx;
		height: 100rpx;
		/* background-color: red; */
	}
	.song-img image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.song-info{
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.song-alia{
		font-size: 28rpx;
		color: #787878;
		margin-left: 10rpx;
	}
	.song-name{
		flex: 3;
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}
	.singer-desc{
		flex: 2;
		font-size: 24rpx;
		color: #787878;
	}
	.song-more{
		height: 100rpx;
		line-height: 100rpx;
	}
	.song-more text{
		font-size: 40rpx;
	}
</style>
