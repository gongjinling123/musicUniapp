<template>
	<view class="hotDj">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">热门节目</text>
		</view>
		<view class="hotDj-content">
			<view class="content-top">
				<view class="top-left">
					<text class="top-left-title">更新事件 ：</text>
					<text class="top-left-time">{{month}}月{{day}}日</text>
					<text class="iconfont icon-guanyu icon-top-left"></text>
				</view> 
				<view class="top-right">
					<view class="play-all">
						<text class="iconfont icon-bofang1 icon-play"></text>
						<text class="play-title">播放全部</text>
					</view>
				</view>
			</view>
			<view class="content-body">
				<block v-for="(item,index) in djRadios" :key='index'>
					<view class="content-item" 
						  @click="handleItem" 
						  :data-img='item.picUrl' 
						  :data-subCount='item.subCount'
						  :data-id='item.lastProgramId'
						  :data-rid='item.id'>
						<view class="content-item-left">
							<image :src="item.picUrl"></image>
						</view>
						<view class="content-item-right">
							<view class="dj-name">
								{{item.name}}
							</view>
							<view class="dj-info">
								<view class="dj-desc">
									{{item.rcmdtext}}
								</view>
								<view class="dj-num">
									节目：{{item.programCount}}，订阅：{{item.subCount}}
								</view>
							</view>
						</view>
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {getHotDj} from '../../service/dj.js'
	export default{
		data(){
			return{
				djRadios:[],
				month:1,
				day:1,
			}
		},
		onLoad() {
			this._getHotDj(2001)
			this.getDate()
		},
		methods:{
			// ---------------------事件监听----------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleItem(e){
				const jdId=e.currentTarget.dataset.id
				const img=e.currentTarget.dataset.img
				const subcount=e.currentTarget.dataset.subcount
				const rid=e.currentTarget.dataset.rid
				//把图片路径中的 = 号替换成 # 号，如果出现等号，无法把路径完整转到djDetail页面
				const newImg=img.replace(/=/g,'#')
				uni.navigateTo({
					url:`/pages/djDetail/djDetail?id=${jdId}&img=${img.replace(/=/g,'#')}&subcount=${subcount}&rid=${rid}`
				})
				console.log(e.currentTarget.dataset,'999999')
			},
			getDate(){
				const date=new Date()
				const month=date.getMonth()+1
				const day=date.getDate()
				this.month=month>9?month:'0'+month
				this.day=day>9?day:'0'+day
			},
			// ---------------------网络请求----------------------
			// 热门电台：cateId=2001
			_getHotDj(cateId){
				getHotDj(cateId).then(res=>{
					console.log(res)
					this.djRadios=res.data.djRadios
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.tab{
		padding: 50rpx 20rpx 0;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #fff;
		/* background-color: red; */
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
	.hotDj-content{
		width: 100%;
		height: 800rpx;
		margin-top: 190rpx;
		/* background-color: pink; */
	}
	.content-top{
		width: 100%;
		height: 80rpx; 
		display: flex;
		justify-content: space-between;
	}
	.top-left{
		margin-left: 20rpx;
		line-height: 80rpx;
	}
	.top-left-title{
		font-size: 28rpx;
		font-weight: 600;
	}
	.top-left-time{
		font-size: 28rpx;
		font-weight: 600;
	}
	.icon-top-left{
		font-size: 30rpx;
		color: #ccc;
		margin-left: 20rpx;
	}
	.top-right{
		width: 180rpx;
		height: 80rpx;
	}
	.play-all{
		width: 150rpx;
		height: 50rpx;
		text-align: center;
		margin-top: 15rpx;
		border-radius: 30rpx;
		border: 1rpx solid #ccc;
	}
	.icon-play{
		font-size: 30rpx;
		margin-right: 4rpx;
	}
	.play-title{
		font-size: 24rpx;
	}
	.content-body{
		width: 100%;
		height: 800rpx;
		margin-top: 30rpx;
		/* background-color: #007AFF; */
	}
	.content-item{
		width: 100%;
		height: 280rpx;
		margin: 20rpx;
		display: flex;
		/* background-color: #008000; */
	}
	.content-item-left{
		width: 260rpx;
		height: 280rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background-color: #333333;
	}  
	.content-item-left image{
		width: 100%;
		height: 100%;
	}
	.content-item-right{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.dj-name{
		flex: 2;
		display: flex;
		align-items: flex-end;
		font-weight: 600;
	}
	.dj-info{
		flex: 3;
		font-size: 28rpx;
		padding-top: 30rpx;
		color: #ccc;
	}
</style>
