import request from './network.js'

// 轮播图
export function getBanner(){
	return request({
		url:'/dj/banner'
	})
}

// 创作|翻唱 热门电台  cateId=2001    http://localhost:3000/dj/radio/hot?cateId=2001
export function getHotDj(cateId){
	return request({
		url:'/dj/radio/hot',
		data:{
			cateId
		}
	})
}

// 电台推荐
export function getToDay(){
	return request({
		url:'/dj/today/perfered'
	})
}

// 电台节目详情
export function getDetail(id){
	return request({
		url:'/dj/program/detail',
		data:{
			id
		}
	})
}

export function getDjDetail(rid){
	return request({
		url:'/dj/detail',
		data:{
			rid
		}
	})
}

// 电台节目
export function getProgram(rid){
	return request({
		url:'/dj/program',
		data:{
			rid
		}
	})
}

// 付费精品
export function getPay(){
	return request({
		url:'/dj/paygift'
	})
}

// 电台排行
export function getTopList(){
	return request({
		url:'/dj/program/toplist'
	}) 
}

// 24小时主播榜
export function getTopListHours(){
	return request({
		url:'/dj/toplist/hours'
	})
}

// 主播新人榜
export function getNewcomer(){
	return request({
		url:'/dj/toplist/newcomer'
	})
}

// 最热主播榜
export function getPopular(){
	return request({
		url:'/dj/toplist/popular'
	})
}

// 24小时节目榜
export function getProgramHours(){
	return request({
		url:'/dj/program/toplist/hours'
	})
}

// 电台排行付费精品
export function getTopListPay(){
	return request({
		url:'/dj/toplist/pay'
	})
}
