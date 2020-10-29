<template>
	<view class="yunComment">
		<tab @tabItem='tabItem' @handleSearch='handleSearch' :currentIndex='currentIndex'/>
		<view class="content-row">
			<scroll-view scroll-x="true" style="width: 100%;" class="scroll-view">
				<block v-for="(item,index) in content" :key='index'>
					<view class="content-item">
						<image :src="content[0].simpleResourceInfo.songCoverUrl" class="image-bg"></image>
						<view class="user">
							<view class="img">
								<image :src="item.simpleUserInfo.avatar"></image>
							</view>
							<text class="nickname">{{item.simpleUserInfo.nickname}}</text>
						</view>
						<view class="comment">
							<view class="iconfont icon-quotation yinhao"></view>
							{{item.content}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {getComment} from '../../service/comment.js'
	import {tab} from '../../components/tab/tab.vue'
	export default{
		data(){
			return { 
				currentIndex:2,
				content:[]
			}
		},
		onLoad() {
			this._getComment()
		},
		components:{
			tab 
		},
		methods:{
			// -------------------------事件监听-------------------------
			handleSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			tabItem(index){
				console.log(index)
				switch(index){
					case 0:{
						uni.redirectTo({
							url:'/pages/profile/profile'
						})
						break
					}
					case 1:{
						uni.redirectTo({
							url:'/pages/find/find'
						})
						break
					}
					case 3:{
						uni.redirectTo({
							url:'/pages/video/video'
						})
						break
					}
				}  
			},
			// -------------------------网络请求-------------------------
			_getComment(){
				getComment().then(res=>{
					console.log(res)
					this.content=res.data.data
				})
			},
			
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.yunComment{
		width: 100%;
		height: 100vh;
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
	.content-row{
		width: 100%;
		/* height: 100vh; */
		/* background-color: #007AFF; */
	}
	.scroll-view{
		white-space: nowrap;
		width: 750rpx;
		margin-right: 20rpx;
	}
	.content-item{
		width: 100%;
		height: 100vh;
		/* border: 1px solid red; */
		display: inline-block;
	}
	.image-bg{
		position: absolute;
		width: 100%;
		height: 100%;
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		filter: blur(20px);
		z-index: -9;
	}
	.user{
		margin-top: 300rpx;
		margin-left: 20rpx;
		color: #fff;
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}
	.user .img{
		width: 60rpx;
		height: 60rpx;
	}
	.img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.nickname{
		margin: 0 6rpx;
		color: #fff;
	}
	.comment{
		width: 90%;
		margin: 50rpx auto;
		padding: 20rpx;
		color: #fff;
		font-size: 36rpx;
		white-space: normal;
		position: absolute;
		border: 0;
		/* background-color: pink; */
	}
	.yinhao{
		font-size: 80rpx;
		color: #9C8C7F;
		margin-bottom: 20rpx;
	}
</style>