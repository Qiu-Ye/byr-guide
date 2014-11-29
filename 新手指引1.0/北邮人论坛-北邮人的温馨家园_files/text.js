window.onload=function(){
    var guideElems=['ban_ner_wrapper','u_login','xlist','recommend'];
    guide(guideElems);
};


function guide(guideArray){
   var introElem=new Array();
    for (var i=0;i<guideArray.length; i++) {
        var currentElement=document.getElementById(guideArray[i]);
        if(currentElement){introElem.push(currentElement);}
    }
    if(introElem.length < 1) {return false;}

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
        elementPosition = _getPosition(introElem[i]);
        aElem.setAttribute('style', 'width: ' + (elementPosition.width  + 10)  + 'px;' +
                                    'height:' + (elementPosition.height + 10)  + 'px;' +
                                    'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                    'left: '  + (elementPosition.left   - 5)   + 'px;');
        var oldInBox = document.body.querySelector('.intro-box');
        if (oldInBox) {oldInBox.parentNode.removeChild(oldInBox);}
        }
        else{
        aElem=document.createElement('div');
        aElem.className='intro-item';
        elementPosition = _getPosition(introElem[i]);
        aElem.setAttribute('style', 'width: ' + (elementPosition.width  + 10)  + 'px; ' +
                                    'height:' + (elementPosition.height + 10)  + 'px; ' +
                                    'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                    'left: '  + (elementPosition.left   - 5)   + 'px;');
        document.body.appendChild(aElem);
        }


        introElem[i].className += ' intro-showElement';
        var currentElementPosition = introElem[i].style.position;
        if (currentElementPosition !== 'absolute' &&currentElementPosition !== 'relative') {
         introElem[i].className += ' intro-relativePosition';
        }

        var aStep=document.createElement('div');
        aStep.className='intro-box step'+i;
        aStep.style.opacity = 1;
        aElem.appendChild(aStep);
        var winw=window.innerWidth|| document.body.clientWidth;
        var winh=window.innerWidth|| document.body.clientHeight;
        if(aStep.offsetWidth+10<elementPosition.left){
            aStepLeft=-aStep.offsetWidth-10;
            if(aStep.offsetHeight+elementPosition.top+10>winh){aStepTop=-aStep.offsetHeight;}
            else{aStepTop=10;}
        }
        else if((aStep.offsetWidth+elementPosition.left+elementPosition.width+10)<winw){
            aStepLeft=elementPosition.width + 10;
            if(aStep.offsetHeight+elementPosition.top+10>winh){aStepTop=-aStep.offsetHeight;}
            else{aStepTop=10;}
        }
        else{
            aStepLeft=elementPosition.width/2-aStep.offsetWidth/2;
            if(aStep.offsetHeight+10<elementPosition.top){
                aStepTop=-aStep.offsetHeight - 10;
                }
            else if((aStep.offsetHeight+elementPosition.top+elementPosition.height+10)<winh){
                aStepTop=elementPosition.height + 10;
                }
        }
        aStep.setAttribute('style','top:'+aStepTop+ 'px;'+'left: '+aStepLeft+'px;');


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
        aA.href = 'javascript:void(0);';
        aStep.appendChild(aA);

        if(i<introElem.length-1){
        var aClose=document.createElement('span');
        aClose.setAttribute("title","关闭");
        aClose.innerHTML="关闭";
        aClose.onclick=function(){_exitIntro();};
        aStep.appendChild(aClose);
        }


        var rect = aStep.getBoundingClientRect();
        rectTop = rect.bottom - (rect.bottom - rect.top),
        rectBottom = rect.bottom - winh;
         if (top < 0) {
            window.scrollBy(0,rectTop);
          } else {
           window.scrollBy(0,rectBottom);
          }
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
        var showElement = document.querySelector('.intro-showElement');
        if (showElement) {
          showElement.className = showElement.className.replace(/intro-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
        }
	}

	//cookie
	/*
		//添加cookie
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+30);
	document.cookie="name=bbs.byr.cn;expires="+oDate;
	}

		//读取cookie
	var res=document.cookie.substring(5);
	alert(res);

	//如果没有cookie，执行以下动作
	if(res!="bbs.byr.cn"){
		alert(res)
	*/
}
