<template>
	<view class="find">
		<tab @tabItem='tabItem' @handleSearch='handleSearch' :currentIndex='currentIndex'/>
		<!-- 轮播图 -->
		<banner :banner="banners"></banner>
		<!-- 推荐 -->
		<recommend @handleItem='handleItem'></recommend>
		<!-- 第一层（精挑细选） -->
		<block v-if="blocks.length > 0">
			<song-list :blocks='blocks[0]' @handleSongList='handleSongList' @handleSong='handleSong'></song-list>
		</block> 
		<!-- 第二层（华语精选）-->
		<block v-if="blocks.length > 0">
			<song-card :blocks="blocks[1]" @playAll1='playAll1' @handleItem='handleItemSong'></song-card>
		</block>
		<!-- 第三层 -->
		<block v-if="blocks.length > 0">
			<song-list :blocks='blocks[2]' @handleSongList='handleSongList' @handleSong='handleSong'></song-list>
		</block>
		<!-- 第四层 -->
		<block v-if="blocks.length > 0">
			<song-ext-info :blocks="blocks[3]" @handleYun='handleYun'></song-ext-info>	
		</block>
		<!-- 第五层 -->
		<block v-if="blocks.length > 0">
			<song-ext-info5 :blocks="blocks[4]" @handleSongList='handleSongList'></song-ext-info5>
		</block>
		<!-- 第六层 -->
		<block v-if="blocks.length > 0">
			<song-new :blocks="blocks[5]" @handleTo='handleTo' @handlePlay='handlePlay'></song-new>
		</block>
		<!-- 第七层 -->
		<block v-if="blocks.length > 0">
			<song-card :blocks="blocks[6]" @playAll6='playAll6' @handleItem='handleItemSong'></song-card>
		</block>
		<!-- 第八层 -->
		<block v-if="blocks.length>0">
			<song-list :blocks="blocks[7]" @handleCheckMore='handleCheckMore'></song-list>		
		</block>

	</view>
</template>
 
<script>
	import tab from '../../components/tab/tab.vue'
	import banner from '../../components/banner/banner.vue'
	import recommend from '../../components/recommend/recommend.vue'
	import songList from '../../components/songList/songList.vue'
	import songCard from '../../components/songCard/songCard.vue'
	import songExtInfo from '../../components/songExtInfo/songExtInfo.vue'
	import songExtInfo5 from '../../components/songExtInfo5/songExtInfo5.vue'
	import songNew from '../../components/songNew/songNew.vue'
	
	import app from '../../App.vue'
	import {getMultiData,getHomePage} from '../../service/find.js'
	export default {
		data() {
			return {
				banners: [],
				blocks: [],
				currentIndex:1
			}
		},
		onLoad() { 
			// console.log(uni.getStorageSync('login_token'),'ffffffffffff')
		
			if(this.banners.length==0){
				this._getMultiData()
			}
			
			if (this.blocks.length == 0) {
				this._getHomePage()
			}
		},
		methods: {
			// ------------------------------事件监听-------------------------------------------
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
					case 2:{
						uni.redirectTo({
							url:'/pages/yunComment/yunComment'
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
			handleItem(index){
				console.log(index)
				switch(index){
					case 0:{
						uni.navigateTo({
							url:'/pages/recommend/recommend'
						})
						break
					}
					case 1:{
						uni.navigateTo({
							url:'/pages/songsList/songsList'
						})
						break
					}
					case 2:{
						uni.navigateTo({
							url:'/pages/rankList/rankList'
						})
						break
					}
					case 3:{
						uni.navigateTo({
							url:'/pages/radio/radio'
						})
						break
					}
					case 4:{
						uni.navigateTo({
							url:'/pages/album/album'
						})
						break
					}
					case 5:{
						uni.showToast({
							title:'开发中...'
						})
						break
					}
					case 6:{
						uni.showToast({
							title:'开发中...'
						})
						break
					}
					case 7:{
						uni.showToast({
							title:'开发中...'
						})
						break
					}
					case 8:{
						uni.showToast({
							title:'开发中...'
						})
						break
					}
				}
			},
			handleSong(id){
				uni.navigateTo({
					url:`/pages/songsDetail/songsDetail?id=${id}`
				})
			}, 
			handlePlay(id){
				uni.navigateTo({
					url:`/pages/play/play?music=${id}`
				})
			},
			playAll(playlist){
				let musicId=playlist[0].resources[0].resourceId
				for(var i=0;i<playlist.length;i++){
					for(var j=0;j<playlist[i].resources.length;j++){
						app.globalData.waitForPlaying.push(playlist[i].resources[j].resourceId)//等待播放的音乐
					}
				}
				let index=app.globalData.waitForPlaying.indexOf(musicId)
				app.globalData.waitForPlaying.splice(index,1)//在等待播放数组中删除已经播放的音乐
				
				// console.log(musicId)
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			handleItemSong(musicId){
				uni.navigateTo({
					url:`/pages/play/play?music=${musicId}`
				})
			},
			playAll1(){
				let playlist=this.blocks[1].creatives 
				this.playAll(playlist)
			},
			playAll6(){
				let playlist=this.blocks[6].creatives 
				this.playAll(playlist)
			}, 
			handleCheckMore(){
				uni.navigateTo({
					url:'/pages/radio/radio'
				})
			},
			handleTo(){
				uni.navigateTo({
					url:'/pages/rankList/rankList'
				})
			},
			handleYun(){
				uni.navigateTo({
					url:'/pages/yunComment/yunComment'
				})
			},
			handleSongList(){
				uni.navigateTo({
					url:'/pages/songsList/songsList'
				})
			},
			// ------------------------------网络请求-------------------------------------------
			_getMultiData(){
				getMultiData().then(res=>{
					this.banners = res.data.banners
				})
			},
			_getHomePage(){
				getHomePage().then(res=>{
					this.blocks=res.data.data.blocks
					console.log(this.blocks)
				})
			}, 
		
		},
		components: {
			tab,
			banner,
			recommend,
			songList,
			songCard,
			songExtInfo,
			songExtInfo5,
			songNew
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.find {
		padding: 20rpx;
	}

	
</style>
