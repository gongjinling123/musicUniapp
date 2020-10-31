<template>
	<view class="comment">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">评论({{total}})</text>
		</view> 
		<view class="songs">
			<view class="songs-img">
				<image :src="avatarUrl1"></image>
			</view>
			<view class="song-info">
				<text class="name">{{name}}</text>
				<text class="singer">{{singer}}</text>
			</view>
			<view class="icon-back" @click="handleBack">
				<text class="iconfont icon-fanhui1"></text>
			</view>
		</view>
		<view class="nav-comment">
			<view class="nav-comment-left">
				评论区
			</view>
			<view class="nav-comment-right">
				<block v-for="(item,index) in navTab" :key='index'>
					<view 
							class="nav-item" 
							:class="currentIndex==index?'active':''" 
							@click="handleItem(index)">
							{{item}}
					</view>
				</block>
			</view> 
		</view>
		<view class="comment-content">
			<block v-if="currentIndex==0">
				<comment-item 
								:comments="newComments" 
								:commentSupper='commentSupper'
								@handleComItem='handleComItem' 
								@handleMore='handleMore'
								@handleZan='handleZan'
								@handleDel='handleDel'
								@handleZanComment='handleZanComment'
								@handleComment='handleComment'/>
			</block>
			<block v-if="currentIndex==1">
				<comment-item 
								:comments="comments" 
								:commentSupper='commentSupper'
								@handleComItem='handleComItem' 
								@handleMore='handleMore'
								@handleZan='handleZan'
								@handleDel='handleDel'
								@handleZanComment='handleZanComment'
								@handleComment='handleComment'/>
			</block>
			<block v-if="currentIndex==2">
				<comment-item 
								:comments="hotComments" 
								:commentSupper='commentSupper'
								@handleComItem='handleComItem' 
								@handleMore='handleMore'
								@handleZan='handleZan'
								@handleDel='handleDel'
								@handleZanComment='handleZanComment'
								@handleComment='handleComment'/>
			</block>
			<view class="sendComment">
				<textarea :placeholder="userName==''?'随乐而起,有感而发':userName" v-model="msg" @longtap='handleCopy'/>
				<text class="iconfont icon-fasong" @click="handleSend"></text>
			</view>
		</view>
		
		
		<uni-popup ref="popup" type="bottom">
			<popComment 
						:content='content' 
						:avatarUrl='avatarUrl' 
						:nickname='nickname'
						:likedCount='likedCount'
						:reversionComments='reversionComments'
						:commentSupper='commentSupper'
						@handleSend='handleSendPopup'
						@closePop='closePop'
						@handleZan='handleZan'
						@handleDel='handleDel'
						@handleZanComment='handleZanComment'
						@handleComment='handleComment'/>
		</uni-popup>
	</view>
</template>

