<template>
	<view class="">
		<scroll-view scroll-y="true" style="height: 1190rpx;" class="popComment">
			<view class="ownerComment">
				<view class="ownerComment-top" @click="closePop">
					<text class="iconfont icon-fanhui"></text>
					<text>回复（{{reversionComments.length}}）</text>
				</view>
				<view class="ownerComment-body">
					<view class="user-info">
						<view class="user-img">
							<image :src="avatarUrl"></image>
						</view>
						<view class="user-name">{{nickname}}</view>
						<view class="likedCount">
							<block v-if="likedCount!=0">
								<text>{{likedCount}}</text>
							</block>
							<text class="iconfont icon-zan"></text>
						</view>
					</view>
					<view class="comment-title">
						{{content}}
					</view>
				</view>
			</view>
			
			<view class="commentAll">
				<view class="commentAll-top">全部回复</view>
				<view class="commentAll-body">
					<block v-for="(item,index) in reversionComments" :key='index'>
						<view class="comment-item" @longtap.stop='longtap(item.user.userId,item.content,item.commentId)'>
							<view class="user-info">
								<view class="user-img">
									<image :src="item.user.avatarUrl"></image>
								</view>
								<view class="user-name">
									{{item.user.nickname}} 
								</view>
								<view class="likedCount" 
									  @click.stop="handleZan(item.commentId)" 
									  :class="commentSupper.indexOf(item.commentId)!=-1?'active':''">
									<block v-if="item.likedCount!=0">
										<text>{{item.likedCount}}</text>
									</block>
									<text class="iconfont icon-zan"></text>
								</view>
							</view>
							<view class="comment-title">
								{{item.content}}
							</view>
						</view>
					</block>
				</view>
			</view>
		</scroll-view>
		<view class="sendComment">
			<textarea value="" placeholder='随乐而起,有感而发' v-model="msg"  @longtap='handleCopy'/>
			<text class="iconfont icon-fasong" @click="handleSend"></text>
		</view>
		
		<uni-popup ref="theirPopup" type="center">
			<view class="toast">
				<block v-for="(item,index) in theirComment" :key='index'>
					<view class="toast-item" @click="handleToastItem(index)">{{item}}</view>
				</block>
			</view>
		</uni-popup>
		<uni-popup ref="myPopup" type="center">
			<view class="toast">
				<block v-for="(item,index) in myComment" :key='index'>
					<view class="toast-item" @click="handleToastItem(index)">{{item}}</view>
				</block>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				msg:'',
				theirComment:['赞赏评论','复制评论'],
				myComment:['赞赏评论','复制评论','删除评论'],
				commentId:'',
				contentComment:'',
				myId:uni.getStorageSync('userId')
			}
		}, 
		props:{
			content:{
				type:String
			},
			avatarUrl:{
				type:String
			},
			nickname:{
				type:String
			},
			likedCount:{
				type:Number
			},
			reversionComments:{
				type:Array
			},
			commentSupper:{
				type:Array
			}
		},
		methods:{
			closePop(){
				this.$emit('closePop')
			},
			handleSend(msg){
				if(this.msg==''){
					uni.showToast({
						title:'请输入评论内容',
						icon:'none'
					})
					return
				}
				this.$emit('handleSend',this.msg)
				this.msg=''
			},
			handleZan(commentId){
				this.$emit('handleZan',commentId)
			},
			longtap(id,content,commentId){
				this.commentId=commentId
				this.contentComment=content
				if(id==this.myId){
					this.$refs.myPopup.open()
				}else{
					this.$refs.theirPopup.open()
				}
			},
			handleToastItem(index){
				switch(index){
					case 0:{
						this.$emit('handleZanComment',this.commentId)
						break
					}
					case 1:{
						this.$emit('handleComment',this.contentComment)
						break
					}
					case 2:{
						this.$emit('handleDel',this.commentId)
						break
					}
				}
				this.$refs.myPopup.close()
				this.$refs.theirPopup.close()
			},
			handleCopy(){
				this.msg=this.contentComment
			},
		}
	}
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");
	.popComment{
		width: 100%;
		background-color: #fff;
		padding-left: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx 20rpx 0 0;
		padding-bottom: 100rpx;
	}
	
	.ownerComment-top{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
	}
	.icon-fanhui{
		font-size: 40rpx;
		margin-right: 20rpx;
		vertical-align: middle;
	}
	
	.ownerComment-body{
		margin-top: 10rpx;
		padding-bottom: 10rpx;
		padding-top: 90rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 8rpx solid #F6F6F6;
	}
	.comment-item{
		margin-top: 10rpx;
		padding-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 2rpx solid #EEEEEE;
	} 
	.user-info{
		display: flex;
	}
	.comment-title{
		width: 600rpx;
		/* background-color: green; */
		margin-left: 90rpx;
	}
	.user-img{
		width: 90rpx;
		height: 90rpx;
		
	}
	.user-img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user-name{
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 10rpx;
		color: #585858;
	}
	.likedCount{
		width: 200rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #909090;
		font-size: 26rpx;
	}
	.icon-count{
		margin-left: 8rpx;
	}
	
	.commentAll{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		font-weight: 600;
		font-size: 30rpx;
	}
	
	.sendComment textarea{
		flex: 1;
		height: 100%;
		background-color: #ccc; 
		overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
		z-index: 999;
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
	.active{
		color: red;
	}
	.toast{
		width: 300rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	.toast-item{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
	}
</style>
