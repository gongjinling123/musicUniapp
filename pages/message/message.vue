<template>
	<view class="message">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">信息</text>
		</view>
		<view class="message-recommend">
			<block v-for="(item,index) in recommend" :key='index'>
				<view class="recommend-item" @click="handleItem(index)">
					<image :src="item.image"></image>
					<view>{{item.title}}</view>
				</view>
			</block>
		</view>
		<view class="message-body">
			<view class="title">私信对话</view>
			<view class="user-row">
				<block v-for="(item,index) in userMsg" :key='index'>
					<view class="user-item" @click="handleMsg(item[0].userId)">
						<view class="item-img">
							<image :src="item[0].avatarUrl" mode=""></image>
						</view>
						<view class="item-desc">
							<view class="user">
								<text class="user-name">{{item[0].nickname}}</text>
								<text class="user-msg">{{item[0].lastMsg}}</text>
							</view>
							<view class="time">
								<view class="last-time">
									<text>{{item[0].lastMsgTime}}</text>
								</view>
								<!-- <block v-if="item[0].newMsgCount!=0">
									<view class="last-count">
										<text>{{item[0].newMsgCount}}</text>
									</view>
								</block> -->
							</view>
						</view>
						
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {getPrivate,getPrivateMsg} from '../../service/message.js'
	export default{
		data(){
			return {
				my_id:uni.getStorageSync('userId'),
				recommend:[
					{
						image:'../../static/image/find_radio.png',
						title:'写信息'
					},
					{
						image:'../../static/image/find_radio.png',
						title:'粉丝'
					},
					{
						image:'../../static/image/find_radio.png',
						title:'@我'
					},
					{
						image:'../../static/image/find_radio.png',
						title:'通知'
					}
				],
				messageAll:[],
				userMsg:[]
			}
		},
		onLoad() { 
			this._getPrivateMsg(uni.getStorageSync('login_token'))
			// this._getPrivate('3924713849',uni.getStorageSync('login_token'))
		},
		methods:{
			// -------------------------事件监听-----------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				}) 
			},
			handleMsg(id){
				console.log(id)
				uni.navigateTo({
					url:`/pages/message/child/userMessage?id=${id}`
				})
			},
			handleItem(index){
				switch(index){
					case 0:{
						uni.navigateTo({
							url:'./child/writeMessage'
						})
						break
					}
					case 1:{
						uni.navigateTo({
							url:'/pages/fans/fans'
						})
						break
					}
				}  
			}, 
			// 时间戳转换为北京时间
			timestampToTime(timestamp) {
				var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				// var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			 
				var strDate = M+D+h+m+s;
				// console.log(strDate)
				return strDate
			},
			// -------------------------网络请求-----------------------------------
			// 私信的用户 
			_getPrivateMsg(cookie){
				getPrivateMsg(cookie).then(res=>{
					console.log(res)
					this.messageAll=res.data.msgs
					for(var i=0;i<this.messageAll.length;i++){
						if(this.my_id==this.messageAll[i].fromUser.userId){
							// 我是发信息的一方，从toUser对象中获取收信息人的头像、id、昵称、最新的信息，时间，未读数
							let avatarUrl=this.messageAll[i].toUser.avatarUrl
							let userId=this.messageAll[i].toUser.userId
							let nickname=this.messageAll[i].toUser.nickname
							let lastMsg=JSON.parse(this.messageAll[i].lastMsg).msg
							let lastMsgTime=this.timestampToTime(this.messageAll[i].lastMsgTime )
							let newMsgCount=this.messageAll[i].newMsgCount
							let arr=[
								{
									'avatarUrl':avatarUrl,
									'userId':userId,
									'nickname':nickname,
									'lastMsg':lastMsg,
									'lastMsgTime':lastMsgTime,
									'newMsgCount':newMsgCount
								}                          
							]
							this.userMsg.push(arr)
						}else{
							let avatarUrl=this.messageAll[i].fromUser.avatarUrl
							let userId=this.messageAll[i].fromUser.userId
							let nickname=this.messageAll[i].fromUser.nickname
							let lastMsg=JSON.parse(this.messageAll[i].lastMsg).msg
							let lastMsgTime=this.timestampToTime(this.messageAll[i].lastMsgTime ) 
							let newMsgCount=this.messageAll[i].newMsgCount
							let arr=[
								{
									'avatarUrl':avatarUrl,
									'userId':userId,
									'nickname':nickname,
									'lastMsg':lastMsg,
									'lastMsgTime':lastMsgTime,
									'newMsgCount':newMsgCount
								}
							]
							this.userMsg.push(arr)
						}
						// console.log(this.userMsg)
					}
					
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.message{
		width: 100%; 
		box-sizing: border-box;
		margin: 0 auto;
		background-color: #F5F5F5; 
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
	.message-recommend{
		margin-top: 180rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
	}
	.recommend-item image{
		width: 120rpx;
		height: 120rpx;
	}
	.recommend-item view{
		text-align: center;
		color: #595959;
	}
	.message-body{
		width: 100%;
		height: 900rpx;
		/* background-color: #007AFF; */
	}
	.title{
		height: 80rpx;
		line-height: 80rpx;
		color: #535353;
		font-size: 28rpx;
		/* background-color: red; */
	}
	.user-row{
		width: 100%;
		height: 900rpx;
		background-color: #fff;
	}
	.user-item{
		width: 95%;
		height: 120rpx;
		padding: 10rpx 0;
		margin: 0 auto;
		display: flex;
	}
	.item-img{
		width: 100rpx;
		height: 80rpx;
		/* background-color: red; */
	}
	.item-img image{
		width: 100%;
		height: 100%;
		margin-top: -5rpx;
		border-radius: 50%;
	}
	.item-desc{
		flex: 1;
		display: flex;
		margin-left: 20rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.user{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.user-name{
		flex: 1;
		display: flex;
		align-items: center;
		color: #303030;
		font-size: 36rpx;
		font-weight: 600;
	}
	.user-msg{
		width: 450rpx; 
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		color: #929292;
		font-size: 24rpx;
	}
	.time{
		width: 170rpx;
		/* background-color: pink; */
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.last-time{
		font-size: 20rpx;
		flex: 1;
		/* background-color: pink; */
	}
	.last-count{
		font-size: 20rpx;
		flex: 1;
	}
	.last-count text{
		padding: 10rpx;
		border-radius: 50%;
		color: #fff;
		background-color: red;
	}
</style>
