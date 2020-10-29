import request from './network.js'

// 获取歌单详情  id:歌单id，
//飙升榜：id=19723756，云音乐飙升榜,id=3779629，云音乐新歌榜,id=3778678，云音乐热歌榜,id=2250011882，抖音排行榜
export function getPlayList(id){
	return request({
		url:'/playlist/detail',
		data:{
			id
		}
	})
}