//made in 邱东杰
var lyric=[{'songname':'每天新一点',
			'singername':'萧敬腾',
			'content':'[00:16.39]玫瑰正等待新的照相机[00:20.25]鞋子遇见  新的目的地[00:24.26]当我说爱你  用新的语气[00:28.21]你太值得  目光的巡礼[00:31.77]（爱情  需要新意）[00:35.51]我要为你未来的回忆  画最美痕迹[00:39.96]（爱情  穿上新衣）[00:43.72]让你看见  新的自己[00:48.35]我送你每天一点新  一点[00:52.34]一天一天积累成我们的明天[00:56.46]要对你  多用一点心[00:59.46]感觉保持新鲜  一步步走到终点[01:04.04]L O V E[01:07.71]L O V E  每天的盛典[01:12.27]一点一点为你而改变[01:15.95]一天一天只为给你新鲜体验[01:22.40]爱的二维码  我看的清晰[01:26.27]为你揭开  幸福的秘密[01:30.15]当我抱着你  看的更精细[01:34.15]你太值得  更多的惊喜[01:37.70]（爱情  需要新意）[01:41.44]我要为你未来的回忆  画最美痕迹[01:45.88]（爱情  穿上新衣）[01:49.55]让你看见  新的自己[01:54.41]我送你每天一点新  一点[01:58.16]一天一天积累成我们的明天[02:02.40]要对你  多用一点心[02:05.27]感觉保持新鲜  一步步走到终点[02:09.82]L O V E[02:13.94]L O V E  每天的盛典[02:18.25]一点一点为你而改变[02:21.93]一天一天只为给你新鲜体验[02:26.57]L  O V E[02:34.62]我送你每天一点新  一点[02:38.30]一天一天积累成我们的明天[02:42.31]要对你  多用一点心[02:45.25]感觉保持新鲜  一步步走到终点[02:49.98]L O V E[02:53.85]L O V E  每天的盛典[02:57.66]一点一点为你而改变[03:01.84]一天一天只为给你新鲜体验'
		},{'songname':'咱们结婚吧',
		   'singername':'齐晨',
		   'content':'[00:19.45]洁白的婚纱手捧着鲜花[00:23.94]美丽得像童话[00:28.11]想起那年初夏我为你牵挂[00:32.44]在一起就犯傻[00:34.91]丘比特轻轻飞过月光下[00:39.25]潘多拉她听到了回答[00:43.61]礼堂钟声在敲打幸福的密码[00:52.43]哦My Love咱们结婚吧[00:56.95]好想和你拥有一个家[01:00.87]这一生最美的梦啊[01:05.53]有你陪伴我同闯天涯[01:09.50]哦My Love咱们结婚吧[01:14.10]我会用一生去爱你的[01:18.50]我愿把一切都放下[01:22.99]给你幸福的家[01:47.31]洁白的婚纱手捧着鲜花[01:51.78]美丽得像童话[01:56.03]想起那年初夏我为你牵挂[02:00.41]在一起就犯傻[02:02.60]丘比特轻轻飞过月光下[02:07.27]潘多拉她听到了回答[02:11.46]礼堂钟声在敲打幸福的密码[02:20.19]哦My Love咱们结婚吧[02:24.85]好想和你拥有一个家[02:28.77]这一生最美的梦啊[02:33.39]有你陪伴我同闯天涯[02:37.35]哦My Love咱们结婚吧[02:41.97]我会用一生去爱你的[02:46.31]我愿把一切都放下[02:50.80]给你幸福的家[02:56.46]哦My Love咱们结婚吧[03:01.30]好想和你拥有一个家[03:05.21]这一生最美的梦啊[03:09.92]有你陪伴我同闯天涯[03:13.77]哦My Love咱们结婚吧[03:18.38]我会用一生去爱你的[03:22.66]我愿把一切都放下[03:27.35]给你幸福的家'
		}]
	
