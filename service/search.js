import request from './network.js'

// 热搜列表(详细)
export function getSearch(){
	return request({
		url:'/search/hot/detail'
	})
}

// 搜索
export function getSearchKeywords(keywords){
	return request({
		url:'/search',
		data:{
			keywords
		}
	})
}