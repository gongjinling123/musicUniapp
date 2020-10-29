<template>
	<view class="album">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">数字编辑</text>
		</view>
		<banner :banner="banners"></banner>
		<!-- 推荐 -->
		<recommend @handleItem='handleItem'></recommend>
		<!-- 最新上架 -->
		<new-album :newAlbum="newAlbum" @handleSong='handleSong'></new-album>
		<!-- 数字专辑榜 -->
		<song-sale-bard :songSaleBard="songSaleBard" @handleTime='handleTime' @handleSong='handleSong'></song-sale-bard>
		<!-- 数字单曲榜 -->
		<song-sale-bard :songSaleBard="songSaleBard2" @handleTime='handleTime2' @handleSong='handleSong'></song-sale-bard>
	</view>
</template>

<script>
	import banner from '../../components/banner/banner.vue'
	import newAlbum from './component/newAlbum.vue'
	import recommend from './component/recommend.vue'
	import songSaleBard from './component/songSaleBard.vue'
	import {getList,getSongSaleBoard} from '../../service/album.js'
	import {getMultiData} from '../../service/find.js'
	export default{
		data(){
			return {
				banners:[],
				newAlbum:[],
				songSaleBard:[],
				songSaleBard2:[],
			}
		},
		components:{
			banner,
			recommend,
			newAlbum,
			songSaleBard
		},
		onLoad() {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getMultiData()
			this._getList()
			this._getSongSaleBoard('daily')
			this._getSongSaleBoard2('daily')
		},
		methods:{
			// ------------------事件监听------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handleTime(index){
				switch(index){
					case 0:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getSongSaleBoard('daily')
						break
					}
					case 1:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getSongSaleBoard('week') 
						break
					}
					case 2:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getSongSaleBoard('total')
						break
					}
				}
			},
			handleTime2(index){
				switch(index){
					case 0:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getSongSaleBoard2('daily')
						break
					}
					case 1:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getSongSaleBoard2('week') 
						break
					}
					case 2:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getSongSaleBoard2('total')
						break
					}
				}
			},
			handleItem(index){
				switch(index){
					case 0:{
						uni.navigateTo({
							url:'/pages/songsaleboard/songsaleboard'
						})
						break
					}
					case 1:{
						uni.navigateTo({
							url:'/pages/language/language'
						})
						break
					}
					case 2:{
						uni.showToast({
							title:'开发中...'
						})
						break
					}
				}
			},
			handleSong(id,url){
				// console.log(url)
				const imgUrl=url.replace(/=/g,'#')
				// console.log(imgUrl)
				uni.navigateTo({
					url:`/pages/albumDetail/albumDetail?id=${id}&imgUrl=${imgUrl}`
				})
			},
			handleNewSong(id,url){
				console.log(id,url)
			},
			// ------------------网络请求------------------------------
			_getMultiData(){
				getMultiData().then(res=>{
					this.banners = res.data.banners
				})
			},
			_getList(){
				getList().then(res=>{
					// console.log(res)
					this.newAlbum=res.data.products
				})
			},
			_getSongSaleBoard(type){
				getSongSaleBoard(type,0).then(res=>{
					uni.hideLoading()
					this.songSaleBard=res.data.products
				})
			},
			_getSongSaleBoard2(type){
				getSongSaleBoard(type,1).then(res=>{
					uni.hideLoading()
					this.songSaleBard2=res.data.products
				})
			},
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");

	.album{
		width: 90%;
		box-sizing: border-box;
		margin: 0 auto;
		/* background-color: #007AFF; */
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
	
</style>
 