import request from './network.js'

// 歌单种类
export function getTags(){
	return request({
		url:'/playlist/highquality/tags'
	})
}

// 歌单详情
export function getPlaylist(id){
	return request({
		url:'/related/playlist',
		data:{
			id
		}
	})
}


// 歌单 ( 网友精选碟 )
//cat: 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
export function getList(cat){
	return request({
		url:'/top/playlist',
		data:{
			cat
		}
	})
}

// 获取歌单id 
export function getSongsId(id){
	return request({
		url:'/playlist/detail',
		data:{
			id
		}
	})
}
// 根据id 获取歌曲
export function getSongList(ids){
	return request({
		url:'/song/detail',
		data:{
			ids
		}
	})
}