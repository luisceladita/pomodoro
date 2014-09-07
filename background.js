var currentTime=localStorage["rangePomodoro"];
var sleepTime=localStorage["rangeRest"];
var longSleepTime=localStorage["rangeLongRest"];
var i = 0;


if (!currentTime) {
	currentTime = 25;
	localStorage["rangePomodoro"] = currentTime;
 
}
if (!sleepTime) {
	sleepTime = 5;
	localStorage["rangeRest"] = sleepTime;
  
}
if (!longSleepTime) {
	longSleepTime = 10;
	localStorage["rangeLongRest"] = longSleepTime;
}

var clickAble=false;
chrome.browserAction.setIcon({path:"start.png"});
chrome.browserAction.setBadgeText({ text: currentTime } );


//主函数：包含一次番茄时间+一次休息时间/一次长休息时间
function startWork() {
	if(clickAble == false){
		playSound("start.mp3");
		clickAble = true;
		chrome.browserAction.setIcon({path:"working.png"});
		//开始一个番茄时间
		var iID = setInterval(function(){
			currentTime--;     
			chrome.browserAction.setBadgeText({ text: currentTime.toString()} );
			if(currentTime==0){
				var notification = new Notification('时间到',{body:"休息一下吧"});
				playSound("notification.mp3");
				currentTime=localStorage["rangePomodoro"];
				clearInterval(iID);
				//进入休息时间/长休息时间
				var sleepInterval = setInterval(function(){
					sleepTime--;
					chrome.browserAction.setBadgeText({ text: sleepTime.toString()} );
					if(sleepTime==0){
						i++;
						var notification = new Notification('时间到',{body:"休息时间到"});
						playSound("notification.mp3");
						
						sleepTime=localStorage["rangeRest"];
						clearInterval(sleepInterval);
						
						chrome.browserAction.setIcon({path:"start.png"});
						chrome.browserAction.setBadgeText({ text: currentTime.toString() } );
						clickAble=false;
					}
				},60000);
			}
		},60000);
	}
}

//播放通知铃声
function playSound(mp3File){
	//添加提醒声音
	var audio = document.createElement('audio');
	var source = document.createElement('source');   
	source.type = "audio/mpeg";
	source.src = mp3File;   
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source); 
	audio.play();
}

//监听图标单击
chrome.browserAction.onClicked.addListener(startWork);


function showTimerDetail()  
{  
  var notification = new Notification('时间到',{body:"休息时间到"});
}  
  
chrome.contextMenus.create( {  
      "type" :"normal",   
      "title": "番茄时间",  
      "contexts":["all"],  
      "onclick":function(){showTimerDetail();}  
} ); 