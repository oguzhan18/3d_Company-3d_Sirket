var winH = 0, winW = 0, viewport, pers = 700, backwall;

window.onload = function(){
  winH = window.innerHeight;
  winW = window.innerWidth;
  viewport = document.getElementById("viewport");
  backwall = document.getElementById("backwall");
  repositionBackface(); addTextArea(document.getElementById("persText"),"BRANT HOLT","Helvetica,sans-serif","90px","900",30,"#FFFFFF",[0,0,96],".7");
};
window.onresize = function(){
  winH = window.innerHeight;
  winW = window.innerWidth;
  repositionBackface();
};

window.onmousemove = function(e){
  var x = e.clientX;
  var y = e.clientY;
  var finalW = (+x / +winW) * 100;
  var finalH = (+y / +winH) * 100;
  updatePerspective(finalW,finalH);
};

window.addEventListener("touchstart", handleTouch, false);

function handleTouch(e){
  e.preventDefault();
}

window.onmousewheel = function(e){
  var offset = 25;
  pers = pers + ((e.wheelDelta / 120) * offset);
  viewport.style.perspective = pers + "px";
  viewport.style.webkitPerspective = pers + "px";
};

function repositionBackface(){
  var x = 0;
  if(winW < winH){
    x = winW;
  } else {
    x = winH;
  }
  backwall.style.transform = "translateZ(-" + (x - 1) + "px)";
  backwall.style.webkitTransform = "translateZ(-" + (x - 1) + "px)";
}

function updatePerspective(originX,originY){
  viewport.style.perspectiveOrigin = originX.toFixed(4) + "% " + originY.toFixed(4) + "%";
  viewport.style.webkitPerspectiveOrigin = originX.toFixed(4) + "% " + originY.toFixed(4) + "%";
}

window.addEventListener("deviceorientation", handleMotion,true);

function handleMotion(e){
  var x = normalizeResults(-90,90,e.gamma);
  var y = normalizeResults(-180,180,e.beta);
  var finalW = +x * 100;
  var finalH = +y * 100;
  updatePerspective(finalW,finalH);
}

function normalizeResults(start,end,input){
  return (input-start)/(end-start);
}

function addTextArea(target,value,font,size,weight,depth,faceColor,sideColor,intensity){
  target.transformStyle = "preserve-3d";
  target.webkitTransformStyle = "preserve-3d";
  var textContainer = document.createElement("div");
  textContainer.style.display = "inline-block";
  textContainer.transformStyle = "preserve-3d";
  textContainer.webkitTransformStyle = "preserve-3d";
  textContainer.style.fontFamily = font;
  textContainer.style.fontSize = size;
  textContainer.style.fontWeight = weight;
  target.appendChild(textContainer);
  for(var i = 0; i < depth; i++){
    var text = document.createElement("div");
    if(!i){
      text.style.color = faceColor;
    } else {
      var step = (sideColor[2]*intensity)/(depth - 1);
      text.style.color = "hsl(" + sideColor[0] + ", " + sideColor[1] + "%, " + Math.floor((sideColor[2]-(i*step))) + "%)";
    }
    text.innerHTML = value;
    text.style.position = "absolute";
    text.style.zIndex = 999999 - i;
    text.style.top = "0%";
    text.style.left = "0%";
    text.style.webkitTransform = "translateZ(-" + i + "px)";
    textContainer.appendChild(text);
  }
}
/*
██████╗  ██████╗ ██╗   ██╗███████╗██╗  ██╗ █████╗ ███╗   ██╗     ██████╗ █████╗ ██████╗ ██████╗ ████████╗
██╔═══██╗██╔════╝ ██║   ██║╚══███╔╝██║  ██║██╔══██╗████╗  ██║    ██╔════╝██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝
██║   ██║██║  ███╗██║   ██║  ███╔╝ ███████║███████║██╔██╗ ██║    ██║     ███████║██████╔╝██████╔╝   ██║   
██║   ██║██║   ██║██║   ██║ ███╔╝  ██╔══██║██╔══██║██║╚██╗██║    ██║     ██╔══██║██╔══██╗██╔══██╗   ██║   
╚██████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║██║  ██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║  ██║   ██║   
╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
                                                                    ██                                     
██████╗ ███████╗███████╗██████╗  ██████╗ ██████╗ ██████╗ 
██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔═══██╗██╔══██╗
██║  ██║█████╗  █████╗  ██████╔╝██║     ██║   ██║██║  ██║ ----------------------------------------------
██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██║     ██║   ██║██║  ██║ 
██████╔╝███████╗███████╗██║     ╚██████╗╚██████╔╝██████╔╝
╚═════╝ ╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═════╝ ╚═════╝ 

██████╗ █████╗ ██████╗ ████████╗     █████╗ ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗
██║     ███████║██████╔╝   ██║       ███████║██████╔╝██████╔╝
██║     ██╔══██║██╔══██╗   ██║       ██╔══██║██╔═══╝ ██╔═══╝ 
╚██████╗██║  ██║██║  ██║   ██║       ██║  ██║██║     ██║     
╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝     
*/