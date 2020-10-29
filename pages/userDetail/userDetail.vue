<template>
	<view class="userDeail">
		<image class="bg-img" :src="backgroundUrl"></image>
		<view class="back" @click="handleBack">
			<text class="iconfont icon-fanhui"></text>
		</view>
		<view class="avatar">
			<text>上传头像</text>
		</view>
		<view class="user">
			<view class="user-left">
				<view class="nickname">{{nickname}}</view>
				<view class="count">
					<text @click="handleFollows">关注 {{follows}}</text>
					<text>粉丝 {{followeds}}</text>
				</view>
				<view class="level">
					<text>Lv.{{level}}</text>
				</view>
			</view>
			<view class="user-right">
				<text class="edit">编辑</text>
				<text class="choose-bg">更换背景</text>
			</view>
		</view>
		<view class="userDeail-content">
			<view class="content-title">
				<block v-for="(item,index) in title" :key='index'>
					<view class="title-item" @click="handleItem(index)">
						<text :class="currentIndex==index?'active':''">{{item}}</text>
					</view>
				</block>
			</view>
			<block v-if="currentIndex==0">
				<view class="content">
					<view class="detail-item" @click="handleRecord">
						<view class="item-img">
							<image src="../../static/image/find_rankingList.png"></image>
						</view>
						<view class="item-desc">
							<text>听歌排行</text>
							<text>累计听歌{{listenSongs}}首</text>
						</view>
					</view>
					<view class="detail-item" @click="handleLike">
						<view class="item-img">
							<image src="../../static/image/find_songSheet.png"></image>
						</view>
						<view class="item-desc">
							<text>我喜欢的音乐</text>
							<text>{{likeCount}}首，播放{{playlistCount}}次</text>
						</view>
					</view>
				</view>
			</block>
			<block v-if="currentIndex==1">
				<view class="status-content">
					暂时还没有动态哦
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		getUserDetail, 
		getLevel,
		getLike
	} from '../../service/profile.js'
	export default {
		data() {
			return {
				uid: uni.getStorageSync('userId'),
				backgroundUrl: '',
				follows: 0, //关注
				followeds: 0, //粉丝
				nickname: '',
				title: ['主页', '动态'],
				currentIndex: 0,
				listenSongs:0,
				playlistCount:0,
				level:0,
				likeCount:0
			}
		},
		onLoad() {
			this._getUserDetail(this.uid)
			this._getLevel(uni.getStorageSync('login_token'))
			this._getLike(this.uid,uni.getStorageSync('login_token'))
		},
		methods: {
			// --------------------事件监听------------------------------
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			handleItem(index){
				this.currentIndex=index
			},
			handleFollows(){
				uni.navigateTo({
					url:'/pages/follows/follows'
				})
			},
			handleRecord(){
				uni.navigateTo({
					url:'/pages/record/record'
				})
			},
			handleLike(){
				uni.navigateTo({
					url:'/pages/like/like'
				})
			},
			
			// --------------------网络请求------------------------------
			_getUserDetail(uid) {
				getUserDetail(uid).then(res => {
					// console.log(res)
					this.backgroundUrl = res.data.profile.backgroundUrl
					this.nickname = res.data.profile.nickname
					this.follows = res.data.profile.follows
					this.followeds = res.data.profile.followeds
					this.listenSongs=res.data.listenSongs
					this.playlistCount=res.data.profile.playlistCount
				})
			},
			_getLevel(cookie){
				getLevel(cookie).then(res=>{
					this.level=res.data.data.level
				})
			},
			_getLike(uid,cookie){
				getLike(uid,cookie).then(res=>{
					this.likeCount=res.data.ids.length
				})
			},
			
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.userDeail {
		width: 100%;
		position: relative;
	}
	.bg-img {
		width: 100%;
		height: 600rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.back {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		padding-top: 30rpx;
		padding-left: 20rpx;
		/* background-color: #007AFF; */
	}
	.back text {
		font-size: 40rpx;
		color: #fff;
	}
	.avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.6);
		margin-top: 80rpx;
		margin-left: 20rpx;
		padding-top: 36rpx;
		box-sizing: border-box;
		color: #fff;
		font-size: 28rpx;
	}
	.avatar-img{
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.6);
		margin-top: 80rpx;
		margin-left: 20rpx;
		box-sizing: border-box;
		color: #fff;
		font-size: 28rpx;
	}
	.avatar-img image{
		width: 100%;
		height: 100%;
		background-color: red;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatar text {
		width: 80rpx;
		height: 80rpx;
		display: block;
		text-align: center;
		margin: 0 auto;
	}
	.user {
		width: 100%;
		height: 100rpx;
		margin-top: 50rpx;
		display: flex;
		padding-left: 20rpx;
		box-sizing: border-box;
		/* background-color: #007AFF; */
	}
	.user-left {
		color: #fff;
		flex: 1;
		/* background-color: pink; */
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.nickname {
		flex: 1;
	}
	.count {
		flex: 1;
		font-size: 20rpx;
	}
	.count text:first-child {
		padding-right: 20rpx;
		border-right: 1rpx solid #fff;
	}
	.count text:last-child {
		padding-left: 20rpx;
	}
	.level{
		font-style: italic;
		font-size: 20rpx;
		margin-top: 10rpx;
	}
	.level text{
		padding: 0 14rpx;
		background-color: #7B7A80;
		border-radius: 50rpx;
	}
	.user-right {
		width: 230rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		color: #fff;
		/* background-color: green; */
	}
	.edit {
		padding: 10rpx 18rpx;
		background-color: #74797C;
		margin-right: 10rpx;
		border-radius: 50rpx;
	}
	.choose-bg {
		padding: 10rpx 18rpx;
		background-color: #74797C;
		border-radius: 50rpx;
	}
	.userDeail-content {
		width: 100%;
		padding-left: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		position: absolute;
		top: 520rpx;
		left: 0;
		border-radius: 30rpx 30rpx 0 0;
	}
	.content-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		border-bottom: 1rpx solid #FBFBFB;
	}
	.title-item {
		flex: 1;
		display: flex;
		justify-content: center;
	}
	.title-item text{
		padding: 0 20rpx;
	}
	.active {
		color: #E8303A;
		border-bottom: 4rpx solid #E8303A;
	}
	.content{
		width: 100%;
		height: 500rpx;
		/* background-color: pink; */
	}
	.detail-item{
		width: 100%;
		height: 130rpx;
		margin: 20rpx 0;
		display: flex;
		/* background-color: red; */
	}
	.item-img{
		width: 100rpx;
		height: 100rpx;
	}
	.item-img image{
		width: 100%;
		height: 100%;
	}
	.item-desc{
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.item-desc text:first-child{
		font-size: 28rpx;
		margin-top: 10rpx;
	}
	.item-desc text:last-child{
		font-size: 20rpx;
		color: #949494;
		margin-top: 10rpx;
	}
	.status-content{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #949494;
	}
</style>
