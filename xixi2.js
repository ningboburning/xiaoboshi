//左菜单关于详细分类div 2008-10-16
//ff支持s
function $(id){
    return document.getElementById(id);
};

function isIE(){
  return !!(window.attachEvent && !window.opera);
}

function getposOffset(what, offsettype){ 
    var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop; 
    var parentEl=what.offsetParent; 
    while (parentEl!=null)
    { 
        totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop; 
         parentEl=parentEl.offsetParent; 
    } 
    return totaloffset; 
}

var start = ["<img src='images/icon_star_gray.gif'/>","<img src='images/icon_star_harf.gif'/>","<img src='images/icon_star_red.gif'/>"];
var starts=[2,0,0,0,0,2,1,0,0,0,2,2,0,0,0,2,2,1,0,0,2,2,2,0,0,2,2,2,1,0,2,2,2,2,0,2,2,2,2,1,2,2,2,2,2];
function getStarsHtml(o){
 var s=[],i;
 for(i=0;i<5;i++) s.push(start[starts[(o-1)*10+i]]);
 return s.join('');
}

//首页幻灯
var Lantern={
    onChange:[],
    oInterval:[],
    otimeOut:[],
    opacityNum:101,
    cycNum:0,
    showNum:0,
    width:386,//整体宽度
    navyCtr:[],//2维:  0.原长 1.目标长 2.speed 
    navyTime:10,//navy动画时间
    picMoveSpeed:60,//图片移动速度
    timeOut_time:7000,//停滞时间
    info ://0.图片url 1.名称 2.链接地址 
    [],
    
    init: function(){
        Lantern.onChange=false;
        for(var i=0;i<Lantern.info.length;i++)
        {
            var picDiv
            var picTemp
            picDiv=document.createElement('div');
            picTemp=document.createElement('img');
	        picDiv.id ="LanternImg"+i;
            picDiv.name=i;
	        picTemp.src = Lantern.info[i][0];
	        picTemp.style.width = "640px";
	        picDiv.style.position ="absolute";
	        picDiv.style.left ="640px";
	        picDiv.onclick=function(){window.open(Lantern.info[this.name][2]);};
	        picDiv.appendChild(picTemp);
	        document.getElementById("lanternImg").appendChild(picDiv);
	        var divTemp
	        divTemp=document.createElement('div');
	        divTemp.id ="LanternN"+i;
	        divTemp.style.width="275px";
            divTemp.name=i;
	        divTemp.innerHTML="<div class='liclass' id='lanternnum"+i+"'>"+(i+1)+"</div><span id=\"__lanternNc"+i+"\" style=\"display:none\">&nbsp;<b>"+(i+1)+"</b>."+Lantern.info[i][1]+"</span>";
	        if(i==0)
            {
               divTemp.className ="div_off1";
            }
            else if(i==Lantern.info.length-1)
            {
                divTemp.className ="div_off3";
            }
            else
            {
                divTemp.className ="div_off2";
            }
	        //divTemp.className="div_off";
	        if(i==0)
	            divTemp.onclick=function(){window.open(Lantern.info[this.name][2]);};
	        else
	            divTemp.onclick=function(){if(!Lantern.onChange){Lantern.onChange=true;Lantern.setNavy(this.name);}};
	        document.getElementById("lanternNavy").appendChild(divTemp);
        }
        
        Lantern.initNany();
    },
    
    initNany:function(){
        navyCtr=new Array();
        for(var k=0;k<Lantern.info.length;k++)
            Lantern.navyCtr[k]=[];
        document.getElementById("__lanternNc0").style.display ="";
        document.getElementById("lanternnum0").style.display="none";
        document.getElementById("LanternN0").className ="div_on1";
        var onLength,offLength
        onLength=275//;document.getElementById("LanternN0").offsetWidth;
        offLength=28;//(Lantern.width-onLength)/(Lantern.info.length-1)
        var numtemp=0;
        for(var j=0;j<Lantern.info.length;j++)
        {
              if(j!=0)//未选
              {
                     Lantern.navyCtr[j][1]=offLength;
                     document.getElementById("__lanternNc"+j).style.display ="none";
                    if(j==Lantern.info.length-1)
                    {
                        document.getElementById("LanternN"+j).className ="div_off3";
                    }
                    else
                    {
                        document.getElementById("LanternN"+j).className ="div_off2";
                    }
                     document.getElementById("LanternN"+j).style.width=offLength+"px";
                     if(j==Lantern.info.length-1) 
                     {
                        document.getElementById("LanternN"+j).style.width=(Lantern.width-onLength-numtemp-7)+"px";  
                     }
                     else
                     {
                        numtemp+=offLength;
                     }
              }
              else//已选
              {
                 Lantern.navyCtr[j][1]=onLength;
              }
        }
		
        document.getElementById("LanternImg0").style.display ="";
        document.getElementById("LanternImg0").style.left ="0px";
        Lantern.otimeOut=setTimeout("Lantern.cycLantern()",Lantern.timeOut_time);
    },
    
    setNavy:function(i){
        if(i==Lantern.info.length-1)
             document.getElementById("lanternNavy").style.backgroundColor ="#F5F4F2";
        else
             document.getElementById("lanternNavy").style.backgroundColor ="#CCCABE";
             
        document.getElementById("__lanternNc"+i).style.display ="";
        document.getElementById("lanternnum"+i).style.display="none";
        if(i==0)
        {
            document.getElementById("LanternN"+i).className ="div_on1";
        }
        else if(i==Lantern.info.length-1)
        {
            document.getElementById("LanternN"+i).className ="div_on3";
        }
        else
        {
            document.getElementById("LanternN"+i).className ="div_on2";
        }
        document.getElementById("LanternN"+i).style.width=null;
        var onLength,offLength
        onLength=275;//document.getElementById("LanternN"+i).offsetWidth
        offLength=28;//(Lantern.width-onLength)/(Lantern.info.length-1)
        var numtemp=0;
        for(var j=0;j<Lantern.info.length;j++)
        {
              Lantern.navyCtr[j][0]=Lantern.navyCtr[j][1];
              if(i!=j)//未选
              {
                     Lantern.navyCtr[j][1]=offLength;
                     document.getElementById("__lanternNc"+j).style.display ="none";
                     document.getElementById("lanternnum"+j).style.display="";
                       if(j==Lantern.info.length-1)
                        {
                            document.getElementById("LanternN"+j).className ="div_off3";
                        }
                        else
                        {
                            document.getElementById("LanternN"+j).className ="div_off2";
                        }
                     if(j==Lantern.info.length-1) 
                     {
                        document.getElementById("LanternN"+j).style.width=(Lantern.width-onLength-numtemp-7)+"px";
                     }
                     else
                     {
                        numtemp+=offLength
                     }
                     document.getElementById("LanternN"+j).style.width=Lantern.navyCtr[j][0]+"px";
              Lantern.navyCtr[j][2]=(Lantern.navyCtr[j][1]-Lantern.navyCtr[j][0])/Lantern.navyTime ;
              }
              else//已选
              {
                 Lantern.navyCtr[j][1]=onLength;
                 document.getElementById("LanternN"+j).style.width=(Lantern.navyCtr[j][0])+"px";
              Lantern.navyCtr[j][2]=(Lantern.navyCtr[j][1]-Lantern.navyCtr[j][0])/Lantern.navyTime ;
             
              }
        }
        document.getElementById("LanternImg"+i).style.display ="";
        if(Lantern.onChange)
        {
                document.getElementById("LanternN"+i).onclick=function(){window.open(Lantern.info[this.name][2]);};
                document.getElementById("LanternN"+Lantern.showNum).onclick=function(){if(!Lantern.onChange){Lantern.onChange=true;Lantern.setNavy(this.name);}};
                document.getElementById("LanternImg"+i).style.zIndex=0;
                document.getElementById("LanternImg"+Lantern.showNum).style.zIndex=-1;
                Lantern.oInterval=setInterval('Lantern.changeLantern('+i+')',10);
        }
    },
    
    imgMoveOver:false,
    navyMoveOver:false,
     changeLantern:function(i){
            if(Lantern.otimeOut!=null)
                clearTimeout(Lantern.otimeOut)
             //move
             if(!Lantern.navyMoveOver)
                Lantern.moveNavy(i);
             if(!Lantern.imgMoveOver)
             {
                Lantern.moveImg(i);
             }
             else
             {
                Lantern.flashImg(i);
             }
    },
    
     moveNavy:function(select){
            var breaktime=0;
            for(var i=0;i<Lantern.info.length;i++){
                  if((Lantern.navyCtr[i][2]>0&&document.getElementById("LanternN"+i).offsetWidth<Lantern.navyCtr[i][1])||(Lantern.navyCtr[i][2]<0&&document.getElementById("LanternN"+i).offsetWidth>Lantern.navyCtr[i][1]))
                  {
                       if(i==select){
                            document.getElementById("LanternN"+i).style.width=(document.getElementById("LanternN"+i).offsetWidth+Lantern.navyCtr[i][2]-7)+"px";  
                       }
                       else{
                            document.getElementById("LanternN"+i).style.width=(document.getElementById("LanternN"+i).offsetWidth+Lantern.navyCtr[i][2])+"px";  
                       }
                  }
                  else
                  {
                      if(i==select)
                      {
                           for(var j=0;j<Lantern.info.length;j++)
                           {
                                document.getElementById("LanternN"+j).style.width=Lantern.navyCtr[j][1]+"px"; 
                           }

                           Lantern.navyMoveOver=true;
                           break;
                  }
              }
            }
    },
    
     moveImg:function(i){
            if(document.getElementById("LanternImg"+i).offsetLeft>0)
            {
               document.getElementById("LanternImg"+i).style.left=(document.getElementById("LanternImg"+i).offsetLeft-Lantern.picMoveSpeed)+"px";
            }
            else
            {
                document.getElementById("LanternImg"+i).style.left="0px";
                document.getElementById("LanternImg"+Lantern.showNum).style.left=Lantern.width+"px";
                Lantern.imgMoveOver=true;
            }
    },
    
    flashImg:function(i){
             document.getElementById("LanternImg"+i).style.opacity="100"; 
                    Lantern.showNum=i;
                    Lantern.imgMoveOver=false;
                    Lantern.navyMoveOver=false;
                    Lantern.opacityNum=101;
                    Lantern.cycNum=i;
                    clearInterval(Lantern.oInterval);
                    Lantern.otimeOut=setTimeout("Lantern.otimeOut=Lantern.cycLantern()",Lantern.timeOut_time);
                    Lantern.onChange=false;
    },
      
    cycLantern:function(){
        if(!Lantern.onChange)
        {
            Lantern.onChange=true;
            if(Lantern.cycNum==Lantern.info.length-1)
                Lantern.cycNum=0;
            else
                Lantern.cycNum++;
           Lantern.setNavy(Lantern.cycNum)
        }
    },
    moveprevious:function(){
        if(!Lantern.onChange){
            if(Lantern.cycNum>0)
                Lantern.cycNum-=1;
            else
                return;
            
            Lantern.onChange=true;
            Lantern.setNavy(Lantern.cycNum)        
        }
    },
    movenext:function(){
        if(!Lantern.onChange){
            
            if(Lantern.cycNum>=Lantern.info.length-1)
                return ;
            else
                Lantern.cycNum+=1;        
             
                Lantern.onChange=true;                
                Lantern.setNavy(Lantern.cycNum);
        }
    }
}