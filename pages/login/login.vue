<template>
	<view class="login">
		<view class="wrapper-bd">
			<image class="login-img" src="https://s1.music.126.net/style/favicon.ico?v20180307"></image>
		</view>
		<view class="box">
			<form @submit="sarchBox">
				<view class="login-input">
					<input class="login-phone" maxlength="11" placeholder-class="pla-class" type="text" placeholder="手机号" name="username" />
					<input class="login-pwd" placeholder-class="pla-class" type="password" placeholder="密码" name="pwd" />
				</view>
				<button form-type="submit" class="default" style="width: 75vw;">登录</button>
				<button @click="register" class="default" style="width: 75vw;">注册</button>
			</form>
		</view>
		
	</view>
</template>

<script>
	import app from '../../App.vue'
	import {getPhoneLogin} from '../../service/login.js'
	
	
	export default {
		data() {
			return {
				autoFocus: true,
				username: '',
				pwd: '',
				userInfo: {}
			}
		},
		components:{
			
		},
		methods: {
			// --------------------事件监听----------------------------------
			
			register(){
				uni.navigateTo({
					url:'../register/register'
				})
			},
			// --------------------网络请求----------------------------------
			_getPhoneLogin(phone,password){
				getPhoneLogin(phone,password).then(res=>{
					let code=res.data.code
						console.log(res)
					if(code==200){
						uni.setStorageSync('userId',res.data.account.id)
						app.globalData.userId=res.data.account.id
						this.saveUserLoginInfo(res.cookies)
						app.globalData.navId=1
						uni.redirectTo({
							url:'../profile/profile'
						})
					}else{
						uni.showToast({
							title: '账号与密码不一致',
							icon: 'none'
						})
						if(res.data.msg=='帐号不存在'){
							uni.navigateTo({
								url:'../register/register'
							})
						}
					}
				})
			},
			sarchBox(e) {
				this.username = e.detail.value.username
				this.pwd = e.detail.value.pwd
				if(this.username.trim()==''||this.pwd.trim()==''){
					uni.showToast({
						title:'请输入用户名和密码',
						icon:'none'
					})
					return
				}
				this._getPhoneLogin(this.username,this.pwd)
			},
			register1(e){
				console.log(e)
			},
			// 保存登录cookie
			saveUserLoginInfo(cookies) {
				for (let i = 0; i < cookies.length; i++) {
					if (cookies[i].search('MUSIC_U=') != -1) {
						uni.setStorageSync('login_token', cookies[i])
						console.log(uni.getStorageSync('login_token'))
						app.globalData.login_token = cookies[i]
					}
				}
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.login {
		color: rgba(255, 255, 255, .5);
		height: 100vh;
		background-color: #DC2C1D;
	}

	.wrapper-bd {
		width: 100%;
		height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-img {
		width: 120rpx;
		height: 120rpx;
	}

	.login-input {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.login-phone,
	.login-pwd {
		width: 70%;
		height: 70rpx;
		border-bottom: 1rpx solid #ccc;
		margin-bottom: 20rpx;
		color: #ccc;
	}

	.default {
		margin-top: 30rpx;
		border-radius: 50rpx;
		font-weight: 500;
		color: #DD011C;
	}

	.pla-class {
		color: #ccc;
	}
	
</style>
