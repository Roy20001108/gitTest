/**
 * Created by Administrator on 2016/12/15.
 */
var pmw = window.innerWidth;
var pmh = window.innerHeight;
sfw = pmw/640;
sfh = pmh/1060;




function positionC(x,y,imgid,bg,fatherW,scale){

    
   	var imw = document.getElementById(imgid).width;
    var imh = document.getElementById(imgid).height;
   	   	
	if(scale){
		imw=imw*scale;
		imh=imh*scale;
	}

   	var xPosition=(pmw/2-imw*sfh/2)-x*sfh;
// console.log("xPosition",xPosition);
	if(fatherW){
		xPosition=(fatherW*sfh/2-imw*sfh/2)-x*sfh;
	}
 	//console.log(pmw,xPosition,imw,imgid)
   	var yPosition=y*sfh;

	imh=imh*sfh;
	imw=imw*sfh;
	// console.log("imgid",imgid,imw,imh,sfh)
    if(bg){
    	$("#"+imgid).css({"height":"100%","left":xPosition+"px","top":yPosition+"px"})
    }else{
    	$("#"+imgid).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","top":yPosition+"px"})
    }
      
}


function positionCB(x,y,imgid,bg,fatherW,scale){
    
   	var imw = document.getElementById(imgid).width;
    var imh = document.getElementById(imgid).height;
   	   	
	if(scale){
		imw=imw*scale;
		imh=imh*scale;
	}

   	var xPosition=(pmw/2-imw*sfh/2)-x*sfh;
//console.log("xPosition",xPosition,imgid,pmw,imw*sfh);
	if(fatherW){
		xPosition=(fatherW*sfh/2-imw*sfh/2)-x*sfh;
	}
 	//console.log(pmw,xPosition,imw,imgid)
   	var yPosition=y*sfh;

	imh=imh*sfh;
	imw=imw*sfh;
    if(bg){
    	$("#"+imgid).css({"height":"100%","left":xPosition+"px","bottom":yPosition+"px"})
    }else{
    	$("#"+imgid).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","bottom":yPosition+"px"})
    }
      
}


function positionCC(x,y,imgid,bg,fatherW,scale){
    
   	var imw = document.getElementById(imgid).width;
    var imh = document.getElementById(imgid).height;
   	   	
	if(scale){
		imw=imw*scale;
		imh=imh*scale;
	}

   	var xPosition=(pmw/2-imw*sfh/2)-x*sfh;
//console.log("xPosition",xPosition,imgid,pmw,imw*sfh);
	if(fatherW){
		xPosition=(fatherW*sfh/2-imw*sfh/2)-x*sfh;
	}
 	//console.log(pmw,xPosition,imw,imgid)
   	var yPosition=(pmh/2-imh*sfh/2)-y*sfh;

	imh=imh*sfh;
	imw=imw*sfh;
    if(bg){
    	$("#"+imgid).css({"height":"100%","left":xPosition+"px","top":yPosition+"px"})
    }else{
    	$("#"+imgid).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","top":yPosition+"px"})
    }
      
}


function positionForCss(x,y,id,fatherW,scale){
    
   	var imw = $("#"+id).css("width").split("px")[0];
    var imh = $("#"+id).css("height").split("px")[0];



    var  font;
    if($("#"+id).css("fontSize")){
    	font=$("#"+id).css("fontSize").split("px")[0];
    	font=font*sfh;
    }


   	imh=imh*sfh;
   	imw=imw*sfh;
   	if(scale){
   		imh=imh*scale;
   		imw=imw*scale;
   	}
   	// console.log("ccc",id,imh,imw,$("#"+id).css("height").split("px")[0],sfh,pmh/1060);
	// console.log("id",imh,imw,font)
   	var xPosition=(pmw/2-imw/2)-x*sfh;
	
	if(fatherW){
		xPosition=(fatherW*sfh/2-imw/2)-x*sfh;
	}

   	var yPosition=y*sfh;
    
    if($("#"+id).css("fontSize")){
    	$("#"+id).css({"height":imh+"px","width":imw+"px","fontSize":font+"px","left":xPosition+"px","top":yPosition+"px"})
    }else{
    	$("#"+id).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","top":yPosition+"px"})
    }

}

function positionForCssB(x,y,id,fatherW,scale){
    
   	var imw = $("#"+id).css("width").split("px")[0];
    var imh = $("#"+id).css("height").split("px")[0];
    var  font;
    if($("#"+id).css("fontSize")){
    	font=$("#"+id).css("fontSize").split("px")[0];
    	font=font*sfh;
    }

   	imh=imh*sfh;
   	imw=imw*sfh;
   	if(scale){
   		imh=imh*scale;
   		imw=imw*scale;
   	}
   	
// 	console.log("id",imh,imw,font)
   	var xPosition=(pmw/2-imw/2)-x*sfh;
	// console.log(id,xPosition);
	if(fatherW){
		xPosition=(fatherW*sfh/2-imw/2)-x*sfh;
	}
   	var yPosition=y*sfh;
    
    if($("#"+id).css("fontSize")){
    	$("#"+id).css({"height":imh+"px","width":imw+"px","fontSize":font+"px","left":xPosition+"px","bottom":yPosition+"px"})
    }else{
    	$("#"+id).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","bottom":yPosition+"px"})
    }

}


