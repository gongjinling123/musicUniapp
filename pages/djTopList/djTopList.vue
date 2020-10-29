<template>
	<view class="djTopList">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">主播电台排行版</text>
		</view>
		<view class="nav">
			<block v-for="(item,index) in nav" :key='index'>
				<view class="nav-item" @click="handleItem(index)">
					<text :class="currentIndex==index?'active':''">{{item}}</text>
				</view>
			</block>
		</view>
		
		<!-- 主播榜 -->
		<block v-if="isPoplist">
			<!-- 24小时榜 -->
			<view class="popTab">
				<tab>
					<view slot='title'>24小时榜</view>
				</tab>
			</view>
			<poplist :poplist='hoursTop'></poplist>
			<!-- 新人榜 -->
			<tab>
				<view slot='title'>新人榜</view>
			</tab>
			<poplist :poplist='newcomer'></poplist>
			<!-- 最热主播 -->
			<view class="jdTopList-content">
				<view class="content-top">
					<text class="content-top-title">最热主播</text>
					<text class="iconfont icon-guanyu icon-top"></text>
				</view>
				<anchor :popTopList="popTopList"></anchor>
			</view>
			
		</block> 
		<!-- 节目榜 -->
		<block v-if="isProgram">
			<hours :hoursProgram="hoursProgram"></hours>
			<view class="jdTopList-content">
				<view class="content-top">
					<text class="content-top-title">最热节目</text>
					<text class="iconfont icon-guanyu icon-top"></text>
				</view>
				<list :topList="topList"></list>
			</view>
		</block>
		<!-- 电台榜 -->
		<block v-if="isAudio">
			<paypop :topListPay="topListPay"></paypop>
		</block>
		
	</view>
</template>   

<script>
	import {getTopList,getProgramHours,getTopListHours,getNewcomer,getPopular,getTopListPay} from '../../service/dj.js'
	import tab from './component/tab.vue'
	import list from './component/list.vue'
	import hours from './component/hours.vue'
	import poplist from './component/poplist.vue'
	import anchor from './component/anchor.vue'
	import paypop from './component/paypop.vue'
	export default{
		data(){
			return{
				nav:['主播榜','节目榜','电台榜'],
				currentIndex:1,
				topList:[],//节目榜最热节目
				hoursProgram:[],//节目榜24小时榜
				hoursTop:[],//主播榜24小时榜
				newcomer:[],//主播榜新人榜
				popTopList:[],//主播榜最热主播
				topListPay:[],//电台榜付费精品
				isProgram:true,//节目榜
				isPoplist:false,//主播榜
				isAudio:false,//电台榜
			}
		},
		onLoad() {
			uni.showLoading({
				title:'拼命加载中...'
			})
			this._getTopList()
			this._getProgramHours()
			this._getTopListHours()
			this._getNewcomer()
			this._getPopular()
			this._getTopListPay()
		},
		filters:{
			numScore(value){
				let transformVal=Number(value/1000).toFixed(0)
				let realVal=transformVal.substring(0,transformVal.length-1)
				return Number(realVal)
			}
		},
		components:{
			tab,
			list,
			hours,
			poplist,
			anchor,
			paypop
		},
		
		methods:{
			// -------------------事件监听---------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleItem(index){
				console.log(index)
				this.currentIndex=index
				switch(index){
					case 0:{
						this.isPoplist=true
						this.isProgram=false
						this.isAudio=false
						break
					}
					case 1:{
						this.isPoplist=false
						this.isProgram=true
						this.isAudio=false
						break
					}
					case 2:{
						this.isPoplist=false
						this.isProgram=false
						this.isAudio=true
						break
					}
				}
			},
			// -------------------网络请求---------------------------
			// 节目榜
			_getTopList(){
				getTopList().then(res=>{
					this.topList=res.data.toplist
					uni.hideLoading()
				})
			},
			_getProgramHours(){
				getProgramHours().then(res=>{
					this.hoursProgram=res.data.data.list
				})
			},
			// 主播榜
			_getTopListHours(){
				getTopListHours().then(res=>{
					this.hoursTop=res.data.data.list
				})
			},
			_getNewcomer(){
				getNewcomer().then(res=>{
					this.newcomer=res.data.data.list
				})
			},
			_getPopular(){
				getPopular().then(res=>{
					this.popTopList=res.data.data.list
				})
			},
			// 电台榜
			_getTopListPay(){
				getTopListPay().then(res=>{
					console.log(res)
					this.topListPay=res.data.data.list
				})
			},
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.popTab{
		margin-top: 20rpx;
	}
	.djTopList{
		box-sizing: border-box;
		padding-left: 20rpx;
	}
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
	.hours-top{
		width: 100%;
		height: 80rpx;
		margin-left: 20rpx;
		line-height: 80rpx;
		display: flex;
		background-color: #fff;
		font-weight: 600;
	}
	
	
	.jdTopList-content{
		width: 100%;
		height: 800rpx;
		/* background-color: red; */
		margin-top: 20rpx;
	}
	.content-top{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 20rpx;
	}
	.content-top-title{
		font-weight: 600;
	}
	.icon-top{
		font-size: 40rpx;
		color: #D3D3D3;
		margin-left: 20rpx;
		vertical-align: middle;
	}
	.nav{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		margin-top: 140rpx;
	}
	.nav-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.active{
		color: red;
		border-bottom: 2rpx solid red;
	}
</style>
