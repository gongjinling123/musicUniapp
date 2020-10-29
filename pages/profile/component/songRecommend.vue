<template>
	<view class="song-recommend-row">
		<view class="recommend-head">
			<text class="recommend-title">推荐歌单</text>
			<text class="iconfont icon-guanbi close"></text>
		</view>
		<view class="recommend-body">
			<block v-for="(item,index) in sheet" :key='index'>
				<view class="recommend-item" @click="handlePlayList(item.id)">
					<view class="recommend-img">
						<image :src="item.picture"></image>
					</view>
					<view class="recommend-info">
						<view class="listname">{{item.listname}}</view>
						<view class="desc">{{item.desc}}</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>
  
<script>
	export default {
		data() {
			return {
				sheet: [{
						picture: '../../../static/image/mine_s1.png',
						listname: '云音乐热歌榜',
						desc: '本周最热的歌曲',
						id:'3778678'
					},
					{
						picture: '../../../static/image/mine_s2.png',
						listname: '云音乐新歌榜',
						desc: '本周最火的歌',
						id:'3779629'
					},
					{
						picture: '../../../static/image/mine_s3.png',
						listname: '700首流行经典老歌 | 80/90/00后怀旧珍藏',
						desc: '本周热门收听',
						id:'19723756'
					},
					{
						picture: '../../../static/image/mine_s4.png',
						listname: '回忆杀系列2000-2010年代/伤感/怀旧',
						desc: '本周热门收听',
						id:'19723756'
					},
					{
						picture: '../../../static/image/mine_s5.png',
						listname: '好听到单曲循环鸭',
						desc: '本周热门收听',
						id:'19723756'
					},
					{
						picture: '../../../static/image/mine_s6.png',
						listname: '精选 | 网络热歌分享',
						desc: '本周热门收听',  
						id:'2250011882'
					}
				]
			}
		},
		methods:{
			handlePlayList(id){
				uni.navigateTo({
					url:`/pages/playList/playList?id=${id}`
				})
			}
		}
	}
</script>

<style>
	.song-recommend-row {
		width: 90%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		background-color: #fff;
	}

	.recommend-head {
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 30rpx;
		/* background-color: red; */
		display: flex;
		justify-content: space-between;
	}

	.recommend-title {
		font-size: 32rpx;
		font-weight: 900;
	}

	.close {
		font-size: 30rpx;
		color: #999;
	}

	.recommend-body {}

	.recommend-item {
		height: 150rpx;
		/* border: 1px solid green; */
		margin-bottom: 10rpx;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		display: flex;
	}

	.recommend-img {
		width: 120rpx;
		height: 120rpx;
	}

	.recommend-img image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
	}

	.recommend-info {
		height: 90rpx;
		margin: 15rpx 20rpx;
	}

	.listname {
		width: 480rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 34rpx;
	}

	.desc {
		font-size: 30rpx;
		color: #ccc;
	}
</style>
