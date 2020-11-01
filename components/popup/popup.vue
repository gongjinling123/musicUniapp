<template>
	<view class="">
		<scroll-view scroll-y="true" class="popup-box">
			<view class="open-vip">
				<view class="vip-top">
					<view class="vip-top-left">
						<text class="left-title">开通黑胶VIP</text>
						<text class="left-info">加入黑胶VIP,立享超17项专属特权</text>
					</view>
					<view class="vip-top-right">
						<text class="btn">会员中心</text>
					</view>
				</view>
				<view class="vip-bottom">
					<text>开通VIP仅5元,感受超high现场音效</text>
					<text class="">红包</text>
				</view>
			</view>
			
			<view class="message">
				<view class="message-left">
					<text class="iconfont icon-yunyinle- yun-icon"></text>
					<view class="sign">
						<text class="sign-title">云贝中心</text>
						<view class="sign-btn">
							<view class="sign-btn-title">签到></view>
						</view>
					</view>
				</view>
				<view class="message-right" @click="handleMessage">
					<text class="iconfont icon-youxiang message-icon"></text>
					<view class="letter">
						<text class="letter-title">信息中心</text>
						<view class="private-letter">有人私信了你</view>
					</view>
				</view>
			</view>
			
			<view class="author-row">
				<text class="iconfont icon-deng author-icon"></text>
				<text class="author-title">创作者中心</text>
				<text class="iconfont icon-fanhui1 author-icon"></text>
			</view>
		 
			<view class="music-server"> 
				<view class="server-top">
					<text>音乐服务</text> 
				</view>
				<view class="server-body">
					<view class="server-item">
						<text class="iconfont icon-ziyuan server-icon"></text>
						<text class="server-title">听歌识词</text>
					</view>
					<view class="server-item">
						<text class="iconfont icon-tianmaohuopiaotongxing server-icon"></text>
						<text class="server-title">云村有票</text>
					</view>
					<view class="server-item">
						<text class="iconfont icon-gouwuche server-icon"></text>
						<text class="server-title">商城</text>
					</view>
					<view class="server-item">
						<text class="iconfont icon-94 server-icon"></text>
						<text class="server-title">游戏专区</text>
					</view>
					<view class="server-item">
						<text class="iconfont icon-lingdang server-icon"></text>
						<text class="server-title">口袋彩铃</text>
					</view>
				</view>
			</view>
			
			<view class="other-row">
				<view class="other-top">
					<text>其他</text>
				</view>
				<view class="other-body">
					<view class="other-item">
						<text class="iconfont icon-yifu other-icon"></text>
						<text class="other-title">个性装扮</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-erji-dingshirenwu other-icon"></text>
						<text class="other-title">定时关闭</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-saoma other-icon"></text>
						<text class="other-title">扫一扫</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-icon-test1 other-icon"></text>
						<text class="other-title">边听边存</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-zaixiankefu other-icon"></text>
						<text class="other-title">在线听歌免流量</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-icon-test other-icon"></text>
						<text class="other-title">音乐黑名单</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-xiansanqingshaonian other-icon"></text>
						<text class="other-title">青少年模式</text>
					</view>
					<view class="other-item">
						<text class="iconfont icon-dingshi other-icon"></text>
						<text class="other-title">音乐闹钟</text>
					</view>
				</view>
			</view>
			
			<view class="order-row">
				<view class="order-item">
					<text class="iconfont icon-ding_huabanfuben order-icon"></text>
					<text class="order-title">我的订单</text>
				</view>
				<view class="order-item">
					<text class="iconfont icon-youhuiquan order-icon"></text>
					<text class="order-title">优惠券</text>
				</view>
				<view class="order-item">
					<text class="iconfont icon-iconset0143 order-icon"></text>
					<text class="order-title">帮助与反馈</text>
				</view>
				<view class="order-item">
					<text class="iconfont icon-guanyu order-icon"></text>
					<text class="order-title">关于</text>
				</view>
			</view>
		</scroll-view> 
		
		<view class="foot-row">
			<view class="foot-content">
				<view class="foot-item">
					<text class="iconfont icon-wuraomoshi foot-icon"></text>
					<text class="foot-title">夜间模式</text>
				</view>
				<view class="foot-item">
					<text class="iconfont icon-shezhi foot-icon"></text>
					<text class="foot-title">设置</text>
				</view>
				<view class="foot-item" @click="handleEdit">
					<text class="iconfont icon-tuichu foot-icon"></text>
					<text class="foot-title">退出</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			handleEdit(){
				uni.showModal({
					content:'确定退出当前账号吗？',
					success:res=>{
						if(res.confirm){
							console.log('退出')
							uni.request({
								url:'http://localhost:3000/logout',
								success:res=>{
									console.log(res.data.code)
									if(res.data.code==200){
										uni.clearStorageSync()
									}
								},
								fail:err=>{
									console.log(err)
								}
							})
						}else{
							console.log('取消')
						}
					}
				})
			},
			handleMessage(){
				uni.navigateTo({
					url:'/pages/message/message'
				})
			}
		}
	}
