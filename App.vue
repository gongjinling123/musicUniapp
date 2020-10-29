<script>
	export default {
		onLaunch: function(options) {
			uni.db={}
			let info=uni.getSystemInfoSync()
			uni.db.statusBarHeight=info.statusBarHeight
			// console.log(uni.db.statusBarHeight,'ddddddddddddd')
			if(info.platform==='android'){
				uni.db.navigationBarHeight=48
			}else{
				uni.db.navigationBarHeight=44
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			userId:0,
			waitForPlaying:[],//等待播放的音乐
			history_songId:[],//播放过的音乐
			songName:'',//音乐名称
			musicId:-1,//音乐ID
			backgroundAudioManager:{},
			login_token:'',
			navId:2
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 去掉系统自带的滚动条 */
	::-webkit-scrollbar {
		display: none;
	}
</style>
