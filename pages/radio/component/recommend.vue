<template>
	<view class="head-recommend">
		<view class="recommend-row">
			<block v-for="(item,index) in entryIcon" :key='index'>
				<view class="recommend-item" @click="handleItem(index)">
					<image class="recommend-img" :src="item.imgUrl" mode=""></image>
					<view class="recommend-title">{{item.title}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				//入口图标
				entryIcon: [{
						title: "热门电台",
						imgUrl: "../../../static/image/find_recommend.png",
					},
					{
						title: "电台排行",
						imgUrl: "../../../static/image/find_songSheet.png",
					},
					{
						title: "付费精品",
						imgUrl: "../../../static/image/find_rankingList.png",
					},
					{
						title: "声之剧场",
						imgUrl: "../../../static/image/find_radio.png"
					}
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
	
	.recommend-row {
		display: flex;
	}
	
	.recommend-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
