

function swipeUp() {
   
  var that = this;
  this.downCall = null;
  this.endFun=null;
  this.obj="";
  this.startY=null;
  this.startX=null;
  this.moveAddY=0;
  this.moveAddX=0;
  this.moveTotalAddY=0;
  this.moveTotalAddX=0;
  this.onTouch=false;
  that.touchStart = function (event) {
      that.onTouch=true;
      // console.log("event",event)
      that.startY=event.stageY;
  that.startX=event.stageX;
  };
  that.touchEnd = function (event) {
      that.onTouch=false;
      that.startY=null;
  that.startX=null;
      that.endFun();
  };
  that.touchMove = function (event) {
      // console.log("that.onTouchevent",event);
     
      if(!that.onTouch){
          return;
      }

      var y1=event.stageY;
      var x1=event.stageX;
      that.moveAddY=(that.startY-y1);
      that.moveTotalAddY+=that.moveAddY;
      that.moveAddX=(that.startX-x1);
      that.moveTotalAddX+=that.moveAddX;
      that.downCall();
      that.startY=y1;
      that.startX=x1;
      
      // console.log("this.moveTotalAdd",that.moveAddY,that.moveTotalAddX);
  //  if(that.startY-y1>50){
  //  	that.downCall();
  //  }

      //console.log("aaaaaaaaaaa",that.startY,y1,that.moveAdd,that.moveTotalAdd);
  };
  this.accept = function (obj, down,endFun) {
      this.downCall = down;
      this.endFun=endFun;
      this.obj=obj;
      obj.on(Laya.Event.MOUSE_DOWN,this,this.touchStart)
      obj.on(Laya.Event.MOUSE_MOVE,this,this.touchMove)
      obj.on(Laya.Event.MOUSE_UP,this,this.touchEnd)
  };
  this.destory = function () {
      obj.off(Laya.Event.MOUSE_DOWN,this,this.touchStart)
      obj.off(Laya.Event.MOUSE_MOVE,this,this.touchMove)
      obj.off(Laya.Event.MOUSE_UP,this,this.touchEnd)
  };

}

