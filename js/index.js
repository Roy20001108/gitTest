var loadData = [];

// "res/atlas/page1.atlas"
var srcLink = window.location.href;
var firstAry = ["page/a1001.jpg","page/a1002.png","page/a1003.png","page/a1004.png","page/a1007.png",];
// var jiuimgAry = []
// firstAry = firstAry.concat(jiuimgAry);


// sound = new SoundLib({
    //  autoplay: "music/bg.mp3",
    // sounds: ["sounds/shake.mp3", "sounds/click.mp3"],     
// });

document.body.addEventListener('focusout', function (evt) {
    document.body.scrollTop = 0;
    //软键盘收起的事件处理
    setTimeout(function () {
        document.body.scrollTop = 0;
    }, 1500)
});

document.body.addEventListener("touchmove", function(e) {
    e.preventDefault();
}, {
    passive: false
});

var global={};
window.onload=function(){
    
    // wxauth.setCallBack(function (data) {
    //     global.initData = data;      
    //     console.log("global.initData",data);   
    //     init_screen();    
    // });
    init_screen();    
 }
var elementClikc={
    hua:""
};

function init_screen() {

    var loadcount = 0;
    inited = true;
    Game.init(640, 1060);
    Laya.stage.bgColor = "#ffffff";
    Game.createLayer(4);

    // var txta = new Laya.Text();
    var page0;
    var logo;
    var bianse;
    var startt;
    
    function cLoadPage() {
        page0 = new Laya.Sprite();
        var lbg = cs("page/a1001.jpg");
        lbg.x = Laya.stage.width / 2;
        lbg.y = Laya.stage.height / 2;
        page0.addChild(lbg);
        page0.autoSize = true;
        Game.al(page0, 4);

        var a1003 = cs("page/a1003.png");
        a1003.x = Laya.stage.width / 2;
        a1003.y = Laya.stage.height / 2-100;
        page0.addChild(a1003);

        shanshuo(a1003,1.05,0.8,0.95,1)

        var a1004 = cs("page/a1004.png");
        a1004.x = Laya.stage.width / 2;
        a1004.y = Laya.stage.height / 2;
        page0.addChild(a1004);

        xieZ(a1004,Laya.stage.width / 2+20,Laya.stage.height / 2+20,Laya.stage.width / 2,Laya.stage.height / 2)
 
        $("#bofang").fadeIn(0);
       
        logo = new Laya.Text();
        logo.blendMode = Laya.BlendMode.BlendLight;
        logo.color = "#fff";
        logo.fontSize = 14;
        logo.text = "-技术支持·橙意机构-";
        logo.pivotX = logo.getBounds().width / 2;
        logo.pivotY = logo.getBounds().height / 2;

        logo.pos(Laya.stage.width/2, Laya.stage.height / 2+480);
        page0.addChild(logo);

         $("#bofang").on("click",function(){
                  
                if(elementClikc.bofang){
                return;
            }
            elementClikc.bofang=true;
            $("#bofang").fadeOut(0);
            $("#page1").fadeIn(1000);
            giveWidth("videoIndex");
            $("#videoIndex").fadeIn(1000);  
            $("#videoIndex")[0].play();


            Laya.Tween.to(page0, { alpha:0}, 600, Laya.Ease.backIn,Laya.Handler.create(this,function(){
                page0.removeSelf();
            }));
           
        })

    }


    // loadData.push({ url: 'res/atlas/page.atlas', type: Laya.Loader.ATLAS, size: 1, priority: 1 });
    Laya.loader.load(firstAry, Laya.Handler.create(this, function () {
       
        //  Laya.loader.load("unpack.json", Laya.Handler.create(this, function (data) {
        //     for (var i = 0; i < data.length; i ++) {
        //         loadData.push({ url: data[i], type: Laya.Loader.IMAGE, size: 1, priority: 1 });
        //     }
            cLoadPage();
           
            
        // }),null,Laya.Loader.JSON);

    }))
   
}



function giveWidth(id){
    var height = $(window).height();
    var width = $(window).width();
    $('#'+id).css('height', height).attr('height', height);
    $('#'+id).css('width', width).attr('width', width);
}

function video_loading(id,time,func){
//  alert("aaa"+id)
    var timer = setInterval(function(){
        // console.log("ccccccccccc",$("#"+id)[0].currentTime);
        var currentTime = $("#"+id)[0].currentTime; // 检测当前的播放时间
        if( currentTime>time){
            clearInterval( timer );
            func();
        }
    }, 10)
}

// 71
video_loading("videoIndex",152,function(){
    $("#videoIndex")[0].pause();
    // $("#page1").fadeOut(1000);
    // $("#videoIndex").fadeOut(1000); 
    $("#final").fadeIn(500)     
})


$("#reC").on("click",function(){
    if(elementClikc.rec){
        return;
    }
    elementClikc.rec=true;
    $("#final").fadeOut(500);
    $("#videoIndex")[0].play();
    $("#videoIndex")[0].currentTime=0;
    
    video_loading("videoIndex",152,function(){
        $("#videoIndex")[0].pause();
        $("#final").fadeIn(500);
        elementClikc.rec=false;     
    })

})

$("#shareC").on("click",function(){
    $("#sharep").fadeIn(500);
})

$("#sharepC").on("click",function(){
    $("#sharep").fadeOut(500);
})

function generateHead(head){
    var myMack = cs("page/head.png"); 
    var head=cs(head);
    var as=1;
    if(head.width>head.height){
        as=69/head.height;           
    }else{
        as=69/head.width;               
    }    
    myMack.scale(1/as,1/as);
    myMack.pos(head.width/2,head.height/2);       
    head.scale(as,as)
    head.mask=myMack;
    head.width=head.width*as;
    head.height=head.height*as;
    return head;
}



function clipscreen_canvas(callback) {
    var canvas = document.getElementById("layaCanvas");
    var dataURL = canvas.toDataURL("image/png"); 
    callback(dataURL);
}


function startWith(src, str){  
  if(str == null || str== "" || src.length== 0 || str.length > src.length){  
     return false;  
  }   
  if(src.substr(0,str.length) == str){  
     return true;  
  }else{  
     return false;  
   }  

 }




function movePage(zhuozi, page) {
    var zhuoziBot = zhuozi.y - zhuozi.pivotY + zhuozi.height;
    var cha = Laya.stage.height - zhuoziBot;

    if (cha > 0) {
        page.y += cha + 1;

    }

}

// window.onerror=fnErrorTrap;
function fnErrorTrap(sMsg, sUrl, sLine) {
    var str = "";
    str = "<b>An error was thrown and caught.</b><p>";
    str += "Error: " + sMsg + "<br>";
    str += "Line: " + sLine + "<br>";
    str += "URL: " + sUrl + "<br>";
    alert(str);
    return false;
}
function fnThrow() {
    eval(oErrorCode.value);
}
//初始化微信接口


