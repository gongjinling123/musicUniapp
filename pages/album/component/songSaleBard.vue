<template>
	<view class="number-album">
		<view class="number-album-title">
			<view class="title-left">
				<text>数字专辑榜</text>
				<text class="iconfont icon-fanhui1"></text>
			</view>
			<view class="title-right"> 
				<block v-for="(item,index) in tiemText" :key='index'>
					<text :class="currentIndex==index?'active-text':''" @click="handleTime(index)">{{item}}</text>
				</block>
			</view>
		</view>
		<scroll-view scroll-x="true" style="width: 100%;" class="scroll-view">
			 <view class='play-body-outside'>
				<block v-for="(item,index) in songSaleBard" :key='index'>
					<block v-if="index<4">
						<view class="songSaleBard-item" @click="handleSong(item.albumId,item.coverUrl)">
							<view class="songSaleBard-item-img">
								<image :src="item.coverUrl"></image>
							</view>
							<view class="songSaleBard-item-desc">
								<view class="songSaleBard-item-index">
									{{index+1}}
								</view>
								<view class="songSaleBard-item-name">
									<view class="song-name">
										{{item.albumName}}
									</view>
									<view class="singer-name">
										{{item.artistName}}
									</view>
								</view>
							</view>
							<view class="songSaleBard-item-btn">
								<text>支持</text>
							</view>
						</view>
					</block>
				</block>
			</view> 
			<view class='play-body-outside'>
				<block v-for="(item,index) in songSaleBard" :key='index'>
					<block v-if="3<index&&index<8">
						<view class="songSaleBard-item" @click="handleSong(item.albumId,item.coverUrl)">
							<view class="songSaleBard-item-img">
								<image :src="item.coverUrl"></image>
							</view>
							<view class="songSaleBard-item-desc">
								<view class="songSaleBard-item-index">
									{{index+1}}
								</view>
								<view class="songSaleBard-item-name">
									<view class="song-name">
										{{item.albumName}}
									</view>
									<view class="singer-name">
										{{item.artistName}}
									</view>
								</view>
							</view>
							<view class="songSaleBard-item-btn">
								<text>支持</text>
							</view>
						</view>
					</block>
				</block>
			</view>
			<view class='play-body-outside'>
				<block v-for="(item,index) in songSaleBard" :key='index'>
					<block v-if="7<index&&index<12">
						<view class="songSaleBard-item" @click="handleSong(item.albumId,item.coverUrl)">
							<view class="songSaleBard-item-img">
								<image :src="item.coverUrl"></image>
							</view>
							<view class="songSaleBard-item-desc">
								<view class="songSaleBard-item-index">
									{{index+1}}
								</view>
								<view class="songSaleBard-item-name">
									<view class="song-name">
										{{item.albumName}}
									</view>
									<view class="singer-name">
										{{item.artistName}}
									</view>
								</view>
							</view>
							<view class="songSaleBard-item-btn">
								<text>支持</text>
							</view>
						</view>
					</block>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				currentIndex:0,
				tiemText:['日榜','周榜','总榜']
			}
		},
		props:{
			songSaleBard:{
				type:Array
			}
		},
		methods:{
			handleTime(index){
				this.currentIndex=index
				this.$emit('handleTime',index)
			},
			handleSong(albumId,imgurl){
				this.$emit('handleSong',albumId,imgurl)
			}
		}
	}
</script>

<style>
	.number-album{
		width: 100%;
		/* height: 900rpx; */
		/* background-color: pink; */
		margin-top: 20rpx;
		margin-bottom: 50rpx;
	}
	.number-album-title {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #E1E5E8;
	}
	.title-left{
		width: 300rpx;
		/* background-color: #007AFF; */
	}
	.title-right{
		width: 300rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: space-around;
	}
	.title-right text{
		flex: 1;
		display: flex;
		justify-content: center;
		/* border:1px solid red; */
	}
	.active-text{
		color: #B1483B;
	}
	.number-album-title text{
		font-weight: 600;
	}
	.scroll-view{
		width: 750rpx;
		white-space: nowrap;
		margin-right: -20rpx;
		/* border:1px solid pink; */
	}
	.play-body-outside{
		width: 95%;
		display: inline-block;
	}
	
	.songSaleBard-item{
		display: flex;
		padding: 20rpx 0;
		position: relative;
		border-bottom: 1rpx solid #E1E5E8;
	}
	.songSaleBard-item-img{
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
	}
	.songSaleBard-item-img image{
		width: 100%;
		height: 100%;
	}
	.songSaleBard-item-desc{
		display: flex;
	}
	.songSaleBard-item-index{
		width: 60rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		font-weight: 600;
		color: #6B6B6B;
	}
	.songSaleBard-item-name{
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.song-name{
		width: 260rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* background-color: #007AFF; */
	}
	.singer-name{
		color: #8E8E8E;
	}
	.songSaleBard-item-btn{
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		top: 0;
		right: 10rpx;
	}
	.songSaleBard-item-btn text{
		width: 110rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 40rpx auto;
		font-size: 26rpx;
		text-align: center;
		border-radius: 50rpx;
		display: block;
		color: #A63D3F;
		border: 2rpx solid #A63D3F;
	}
</style>
