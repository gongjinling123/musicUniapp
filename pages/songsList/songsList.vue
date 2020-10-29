<template>
	<view class="songsList">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">歌单广场</text>
		</view>
		<scroll-view scroll-x="true" style="width: 100%;" class="scroll-view">
			<block v-for="(item,index) in tags" :key='index'>
				<view class="list-item" @click="handleTags(index,item.name)">
					<text :class="currentIndex==index?'active':''">{{item.name}}</text>
				</view>
			</block>
		</scroll-view>
		<view class="playlists">
			<block v-for="(item,index) in playlists" :key='index'>
				<view class="playlists-item" @click="handlePlayList(item.id)">
					<view class="img">
						<image :src="item.coverImgUrl"></image>
					</view>
					<view class="count">
						<text class="iconfont icon-arrow- icon-play"></text>
						<text>{{item.subscribedCount}}</text>
					</view>
					<view class="name">{{item.name}}</view>
				</view>
			</block>
			</view>
		</view>
	</view>
</template> 
<script>
	import {getTags,getList} from '../../service/songsList.js'
	export default{
		data(){
			return {
				tags:[],
				currentIndex:0,
				list:[],
				playlists:[],
				
			}
		},
		onLoad() {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getTags()
			this._getList('华语')
		},
		methods:{
			// ---------------------事件监听-------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handleTags(index,item){
				// console.log(item)
				this.currentIndex=index 
				uni.showLoading({
					title:'拼命加载中...'
				})
				this._getList(item)
			},
			handlePlayList(id){
				uni.navigateTo({
					url:`/pages/songsDetail/songsDetail?id=${id}`
				})
			},
			// ---------------------网络请求-------------------------
			_getTags(){
				getTags().then(res=>{
					// console.log(res,'tags')
					this.tags=res.data.tags
				})
			},
			_getList(cat){
				getList(cat).then(res=>{
					// console.log(res)
					this.playlists=res.data.playlists
					// console.log(this.playlists)
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.songsList{
		width: 100%; 
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #F5F5F5; 
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
		background-color: #fff;
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
	
	.scroll-view{
		width: 750rpx;
		height: 90rpx;
		line-height: 90rpx;
		white-space: nowrap;
		margin-top: 140rpx;
		/* background-color: red; */
	}
	.list-item{
		width: 150rpx;
		height: 90rpx;
		font-size: 28rpx;
		margin-right: 25rpx;
		text-align: center;
		display: inline-block;
		/* background-color: pink; */
	}
	.list-item text{
		padding: 0 8rpx 20rpx;
	}
	.active{
		color: red;
		border-bottom: 8rpx solid red;
	}
	
	.playlists{
		width: 100%;
		height: 900rpx;
		display: flex;
		flex-wrap: wrap;
		/* justify-content: space-around; */
	}
	.playlists-item{
		width: 30%;
		height: 280rpx;
		margin: 10rpx;
		/* background-color: pink; */
		position: relative;
		
	}
	.playlists-item:nth-child(3n+1){
		/* background-color: red; */
		margin-left: 20rpx;
	}
	.img{
		width: 200rpx;
		height: 200rpx;
	}
	.img image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.count{
		position: absolute;
		top: 10rpx;
		right: 50rpx;
		/* background-color: red; */
		color: #fff;
		font-size: 22rpx;
	}
	.icon-play{
		font-size: 20rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}
	.name{
		width: 200rpx;
		font-size: 24rpx;
		margin-top: 8rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical
	}
</style>
