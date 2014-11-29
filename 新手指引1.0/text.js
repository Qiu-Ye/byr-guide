window.onload=function(){
    var oMask=document.createElement('div')
	oMask.className='mask';
	oMask.onclick=function(){_exitIntro()};
	document.body.appendChild(oMask);

   var introElem=new Array();
   introElem[0]=document.getElementById('ban_ner_wrapper');
   introElem[1]=document.getElementById('u_login');
    introElem[2]=document.getElementById('xlist');
    introElem[3]=document.getElementById('recommend');

   var currentStep=0;
   _creatIntroItem();

    //生成第i个指导项和指导目标
    function _creatIntroItem(){
        var i=currentStep;
        var aElem=document.createElement('div');
    	aElem.className='intro-item';
        elementPosition = _getPosition(introElem[i]);
        aElem.setAttribute('style', 'width: ' + (elementPosition.width  + 10)  + 'px; ' +
                                    'height:' + (elementPosition.height + 10)  + 'px; ' +
                                    'top:'    + (elementPosition.top    - 5)   + 'px;' +
                                    'left: '  + (elementPosition.left   - 5)   + 'px;');

    	var aStep=document.createElement('div');
	    aStep.className='intro-box step'+i;
    	switch(i){
    	case 1:
	    aStep.setAttribute('style', 'top:'    + (elementPosition.height  + 10)   + 'px;' +
                                    'left: '  + (elementPosition.width + 10)   + 'px;');
        break;

        case 2:
        aStep.setAttribute('style', 'top:'    + (10)   + 'px;' +
                                    'left: '  + (elementPosition.width + 10)   + 'px;');
        break;

	    case 0:
	    aStep.setAttribute('style', 'top:'    + (elementPosition.height  + 10)   + 'px;' +
                                    'right: '  + (elementPosition.width - 10)   + 'px;');
        break;

        default:
        aStep.setAttribute('style', 'top:'    + (elementPosition.height  + 10)   + 'px;' +
                                    'right: '  + (10)   + 'px;');
        break;
	    }
        aStep.style.opacity = 1;

	    var aA=document.createElement('a');
	    if(i==introElem.length-1){
        aA.setAttribute("title","开始体验");
        aA.innerHTML="开始体验";
        aA.onclick=function(){_exitIntro();};
	    }
	    else if(i<introElem.length-1){
        aA.setAttribute("title","");
        aA.innerHTML="下一步";
        aA.onclick=function(){_nextIntro();};
	    }
	    aA.href = 'javascript:void(0);';
        introElem[i].className += ' intro-showElement';
        var currentElementPosition = introElem[i].style.position;
        if (currentElementPosition !== 'absolute' &&
            currentElementPosition !== 'relative') {
        //change to new intro item
         introElem[i].className += ' intro-relativePosition';
        }

        document.body.appendChild(aElem);
        aElem.appendChild(aStep);
	    aStep.appendChild(aA);

        if(i<introElem.length-1){
	    var aClose=document.createElement('span');
        aClose.setAttribute("title","关闭");
        aClose.innerHTML="关闭";
        aClose.onclick=function(){_exitIntro();};
	    aStep.appendChild(aClose);
        }

        var targetElement=document.body.querySelector('.intro-box');
        _elementInViewport(targetElement);
        var rect = targetElement.getBoundingClientRect()
        winHeight=document.documentElement.clientHeight|| document.body.clientHeight;
        top = rect.bottom - (rect.bottom - rect.top),
        bottom = rect.bottom - winHeight;
         //Scroll up
         if (top < 0 || targetElement.clientHeight > winHeight) {
            window.scrollBy(0, top - 30);
        //Scroll down
          } else {
           window.scrollBy(0, bottom + 100);
          }

        currentStep++;
    }


	//计算目标在页面中的位置
  function _getPosition(element) {
    var elementPosition = {};
    //set width
    elementPosition.width = element.offsetWidth;
    //set height
    elementPosition.height = element.offsetHeight;
    //calculate element top and left
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft;
      _y += element.offsetTop;
      element = element.offsetParent;
    }
    //set top
    elementPosition.top = _y;
    //set left
    elementPosition.left = _x;
    return elementPosition;
  }

    //下一步函数
    function _nextIntro(){
         var oldInElem = document.body.querySelector('.intro-item');
         if (oldInElem) {
             oldInElem.parentNode.removeChild(oldInElem);
            }
        var oldShowElement = document.querySelector('.intro-showElement');
        if (oldShowElement) {
          oldShowElement.className = oldShowElement.className.replace(/intro-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');
        }
        _creatIntroItem();
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

  function _elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      (rect.bottom+80) <= window.innerHeight && // add 80 to get the text right
      rect.right <= window.innerWidth
    );
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
