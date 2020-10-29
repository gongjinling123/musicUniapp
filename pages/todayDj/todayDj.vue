<template>
	<view class="dj-detail">
		<view class="detail-bg">
			<image :src="bgImg"></image>
		</view>
		<view class="detail-top" @click="handleBack">
			<text class="iconfont icon-fanhui icon-back"></text>
			<text class="top-title">电台</text>
		</view>
		<view class="detail-title">
			<view class="detail-title-left">
				<text class="detail-title-name">{{name}}</text>
				<text class="detail-title-num">{{subCount}}人已订阅</text>
			</view>
			<view class="detail-title-right">
				<view class="subCount">
					<text class="iconfont icon-guanzhu icon-subCount"></text>
					<text class="subCount-title">订阅</text>
				</view>
			</view> 
		</view>
		<view class="detail-content">
			<view class="detail-category">
				<block v-for="(item,index) in tab" :key='index'>
					<view class="category-item" :class="index==currentIndex?'active':''" @click="handleTab(index)">
						{{item}}
					</view>
				</block>
			</view>
			
			
			<!-- 详情 -->
			<block v-if="isDetail">
				<detail 
				:avatarUrl='avatarUrl'
				:name='name' 
				:nickname="nickname" 
				:category='category' 
				:desc="desc"
				:commentDatas='commentDatas'></detail>
			</block>
			
			<!-- 节目 -->
			<block v-if="isProgram">
				<program :count="count" :programs="programs"></program>
			</block>
			<!-- 相似 -->
			<block v-if="isAlike">
				<view class="">
					相似
				</view>
			</block>
		</view>
	</view>
</template> 

<script>
	import {getDjDetail,getProgram} from '../../service/dj.js'
	import detail from './component/detail.vue'
	import program from './component/program.vue'
	export default{
		data(){ 
			return {
				bgImg:'',
				subCount:0,//订阅
				tab:['详情','节目','相似'],
				currentIndex:1,
				avatarUrl:'',//头像
				category:'',
				desc:'',
				name:'',
				signature:'',
				nickname:'',
				isDetail:false,
				isProgram:true,
				isAlike:false,
				commentDatas:[],
				count:0,
				programs:[]
			}
		},
		onLoad(options) {
			//把图片路径中的 # 号替换成 = 号
			const img=options.img
			this.bgImg=img.replace(/#/g,'=')
			//  电台节目 rid
			const rid=options.rid
			console.log(rid,'rid')
			this._getDjDetail(rid)
			this._getProgram(rid)
		}, 
		components:{
			detail,
			program
		},
		methods:{
			// --------------------------事件监听----------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleTab(i){
				this.currentIndex=i
				switch(i){
					case 0:{
						this.isDetail=true
						this.isProgram=false
						this.isAlike=false
						break
					}
					case 1:{
						this.isDetail=false
						this.isProgram=true
						this.isAlike=false
						break
					}
					case 2:{
						this.isDetail=false
						this.isProgram=false
						this.isAlike=true
						break
					}
				}
			},
			// --------------------------网络请求----------------------------------
			_getDjDetail(id){
				getDjDetail(id).then(res=>{
					console.log(res,'--------')
					this.avatarUrl=res.data.djRadio.dj.avatarUrl
					this.category=res.data.djRadio.category
					this.desc=res.data.djRadio.desc
					this.signature=res.data.djRadio.dj.signature
					this.name=res.data.djRadio.name
					this.subCount=res.data.djRadio.subCount
					this.nickname=res.data.djRadio.dj.nickname
					this.commentDatas=res.data.djRadio.commentDatas
				})
			},
			_getProgram(rid){
				getProgram(rid).then(res=>{
					console.log(res)
					this.count=res.data.count
					this.programs=res.data.programs
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	
	
	.active{
		color: red;
	}
	.dj-detail{
		position: relative;
	}
	.detail-bg{
		width: 100%; 
		height: 600rpx;
	}
	.detail-bg image{
		width: 100%;
		height: 100%;
	}
	.detail-top{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding-top: 40rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		/* background-color: pink; */
	}
	.icon-back{
		font-size: 40rpx;
		margin: 0 20rpx;
		color: #fff;
	}
	.top-title{
		font-weight: 600;
		color: #fff;
	}
	.detail-title{
		width: 100%;
		height: 100rpx;
		position: absolute;
		top: 450rpx;
		left: 0;
		/* background-color: red; */
		/* opacity: 0.4; */
		display: flex;
		justify-content: space-between;
	}
	.detail-title-left{
		width: 300rpx;
		height: 100rpx;
		/* background-color: #007AFF; */
		padding-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.detail-title-name{
		font-weight: 600;
		color: #fff;
		font-size: 28rpx;
	}
	.detail-title-num{
		font-size: 22rpx;
		color: #535353;
	}
	.detail-title-right{
		width: 150rpx;
		height: 100rpx;
		padding-right: 20rpx;
		/* background-color: #008000; */
	}
	.subCount{
		width: 150rpx;
		height: 60rpx;
		margin-top: 20rpx;
		background-color: red;
		border-radius: 50rpx;
		text-align: center;
	}
	.icon-subCount{
		color: #fff;
		margin-right: 10rpx;
		font-size: 30rpx;
		vertical-align: middle;
	}
	.subCount-title{
		font-size: 26rpx;
		color: #fff;
	}
	.detail-content{
		width: 100%;
		/* height: 800rpx; */
		background-color: #fff;
		position: absolute;
		top: 550rpx;
		left: 0;
		border-radius: 20rpx;
	}
	.detail-category{
		width: 100%;
		height: 80rpx;
		margin: 30rpx 0;
		/* background-color: #007AFF; */
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid #ccc;
	}
	.category-item{
		flex: 1;
		display: flex;
		justify-content: center;
	}
	
</style>
