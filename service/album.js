import request from './network.js'

// 数字专辑-新碟上架
export function getList(){
	return request({
		url:'/album/list'
	})
}

// 数字专辑
// type : daily:日榜,week:周榜,year:年榜
// albumType=0:为数字专辑,albumType=1:为数字单曲
export function getSongSaleBoard(type,albumType){
	return request({
		url:'/album/songsaleboard',
		data:{
			type,
			albumType
		}
	})
}

// 数字专辑详情,传入数字专辑id
export function getAlbumDetail(id){
	return request({
		url:'/album/detail',
		data:{
			id
		}
	})
}

// 数字专辑-语种风格馆    area 地区 Z_H:华语,E_A:欧美,KR:韩国,JP:日本
export function getLanguage(area){
	return request({
		url:'/album/list/style',
		data:{
			area
		}
	})
}

// 数字编辑--畅销榜
//albumType : 为数字专辑,1为数字单曲
//type : daily:日榜,week:周榜,year:年榜,total:总榜
export function getSongsaleboard(albumType,type){
	return request({
		url:'/album/songsaleboard',
		data:{
			albumType,
			type
		}
	})
}