<template>
	<view class="userMessage">
		<view class="message-body">
			<view class="message-user">
				<view class="tab" @click="handleBack">
					<text class="iconfont icon-fanhui icon-tab"></text>
					<text class="tab-title">{{userMsg[0][0].tU_nickname}}</text>
				</view>
				<block v-for="(item,index) in userMsg" :key='index'>
					<view class="time">
						<text>{{item[0].time}}</text>
					</view>
					<block v-if='my_id==item[0].fU_userId'>
						<view class="right">
							<view class="right-re">
								<view class="fU_msg">
									<view class="fU-msg-img">
										<text class="iconfont icon-jiantou"></text>
									</view>
									<text class="msg">{{item[0].msg}}</text>
								</view>
								<view class="user_img">
									<image :src="item[0].fU_avatarUrl" mode=""></image>
								</view>
							</view>
						</view>
					</block>
					<block v-else> 
						<view class="left">
							<view class="left-re">
								<view class="user_img">
								<image :src="item[0].fU_avatarUrl" mode=""></image>
								</view>
								<view class="tU_msg">
									<view class="tU-msg-img">
										<text class="iconfont icon-jiantou-copy "></text>
									</view>
									<text class="msg">{{item[0].msg}}</text>
								</view>
							</view>
						</view>
					</block>
				</block>
			</view>
		</view>
		<view class="message-send">
			<textarea type="text" v-model="sendContent" placeholder="写私信" class="send-inp"/>
			<view class="send-icon" @click="handleSend">
				<text class="iconfont icon-fasong"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getSend,getPrivate,getMsg} from '../../../service/message.js'
	export default{
		data(){
			return {
				my_id:uni.getStorageSync('userId'),
				messageAll:[],
				userMsg:[],
				sendContent:''
			}
		},
		onLoad(option) {
			this.ScrollPosition()
			// this._getSend('3924713849',this.sendContent,uni.getStorageSync('login_token'))
			this._getPrivate(option.id,uni.getStorageSync('login_token'))
			// this._getMsg(uni.getStorageSync('login_token'))
		},
		methods:{
			// -------------------------事件监听-----------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				}) 
			},
			ScrollPosition(){
				let that=this
				uni.createSelectorQuery().select('.message-user').boundingClientRect(function(res){
					console.log('标签获取--------',res)
					uni.pageScrollTo({
						scrollTop:2200,
						duration:100
					})
				}).exec()
			},
			// 时间戳转换为北京时间
			timestampToTime(timestamp) {
				var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
				 
				var strDate = Y+M+D+h+m+s;
				// console.log(strDate)
				return strDate
			},
			handleSend(){
				this._getSend('3924713849',this.sendContent,uni.getStorageSync('login_token'))
				this.sendContent=''
				uni.showToast({
					title:'发送成功'
				})
			},
			// -------------------------网络请求-----------------------------------
			_getSend(user_ids,msg,cookie){
				getSend(user_ids,msg,cookie).then(res=>{
					console.log(res,'发送私信')
				})
			}, 
			_getPrivate(uid,cookie){
				getPrivate(uid,cookie).then(res=>{  
					
					// console.log(res,'获取发送和接收的私信')
					this.messageAll=res.data.msgs
					
					// 获取私信的相关信息
					for(var i=0;i<this.messageAll.length;i++){
						let fU_nickname
						let tU_nickname
						if(this.messageAll[i].fromUser.userId==this.my_id){
							 fU_nickname=this.messageAll[i].fromUser.nickname
							 tU_nickname=this.messageAll[i].toUser.nickname
						}else{
							 tU_nickname=this.messageAll[i].fromUser.nickname
							 fU_nickname=this.messageAll[i].toUser.nickname
						}
						let fU_userId=this.messageAll[i].fromUser.userId
						let fU_avatarUrl=this.messageAll[i].fromUser.avatarUrl
						let tU_userId=this.messageAll[i].toUser.userId
						let tU_avatarUrl=this.messageAll[i].toUser.avatarUrl
						let msg=JSON.parse(this.messageAll[i].msg).msg
						let time=this.timestampToTime(this.messageAll[i].time)
						let arr=[
							{
								'fU_userId':fU_userId,
								'fU_avatarUrl':fU_avatarUrl,
								'fU_nickname':fU_nickname,
								'tU_userId':tU_userId,
								'tU_avatarUrl':tU_avatarUrl,
								'tU_nickname':tU_nickname,
								'msg':msg,
								'time':time,
							}
						]  
						
						// 131:3906297049
						// 134:3924713849
						// 云音乐小秘书:9003
						// console.log(fU_userId,'--------------',tU_userId)
						this.userMsg.unshift(arr)
					}
					console.log(this.userMsg)
				})
			},  
			_getMsg(cookie){  
				getMsg(cookie).then(res=>{
					console.log(res,'getMsg')
				})
			}
		}
	}
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");
	.userMessage{
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
	
	.message-body{
		padding: 0 50rpx 120rpx;
	}
	.message-user{
		min-height: 800rpx;
		margin-top: 140rpx;
		background-color: #fff;
		padding-bottom: 200rpx;
	}
	.time{
		height: 80rpx;
		line-height: 80rpx;
		font-size: 20rpx;
		text-align: center;
		/* background-color: #007AFF; */
	}
	.time text{
		background-color: #ccc;
		padding: 6rpx 10rpx;
		border-radius: 50rpx;
	}
	.left{
		width: 100%;
		min-height: 100rpx;
		font-size: 20rpx;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
	.left-re{
		position: relative;
		width: 100%;
		font-size: 20rpx;
		display: flex;
		align-items: center;
	}
	.left .user_img{
		width: 60rpx;
		height: 60rpx;
		vertical-align: middle;
		position: absolute;
		left: 20rpx;
	}
	.tU_msg {
		max-width: 400rpx;
		position: absolute;
		left: 100rpx;
		background-color: #ccc;
		padding: 10rpx 18rpx;
		border-radius: 10rpx;
	}
	.tU_msg .msg{
		white-space: normal;
		word-break:break-all;
	}
	.tU-msg-img{
		color: #ccc;
		position: absolute;
		top: 50%;
		left: -15rpx; 
		transform: translateY(-50%);
	}
	.right{
		width: 100%;
		min-height: 100rpx;
		font-size: 20rpx;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
	.right-re{
		position: relative;
		width: 100%;
		font-size: 20rpx;
		display: flex;
		align-items: center;
	}
	.right .user_img{  
		width: 60rpx;
		height: 60rpx;
		vertical-align: middle;
		position: absolute;
		right: 20rpx;
	}
	.fU_msg .msg{
		max-width: 400rpx;
		white-space: normal;
		position: absolute;
		right: 100rpx;
		background-color: red;
		padding: 10rpx 18rpx; 
		color: #fff;
		border-radius: 10rpx;
	}
	.fU-msg-img{
		position: absolute;
		right: 83rpx; 
		color: red;
	}
	.user_img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.message-send{
		height: 90rpx;
		/* background-color: red; */
		border-top: 1rpx solid #ccc;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
	}
	.send-inp{
		flex: 1;
		height: 100%;
		padding-top: 20rpx;
		box-sizing: border-box;
		background-color: pink; 
	}
	.send-icon{
		width: 90rpx;
		line-height: 90rpx;
		text-align: center;
	}
	.send-icon text{
		font-size: 40rpx;
	}
</style>
