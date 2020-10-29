<template>
	<view class="writeMessage">
		<view class="tab" @click="handleBack">
			<text class="iconfont icon-fanhui icon-tab"></text>
			<text class="tab-title">写信息</text>
		</view>
		<view class="writeMessage-body">
			<view class="to-user">
				<text>收信人ID:</text>
				<input type="number" value="" v-model="user_ids"/>
				<text class="iconfont icon-daohanglan-05"></text>
			</view>
			<view class="msg-content">
				<textarea value="" placeholder="写私信" v-model="msg"/>
				<text class="iconfont icon-fasong" @click="handleSend"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getSend} from '../../../service/message.js'
	export default{
		data(){
			return {
				cookie:uni.getStorageSync('login_token'),
				msg:'',
				user_ids:'',
			}
		},
		onLoad() {
			
		}, 
		methods:{
			// ----------------------事件监听---------------------------------
			handleBack(){
				uni.navigateBack({
					delta:1 
				})
			},
			handleSend(){
				if(this.user_ids.trim()==''){
					uni.showToast({
						icon:'none',
						title:'请输入收信人ID'
					})
				}else if(this.msg.trim()==''){
					uni.showToast({
						icon:'none',
						title:'请输入私信内容'
					})
				}else{
					this._getSend(this.user_ids,this.msg,this.cookie)
				}
			},
			// ----------------------网络请求---------------------------------
			_getSend(user_ids,msg,cookie){
				getSend(user_ids,msg,cookie).then(res=>{
					console.log(res)
					if(res.data.code==200&&res.data.id!=-1){
						this.user_ids=''
						this.msg=''
						uni.showToast({
							title:'发送成功'
						})
					}else{
						uni.showToast({
							icon:'none',
							title:'ID有误'
						})
					}
				})
			},
			
		}
	}
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");
	.writeMessage{
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
	.writeMessage-body{
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding-top: 230rpx;
		/* background-color: #007AFF; */
	}
	.to-user{
		width: 90%;
		height: 90rpx;
		margin: 0 auto;
		/* background-color: red; */
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #ccc;
	}
	.to-user text:first-child{
		width: 160rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		/* background-color: pink; */
		color: #B18F80;
		font-size: 28rpx;
	}
	.to-user input{
		flex: 1;
	}
	.to-user text:last-child{
		width: 100rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		/* background-color: pink; */
		color: #B18F80;
		font-size: 60rpx;
	}
	.msg-content{
		width: 650rpx;
		height: 100rpx;
		background-color: #fff; 
		margin: 500rpx auto 0;
		display: flex;
	}
	.msg-content textarea{
		flex: 1;
		height: 100%;
		background-color: #ccc; 
		border-radius: 50rpx;
		overflow: hidden;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.msg-content text{
		width: 90rpx;
		height: 100%;
		line-height: 90rpx;
		text-align: center;
		font-size: 40rpx;
		color: red;
		/* background-color: red; */
	}
</style>
