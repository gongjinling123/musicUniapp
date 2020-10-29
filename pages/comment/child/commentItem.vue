<template>
	<view class="">
		<block v-for="(item,index) in comments" :key='index'>
			<view class="comment-item" @click="handleComItem(item.commentId,item.user.nickname)">
				<view class="user-info">
					<view class="user-img">
						<image :src="item.user.avatarUrl"></image>
					</view>
					<view class="user-name">
						{{item.user.nickname}}
					</view>
					<view class="likedCount" @click.stop="handleZan(item.commentId)" :class="commentSupper.indexOf(item.commentId)!=-1?'active':''">
						<block v-if="item.likedCount!=0">
							<text>{{item.likedCount}}</text>
						</block>
						<text class="iconfont icon-zan"></text>
					</view>
				</view>
				<view class="comment-title">
					{{item.content}}
				</view>
				<view class="reversion" @click.stop="handleMore(item.commentId)">
					<text>查看回复</text>
					<text class="iconfont icon-fanhui1"></text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleComItem(commentId, nickname) {
				this.$emit('handleComItem', commentId, nickname)
			},
			handleMore(id) {
				this.$emit('handleMore', id)
			},
			handleZan(commentId) {
				this.$emit('handleZan', commentId)
			}
		},
		props: {
			comments: {
				type: Array
			},
			commentSupper: {
				type: Array
			}
		}
	}
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");

	.comment-item {
		margin-top: 10rpx;
		padding-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.user-info {
		display: flex;
	}

	.comment-title {
		width: 600rpx;
		/* background-color: green; */
		margin-left: 90rpx;
	}

	.user-img {
		width: 90rpx;
		height: 90rpx;

	}

	.user-img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.user-name {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: 10rpx;
		color: #585858;
	}

	.likedCount {
		width: 200rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #909090;
		font-size: 26rpx;
	}

	.icon-count {
		margin-left: 8rpx;
	}

	.reversion {
		/* background-color: red; */
		padding-left: 90rpx;
		font-size: 20rpx;
		color: #0000FF;
	}

	.reversion text:last-child {
		font-size: 20rpx;
		margin-left: 10rpx;
	}

	.active {
		color: red;
	}
</style>
