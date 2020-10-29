<template>
	<view class="record">
		<view class="record-top" @click="handleBack">
			<text class="iconfont icon-fanhui icon-back"></text>
			<text class="top-title">听歌排行</text>
		</view>
		<view class="record-body">
			<view class="title">
				<block v-for="(item,index) in title" :key='index'>
					<view class="title-item" @click="handleTitle(index)">
						<text :class="currentIndex==index?'active':''">{{item}}</text>
					</view>
				</block>
			</view>
			
			<block v-if="currentIndex==1">
				<view class="record-conten">
					<block v-for="(item,index) in allData" :key='index'>
						<view class="content-item" :data-id='item.song.id' :data-index='index' @click="playSong1">
							<view class="item-index">
								{{index+1}}
							</view>
							<view class="item-info">
								<view class="song-name">
									<text class="name">{{item.song.name}}</text>
									<text class="alia" v-if="item.song.alia.length!=0">({{item.song.alia[0]}})</text>
								</view>
								<view class="singer-name">
									<text>{{item.song.ar[0].name}} - {{item.song.name}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</block>
			<block v-if="currentIndex==0">
				<view class="record-conten">
					<block v-for="(item,index) in weekData" :key='index'>
						<view class="content-item" :data-id='item.song.id' :data-index='index' @click="playSong0">
							<view class="item-index">
								{{index+1}}
							</view>
							<view class="item-info">
								<view class="song-name">
									<text class="name">{{item.song.name}}</text>
									<text class="alia" v-if="item.song.alia.length!=0">({{item.song.alia[0]}})</text>
								</view>
								<view class="singer-name">
									<text>{{item.song.ar[0].name}} - {{item.song.name}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {getRecord} from '../../service/follows.js'
	import app from '../../App.vue'
	export default{
		data(){
			return {
				weekData:[],
				allData:[],
				currentIndex:0,
				title:['最近一周','所有时间']
			}
		},
		onLoad() {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getRecord(uni.getStorageSync('userId'),1)
		},
		methods:{
			// ----------------事件监听-------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			}, 
			handleTitle(index){
				this.currentIndex=index
				this._getRecord(uni.getStorageSync('userId'),0)
			},
			playSong0(e){
				let musicid=e.currentTarget.dataset.id
				for(var i=0;i<this.weekData.length;i++){
					app.globalData.waitForPlaying.push(this.weekData[i].song.id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicid)
				app.globalData.waitForPlaying.splice(index,1)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicid}`
				})
			},
			playSong1(e){
				let musicid=e.currentTarget.dataset.id
				let index1=e.currentTarget.dataset.index
				for(var i=index1;i<this.allData.length;i++){
					app.globalData.waitForPlaying.push(this.allData[i].song.id)
				}
				let index=app.globalData.waitForPlaying.indexOf(musicid)
				app.globalData.waitForPlaying.splice(index,1)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicid}`
				})
			},
			// ----------------网络请求-------------------------
			_getRecord(uid,type){
				console.log(type)
				getRecord(uid,type).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.allData=res.data.allData
					this.weekData=res.data.weekData
					console.log(this.allData)
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.record{
		width: 100%;
	}
	.record-top{
		padding-top: var(--status-bar-height);
		height: 70rpx;
		line-height: 70rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff; 
		z-index: 99;
	}
	.icon-back{
		font-size: 40rpx;
		padding: 0 30rpx 0 20rpx; 
	}
	.top-title{
		font-weight: 600;
	}
	.record-body{
		width: 100%;
		/* background-color: red; */
		margin-top: 120rpx;
	}
	.title{
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid #ccc;
		font-size: 28rpx;
	}
	.title-item text{
		padding-bottom: 20rpx;
	}
	.active{
		color: #FE3B3F;
		border-bottom: 6rpx solid #FE3B3F;
	}
	.record-conten{
		width: 100%;
		padding-left: 20rpx;
		box-sizing: border-box;
		/* background-color: red; */
	}
	.content-item{
		width: 100%;
		height: 100rpx;
		display: flex;
		/* background-color: #007AFF; */
		margin-bottom: 20rpx;
	}
	.item-index{
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.item-info{
		width: 570rpx;
		height: 100rpx;
		font-size: 28rpx;
		/* background-color: pink; */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.song-name{
		margin-top: 10rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.song-name .alia{
		color: #9F9F9F;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-left: 8rpx;
	}
	.singer-name{
		font-size: 20rpx;
		color: #9F9F9F;
	}
</style>
