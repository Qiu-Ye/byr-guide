window.onload=function(){
    var guideArr=[
        //pic_btn分别为top，left，width，height width:95px; height:32px
        {id:"ban_ner_wrapper",pic_src:"images/guide2.png",pic_btn:"210,146,95,32",pic_position:"bottom"},
        {id:"u_login",pic_src:"images/guide1.png",pic_btn:"209,143,95,32",pic_position:"right"},
        {id:"xlist",pic_src:"images/guide1.png",pic_btn:"209,143,95,32"},
        {id:"picshow",pic_src:"images/guide2.png",pic_btn:"209,143,95,32",pic_position:"bottom"},
        {id:"recommend",pic_src:"images/guide3.png",pic_btn:"207,153,95,32",pic_position:"bottom"},
        {id:"postrank",pic_src:"images/guide3.png",pic_btn:"207,153,95,32"}
        ];
    var finpic={pic_src:"images/guide3.png",pic_btn:"207,153,95,32"};
    guide(guideArr,finpic);
};


function guide(guideArray,finishpic){
   var introElem=new Array();
    for (var i=0;i<guideArray.length; i++) {
        var currentElement=document.getElementById(guideArray[i].id);
        if(currentElement){introElem.push({element:currentElement,
        src:guideArray[i].pic_src,
        btn:guideArray[i].pic_btn,
        position:guideArray[i].pic_position});}
    }
    if(introElem.length < 1) {return false;}
    if(finishpic){introElem.push({element:null,src:finishpic.pic_src,btn:finishpic.pic_btn,position:finishpic.pic_position});}
    for(var k=0;k<introElem.length;k++){
       Preimg=new Image();
       Preimg.src=introElem[k].src;
    }

    var oMask=document.createElement('div');
	oMask.className='mask';
	oMask.onclick=function(){_exitIntro()};
	document.body.appendChild(oMask);

   var currentStep=0;
   _creatIntroItem(currentStep);

    //生成第i个指导项和指导目标
    function _creatIntroItem(targetStep){
        var i=targetStep;

        var aElem = document.body.querySelector('.intro-item');
        if (aElem) {
        if((i<introElem.length-1)||!finishpic){
        elementPosition = _getPosition(introElem[i].element);
        aElem.setAttribute('style', 'width: ' + (elementPosition.width  + 10)  + 'px;' +
                                    'height:' + (elementPosition.height + 10)  + 'px;' +
                                    'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                    'left: '  + (elementPosition.left   - 5)   + 'px;');
        }else if((i==introElem.length-1)&&finishpic){
        aElem.parentNode.removeChild(aElem);
        aElem=document.createElement("div");
        aElem.className='intro-closeitem';
        document.body.appendChild(aElem);
        }
        var oldInBox = document.body.querySelector('.intro-box');
        if (oldInBox) {oldInBox.parentNode.removeChild(oldInBox);}
        }
        else{
        aElem=document.createElement('div');
        aElem.className='intro-item';
        elementPosition = _getPosition(introElem[i].element);
        aElem.setAttribute('style', 'width: ' + (elementPosition.width  + 10)  + 'px; ' +
                                    'height:' + (elementPosition.height + 10)  + 'px; ' +
                                    'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                    'left: '  + (elementPosition.left   - 5)   + 'px;');
        document.body.appendChild(aElem);
        }

        if((i<introElem.length-1)||!finishpic){
        introElem[i].element.className += ' intro-showElement';
        var currentElementPosition = introElem[i].element.style.position;
        if (currentElementPosition !== 'absolute' &&currentElementPosition !== 'relative') {
         introElem[i].element.className += ' intro-relativePosition';
        }
        }

        var aStep=document.createElement('div');
        aStep.className='intro-box';
        aStep.style.opacity = 1;

        var aImg=document.createElement('img');
        aImg.src=introElem[i].src;
        aStep.appendChild(aImg);
        aImg.onload=function(){
            if((i<introElem.length-1)||!finishpic){
            var aStepPosition=_autosetImgPosition(introElem[i].element,introElem[i].position,aStep);
            aStep.setAttribute('style','top:'+ aStepPosition.top+ 'px; left: '+ aStepPosition.left+'px');
            }
            else if((i==introElem.length-1)&&finishpic){
            aStep.setAttribute('style','top:'+(-aStep.offsetWidth/2)+ 'px; left: '+(-aStep.offsetHeight/2)+'px');
            aElem.style.top="50%";
            aElem.style.left="50%";
            }
        };
        aElem.appendChild(aStep);

        var aA=document.createElement('a');
        if(i==introElem.length-1){
        aA.setAttribute("title","开始体验");
        aA.innerHTML="开始体验";
        aA.onclick=function(){_exitIntro();};
        }
        else if(i<introElem.length-1){
        aA.setAttribute("title","下一步");
        aA.innerHTML="下一步";
        aA.onclick=function(){_nextIntro();};
        }
        var aA_btn=introElem[i].btn.split(',');
        aA.setAttribute('style','top:'+aA_btn[0]+ 'px; left: '+aA_btn[1]+'px; width: '+aA_btn[2]+'px; height: '+aA_btn[3]+'px;');
        aA.href = 'javascript:void(0);';
        aStep.appendChild(aA);

         var osTop = document.documentElement.scrollTop || document.body.scrollTop;
         window.scrollBy(0,elementPosition.top-osTop-30);

    }

    //给图片框自动定位
    function _autosetImgPosition(targetelem,position,step){
        var ImgPosition={};
        var elementPosition = _getPosition(targetelem);
        switch(position)
        {
        case 'top':
            ImgPosition.left=elementPosition.width/2-step.offsetWidth/2;
            ImgPosition.top=-step.offsetHeight - 10;
            break;
        case 'bottom':
            ImgPosition.left=elementPosition.width/2-step.offsetWidth/2;
            ImgPosition.top=elementPosition.height+10;
            break;
        case 'left':
            ImgPosition.top=10;
            ImgPosition.left=-step.offsetWidth-10;
            break;
        case 'right':
            ImgPosition.top=10;
            ImgPosition.left=elementPosition.width + 10;
            break;
        default:
        var winw=window.innerWidth|| document.body.clientWidth;
        var winh=window.innerWidth|| document.body.clientHeight;
        if(step.offsetWidth+10<elementPosition.left){
            ImgPosition.left=-step.offsetWidth-10;
            if(step.offsetHeight>elementPosition.height){ImgPosition.top=-step.offsetHeight+elementPosition.height;}
            else{ImgPosition.top=10;}
        }
        else if((step.offsetWidth+elementPosition.left+elementPosition.width+10)<winw){
            ImgPosition.left=elementPosition.width + 10;
            if(step.offsetHeight>elementPosition.height){ImgPosition.top=-step.offsetHeight+elementPosition.height;}
            else{ImgPosition.top=10;}
        }
        else{
            ImgPosition.left=elementPosition.width/2-aStep.offsetWidth/2;
            if(step.offsetHeight+10<elementPosition.top){ImgPosition.top=-step.offsetHeight - 10;}
            else if((step.offsetHeight+elementPosition.top+elementPosition.height+10)<winh){ImgPosition.top=elementPosition.height+10;}
        }
        }
        return ImgPosition;
    }


	//计算目标在页面中的位置
    function _getPosition(element) {
    var elementPosition = {};
    elementPosition.width = element.offsetWidth;
    elementPosition.height = element.offsetHeight;
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft;
      _y += element.offsetTop;
      element = element.offsetParent;
    }
    elementPosition.top = _y;
    elementPosition.left = _x;
    return elementPosition;
  }

    //下一步函数
    function _nextIntro(){
        var oldShowElement = document.querySelector('.intro-showElement');
        if (oldShowElement) {
          oldShowElement.className = oldShowElement.className.replace(/intro-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
        }
        _creatIntroItem(++currentStep);
    }


    //退出指引
    function _exitIntro()
	{
        oMask.style.opacity = 0;
        setTimeout(function () {
            oMask.parentNode.removeChild(oMask);
        }, 500);
        var inElem = document.body.querySelector('.intro-item');
         if (inElem) {
             inElem.parentNode.removeChild(inElem);
            }
        var closeElem = document.body.querySelector('.intro-closeitem');
         if (closeElem) {
             closeElem.parentNode.removeChild(closeElem);
            }
        var InBox = document.body.querySelector('.intro-box');
        if (InBox) {
            InBox.parentNode.removeChild(InBox);

        }
        var showElement = document.querySelector('.intro-showElement');
        if (showElement) {
          showElement.className = showElement.className.replace(/intro-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
        }
	}
}
