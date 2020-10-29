<template>
	<view class="new-album">
		<view class="new-title">
			<text>最新上架</text>
			<text class="iconfont icon-fanhui1"></text>
		</view>
		<view class="new-content">
			<block v-for="(item,index) in newAlbum" :key='index'>
				<block v-if="index<6">
					<view class="new-item" @click=handleSong(item.albumId,item.coverUrl)>
						<view class="new-img">
							<image :src="item.coverUrl"></image>
						</view>
						<view class="new-desc">
							<text>{{item.albumName}}</text>
							<text>{{item.artistName}}</text>
							<text>￥{{item.price}}</text>
						</view>
					</view>
				</block>
			</block>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:{
			newAlbum:{
				type:Array
			}
		},
		methods:{
			handleSong(id,url){
				this.$emit('handleSong',id,url)
			}
		}
	}
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");
	.new-album{
		width: 100%;
		/* height: 500rpx; */
		margin-top: 20rpx;
		/* background-color: #007AFF; */
	}
	.new-title{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		margin-left: 20rpx;
		font-weight: 600;
	}
	.new-content{
		/* background-color:#008000; */
		margin-left: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.new-item{
		width: 30%;
		height: 350rpx; 
		/* border: 1px solid red; */
	}
	.new-img{
		width: 100%;
		height: 220rpx;
		margin: 0 auto;
	}
	.new-img image{
		width: 100%;
		height: 100%;
	}
	.new-desc{
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	.new-desc text{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #9D9D9D;
		font-size: 28rpx;
	}
	.new-desc text:first-child{
		color: #202221;
	}
	.new-desc text:last-child{
		color: #CA2E2E;
	}
</style>
