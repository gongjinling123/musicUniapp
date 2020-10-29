<template>
	<view class="head-recommend">
		<scroll-view style="width: 100%;" scroll-x="true" class="scroll-x1">
			<block v-for="(item,index) in entryIcon" :key='index'>
				<view class="recommend-item" @click="handleItem(index)">
					<image class="recommend-img" :src="item.imgUrl" mode=""></image>
					<view class="recommend-title">{{item.title}}</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				//入口图标
				entryIcon: [{
						title: "每日推荐",
						imgUrl: "../../static/image/find_recommend.png",
					},
					{
						title: "歌单",
						imgUrl: "../../static/image/find_songSheet.png",
					},
					{
						title: "排行榜",
						imgUrl: "../../static/image/find_rankingList.png",
					},
					{
						title: "电台",
						imgUrl: "../../static/image/find_radio.png"
					},
					{
						title: "数字专辑",
						imgUrl: "../../static/image/find_album.png"
					},
					{
						title: "直播",
						imgUrl: "../../static/image/find_broadcast.png"
					},
					{
						title: "火前留名",
						imgUrl: "../../static/image/find_fire.png"
					},
					
					{
						title: "唱聊",
						imgUrl: "../../static/image/find_sing.png"
					},
					{
						title: "线上演出",
						imgUrl: "../../static/image/find_show.png"
					},
				],
			}
		},
		methods:{
			handleItem(index){
				this.$emit('handleItem',index)
			}
		}
	}
</script>

<style>
	.head-recommend {
		/* background-color: blue; */
		margin-top: 30rpx;
	}
	
	.scroll-x1 {
		white-space: nowrap;
		width: 750rpx;
		margin-right: -20rpx;
	}
	
	.recommend-item {
		display: inline-block;
		width: 100rpx;
		height: 130rpx;
		margin-right: 45rpx;
		text-align: center;
	}
	
	.recommend-img {
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto;
	}
	
	.recommend-title {
		font-size: 22rpx;
	}
</style>
