<template>
	<view class="profile">
		<tab @tabItem='tabItem' @handleSearch='handleSearch' :currentIndex='currentIndex'/>
		<!-- 用户信息 -->
		<view class="user-row"> 
			<view class="avatar">
				<image :src="avatarUrl"></image>
			</view>
			<view class="user-name">{{nickname}}</view> 
			<view class="user-datail" @click="handleUserDetail">
				<text class="iconfont icon-fanhui1 "></text>
			</view>
		</view>
		<!-- 我喜欢的音乐 -->
		<view class="like" @click="handleLike">
			<view class="like-img">
				<text class="iconfont icon-shoucang"></text>
			</view>
			<view class="like-title">
				<text>我喜欢的音乐</text>
				<text>{{count}}首</text>
			</view>
		</view>
		<!-- 本地音乐 -->
		<view class="local-music-row">
			<local-music @recently='recently'></local-music>
		</view>
		<!-- 推荐歌单 -->
		<view class="song-recommend-row">
			<song-recommend></song-recommend>
		</view>
		
	</view>
</template>

<script>

	import {getUserDetail,getUserPlayList,getLike} from '../../service/profile.js'
	import app from '../../App.vue'
	
	import tab from '../../components/tab/tab.vue'
	
	import localMusic from './component/localMusic.vue'
	import songRecommend from './component/songRecommend.vue'

	export default{
		data(){
			return{
				currentIndex:0,
				userId:{},
				login_token:'',
				playlist:[],
				nickname:'',
				avatarUrl:'',
				login_token:'',
				count:0
			}  
		},
		components:{
			tab,
			localMusic,
			songRecommend
		},
		onLoad() {
			app.globalData.userId=uni.getStorageSync('userId')
			this.verification()
			this._getLike(3906297049,uni.getStorageSync('login_token'))
		},
		methods:{
			//---------------------------事件监听-------------------------------------------
			handleSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			handleUserDetail(){
				uni.navigateTo({
					url:'/pages/userDetail/userDetail'
				})
			},
			tabItem(index){
				console.log(index)
				switch(index){
					case 1:{
						uni.redirectTo({
							url:'/pages/find/find'
						})
						console.log('发现')
						break
					}
					case 2:{
						uni.redirectTo({
							url:'/pages/yunComment/yunComment'
						})
						break
					}
					case 3:{
						uni.redirectTo({
							url:'/pages/video/video'
						})
						break
					}
				}  
			},
			recently(){
				uni.navigateTo({
					url:'/pages/recently/recently'
				})
			},
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
					this._getUserDetail(this.userId)
					this._getUserPlayList(this.userId)
				}
			},
			handleLike(){
				console.log('喜欢的音乐')
				uni.navigateTo({
					url:'/pages/like/like'
				})
			},
			//---------------------------网络请求-------------------------------------------
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
			
			// 获取用户的歌单
			_getUserPlayList(uid){
				getUserPlayList(uid).then(res=>{
					console.log(res,'用户歌单')
					this.playlist=res.data.playlist
				}).catch(err=>{
					console.log(err)
				})
			},
			// 喜欢的歌单
			_getLike(id,cookie){
				getLike(id,cookie).then(res=>{
					console.log(res)
					this.count=res.data.ids.length
					// console.log(res.data.ids.length,'喜欢歌单')
				})
			},
			
		}
	}
</script> 

<style>
	@import url("../../static/iconfont/iconfont.css");
	page{ 
		background-color: #F2F2F2;
	}
	.status-bar-row{
		width: 100%;
		height: var(--status-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #fff;
	}
	.tab-row{
		width: 90%;
		margin: 0 auto;
		padding-top: var(--status-bar-height);
		display: flex;
	}
	.tab-left,
	.tab-right{
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 40rpx;
	}
	.tab-center{
		flex: 1; 
		display: flex;
	}
	.tab-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
	.user-row{
		width: 90%; 
		height: 180rpx;
		margin: 220rpx auto 0;
		padding: 15rpx 0;
		box-sizing: border-box;
		/* background-color: green; */
		display: flex;
	}
	.avatar{
		width: 150rpx;
		height: 150rpx;
		overflow: hidden; 
		/* background-color: red; */
	}
	.avatar image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.user-name{
		flex: 1;
		height: 150rpx;
		line-height: 150rpx;
		/* background-color: pink; */
	}
	.user-datail{
		width: 70rpx;
		height: 150rpx;
		text-align: center;
		line-height: 150rpx;
		/* background-color: red; */
	}
	.like{
		width: 90%;
		height: 140rpx;
		margin: 20rpx auto;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		background-color: #fff;
		display: flex;
	}
	.like-img{
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		/* background-color: #007AFF; */
	}
	.icon-shoucang{
		color: red;
		font-size: 120rpx;
	}
	.like-title{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.like-title text:first-child{
		font-size: 28rpx;
	}
	.like-title text:last-child{
		font-size: 20rpx;
		color: #7E7E7E;
	}
</style>
