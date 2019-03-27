CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
  if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
      return;
  }
  
  var context = this;
  var canvas = context.canvas;
  
  if (typeof maxWidth == 'undefined') {
      maxWidth = (canvas && canvas.width) || 300;
  }
  if (typeof lineHeight == 'undefined') {
      lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
  }
  
  // 字符分隔为数组
  var arrText = text.split('');
  var line = '';
  
  for (var n = 0; n < arrText.length; n++) {
      var testLine = line + arrText[n];
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = arrText[n];
          y += lineHeight;
      } else {
          line = testLine;
      }
  }
  context.fillText(line, x, y);
};

var resultJ =["page/bg3.jpg","page/h01.png","page/logo.png","page/h03.png","page/b05.png","page/kuang.png"]

// global.headImg,"page/b05.png"
function loadImgArr(array, callback) {

var loadAry = array;
// console.log(loadAry)
var arrMap = {};
var count = loadAry.length;
function onload() {
  arrMap[this.my_name] = this;
  count--;
  if (count <= 0) {
    callback(arrMap);
  }
}
for (var i = 0; i < loadAry.length; i++) {

  (function (i) {
    var img = new Image();
    img.src = loadAry[i];
    img.my_name = loadAry[i];
    img.onload = onload;
  })(i);
}
}

//矩形图片
function putRectImage(ctx, img, x, y, pxxx) {

if (pxxx) {
  img.width = pxxx;
  img.height = pxxx;
}
// console.log(img,img.width, img.height);
ctx.drawImage(img, x, y, img.width, img.height);
// if (scale) {
// 	img.width = img.width / scale;
// 	img.height = img.height / scale;
// }


}

// hctp(resultJ, "父亲","考聚光科技见客户感觉到了看过的了快决定了佛尽快的奉公克技高考聚光科技见客户感觉到了看过的了快决定了佛尽快的奉公克己点开技高考聚光科技见客户感觉到了看过的了快决定了佛尽快的奉公克己点开链接教科技高考聚光科技见客户感觉到了看过的了快决定了佛尽快的奉公克己点开链接教");
function hctp(imgAry, nickname, talk, obj) {
loadImgArr(imgAry, function (map) {
  console.log("talk",talk.length)
  var Mycanvas = document.createElement("canvas");
  var ctx = Mycanvas.getContext("2d");
  Mycanvas.width = 800;
  Mycanvas.height = 1060;

  putRectImage(ctx, map[imgAry[0]], 0, 0);

  var denglong1002 = map[imgAry[1]]
  putRectImage(ctx, map[imgAry[1]], 800 / 2 - denglong1002.width / 2, 1060 / 2 - denglong1002.height / 2 - 200);

  var denglong1002 = map[imgAry[2]]
  putRectImage(ctx, map[imgAry[2]], 800 / 2 - denglong1002.width / 2 , 1060 / 2 - denglong1002.height / 2 - 490);

  var logo1003 = map[imgAry[3]]
  putRectImage(ctx, map[imgAry[3]], 800 / 2 - logo1003.width / 2, 1060 / 2 - logo1003.height / 2 + 450);

  var logo1004 = map[imgAry[4]]
  putRectImage(ctx, map[imgAry[4]], 800 / 2 - 50, 1060 / 2 - 50- 370,100);

  var logo1005 = map[imgAry[5]]
  putRectImage(ctx, map[imgAry[5]], 800 / 2 - 50, 1060 / 2 - 50- 370,100);


  // ctx.save();
  var toWho = document.getElementById("cavnasC");
  if(talk.length<=130){
    toWho.style.letterSpacing = 5 + 'px';
  }else{
    toWho.style.letterSpacing = 3 + 'px';
  }
  
  var ctxShuZ = toWho.getContext("2d");
  // toWho.width = 400;
  // toWho.height = 600;

  ctxShuZ.fillStyle = 'rgba(55,55,55,1)';
  ctxShuZ.fill();
  //设置字体填充颜色
  
  ctxShuZ.textAlign = "left";
  ctxShuZ.font = "32px Microsoft YaHei";
  ctxShuZ.fontWeight = "600";
  
  
  // ctxShuZ.rotate( -7* Math.PI/180);

  var nameW = ctxShuZ.measureText(nickname).width;
  ctxShuZ.fillText(nickname, 280, 170);
  

  ctxShuZ.textAlign = "left";
  ctxShuZ.fontWeight = "400";
  if(talk.length<=130){
    ctxShuZ.font = "24px Microsoft YaHei";
  }else{
    ctxShuZ.font = "18px Microsoft YaHei";
  }
  
  // 
  
  var talkMeassge=talk;
  if(talkMeassge.length<=130){
    ctxShuZ.wrapText(talkMeassge, 85, 250, 450, 40)
  }else{
    ctxShuZ.wrapText(talkMeassge, 80, 250, 450, 40)
  }
  // ctxShuZ.fillText(talkMeassge, 0, 300);
  
  var ctxShuZ64 = toWho.toDataURL("image/jpg");
  
  var jijinjiu = new Image();
  jijinjiu.src = ctxShuZ64;
  jijinjiu.onload = function () {			
    putRectImage(ctx, jijinjiu, 800 / 2 - jijinjiu.width / 2, 1060 / 2 - jijinjiu.height / 2);
    
    var base64 = Mycanvas.toDataURL("image/jpg");
    var Mycanvas2 = document.createElement("canvas");
    var ctx2 = Mycanvas2.getContext("2d");

    var reasultImg = new Image();
    reasultImg.src = base64;

    reasultImg.onload = function () {
      var yuanshikg = window.innerWidth/window.innerHeight;
      var zijikg=640/1060;
  
      Mycanvas2.height =1060;				
      Mycanvas2.width =1060*yuanshikg;
        
      console.log("Mycanvas2",Mycanvas2.width/Mycanvas2.height,yuanshikg)

      ctx2.drawImage(reasultImg, (800-Mycanvas2.width)/2 , (1060-Mycanvas2.height)/2, Mycanvas2.width , Mycanvas2.height, 0, 0,  Mycanvas2.width, Mycanvas2.height)
      
      var last = Mycanvas2.toDataURL("image/jpg");
      $("#onlyImg").attr("src", last);
      setTimeout(function(){
        
        $("#onlyImg").fadeIn(500);
        $("#imgdiv").fadeIn(500);
      },500)

      // console.log("base642",base642.length,base642)
    }

  }


});
}


