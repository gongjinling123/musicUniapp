<template>
	<view class="play">
		<!-- 音乐播放背景 -->
		<image :src="song.al.picUrl" class="background_img"></image>
		<view class="play-row">
			<view class="play-title">
				<view class="title-back" @click="handleBack">
					<image src="../../static/image/play_back.png"></image>
				</view>
				<view class="singer-info">
					<view class="title-songName">
						{{song.name}}
					</view>
					<view class="title-singer">
						<text v-for="(item,index) in song.ar" 
							  :key='index' 
							  class="singer-name-text">
							  {{item.name}}
						</text>
					</view>
				</view>
			</view>
			<view class="play-body" @click="showLyric">
				<!-- 歌词 -->
				<scroll-view scroll-y="true" 
							 scroll-with-animation="true" 
							 :scroll-top="marginTop" 
							 :hidden='hiddenLyric'
							 class="body-scroll" >
					<view class="contentText">
						<view class="contentText-noLyric" v-if="noLyric==true">
							纯音乐，无歌词
						</view>
						<block v-for="(item,index) in storyContent" :key='index'>
							<view class="lyric">
								<view class="lyric-text" 
									  :class="currentIndex==index?'currentTime':''">
									  {{item[1]}}
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
				<!-- 转动动画 -->
				<view :hidden='!hiddenLyric' class="animate-box">
					<image src="../../static/image/play_stick.png" 
						   mode="aspectFill" 
						   class="body-record" 
						   :style="isPlay?'':'transform:rotate(-40deg)'">
					</image>
					<view class="body-round run" 
						  :style="isPlay?'animation-play-state:running;':'animation-play-state:paused;'">
						<view class="round-container">
							<image class="round-img" src="https://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48="></image>
							<image class="singer-img" :src="song.al.picUrl"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部播放暂停图标 -->
		<view class="play-foot">
			<view class="page-slider">
				<view class="">
					{{currentTime}}
				</view>
				<slider class="slider-middle" 
						@touchend="end" 
						@touchstart='start' 
						:max="totalProcessNum" 
						min="0" 
						backgroundColor="rgba(255,255,255,.3)"
						activeColor="rgba(255,255,255,.8)"
						:value="currentProcessNum"
						block-size="12"/>
				<view class="">
					{{duration}}
				</view>
			</view>
			
			<!-- 上一首 -->
			<view class="play-suspend">
				<view class="collect">
					<text class="iconfont icon-shoucang"></text>
				</view>
				<view class="icon-playing">
					<image src="../../static/image/play_lastSong.png" class="icon-play" @tap="beforeSong"></image>
				</view>
				<view class="icon-playing">
				<!-- 暂停 -->
					<image src="../../static/image/play_suspend.png" class="img-play" :hidden="!isPlay" @tap="toggleBGAudio"></image>
				<!-- 播放 -->
					<image src="../../static/image/play_play.png" class="img-play" :hidden='isPlay' @tap="toggleBGAudio"></image>
				</view>
				<!-- 下一首 -->
				<view class="icon-playing">
					<image src="../../static/image/play_nextSong.png" class="icon-play" @tap="nextSong"></image>
				</view>
				<view class="comment" @click="handleComment">
					<text class="iconfont icon-pinglun"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getSongDetail,getLyric,getSongUrl} from '../../service/play.js'
	import app from '../../App.vue'
	export default{
		data(){
			return {
				musicId:-1,//音乐id
				isPlay:true,//歌曲是否播放
				song:[],//歌曲信息
				hiddenLyric:true,//是否隐藏歌曲
				backgroundAudioManager:{},//背景对象
				duration:'',//音乐总时长 00:00
				currentTime:'00:00',//当前播放音乐时间
				totalProcessNum:0,//总音乐时间 秒
				currentProcessNum:0,//当前音乐时间 秒
				storyContent:[],//歌词文稿数组，转化完成用来在页面使用
				marginTop:0,//文稿滚动距离
				currentIndex:0,//当前播放第几行
				noLyric:false,//是否有歌词
				slide:false//进度条是否在滑动
			}
		},
		onLoad(options) {
			this.play(options.music)
		},
		methods:{
			// ------------------------事件监听---------------------------------
			// 返回上一级
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 点击切换歌词和封面
			showLyric(){
				this.hiddenLyric=!this.hiddenLyric
			},
			// 拖动进度条 开始
			start(){
				this.slide=true
			},
			// 拖动进度条 结束
			end(e){
				console.log(e)
				const position=e.changedTouches[0].pageX-e.currentTarget.offsetLeft
				// 获取背景音频实例
				let backgroundAudioManager=this.backgroundAudioManager
				this.currentProcessNum=position
				this.slide=false
				// 改变歌曲进度
				backgroundAudioManager.seek(position)
				// 判断当前是多少行
				for(let i=0;i<this.storyContent.length;i++){
					// 当前时间与前一行、后一行时间作比较，i表示当前行数
					if(position<parseFloat(this.storyContent[i][0])){
						this.currentIndex=i-1
						return
					}
				}
			},
			// 上一首（播放历史歌单）
			beforeSong(){
				if(app.globalData.history_songId.length>1){
					// 删除正在播放的歌曲，返回该歌曲的ID
					const history_songId=app.globalData.history_songId.pop()
					// 把该歌曲插入到待播放列表的前面
					app.globalData.waitForPlaying.unshift(history_songId)
					// 播放历史歌单
					this.play(app.globalData.history_songId[app.globalData.history_songId.length-1])
				}else{
					uni.showToast({
						title:'没有歌曲了'
					})
				}
			},
			// 下一首（播放待播放的歌单）
			nextSong(){
				if (app.globalData.waitForPlaying.length > 0) {
					const waitForPlayingId=app.globalData.waitForPlaying.shift()//删除待放列表第一个元素并返回播放
				    this.play(waitForPlayingId)//播放待播放歌单中的第一首歌曲
				} else {
					uni.showToast({
						title:'后面没有歌曲了'
					})
				}
			},
			// 播放与暂停
			toggleBGAudio(){
				const backgroundAudioManager=this.backgroundAudioManager
				if(this.isPlay){
					// 暂停
					backgroundAudioManager.pause()
				}else{
					backgroundAudioManager.play()
				}
				this.isPlay=!this.isPlay
			},
			// 评论
			handleComment(){
				uni.navigateTo({
					url:`/pages/comment/comment?musicId=${this.musicId}`
				})
			},
			// ------------------------网络请求-----------------------------------
			_getSongDetail(ids){
				getSongDetail(ids).then(res=>{
					app.globalData.songName=res.data.songs[0].name
					this.song=res.data.songs[0]
					this._getLyric(ids)
				})
			},
			// 获取到歌曲音频，则显示歌曲名、歌手信息等，否则播放失败
			_getLyric(id){
				getLyric(id).then(res=>{
					if(res.data.nolyric||res.data.uncollected){
						// 没有歌词
						this.noLyric=true
					}else{
						// 有歌词
						this.storyContent=this.sliceNull(this.parseLyric(res.data.lrc.lyric))
					}
				})
			},
			//通过音乐ID获取音乐的地址
			_getSongUrl(id){
				getSongUrl(id).then(res=>{
					console.log(res)
					this.createBackgroundAudioManager(res.data.data[0])
				})
			},
			play(musicId){
				this.musicId=musicId
				app.globalData.musicId=musicId
				this._getSongDetail(this.musicId)
				this._getSongUrl(this.musicId)
			},
			 // 背景音频播放方法
			createBackgroundAudioManager(res){
				console.log(this)
				// 背景音频，不是游戏的背景音乐，而是类似QQ音乐那样，App在后台时，仍然在播放音乐
				const backgroundAudioManager=uni.getBackgroundAudioManager()
				if(res.url!=null){
					if(backgroundAudioManager.src!=res.url){
						// 首次放歌或切换歌曲
						this.currentTime='00:00'
						this.currentProcessNum=0
						this.marginTop=0
						this.currentIndex=0
						backgroundAudioManager.title=this.song.name
						backgroundAudioManager.singer=this.song.ar[0].name 
						backgroundAudioManager.coverImgUrl=this.song.al.picUrl 
						backgroundAudioManager.src=res.url 
						let musicId=this.musicId
						app.globalData.history_songId=this.unique(app.globalData.history_songId,musicId)//去掉重复的音乐
					}
						this.isPlay=true
						this.backgroundAudioManager=backgroundAudioManager
				}
				app.globalData.backgroundAudioManager=backgroundAudioManager
				// 监听背景音乐进度更新事件
				backgroundAudioManager.onTimeUpdate(()=>{
					this.totalProcessNum=backgroundAudioManager.duration
					this.currentTime=this.formatSecond(backgroundAudioManager.currentTime)
					this.duration=this.formatSecond(backgroundAudioManager.duration)
					if(!this.slide){
						//如果进度条在滑动，就暂停更新进度条进度，否则会出现进度条进度来回闪动
						this.currentProcessNum=backgroundAudioManager.currentTime
					}
					if(!this.noLyric){
						// 如果没有歌词，就不需要调整歌词位置
						this.lyricsRolling(backgroundAudioManager)
					}
				})
				backgroundAudioManager.onEnded(()=>{
					//监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
					this.nextSong()
				})
				console.log('待放', app.globalData.waitForPlaying)
				console.log('历史', app.globalData.history_songId)
			},
			// 格式化歌曲
			parseLyric(text){
				let result=[]
				let lines=text.split('\n')//换行
				let pattern = /\[\d{2}:\d{2}.\d+\]/g;//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
				// console.log(lines)
				// 去掉不含时间的行
				while(!pattern.test(lines[0])){
					lines=lines.slice(1)//slice不会改变原数组，splice会改变原数组
				}
				// 使用'\n'生成数组时,最后一个为空元素，要去掉最后一个元素
				lines[lines.length-1].length===0&&lines.pop()//删除数组的最后一个元素
				lines.forEach(function(v,i,a){
					// v:数组元素值  i:元素索引  a:数组本身
					// 提取出时间[xx:xx.xx]
					var time=v.match(pattern)//返回指定的值
					// 提取歌词
					let value=v.replace(pattern,'')
					 // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
					 time.forEach(function(v1,i1,a1){
						 // 去掉时间里的中括号 xx:xx.xx
						 var t = v1.slice(1,-1).split(':')
						 result.push([parseInt(t[0],10)*60+parseFloat(t[1]),value])
						 // console.log(parseInt(t[0],10)*60,'===',parseFloat(t[1]),value)
					 })
				})
				// 将结果按时间大小进行排序
				result.sort(function(a,b){
					return a[0]-b[0]
				})
				return result
			},
			// 去掉空白行
			sliceNull(lrc){
				let result=[]
				for(var i=0;i<lrc.length;i++){
					if(lrc[i][1]!==''){
						result.push(lrc[i])
					}
				}
				return result
			},
			// 格式化时间
			formatSecond(second){
				var secondType=typeof second
				if(secondType=='number'||secondType=='string'){
					second=parseInt(second)
					var minute=Math.floor(second/60)
					second=second-minute*60
					return ("0"+minute).slice(-2)+":"+("0"+second).slice(-2)
				}else{
					return '00:00'
				}
			},
			// 歌词滚动
			lyricsRolling(backgroundAudioManager){
				this.marginTop=(this.currentIndex-3)*39
				// 改变对应歌词的颜色
				if(this.currentIndex!=this.storyContent.length-1){
					// 不是最后一行
					for(var i=this.currentIndex;i<this.storyContent.length;i++){
						// 当前时间与前一行，后一行时间作比较，i:当前行数
						if(this.currentIndex==this.storyContent.length-2){// 倒数第二行
							// 最后一行与前一行时间比较
							if(parseFloat(backgroundAudioManager.currentTime)>parseFloat(this.storyContent[i][0]) 
							&& parseFloat(backgroundAudioManager.currentTime) < parseFloat(this.storyContent[i + 1][0])){
								this.currentIndex=i
								return
							}
						}
					}
				}
			},
		
			// 去掉重复的歌曲
			unique(arr,musicId){
				let index=arr.indexOf(musicId)
				if(index!=-1){
					// 如果已经存在在历史播放中，则删除老记录，存入新记录
					arr.splice(index,1)
					arr.push(musicId)
				}else{
					// 如歌不存在，则直接存入历史歌单
					arr.push(musicId)
				}
				return arr
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.background_img{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		/* 高斯模糊 */
		filter: blur(30px) brightness(50%);
		z-index: -1;
		transform: scale(1.5);
	}
	.play-row{
		width: 100wh;
		height: 100vh;
	}
	.play-title{
		padding: 90rpx 30rpx;
		display: flex;
		align-items: center;
	}
	.title-back{
		width: 50rpx;
		height: 50rpx;
	}
	.title-back image{
		width: 100%;
		height: 100%;
	}
	.singer-info{
		color: #fff;
		margin-left: 40rpx;
		font-size: 36rpx;
	}
	.title-songName{
		max-width: 400rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.title-singer{
		font-size: 28rpx;
		margin-top: 10rpx;
		color: #8F8F94;
	}
	.play-body{
		width: 750rpx;
		height: 814rpx;
		overflow: scroll;
	}
	.body-scroll{
		height: 100%;
	}
	.contentText-noLyric{
		text-align: center;
		margin-top: 200rpx;
		color: rgba(255,255,255,1);
	}
	.lyric{
		display: flex;
		justify-content: center;
		color: rgba(255,255,255,0.6);
		font-size: 28rpx;
		padding: 20rpx 40rpx;
	}
	.lyric-text{
		text-align: center;
	}
	.currentTime{
		color: rgba(255,255,255,1);
	}
	.body-record{
		width: 250rpx;
		height: 250rpx;
		position: absolute;
		left: 43%;
		top: 0;
		z-index: 100;
		background-size: contain;
		transform-origin: 4vw 4vw;
		transition: transform 1s ease 0s;
	}
	.animate-box{
		/* background-color: pink; */
		position: fixed;
		left: 0;
		right: 0;
	}
	.run{
		animation: run 25s linear infinite;
	}
	/* 
	run:定义的动画名称
	1s:动画时间
	linear:动画以何种运动轨迹完成一个周期
	infinite:规定动画应该无限次播放 
	*/
	@keyframes run{
		0% {
			-webkit-transform:rotate(0deg)
		}
		25% {
			-webkit-transform:rotate(90deg)
		}
		50% {
			-webkit-transform:rotate(180deg)
		}
		75% {
			-webkit-transform:rotate(270deg)
		}
		100% {
			-webkit-transform:rotate(360deg)
		}
	}
	.body-round{
		width: 100wh;
		height: 814rpx;
		/* background-color: red; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.round-container{
		width: 630rpx;
		height: 630rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.round-img{
		width: 630rpx;
		height: 630rpx;
		position: absolute;
	}
	.singer-img{
		width: 580rpx;
		height: 580rpx;
		border-radius: 50%;
	}
	.play-foot{
		width: 750rpx;
		height: 250rpx;
		position: fixed;
		bottom: 0;
	}
	.page-slider{
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(255,255,255,0.8);
		font-size: 28rpx;
	}
	.slider-middle{
		width: 65%;
	}
	.play-suspend{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.icon-playing{
		margin: 30rpx;
	}
	.icon-play{
		width: 60rpx;
		height: 60rpx;
	}
	.img-play{
		width: 100rpx;
		height: 100rpx;
	}
	.comment,
	.collect{
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		/* background-color: red; */
	}
	.icon-pinglun,
	.icon-shoucang{
		font-size: 60rpx;
	}
</style>
