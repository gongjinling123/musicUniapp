<template>
	<view class="language">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">语种风格馆</text>
		</view>  
		<view class="language-style">
			<block v-for="(item,index) in style" :key='index'>
				<view class="style-item" @click="handleStyle(index)">
					<text :class="currentIndex==index?'active':''">{{item}}</text>
				</view>
			</block>
		</view>
		
		<view class="language-content">
			<block v-for="(item,index) in languageStyle" :key='index'>
				<view class="content-item">
					<view class="item-img">
						<image :src="item.coverUrl"></image>
					</view>
					<view class="item-desc">
						<text>{{item.albumName}}</text>
						<text>{{item.artistNames}}</text>
						<text>￥{{item.price}}</text>
					</view>
				</view>
			</block>
		
		</view>
	</view>
</template>

<script>
	import {getLanguage} from '../../service/album.js'
	export default{
		data(){
			return {
				currentIndex:0,
				style:['华语','欧美','韩国','日本'],
				languageStyle:[]
			}
		},
		onLoad() {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getLanguage('Z_H')
		},
		methods:{
			// -----------------------------事件监听----------------------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})  
			},
			handleStyle(index){
				this.currentIndex=index
				switch(index){
					case 0:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getLanguage('Z_H')
						break
					}
					case 1:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getLanguage('E_A')
						break
					}
					case 2:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getLanguage('KR')
						break
					}
					case 3:{
						uni.showLoading({
							title:'拼命加载中...'
						})
						this._getLanguage('JP')
						break
					}
				}
			},
			// -----------------------------网络请求----------------------------------------------
			_getLanguage(area){
				// area 地区 Z_H:华语,E_A:欧美,KR:韩国,JP:日本
				getLanguage(area).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.languageStyle=res.data.albumProducts
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.language{
		width: 90%;
		box-sizing: border-box;
		margin: 0 auto;
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
	.language-style{
		margin-top: 140rpx;
		/* background-color: pink; */
		width: 100%;
		height: 90rpx;
		font-size: 26rpx;
		border-bottom: 1rpx solid #E3E3E3;
		display: flex;
		justify-content: space-around;
	}
	.style-item{
		flex: 1;
		/* border: 1px solid red; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.style-item text{
		padding-bottom: 8rpx;
	}
	.active{
		border-bottom: 2rpx solid #C82A31;
		color: #C82A31;
	}
	
	.language-content{
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.content-item{
		width: 45%;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
	}
	.item-img{
		width: 300rpx;
		height: 300rpx;
	}
	.item-img image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.item-desc{
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #828282;
	}
	.item-desc text:first-child{
		color: #333333;
	}
	.item-desc text:last-child{
		color: #B34137;
	}
</style>
