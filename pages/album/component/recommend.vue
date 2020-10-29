<template>
	<view class="recommend">
		<block v-for="(item,index) in recommend" :key='index'>
			<view class="recommend-item" @click="handleItem(index)">
				<view class="item-img">
					<image :src="item.img" mode=""></image>
				</view>
				<text>{{item.title}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				recommend:[
					{
						img:'../../../static/image/find_rankingList.png',
						title:'畅销榜'
					},
					{
						img:'../../../static/image/find_sing.png',
						title:'语种风格馆'
					},
					{
						img:'../../../static/image/find_fire.png',
						title:'已购'
					}
				]
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
	.recommend{
		width: 100%;
		height: 200rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 2rpx solid #E3E7EA;
		/* background-color: #007AFF; */
	}
	.recommend-item{
		text-align: center;
		color: #3B3B3B;
		font-size: 28rpx;
	}
	.item-img{
		width: 130rpx;
		height: 130rpx;
		margin-bottom: 10rpx;
	}
	.item-img image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
</style>
