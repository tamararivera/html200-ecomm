function whichAnimationEvent(){
    var t; 
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    };

    for(t in animations){
        if(badge.style[t] !== undefined ){
            return animations[t];
        }
    }
}

function toggleVisibility(element) {
  var visibility = element.style.visibility;
  if (visibility == 'visible') {
    element.style.visibility = 'hidden';
  } else {
    element.style.visibility = 'visible';
  }
}

function cleanElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}