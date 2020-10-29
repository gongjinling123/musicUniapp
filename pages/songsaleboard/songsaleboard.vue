<template>
	<view class="songsaleboard">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">数字编辑</text>
		</view>
		<view class="select">
			<block v-for="(item,index) in select" :key='index'>
				<view class="select-item"
					  :class="currentIndex==index?'active':''"
					  @click="handleSelect(index)">
					{{item}}
				</view>
			</block>
		</view>
		<view class="type">
			<block v-for="(item,index) in type" :key='index'>
				<view class="type-item" @click="handleType(index)">
					<text :class="typeIndex==index?'active-type':''">{{item}}</text>
				</view>
			</block>
		</view>
		<view class="songsaleboard-content">
			<block v-for="(item,index) in products" :key='index'>
				<view class="content-item">
					<view class="content-index" :class="index<3?'hotIndex':''">
						{{index+1}}
					</view>
					<view class="content-img">
						<image :src="item.coverUrl"></image>
					</view>
					<view class="content-desc">
						<view class="song-info">
							<view class="song-name">{{item.albumName}}</view>
							<view class="singer-name">{{item.artistName}}</view>
							<view class="saleNum">已售{{item.saleNum}}张</view>
						</view>
						<view class="supper">
							<text>支持</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {getSongsaleboard} from '../../service/album.js'
	export default{
		data(){
			return {
				products:[],
				currentIndex:0,
				select:['数字专辑榜','数字单曲榜'],
				typeIndex:0,
				type:['日榜','周榜','年榜','总榜']
			}
		},
		onLoad() {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getSongsaleboard(this.currentIndex,'daily')
		},
		methods:{
			// ------------------事件监听----------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handleSelect(index){
				this.currentIndex=index
				this.typeIndex=0
				uni.showLoading({
					title:'拼命加载中...'
				})
				this.selectType(this.currentIndex,this.typeIndex)
			},
			
			handleType(index){
				this.typeIndex=index
				uni.showLoading({
					title:'拼命加载中...'
				})
				this.selectType(this.currentIndex,this.typeIndex)
			},
			selectType(currentIndex,typeIndex){
				switch(currentIndex){
					case 0:{
						switch(typeIndex){
							case 0:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(0,'daily')
								break
							}
							case 1:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(0,'week')
								break
							}
							case 2:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(0,'year')
								break
							}
							case 3:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(0,'total')
								break
							}
						}
						break
					}
					case 1:{
						switch(typeIndex){
							case 0:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(1,'daily')
								break
							}
							case 1:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(1,'week')
								break
							}
							case 2:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(1,'year')
								break
							}
							case 3:{
								uni.showLoading({
									title:'拼命加载中...'
								})
								this._getSongsaleboard(1,'total')
								break
							}
						}
						break
					}
				}
			},
			// ------------------网络请求----------------------------
			_getSongsaleboard(albumType,type){
				getSongsaleboard(albumType,type).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.products=res.data.products
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.songsaleboard{
		width: 100%;
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
	.select{
		width: 60%;
		height: 50rpx;
		margin: 140rpx auto 0;
		border-radius: 50rpx;
		font-size: 26rpx;
		border: 2rpx solid #CECECE;
		display: flex;
	}
	.select-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.active{
		border-radius: 50rpx;
		background-color: #999999;
		color: #fff;
	}
	.type{
		width: 100%;
		height: 90rpx;
		margin-top: 20rpx;
		display: flex;
		border-top: 1rpx solid #EAEAEA;
		border-bottom: 1rpx solid #EAEAEA;
	}
	.type-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.type-item text{
		padding: 0 16rpx 30rpx;
	}
	.active-type{
		border-bottom: 4rpx solid #C02D2F;
		color: #C02D2F;
	}
	.songsaleboard-content{
		width: 100%;
		height: 900rpx;
		/* background-color: #007AFF; */
		margin-top: 20rpx;
	}
	.content-item{
		width: 96%;
		height: 150rpx;
		margin: 10rpx auto;
		/* background-color: red; */
		display: flex;
	}
	.content-index{
		width: 90rpx;
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		color: #969696;
		/* background-color: red; */
	}
	.hotIndex{
		font-weight: 600;
		color: #CF3532;
	}
	.content-img{
		width: 150rpx;
		height: 150rpx;
	}
	.content-img image{
		width: 100%;
		height: 100%;
	}
	.content-desc{
		flex: 1;
		display: flex;
	}
	.song-info{
		width: 340rpx;
		height: 150rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.song-name{
		flex: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #3A3A3A;
	}
	.singer-name{
		flex: 1;
		font-size: 24rpx;
		color: #838383;
	}
	.saleNum{
		flex: 1;
		font-size: 24rpx;
		color: #838383;
	}
	.supper{
		width: 120rpx;
		height: 150rpx;
		padding: 50rpx 15rpx;
		box-sizing: border-box;
		/* background-color: pink; */
	}
	.supper text{
		padding: 4rpx 18rpx;
		font-size: 26rpx;
		border-radius: 50rpx;
		color: #A84951;
		border: 2rpx solid #A84951;
	}
</style>
