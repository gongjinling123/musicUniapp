<template>
	<view class="search">
		<view class="search-top">
			<text @click="handleBack" class="iconfont icon-fanhui icon-serach"></text>
			<view class="search-input">
				<input type="text" v-model="keywords" placeholder="G.E.M.邓紫棋" @input='inp'/>
			</view>
			<text class="btn-search" @click="handleSearch">搜索</text>
		</view>
		<view class="search-body">
			<view class="search-title" v-if="seach">
				<view class="title-left">
					热搜榜
				</view>
				<view class="title-right">
				</view>
			</view>
			
			<view class="search-conten">
				<block v-for="(item,index) in hotSearch" :key='index'>
					<block v-if="index<10">
						<view class="search-item">
							<view class="index">{{index+1}}</view>
							<view class="name">{{item.searchWord}}</view>
							<block v-if="item.iconUrl">
								<view class="img">
									<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
							</block>
						</view>
					</block>
					
					<block v-if="!moreSearch">
						<block v-if="index>9">
							<view class="search-item">
								<view class="index">{{index+1}}</view>
								<view class="name">{{item.searchWord}}</view>
								<block v-if="item.iconUrl">
									<view class="img">
										<image :src="item.iconUrl" mode="aspectFit"></image>
									</view>
								</block>
							</view>
						</block>
					</block>
				</block>
				
				<block v-if="moreSearch">
					<view class="more-search-title" @click="handleMoreSearch">
						<text>展开更多热搜</text>
						<text class="iconfont icon-fanhui1-copy"></text>
					</view>
				</block>
				
				
			</view>
		</view>
	
		<view class="keywords" v-if="isSearchSongs">
			<view class="keywords-top">
				<view class="keywords-top-left">
					单曲
				</view>
				<view class="keywords-top-right">
					<view class="play-all" @click="handlePlayALl">
						<text class="iconfont icon-bofang1"></text>
						<text>播放全部</text>
					</view>
				</view>
			</view>
			<block v-for="(item,index) in searchSong" :key='index'>
				<view class="song-item" :data-id='item.id' @click="handleSongs">
					<view class="item-left">
						<view class="item-name">
							<text class="song-name">{{item.name}}</text>
						</view>
						<view class="item-singer">
							<text>{{item.artists[0].name}} - {{item.album.name}}</text>
						</view>
						<view class="alia" v-if="item.album.alia[0].length!=0">
							<text>{{item.album.alia[0]}}</text>
						</view>
					</view>
					<view class="item-right">
						<text class="iconfont icon-ziyuan1"></text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {getSearch,getSearchKeywords} from '../../service/search.js'
	import app from '../../App.vue'
	export default{
		data(){
			return {
				seach:true,
				hotSearch:[],
				moreSearch:true,
				searchSong:[],
				keywords:'',
				isSearchSongs:false
			}
		},
		onLoad() {
			this._getSearch()
		},
		methods:{
			// ---------------------事件监听--------------------------
			inp(){
				if(this.keywords.trim().length==0){
					this.searchSong=[]
					this.isSearchSongs=false
				}
			},
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			 
			handlePlayALl(){
				let musicId=this.searchSong[0].id
				for(var i=0;i<this.searchSong.length;i++){
					app.globalData.waitForPlaying.push(this.searchSong[i].id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			handleMoreSearch(){
				this.moreSearch=!this.moreSearch
			},
			handleSearch(){
				if(this.keywords.trim().length==0){
					uni.showToast({
						title:'还没输入关键词',
						icon:'none'
					})
					return
				}
				uni.showToast({
					icon:'loading',
					title:'拼命加载中...'
				})
				this.seach=false
				this.hotSearch=[]
				this.moreSearch=false
				this._getSearchKeywords(this.keywords)
				this.isSearchSongs=true
			},
			handleSongs(e){
				// console.log(e.currentTarget.dataset.id)
				const musicId=e.currentTarget.dataset.id
				for(var i=0;i<this.searchSong.length;i++){
					app.globalData.waitForPlaying.push(this.searchSong[i].id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			// ---------------------网络请求--------------------------
			_getSearch(){
				getSearch().then(res=>{
					this.hotSearch=res.data.data
					// console.log(this.hotSearch)
				})
			},
			_getSearchKeywords(keywords){
				getSearchKeywords(keywords).then(res=>{
					this.searchSong=res.data.result.songs
					console.log(this.searchSong)
					
				})
			}  
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.keywords{
		width: 100%;
	}
	.keywords-top{
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
	}
	.keywords-top-left{
		font-weight: 600;
		line-height: 90rpx;
	}
	.keywords-top-right{
		width: 180rpx;
		height: 90rpx;
		/* background-color: #007AFF; */
	}
	.play-all{
		width: 160rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin-top: 20rpx;
		border-radius: 50rpx;
		font-size: 24rpx;
		border: 1rpx solid #7E7E7E;
	}
	.icon-bofang1{
		margin-right: 6rpx;
		vertical-align: middle;
	}
	.song-item{
		width: 100%;
		/* background-color: #008000; */
		display: flex;
		justify-content: space-between;
		padding-bottom: 30rpx;
	}
	.item-left{
		
	}
	.item-right{
		width: 100rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 50rpx;
		color: #7E7E7E;
		/* background-color: red; */
	}
	.item-name{
		font-size: 28rpx;
	}
	.song-name{
		color: #007AFF;
	}
	.item-singer{
		font-size: 20rpx;
		color: #7E7E7E;
	}
	.alia{
		font-size: 20rpx;
		color: #7E7E7E;
	}
	
	
	
	
	@import url("../../static/iconfont/iconfont.css");
	.search{
		padding: 100rpx 20rpx;
	}
	.search-top{
		display: flex;
		/* background-color: #007AFF; */
	}
	.icon-serach{
		font-size: 50rpx;
		margin-right: 20rpx;
		vertical-align: middle;
	}
	.search-input{
		/* background-color: #007AFF; */
		height: 60rpx;
		border-bottom: 2rpx solid #7E7E7E;
	}
	.search-input input{
		width: 520rpx;
		height: 60rpx;
	}
	.btn-search{
		width: 90rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		box-shadow: 0 2rpx 2rpx red;
		background-color: red;
	}
	.search-body{
		margin-top: 30rpx;
	}
	.search-title{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #7E7E7E;
	}
	.title-left{
		font-weight: 600;
	}
	.title-right{
		width: 180rpx;
		height: 80rpx;
		padding-right: 20rpx;
		/* background-color: #008000; */
	}
	.title-btn{
		width: 180rpx;
		height: 50rpx;
		border-radius: 50rpx;
		margin-top: 15rpx;
		text-align: center;
		border: 1rpx solid #E4E4E4;
	}
	.icon-play{
		font-size: 22rpx;
		color: #343434;
	}
	.playall{
		font-size: 22rpx;
		color: #343434;
	}
	.search-conten{
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.search-item{
		width: 48%;
		height: 60rpx;
		line-height: 100rpx;
		/* background-color: #007AFF; */
		margin-top: 10rpx;
		display: flex;
	}
	.index{
		width: 40rpx;
		height: 60rpx;
		text-align: center;
		line-height: 100rpx;
		/* background-color: red; */
	}
	.name{
		/* background-color: pink; */
		margin: 0 6rpx;
		font-size: 22rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.img{
		width: 50rpx;
		height: 30rpx;
		margin-top: 36rpx;
		/* background-color: green; */
	}
	.img image{
		width: 100%;
		height: 100%; 
		vertical-align: top;
	}
	.more-search-title{
		color: #888888;
		font-size: 28rpx;
		margin-top: 20rpx;
	}
	.icon-fanhui1-copy{
		margin-left: 10rpx;
		font-size: 24rpx;
	}
</style>
