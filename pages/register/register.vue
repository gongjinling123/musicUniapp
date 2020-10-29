<template>
	<view class="box">
		<view class="phone" v-if="showPhone">
			<form @submit="sendCode">
				<input class="inp" type="text" name="phone" maxlength="11" placeholder="请输入手机号"/>
				<button form-type="submit" class="default" style="width: 80vw;">下一步</button>
			</form>
		</view>
		
		<view class="captcha" v-if="showCaptcha">
			<view class="back" @click="toPhone">
				<text class="iconfont icon-fanhui"></text>
				<text>手机号验证</text>  
			</view>
			<view class="sendcode">
				<text class="title">验证码已发送至</text> 
				<view class="send-phone">
					<text class="user-phone">{{phone}}</text>
					<text class="time">{{time}}s</text>
				</view>
			</view>
			<input class="inp" type="text" name="captcha" v-model="captcha" />
			<button @click="next1" class="default" style="width: 80vw;">下一步</button>
		</view>
		  
		<view class="user-pwd" v-if="showPassword">
			<text class="pwd-title">请设置登录密码,8-20位字符,至少包含字母/数字/符号2种组合</text>
			<input class="inp" type="password" name="password" placeholder="密码" v-model="password" />
			<button @click="next2" class="default" style="width: 80vw;">下一步</button>
		</view>
		   
		<view class="user-name" v-if="showNickname">
			<text class="iconfont icon-hipster2 hi-icon"></text>
			<text class="hi-title">你希望大家怎么称呼你？</text>
			<input class="inp" type="text" name="nickname" placeholder="昵称" v-model="nickname" />
			<button @click="next3" class="default" style="width: 80vw;">开启云音乐</button>
		</view>
		
	</view> 
</template>

<script>
	import {Existence,SendCode,Verify,Register} from '../../service/register.js'
	export default {
		data() {
			return {
				showPhone:true,
				phone:'',
				phone1:'',
				showCaptcha:false,
				captcha:'',
				time:60,
				showPassword:false,
				password:'',
				nickname:'',
				showNickname:false
			}  
		},
		methods:{
			// --------------------事件监听----------------------------
			sendCode(e){
				let phone=e.detail.value.phone
				this.phone1=phone
				if(/^1[3456789]\d{9}$/.test(phone)){
					this._Existence(phone)
				}else{
					uni.showToast({
						title:'手机号输入有误',
						icon:'none'
					})   
				}
			},
			next1(){ 
				console.log(this.captcha)
				this._Verify(this.phone1,this.captcha)
				this.showPassword=true
				this.showCaptcha=false 
				this._Register(this.phone1,this.password,this.captcha,this.nickname)
			},
			next2(){
				this.showPassword=false 
				this.showNickname=true
				this._Register(this.phone1,this.password,this.captcha,this.nickname)
			},
			next3(){
				this._Register(this.phone1,this.password,this.captcha,this.nickname)
			},
			toPhone(){
				this.showPhone=true
				this.showCaptcha=false
			},
			// --------------------网络请求----------------------------
			_Existence(phone){
				Existence(phone).then(res=>{ 
					console.log(res.data.exist)  
					if(res.data.exist==1){
						// 账号存在
						uni.showToast({
							title:'账号已存在，返回登录页面',
							icon:'none'
						})
						setTimeout(function(){
							uni.navigateTo({
								url:'../login/login'
							})
						},2000)
					}else { 
						// 账号还没注册 
						this.phone=phone.substr(0,3)+'****'+phone.substr(7)
						this.showPhone=false   
						this.showCaptcha=true
						this._SendCode(phone)
						var that=this
						let timeId=setInterval(function(){
							that.time--
							if(that.time==0){
								clearInterval(timeId)
							}
						},1000)
					}
				})
			},
			_SendCode(phone){
				SendCode(phone).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			_Verify(phone,captcha){
				Verify(phone,captcha).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				})
			},
			_Register(phone,password,captcha,nickname){
				Register(phone,password,captcha,nickname).then(res=>{
					console.log(res)
					if(res.data.code==503){
						this.showPassword=false
						this.showCaptcha=true 
						uni.showToast({
							title:'验证码有误'
						})
					}else if(res.data.code==400){
						uni.showToast({
							title:'昵称不符合规则'
						})
					}else if(res.data.code==505){
						uni.showToast({
							title:'该昵称已被占用'
						})
					}else{
						uni.showToast({
							title:'注册成功'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.box {
		width: 90%;
		margin: 200rpx auto;
		/* border: 1px solid red; */
	}
	.phone {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.inp {
		width: 100%;
		height: 70rpx;
		border-bottom: 1rpx solid #ccc;
		margin: 20rpx auto;
		color: #ccc;
	}
	.default{
		margin-top: 80rpx;
		border-radius: 50rpx;
		background-color: #DD011C;
		color: #fff;
	}
	.back{
		width: 80%;
		margin: 0 auto 30rpx;
	}
	.sendcode{
		width: 80%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}
	.title{
		font-size: 28rpx;
	}
	.send-phone{
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #ccc;
	}
	.user-pwd{  
		width: 90%;
		margin: 0 auto; 
	}
	.pwd-title{
		font-size: 22rpx;
		color: #535353;  
	}    
	.user-name{
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}
	.hi-icon{
		font-size: 120rpx;
		color: #DD011C;
		text-align: center;
		margin-bottom: 30rpx;
	}
	.hi-title{  
		font-size: 28rpx;
		text-align: center;
	}
	button{
		font-size: 30rpx;
	}
</style>
 