$(document).ready(function(){
	//歌曲的索引值
	var iNow = 0;
	//获取所有音乐对象
	var oAudio = document.getElementsByTagName('audio');
	
	//获取歌词
	var lrcBox=$('.lycbox')[0];
	
	function obtain(n){
		$('.songname').text(lyric[n].songname);
		$('.singername').text(lyric[n].singername);
		var aLrc=lyric[n].content.split('[');
		var html='';
		for(var i=1; i<aLrc.length;i++){
			var lrcStr=aLrc[i].split(']')[1];
			var time=aLrc[i].split(']')[0].split(':');
			var time_s=time[0]*60+parseInt(time[1]);
			html+='<p data-time='+time_s+'>'+lrcStr+'</p>';
		}
		lrcBox.innerHTML=html;
		//监听播放位置改变
		oAudio[n].addEventListener('timeupdate',function(){
			var nowT=parseInt(oAudio[n].currentTime);
			var _this=$('.lycbox p[data-time='+nowT+']');
			_this.addClass('nowP').siblings().removeClass();
			if(_this.index()!=-1 && _this.index()>1){
				$('.lycbox').animate({
					'marginTop':-2.4*(_this.index()-1)+'rem'
				},300);
			}
		});
	}
	obtain(iNow)
	
	//重置歌词位置，播放进度
	function rest(n){
		oAudio[n].pause();
		$.each(oAudio, function(index) {
			oAudio[index].currentTime = 0;
		});
		$('.play').css({
			'backgroundPositionY':0
		});
		$('.progressbtn').css('left',0);
		$('.progressbar span').css('width',0);
		$('.startime').text('00:00');
		$('.endtime').text(Dub(parseInt(timeArr[n]/60))+':'+Dub(parseInt(timeArr[n]%60)));
		$('.lycbox').css({
			'marginTop':0+'rem'
		});
		playReady = true;
		clearInterval(playtimer);
		clearInterval(startimer);
		clearInterval(endtimer);
	}
	//补0
	function Dub(n){
		return n<10?'0'+n:n
	} 
	//每首歌的长度
	var timeArr = [190,228];
	
	//音乐播放暂停开关(ps：如果连续点击播放按钮，会发现startime不变，但是歌唱进度会往前走)
	var mainSwitch = true;
	//startime
	var startimer;
	function starTime(){
		function star(n){
			$('.startime').text(Dub(parseInt(oAudio[n].currentTime/60))+':'+Dub(Math.ceil(oAudio[n].currentTime%60)));
		}
		star(iNow)
	}
	starTime()
	//endtime
	var endtimer;
	function endTime(){
		function end(n){
			$('.endtime').text(Dub(parseInt((timeArr[n]-oAudio[n].currentTime)/60))+':'+Dub(parseInt((timeArr[n]-oAudio[n].currentTime)%60)));
		}
		end(iNow)
	}
	endTime();
	//进度条走动和进度条按钮
	var playtimer;
	var scale = 0;
	//播放
	function playmusic(n){
		oAudio[n].play();
		$('.play').css({'backgroundPositionY':100+'%'});
		startimer = setInterval(starTime,1000);
		endtimer = setInterval(endTime,1000);
		playtimer = setInterval(function(){
			scale = parseInt(parseInt(oAudio[n].currentTime)/oAudio[n].duration*100);
			$('.progressbtn').css({
				'left':scale+'%'
			})
			$('.progressbar span').css({
				'width':scale+'%'
			})
			console.log(scale+'%, '+parseInt(oAudio[n].currentTime))
			console.log(oAudio[n].currentTime)
			if(parseInt(oAudio[n].duration)-parseInt(oAudio[n].currentTime) == 0){
				playReady = true;
				rest(n);
			}
		},1000)
	}
	//点击播放按钮切换图标
	var playReady = true;
	$('.play').on('tap',function(){
		if(playReady){
			playReady = false;
			playmusic(iNow);
		}else{
			playReady = true;
			oAudio[iNow].pause();
			clearInterval(startimer);
			clearInterval(endtimer);
			clearInterval(playtimer);
			$(this).css({
				'backgroundPositionY':0+'%'
			})
		}
		
	})
	var dataTimeArr=[];
	$.each($('.lycbox p'), function(index) {
		dataTimeArr.push($('.lycbox p').eq(index).attr('data-time'));
	});
	var oW = document.documentElement.clientWidth;
	var oPro = $('.progressbar')[0];
	var oProLeft = parseInt($('.progressbar').css('left'))+parseInt($('.progressbar').css('margin-left'));
	//快进
	function speed(n){
		oPro.addEventListener('touchstart',function(ev){
			var disX = ev.targetTouches[0].pageX;
			var playNum = parseInt(disX-oProLeft);
			var playScale = (playNum/parseFloat($('.progressbar').css('width')))*timeArr[n];
			$('.progressbar span').css({
				'width':playNum+'px'
			})
			$('.progressbtn').css({
				'left':playNum+'px'
			})
			$('.startime').text(Dub(parseInt(playScale/60))+':'+Dub(Math.ceil(playScale%60)));
			$('.endtime').text(Dub(parseInt((timeArr[n]-playScale)/60))+':'+Dub(parseInt((timeArr[n]-playScale)%60)))
			oAudio[n].currentTime = parseInt(playScale);
			console.log(parseInt(playScale));
			$.each(dataTimeArr, function(index) {
				if(dataTimeArr[index]<parseInt(playScale)){
					var arr=[];
					arr.push(index);
					$('.lycbox').css({
						'marginTop':-2.4*arr[0]+'rem'
					});
					$('.lycbox p').eq(arr[0]).addClass('nowP').siblings().removeClass();
				}
			});
		},false);
	}
	speed(iNow)
	
	$('.next').on('tap',function(){
		rest(iNow);
		iNow++;
		obtain(iNow);
		endTime(iNow);
		speed(iNow);
	})
	$('.prev').on('tap',function(){
		rest(iNow);
		iNow--;
		obtain(iNow);
		endTime(iNow);
		speed(iNow);
	})
	//列表
	var oList=$('.songlist')[0];
	var y=0;
	oList.addEventListener('touchstart',function(ev){
		var disY=ev.targetTouches[0].pageY-y;
		function fnMove(ev){
			y=ev.targetTouches[0].pageY-disY;
			if(y<=-129){
				y = -129;
			}
			if(y>=0){
				y=0;
			}
			oList.style.WebkitTransform='translateY('+y+'px)';
		}
		function fnEnd(){
			document.removeEventListener('touchmove',fnMove,false);
			document.removeEventListener('touchend',fnEnd,false);	
		}
		document.addEventListener('touchmove',fnMove,false);
		document.addEventListener('touchend',fnEnd,false);
		ev.preventDefault();
	},false);

})