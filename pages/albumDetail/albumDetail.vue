<template>
	<view class="albumDetail">1
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">{{artistName}}《{{albumName}}》</text>
		</view>
		<view class="song-img">
			<image :src="coverUrl"></image>
		</view>
		<view class="song-name">
			<view class="albumName">{{albumName}}</view>
			<view class="artistName">
				<text>{{artistName}}</text>
				<text class="iconfont icon-fanhui1"></text>
			</view>
		</view>
		<view class="price-supper">
			<view class="price">
				<text>￥{{price}}</text>
			</view>
			<view class="supper">
				<text>立即支持</text>
			</view>
		</view>
		<checkbox-group class="radio">
			<block v-for="(item,index) in tags" :key='index'>
				<view class="radio-item">
					<label>
						<checkbox value="cb" color="#838383" style="transform:scale(0.7)" />{{item}}
					</label>
				</view>
			</block>
		</checkbox-group>
		<view class="comment">
			<view class="comment-title">
				<block v-for="(item,index) in nav" :key='index'>
					<view class="comment-item" :class="currentIndex==index?'active':''" @click="handleItem(index)">
						<text>{{item}}</text>
					</view>
				</block>
			</view>
			<view class="comment-content">
				<block v-for="(item,index) in descr" :key='index'>
					<block v-if="!showAll">
						<block v-if="index<3">
							<view class="content">{{item.resource}}</view>
							<block v-if="index==2">
								<view class="show-all" @click="handleShowAll">
									<text>展开全部</text>
									<text class="iconfont icon-fanhui1-copy"></text>
								</view>
							</block>
						</block>
					</block>
					<block v-if="showAll">
						<view class="content">{{item.resource}}</view>
						<block v-if="index==descr.length-1">
							<view class="show-all" @click="handleShowAll">
								<text>收起</text>
								<text class="iconfont icon-fanhui1-copy-copy"></text>
							</view>
						</block>
					</block>
				</block>
			
			</view>
		</view>
	</view>
</template>

<script>
	import {getAlbumDetail} from '../../service/album.js'
	export default{
		data(){
			return {
				artistName:'',
				albumName:'',
				coverUrl:'',
				price:0,
				descr:[],
				tags:[],
				nav:['专辑详情','粉丝活动','评论'],
				currentIndex:0,
				showAll:false
			}
		},
		onLoad(option) {
			console.log(option)
			this.coverUrl=option.imgUrl.replace(/#/g,'=')
			this._getAlbumDetail(option.id)
			// this._getAlbumDetail(86286082)
		},
		methods:{
			// ----------------------事件监听------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleItem(index){
				this.currentIndex=index
			},
			handleShowAll(){
				this.showAll=!this.showAll
			},
			// ----------------------网络请求------------------------------
			_getAlbumDetail(id){
				getAlbumDetail(id).then(res=>{
					console.log(res)
					this.artistName=res.data.album.artistName
					this.albumName=res.data.album.albumName
					this.descr=res.data.product.descr
					this.price=res.data.product.price
					this.tags=res.data.product.tags
				})
			}
		}
		
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.albumDetail{
		width: 100%;
		/* height: 100vh; */
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #1B1B1B;
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
	.song-img{
		width: 400rpx;
		height: 400rpx;
		margin: 300rpx auto 0;
		box-shadow: 0 0 30rpx #fff;
	}
	.song-img image{
		width: 100%;
		height: 100%;
	}
	.song-name{
		width: 100%;
		height: 120rpx;
		margin-top: 50rpx;
		text-align: center;
		color: #fff;
		padding-bottom: 50rpx;
		/* background-color: #007AFF; */
		border-bottom: 2rpx solid #343434;
	}
	.albumName{
		font-size: 40rpx;
	}
	.price-supper{
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #343434;
	}
	.price{
		width: 100rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: #D63734;
	}
	.supper{
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 28rpx;
		margin-right: 50rpx;
		background-color: #D63734;
		color: #fff;
		border-radius: 50rpx;
	}
	.radio{
		display: flex;
		flex-wrap: wrap;
		color: #838383;
		border-bottom: 10rpx solid #424242;
		padding-bottom: 10rpx;
	}
	.radio-item{
		width: 45%;
		font-size: 24rpx;
		margin: 8rpx;
		/* background-color: #007AFF; */
	}
	.comment{
		width: 100%;
		padding: 20rpx;
		color: #fff;
		/* background-color: #007AFF; */
	}
	.comment-title{
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.comment-item{
		/* border: 1px solid red; */
		padding: 20rpx 8rpx;
	}
	.active{
		border-bottom: 4rpx solid #D63331;
		color: #D63331;
	}
	.comment-content{
		margin-top: 20rpx;
	}
	.content{
		padding: 10rpx;
		font-size: 26rpx;
	}
	.show-all{
		width: 100%;
		font-size: 22rpx;
		color: #A8A8A8;
		text-align: center;
	}
	.icon-fanhui1-copy,
	.icon-fanhui1-copy-copy{
		font-size: 20rpx;
		margin-left: 8rpx;
	}
</style>
