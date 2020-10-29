<template>
	<view class="">
		<!-- 状态栏 -->
		<view class="status-bar-row"></view>
			<!-- 微信开发工具占位符 -->
			<view class="box"></view>
			<!-- 顶部tab栏 -->
			<view class="tab-row">
				<view @click="handleMore" class="iconfont icon-gengduo tab-left"></view>
				<view class="tab-center">
					<block v-for="item in tabs" :key='item.index'>
						<view class="tab-item" :class="currentIndex==item.index?'active':''" @click="handleTab(item.index)">{{item.title}}</view>
					</block>
				</view>
				<view @click="handleSearch" class="iconfont icon-search tab-right"></view>
			</view>
			
			
			<uni-popup ref="popup" type="left">
				<popup></popup>
			</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import popup from '@/components/popup/popup.vue'
	export default{
		props:{
			currentIndex:{
				type:Number,
				default:1
			}
		},
		data(){
			return {
				tabs:[
					{
						title:'我的',
						index:0
					},
					{
						title:'发现',
						index:1
					},
					{
						title:'云村',
						index:2
					},
					{
						title:'视频',
						index:3
					}
				]
			}
		},
		components:{
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			popup
		},
		methods:{
			handleTab(index){
				this.$emit('tabItem',index)
			},
			handleMore(){
				this.$refs.popup.open()
			},
			handleSearch(){
				this.$emit('handleSearch')
			}
		}
	}
</script>

<style>
	@import url("../../static/iconfont/iconfont.css");
	.iconfont{
		font-size: 30rpx;
	}
	.status-bar-row{
		width: 100%;
		height: var(--status-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #fff;
	}
	.box{
		height: 50rpx;
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #fff;
	}
	.tab-row{
		padding: var(--status-bar-height) 5% 0 5%;
		display: flex;
		position: fixed;
		top: 60rpx;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: #fff;
	}
	.tab-left,
	.tab-right{
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 40rpx;
	}
	.tab-center{
		flex: 1; 
		display: flex;
	}
	.tab-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
	.active{
		color: red;
	}
	
	
	
</style>