</script>

<style>
	.popup-box{
		height: 100vh;
		background-color: #F7F7F7;
		z-index: 9999;
		padding-top: 50rpx;
		overflow: scroll;
	}
	.open-vip{
		width: 80vw;
		height: 200rpx;
		margin: 30rpx;
		padding: 30rpx;
		border-radius: 30rpx;
		background-color: #B6B6B6;
		display: flex;
		flex-direction: column;
	}
	.vip-top{
		flex: 2;
		display: flex;
		border-bottom: 1rpx solid #A0A0A0;
	}
	.vip-top-left{
		display: flex;
		flex-direction: column;
		flex: 2;
	}
	.left-title{
		font-size: 38rpx;
		font-weight: 700;
		color: #FFFFFF;
		flex: 1;
	}
	.left-info{
		font-size: 24rpx;
		flex: 1;
		color: #D6D6D6;
	}
	.vip-top-right{
		flex: 1;
		margin-top: 20rpx;
	}
	.btn{
		border: 2rpx solid #E1E1E1;
		border-radius: 50rpx;
		padding: 10rpx 20rpx;
		color: #E1E1E1;
	}
	.vip-bottom{
		flex: 1;
		display: flex;
		align-items: center;
		color: #DDDDDD;
		font-size: 26rpx;
	}
	
	.message{
		width: 80vw;
		height: 150rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
		padding: 30rpx;
		border-radius: 30rpx;
		display: flex;
	}
	.message-left{
		flex: 1;
		border-right: 1rpx solid #E3E3E3;
		display: flex;
	}
	.yun-icon{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 60rpx;
	}
	.sign{
		flex: 4;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.sign-title{
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		font-weight: 700;
	}
	.sign-btn{
		flex: 1;
	}
	.sign-btn-title{
		width: 100rpx;
		border: 2rpx solid #9F6B6B;
		color: #9F6B6B;
		text-align: center;
		font-size: 26rpx;
		border-radius: 50rpx;
		padding: 4rpx 12rpx;
	}
	.message-right{
		flex: 1;
		display: flex;
		margin-left: 20rpx;
	}
	.message-icon{
		font-size: 50rpx;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.letter{
		flex: 4;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.letter-title{
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		font-weight: 700;
	}
	.private-letter{
		flex: 1;
		color: #979797;
		font-size: 28rpx;
	}
	.author-row{
		width: 80vw;
		height: 50rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		display: flex;
	}
	.author-icon{
		width: 80rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 50rpx;
	}
	.author-title{
		flex: 1;
		font-size: 34rpx;
		font-weight: 700;
	}
	.music-server{
		width: 80vw;
		height: 450rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
	}
	.server-top{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		border-bottom: 2rpx solid #E5E5E5;
		color: #9C9C9C;
	}
	.server-top text{
		margin-left: 30rpx;
	}
	.server-body{
		margin-top: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.server-item{
		flex: 1;
	}
	.server-icon,
	.author-icon,
	.other-icon,
	.order-icon,
	.foot-icon{
		font-size: 40rpx;
	}
	.server-title,
	.other-title,
	.order-title{
		margin-left: 30rpx;
	}
	.other-row{
		width: 80vw;
		height: 650rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
	}
	.other-top{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		border-bottom: 2rpx solid #E5E5E5;
		color: #9C9C9C;
	}
	.other-top text{
		margin-left: 30rpx;
	}
	.other-body{
		margin-top: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.other-item{
		flex: 1;
	}
	.order-row{
		width: 80vw;
		height: 350rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 200rpx;
	}
	.order-item{
		flex: 1;
		display: flex;
		align-items: center;
	} 
	.foot-row{
		width: 100vw;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #F7F7F7;
	}
	.foot-content{
		width: 80vw;
		height: 100rpx;
		margin: 0 auto;
		padding: 0 30rpx;
		display: flex;
	}
	.foot-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.foot-icon{
		font-size: 40rpx;
	}
	.foot-title{
		margin-left: 15rpx;
	}
</style>
