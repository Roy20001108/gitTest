var jiuL=0;

function cs(name) {
    var sprite = Game.createSprite(name);
    Game.setCenter(sprite);
    sprite.pos(Laya.stage.width / 2, Laya.stage.height / 2);
    return sprite;
}


Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
    this.splice(index, 1); 
    } 
};

// 左右摇晃
function repY(obj,y1,y2){
    Laya.Tween.to(obj, {x : y1
        }, 300, Laya.Ease.exponentialInOut,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {x:y2}, 300, Laya.Ease.exponentialInOut,Laya.Handler.create(this,function(){
                    repY(obj,y1,y2)
                }));
        }));
}


function xieZ(obj,x1,y1,x2,y2){
    Laya.Tween.to(obj, {x :x1,y:y1
        }, 500, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {x :x2,y:y2}, 500, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    if(obj.stopF){
                        return;
                    }
                    xieZ(obj,x1,y1,x2,y2);
                }));
        }));
}

function shanshuo(obj,s1,a1,s2,a2){
    
    Laya.Tween.to(obj, {scaleX : s1, scaleY : s1,alpha:a1
        }, 500, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {scaleX : s2, scaleY : s2,alpha:a2}, 500, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    if(obj.stopF){
                        return;
                     }
                    shanshuo(obj,s1,a1,s2,a2)
                }));
        }));
}

function a2402Re(obj){
    Laya.Tween.to(obj, {rotation : -3
        }, 800, Laya.Ease.bounceOut,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {rotation :3}, 800, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    a2402Re(obj);
                }));
        }));
}


function n4003Re(obj){
    
    Laya.Tween.to(obj, {scaleX : 1.005, scaleY : 1.005,x:Laya.stage.width / 2-104
        }, 1000, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {scaleX : 0.995, scaleY : 0.995,x:Laya.stage.width / 2-96}, 1000, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    if(obj.stopF){
                        return;
                     }
                    n4003Re(obj);
                }));
        }));
}


function n4103Re(obj){
    
    Laya.Tween.to(obj, {scaleX : 1.02, scaleY : 1.02,x:Laya.stage.width / 2-128,y:Laya.stage.height / 2+25
        }, 800, Laya.Ease.quadIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {scaleX : 0.95, scaleY : 0.95,x:Laya.stage.width / 2-130,y:Laya.stage.height / 2+30}, 200, Laya.Ease.bounceOut,Laya.Handler.create(this,function(){
                    if(obj.stopF){
                        return;
                     }
                    n4103Re(obj);
                }));
        }));
}

function n4101Re(obj){
    
    Laya.Tween.to(obj, {scaleX : 1.005, scaleY : 1.005,x:Laya.stage.width / 2+125
        }, 1000, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {scaleX : 0.995, scaleY : 0.995,x:Laya.stage.width / 2+135}, 1000, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    if(obj.stopF){
                        return;
                     }
                    n4101Re(obj);
                }));
        }));
}


function n4402Re(obj){
    Laya.Tween.to(obj, {rotation : -3
        }, 1000, Laya.Ease.bounceOut,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {rotation :0}, 200, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    n4402Re(obj);
                }));
        }));
}

function n3404Re(obj){
    Laya.Tween.to(obj, {rotation : 0
        }, 400, Laya.Ease.bounceOut,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {rotation :15}, 300, Laya.Ease.quadIn,Laya.Handler.create(this,function(){
                    n3404Re(obj);
                }));
        }));
}

function n5306Re(obj){
    Laya.Tween.to(obj, {scaleX : 1.2, scaleY : 1.2
        }, 400, Laya.Ease.bounceOut,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {scaleX : 1, scaleY :1}, 300, Laya.Ease.quadIn,Laya.Handler.create(this,function(){
                    n5306Re(obj);
                }));
        }));
}

function a72e(obj){
    Laya.Tween.to(obj, {y : 102/2+10
        }, 400, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {y : 102/2+20},400, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    a72e(obj);
                }));
        }));
}

function v6203Re(obj){
    Laya.Tween.to(obj, {rotation : 0.5
        }, 300, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {rotation :-0.5}, 300, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    v6203Re(obj);
                }));
        }));
}


function v6402Re(obj){
    Laya.Tween.to(obj, {rotation : 6
        }, 500, Laya.Ease.quadIn,Laya.Handler.create(this,function(){
                Laya.Tween.to(obj, {rotation :0}, 500, Laya.Ease.linearIn,Laya.Handler.create(this,function(){
                    v6402Re(obj);
                }));
        }));
}


