var $=window.Zepto;
var root=window.player;
var $scope=$(document.body);

var index=0;
var songList;
 audio =new root.audioControl();
function bindEvent(){

   $scope.on("play:change",function(ele,index){
   	console.log(index);
      audio.getAudio(songList[index].audio);
      if(audio.status=="play"){
      	audio.play();
      }
   });



   $scope.on("click",".prev-btn",function(){
    var index=controlManage.prev();
 
   	root.render(songList[index]);
   });
   $scope.on("click",".next-btn",function(){
   
    var index= controlManage.next();
   	root.render(songList[index]);
   });
    $scope.on("click",".play-btn",function(){
     console.log(audio.status)
    if(audio.status=="play"){
    	audio.pause();
    }else{
    	audio.play();
    }
    $(this).toggleClass('pause')
   });
}

function getData(url) {
	$.ajax({type:"GET",
            url:url,
            success:function(data){ 
            	root.render(data[0]);
                
                songList=data;
                bindEvent();
                 controlManage= new root.controlManage(data.length);
                console.log(data[0]);
               // $scope.trigger("play:change", 1);
               $scope.trigger("play:change",0);
            },
            error:function(){
               console.log('error');
            }
        })
}

getData("../mock/data.json");

