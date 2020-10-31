import request from './network.js'

// 获取歌曲详情
export function getSongDetail(ids){
	return request({
		url:'/song/detail',
		data:{
			ids
		}
	})
}


// 获取歌曲路径
export function getSongUrl(id){
	return request({
		url:'/song/url',
		data:{
			id
		}
	})
}

//获取歌词
export function getLyric(id){
	return request({
		url:'/lyric',
		data:{
			id
		}
	})
}


// 歌曲评论--（推荐，最新）
export function getComment(id){
	return request({
		url:'/comment/music',
		data:{
			id
		}
	})
}

// 歌曲评论--（最热）type=0
export function getHotComment(id,type){
	return request({
		url:'/comment/hot',
		data:{
			id,
			type
		}
	})
}

// 发送评论
// t:1 发送；2回复
// type:0:歌曲；1：mv;2:歌单；3：专辑；4：电台；5：视频；6：动态
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论id (回复评论时必填)
export function getSendComment(cookie,t,type,id,content,commentId){
	return request({
		url:'/comment',
		data:{
			cookie,
			t,
			type,
			id,
			content,
			commentId
		}
	})
}

// 删除评论
// t:0 删除
// type:0:歌曲；1：mv;2:歌单；3：专辑；4：电台；5：视频；6：动态
// id:对应资源 id
// commentId :评论的id
export function getDelComment(cookie,t,type,id,commentId){
	return request({
		url:'/comment',
		data:{
			cookie,
			t,
			type,
			id,
			commentId
		}
	})
}

// 楼层评论（回复评论）
//parentCommentId:楼层评论id
// id：资源id
// type：0：歌曲，1：MV，2：歌单，3：专辑，4：电台，5：视频
export function getParentComment(parentCommentId,id,type){
	return request({
		url:'/comment/floor',
		data:{
			parentCommentId,
			id,
			type
		}
	})
}
 
 
// 点赞评论
// id:资源的id
// cid:评论的id
// t:是否点赞，1 为点赞；0 为取消点赞
// type: 0 歌曲；1 MV；2 歌单；3 专辑；4 电台；5 视频；6 动态
export function getCommentLike(cookie,id,cid,t,type){
	return request({
		url:'/comment/like',
		data:{
			cookie,
			id,
			cid,
			t,
			type
		}
	})
}