<script> 
	import {
		getSongDetail,
		getComment,
		getHotComment,
		getSendComment,
		getDelComment,
		getParentComment,
		getCommentLike} from '../../service/play.js'
	import commentItem from './child/commentItem.vue'
	import popComment from './child/popComment.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default{
		data(){
			return {
				name:'',
				avatarUrl1:'',
				singer:'',
				total:0,
				musicId:'',
				newComments:[],//最新评论
				comments:[],//推荐评论
				hotComments:[],//最热评论
				navTab:['最新','推荐','最热'],
				currentIndex:1,
				msg:'',
				commentId:'',
				userName:'',
				content:'',
				avatarUrl:'',
				nickname:'',
				likedCount:'',
				reversionComments:[],
				reversionId:'',
				commentSupper:uni.getStorageSync('commentSupper')||[],
				copyContent:''
			}
		},
		onLoad(option) {
			console.log(option.musicId)
			this.musicId=option.musicId
			this._getSongDetail(option.musicId)
			this._getComment(option.musicId)
			this._getHotComment(option.musicId)
		},
		components:{
			commentItem,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			popComment
		},
		methods:{
			//-----------------事件监听------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleItem(index){
				this.currentIndex=index
			},
			handleComItem(id,userName){
				this.commentId=id
				if(this.userName==userName){
					this.userName=''
				}else{
					this.userName=userName
				}
			},
			handleSend(){
				if(this.msg==''){
					uni.showToast({
						title:'请输入评论内容',
						icon:'none'
					})
					return
				}
				if(this.userName==''){
					// 发送评论
					this._getSendComment(uni.getStorageSync('login_token'),1,0,this.musicId,this.msg)
				}else{
					// 回复评论
					this._getSendComment(uni.getStorageSync('login_token'),2,0,this.musicId,this.msg,this.commentId)
				}
			},
			handleMore(id){
				this.$refs.popup.open()
				this.reversionId=id
				this._getParentComment(id,this.musicId,0)
			},
			handleSendPopup(msg){
				this._getSendComment(uni.getStorageSync('login_token'),2,0,this.musicId,msg,this.reversionId)
			},
			closePop(){
				this.$refs.popup.close()
			},
			handleZan(commentId){
				let commentSupper=uni.getStorageSync('commentSupper')||[]
				let index=commentSupper.indexOf(commentId)
				if(index!=-1){
					commentSupper.splice(index,1)
					uni.setStorageSync('commentSupper',commentSupper)
					this._getCommentLike(uni.getStorageSync('login_token'),this.musicId,commentId,0,0)
					uni.showToast({
						title:'取消点赞',
						icon:'none'
					})
				}else{
					commentSupper.push(commentId)
					this._getCommentLike(uni.getStorageSync('login_token'),this.musicId,commentId,1,0)
					uni.showToast({
						title:'点赞',
						icon:'none'
					})
					uni.setStorageSync('commentSupper',commentSupper)
				}
				this.commentSupper=commentSupper
			},
			handleDel(id){
				this._getDelComment(uni.getStorageSync('login_token'),0,0,this.musicId,id)
			},
			handleComment(content){
				console.log('handleComment','复制评论',content)
				this.copyContent=content
			},
			handleZanComment(id){
				this.handleZan(id)
			},
			handleCopy(){
				console.log('longtap',this.copyContent)
				this.msg=this.copyContent
			},
			//-----------------网络请求------------------------------
			_getSongDetail(ids){
				getSongDetail(ids).then(res=>{
					// console.log(res)
					this.name=res.data.songs[0].name
					this.avatarUrl1=res.data.songs[0].al.picUrl 
					this.singer=res.data.songs[0].ar[0].name
				})
			},
			_getComment(id){
				getComment(id).then(res=>{
					console.log(res.data.comments,'------------------------------------')
					this.total=res.data.total
					this.newComments=res.data.comments
					this.comments=res.data.hotComments
				})
			},
			_getHotComment(id){
				getHotComment(id,0).then(res=>{
					// console.log(res)
					this.hotComments=res.data.hotComments
				})
			},
			// 发送评论
			// t:1 发送；2 回复；0 删除
			// type:0:歌曲；1：mv;2:歌单；3：专辑；4：电台；5：视频；6：动态
			// id:对应资源 id
			// content :要发送的内容
			// commentId :回复的评论id (回复评论时必填)
			_getSendComment(cookie,t,type,id,content,commentId){
				getSendComment(cookie,t,type,id,content,commentId).then(res=>{
					console.log(res)
					if(res.data.code==200){
						this.msg=''
						this.userName=''
						uni.showToast({
							title:'发表成功'
						})
					}else{
						uni.showToast({
							title:'发表失败，请稍后再试',
							icon:'none'
						})
					}
				})
			},
			_getDelComment(cookie,t,type,id,commentId){
				getDelComment(cookie,t,type,id,commentId).then(res=>{
					// console.log(res,'getDelComment')
					if(res.data.code==200){
						uni.showToast({
							title:'删除成功'
						})
					}
				})
			},
			// 楼层评论（回复评论）
			//parentCommentId:楼层评论id
			// id：资源id
			// type：0：歌曲，1：MV，2：歌单，3：专辑，4：电台，5：视频
			_getParentComment(parentCommentId,id,type){
				getParentComment(parentCommentId,id,type).then(res=>{
					console.log(res,'---------------')
					this.content=res.data.data.ownerComment.content
					this.avatarUrl=res.data.data.ownerComment.user.avatarUrl
					this.nickname=res.data.data.ownerComment.user.nickname
					this.likedCount=res.data.data.ownerComment.likedCount 
					this.reversionComments=res.data.data.comments
				})
			},
			// 点赞评论
			// id:资源的id
			// cid:评论的id
			// t:是否点赞，1 为点赞；0 为取消点赞
			// type: 0 歌曲；1 MV；2 歌单；3 专辑；4 电台；5 视频；6 动态
			_getCommentLike(cookie,id,cid,t,type){
				getCommentLike(cookie,id,cid,t,type).then(res=>{
					console.log(res,'点赞')
				})
			}
			
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.comment{
		box-sizing: border-box;
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
	.songs{
		width: 100%;
		height: 200rpx;
		/* background-color: red; */
		margin: 150rpx 20rpx 0;
		display: flex;
	}
	.songs-img{
		width: 180rpx;
		height: 180rpx;
	}
	.songs-img image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.song-info{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.name{
		flex: 1;
		line-height: 100rpx;
	}
	.singer{
		flex: 1;
		font-size: 24rpx;
		color: blue;
	}
	.icon-back{
		width: 90rpx;
		height: 180rpx;
		text-align: center;
		line-height: 180rpx;
	}
	.nav-comment{
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 20rpx;
		/* background-color: red; */
	}
	.nav-comment-left{
		font-weight: 600;
	}
	.nav-comment-right{
		width: 250rpx;
		color: #979797;
		padding-right: 30rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: space-around;
	}
	.active{
		color: #343434;
		font-weight: 600;
	}
	.comment-content{
		width: 100%;
		/* background-color: #007AFF; */
		padding: 20rpx;
		padding-bottom: 90rpx;
	}
	
	.sendComment{
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		display: flex;
	}
	.sendComment textarea{
		flex: 1;
		height: 100%;
		background-color: #ccc; 
		overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.sendComment text{
		width: 90rpx;
		height: 100%;
		line-height: 90rpx;
		text-align: center;
		font-size: 40rpx;
		color: red;
		/* background-color: red; */
	}
	
</style>
