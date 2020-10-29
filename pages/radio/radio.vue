<template>
	<view class="radio">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">电台</text>
		</view>
		<banner :banner="banner"></banner>
		<recommend @handleItem='handleItem'></recommend>
		<view class="today">
			<view class="today-title">
				电台推荐
			</view>
			<view class="today-content">
				<block v-for="(item,index) in list" :key='index'>
					<view class="content-item" 
						  @click="handleToDay"
						  :data-img='item.picUrl' 
						  :data-subCount='item.subCount'
						  :data-id='item.lastProgramId'
						  :data-rid='item.id'>
						<view class="item-img">
							<image :src="item.picUrl"></image>
						</view>
						<view class="item-name">
							{{item.name}}
						</view>
						<view class="item-rcmdText">
							{{item.rcmdText}}
						</view>
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	import banner from './component/banner.vue'
	import recommend from './component/recommend.vue'
	
	import {getBanner,getToDay} from '../../service/dj.js'
	export default{
		data(){ 
			return {
				banner:[],
				list:[]
			}
		},
		onLoad() {
			this._getBanner()
			this._getToDay()
		},
		components:{
			banner,
			recommend
		},
		methods:{
			// ----------------------事件监听----------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleItem(index){
				switch(index){
					case 0:{
						uni.navigateTo({
							url:'/pages/hotDj/hotDj'
						})
						break
					}
					case 1:{
						uni.navigateTo({
							url:'/pages/djTopList/djTopList'
						})
						break
					}
					case 2:{
						uni.navigateTo({
							url:'/pages/djPay/djPay'
						})
						break
					}
					case 3:{
						break
					}
				}
			},
			handleToDay(e){
				console.log(e)
				const jdId=e.currentTarget.dataset.id
				const img=e.currentTarget.dataset.img
				const subcount=e.currentTarget.dataset.subcount
				const rid=e.currentTarget.dataset.rid
				//把图片路径中的 = 号替换成 # 号，如果出现等号，无法把路径完整转到djDetail页面
				const newImg=img.replace(/=/g,'#')
				uni.navigateTo({
					url:`/pages/todayDj/todayDj?id=${jdId}&img=${img.replace(/=/g,'#')}&subcount=${subcount}&rid=${rid}`
				})
			},
			// ----------------------网络请求----------------------------
			_getBanner(){
				getBanner().then(res=>{
					this.banner=res.data.data
				})
			},
			_getToDay(){
				getToDay().then(res=>{
					this.list=res.data.data
					console.log(this.list)
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.tab{
		padding-top: 50rpx;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		position: fixed;
		top: 0;
		left: 20rpx;
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
	.today{
		width: 100%;
		height: 400rpx;
		margin-top: 20rpx;
		/* background-color: red; */
	}
	.today-title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 20rpx;
	}
	.today-content{
		width: 100%;
		height: 300rpx;
		/* background-color: pink; */
		display: flex;
		justify-content: space-around;
	}
	.content-item{
		width: 30%;
		height: 100%;
		/* border: 1px solid green; */
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.item-img{
		width: 215rpx;
		height: 215rpx;
	}
	.item-img image{
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
	}
	.item-name{
		position: absolute;
		left: 10rpx;
		bottom: 90rpx;
		font-size: 20rpx;
		color: #fff;
	}
	.item-rcmdText{
		font-size: 20rpx;
		margin-top: 10rpx;
	}
</style>
