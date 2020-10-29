<template>
	<view class="video">
		<tab @tabItem='tabItem' @handleSearch='handleSearch' :currentIndex='currentIndex'/>
		<scroll-view scroll-x="true" class="scroll-view" style="width: 100%;">
			<block v-for="(item,index) in categoryList" :key='index'>
				<view class="scroll-item" @click="handleItem(item.id)">{{item.name}}</view>
			</block>
		</scroll-view>
	</view>
</template>
 
<script>
	import tab from '../../components/tab/tab.vue'
	import {getVideoCategory} from '../../service/video.js'
	export default{
		data(){
			return {
				currentIndex:3,
				categoryList:[]
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('login_token'))
			this._getVideoCategory(uni.getStorageSync('login_token'))
		},
		components: {
			tab,
		},
		methods:{
			// ------------------------事件监听-----------------------------
			handleSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			tabItem(index){
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
					case 2:{
						uni.redirectTo({
							url:'/pages/yunComment/yunComment'
						})
						break
					}
				}
			},
			handleItem(id){
				console.log(id)
			},
			// ------------------------网络请求-----------------------------
			_getVideoCategory(cookie){
				getVideoCategory(cookie).then(res=>{
					this.categoryList=res.data.data
					console.log(this.categoryList)
				})
			}
		},
	}
</script>

<style>
	.video{
		padding-left: 20rpx;
		box-sizing: border-box;
	}
	.scroll-view{
		width: 750rpx;
		margin-right: -20rpx;
		margin-top: 200rpx;
		white-space: nowrap;
		/* background-color: pink; */
	}
	.scroll-item{
		display: inline-block;
		/* width: 100rpx; */
		height: 90rpx;
		padding: 0 20rpx;
		text-align: center;
		line-height: 90rpx;
	}
</style>