function positionForCssC(x,y,id,fatherW){
    
   	var imw = $("#"+id).css("width").split("px")[0];
    var imh = $("#"+id).css("height").split("px")[0];
    var  font;
    if($("#"+id).css("fontSize")){
    	font=$("#"+id).css("fontSize").split("px")[0];
    	font=font*sfh;
    }

   	imh=imh*sfh;
   	imw=imw*sfh;
   	
// 	console.log("id",imh,imw,font)
   	var xPosition=(pmw/2-imw/2)-x*sfh;
   	var yPosition=(pmh/2-imh/2)-y*sfh;
	// console.log(id,xPosition);
	if(fatherW){
		xPosition=(fatherW*sfh/2-imw/2)-x*sfh;
		yPosition=(fatherW*sfh/2-imh/2)-y*sfh;
	}
   	
    
    if($("#"+id).css("fontSize")){
    	$("#"+id).css({"height":imh+"px","width":imw+"px","fontSize":font+"px","left":xPosition+"px","top":yPosition+"px"})
    }else{
    	$("#"+id).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","top":yPosition+"px"})
    }

}


function positionL(x,y,imgid,cs){

	var imw = document.getElementById(imgid).width;
	var imh = document.getElementById(imgid).height;
	if(cs){
		imw = $("#"+imgid).css("width").split("px")[0];
        imh = $("#"+imgid).css("height").split("px")[0];
	}

	imh=imh*sfh;
	imw=imw*sfh;

// 	console.log("id",imh,imw,font)
	var xPosition=x*sfh;
	var yPosition=y*sfh;

	
	$("#"+imgid).css({"height":imh+"px","width":imw+"px","left":xPosition+"px","top":yPosition+"px"})
	

}


function positionR(x,y,imgid,cs){

	var imw = document.getElementById(imgid).width;
	var imh = document.getElementById(imgid).height;
	if(cs){
		imw = $("#"+imgid).css("width").split("px")[0];
        imh = $("#"+imgid).css("height").split("px")[0];
	}

	imh=imh*sfh;
	imw=imw*sfh;

// 	console.log("id",imh,imw,font)
	var xPosition=x*sfh;
	var yPosition=y*sfh;

	
	$("#"+imgid).css({"height":imh+"px","width":imw+"px","right":xPosition+"px","top":yPosition+"px"})
	

}


function positionRB(x,y,imgid,cs){

	var imw = document.getElementById(imgid).width;
	var imh = document.getElementById(imgid).height;
	if(cs){
		imw = $("#"+imgid).css("width").split("px")[0];
        imh = $("#"+imgid).css("height").split("px")[0];
	}

	imh=imh*sfh;
	imw=imw*sfh;

// 	console.log("id",imh,imw,font)
	var xPosition=x*sfh;
	var yPosition=y*sfh;
	
	$("#"+imgid).css({"height":imh+"px","width":imw+"px","right":xPosition+"px","bottom":yPosition+"px"})
	

}







Array.prototype.unique3 = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
};


Array.prototype.removeByValue = function(val) {
	for(var i=0; i<this.length; i++) {
		if(this[i] == val) {
			this.splice(i, 1);
			break;
		}
	}
};


Array.prototype.aryEquals = function (array) {
	// if the other array is a falsy value, return
	if (!array)
		return false;

	// compare lengths - can save a lot of time
	if (this.length != array.length){
		return false;
	}

	for(var i=0;i<this.length;i++){
		var find=false;
		for(var a=0;a<array.length;a++){
			if(this[i]==array[a]){
				find=true;
				break;
			}

		}
		if(!find){
			return false;
		}
		return true;
	}

};


if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
		for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
		return this;
	};
}


function changCssXY(id,x,y,imgW){

	//console.log("changCssXY",id,x,y,imgW);
	//(pmw/2-imw*sfh/2)
	var xPosition=imgW-x*sfh;


	var yPosition=y*sfh;


	var style  = document.getElementById(id).style;
	style.left    = xPosition+"px";
	style.top    = yPosition+"px";

}


function audioAutoPlay(id){
	var audio = document.getElementById(id);
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {
		audio.play();
	}, false);
}

function audioAutoStop(id){
	var audio = document.getElementById(id);
	audio.pause();
}


//规模变大变小
function changCssScale(id,scale){

	var style  = document.getElementById(id).style;
//  console.log("style",style)
	var transform = "scale("+ scale +")";
	style.MozTransform    = transform;
	style.WebkitTransform = transform;
	style.OTransform      = transform;
	style.Transform       = transform;

}

//旋转
function changCssRotate(id,deg,x,y){
	var style  = document.getElementById(id).style;
	var transform = "rotate("+ deg +"deg)";
	var transformOrigin = x+"%"+" "+y+"%";
	style.MozTransform    = transform;
	style.WebkitTransform = transform;
	style.OTransform      = transform;
	style.Transform       = transform;
	style.TransformOrigin     = transformOrigin;
	style.MozTransformOrigin     = transformOrigin;
	style.WebkitTransformOrigin     = transformOrigin;
	style.OTransformOrigin     = transformOrigin;
	style.MsTransformOrigin     = transformOrigin;
}
