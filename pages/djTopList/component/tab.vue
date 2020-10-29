<template>
	<view class="hours-top">
		<view class="hours-top-title">
			<slot name="title"></slot>
		</view>
		<text class="iconfont icon-fanhui1"></text>
	</view>
</template>

<script>
</script>

<style>
	@import url("../../../static/iconfont/iconfont.css");
	.hours-top{
			width: 100%;
			height: 80rpx;
			margin-left: 20rpx;
			line-height: 80rpx;
			display: flex;
			background-color: #fff;
			font-weight: 600;
		}
</style>
