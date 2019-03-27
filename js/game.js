
var Game = (function () {
  function Game() {
  }
  Game.init = function (width, height) {
      
      Game.scaleH = window.innerHeight / height;
      Game.scaleW = Game.scaleH;

      Laya.init(width, height);

      // if (Game.scaleW < Game.scaleH) {
      //    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
      //    Laya.stage.alignV = "bottom";
      // } else {
      // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
      // }
      // console.log(Laya.stage.width, Laya.stage.height);
      Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
      Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
  };
  Game.hengping = function (func) {
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", func, false);
  }
  /**
   * 预加载资源，
   * list : 资源列表
   * callback : 加载完成回调
   * parseing : 处理中回调
   * target : 调用对象
   **/
  Game.reload = function (list, callback) {
      if (list == null || list.length == 0) {
          callback.run();
          console.log("callback run", callback);
          return;
      }
      var tempHandler = Laya.Handler.create(this, this.loadComple, new Array(list.length, new Array(), callback), false);
      var yets = [];
      for (var i = 0; i < list.length; i++) {
          var res = list[i];
          if (yets.indexOf(res.getResName()) != -1) {
              tempHandler.run();
              continue;
          }
          yets.push(res.getResName());
          Laya.loader.load(res.getResName(), tempHandler, null, res.getResType(), 1, true);
      }
  };
  Game.loadComple = function (args) {
      arguments[1].push(1);
      if (arguments[1].length == arguments[0]) {
          arguments[2].run();
      }
  };
  Game.fadeIn = function (target, time, delay) {
      time = time || 800;
      delay = delay || 0;
      target.alpha = 0;
      Laya.timer.once(delay, this, function () {
          Laya.Tween.to(target, {alpha : 1}, time);
      });
  }
  Game.getImageNumber = function (path, number) {
      var sprite = new Laya.Sprite();
      sprite.autoSize = true;
      var str = number + "";
      for (var i = 0; i < str.length; i++) {
          var t = str.substr(i, 1);
          var tmp = Game.createSprite(path + t + ".png");
          tmp.pos(sprite.getBounds().width, 0);
          sprite.addChild(tmp);
          var space = new Laya.Sprite();
          space.graphics.drawRect(0, 0, 4, 20, "#fff000");
          space.alpha = 0;
          space.pos(sprite.getBounds().width, 0);
          sprite.addChild(space);
      }
      return sprite;
  }
  Game.tweenDelete = function (t, e, a, n, o) {
       Laya.Tween.to(t, e, a, n, Laya.Handler.create(this, function () { t.removeSelf() }), o) 
  }
  /**
   * 创建层在舞台中，按层级 传入一个数字 会创建对应数字那么多的层
   * 通常一个项目使用一次这个函数就可以了 在初始化的时候
   */
  Game.createLayer = function (count) {
      Game.MaxLayer = count;
      for (var i = 0; i <= count; i++) {
          var name = "system_layer_" + i;
          var layer = Laya.stage.getChildByName(name);
          if (layer != null) {
              layer.removeSelf();
          }
          layer = new Laya.Sprite();
          layer.name = name;
          layer.zOrder = i;
          Laya.stage.addChild(layer);
      }
  };
  /**
   * 获取一个系统层
   * 通过下标 要先调用createLayer创建后才可以使用
   */
  Game.getLayer = function (index) {
      var name = "system_layer_" + index;
      return Laya.stage.getChildByName(name);
  }
  /**
   * 添加一个元素到固定层
   */
  Game.al = function (target, index) {
      var layer = this.getLayer(index);
      layer.addChild(target);
  }

  Game.createVideo = function (id, res, x, y, width, height) {
      var video = document.createElement("video");
      video.id = id;
      video.src = res;
      video.controls = "controls";
      video.style.width = width + "px";
      video.style.height = height + "px";
      video.style.left = x + "px";
      video.style.top = y + "px";
      video.style.zIndex = "10";
      video.style.position = "absolute";
      document.body.appendChild(video);
      return video;
  }
  Game.removeVideo = function (id) {
      var target = document.getElementById(id);
      if (target == null)
          return;
      target.remove();
  }

  Game.whatname = function (target) {
      var timeLine = new Laya.TimeLine();
      timeLine.addLabel("a1", 0).to(target, { scaleX: 1.6, scaleY: 0.6 }, 200)
          .addLabel("a2", 0).to(target, { scaleX: 0.6, scaleY: 1.6 }, 120)
          .addLabel("a2", 0).to(target, { scaleX: 1.2, scaleY: 0.8 }, 80)
          .addLabel("a2", 0).to(target, { scaleX: 1, scaleY: 1 }, 60, Laya.Ease.bounceInOut);
      timeLine.play();
  }

  //抖动
  Game.doudong = function (target, time) {
      if (target._jkf_on_doudong)
          return;
      target._jkf_on_doudong = true;
      time = time || 300;
      var oldPos = new Laya.Point(target.x, target.y);
      var startTime = Date.now();
      var frameFlg = 0;
      function update() {
          var now = Date.now();
          if (now - startTime >= time) {
              target.clearTimer(this, update);
              target.x = oldPos.x;
              target.y = oldPos.y;
              target._jkf_on_doudong = null;
              console.log("复制？？？");
              return;
          }
          target.x = oldPos.x + Game.randomInt(-3, 3);
          target.y = oldPos.y + Game.randomInt(-3, 3);
      }
      target.frameLoop(1, this, update);
  }

  Game.tantan = function (target) {
      var oldScaleX = target.scaleX;
      var oldScaleY = target.scaleY;
      var timeLine = new Laya.TimeLine();
      timeLine.addLabel("a1", 0).to(target, { scaleX: oldScaleX * 1.2, scaleY: oldScaleY * 0.9 }, 200)
          .addLabel("a2", 0).to(target, { scaleX: oldScaleX * 0.9, scaleY: oldScaleY * 1.2 }, 120)
          .addLabel("a2", 0).to(target, { scaleX: oldScaleX * 1.1, scaleY: oldScaleY * 0.9 }, 80)
          .addLabel("a2", 0).to(target, { scaleX: oldScaleX * 1, scaleY: oldScaleY * 1 }, 60, Laya.Ease.bounceInOut);
      timeLine.play();
  }

  Game.shake = function (target, count, power, time) {
      power = power || 6;
      time = time || 120;
      var timeLine = new Laya.TimeLine();
      if (count <= 0) {
          timeLine.addLabel("a1", 0).to(target, { rotation: -power }, time);
          timeLine.addLabel("a1", 0).to(target, { rotation: 0 }, time);
          timeLine.addLabel("a1", 0).to(target, { rotation: power }, time);
          timeLine.addLabel("a1", 0).to(target, { rotation: 0 }, time);
          timeLine.play("a1", true);
          return timeLine;
      }
      for (var i = 0; i < count; i++) {
          timeLine.addLabel("a1", 0).to(target, { rotation: -power }, time);
          timeLine.addLabel("a1", 0).to(target, { rotation: power }, time);
      }
      timeLine.addLabel("a1", 0).to(target, { rotation: 0 }, time);
      timeLine.play();
      return timeLine;
  }

  /**
   * 验证是否为电话号码
   */
  Game.isTel = function (str) {
      var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
      var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
      if (isMob.test(str) || isPhone.test(str)) {
          return true;
      } else {
          if (str.length != 11 && str.length != 7 && str.length != 8) {
              return false;
          }
          if (str.match(/^\d.*$/)) {
              return true;
          }
          return false;
      }
  }

  Game.changeView = function (view1, view2, time, view1Call, view2Call) {
      time /= 2;
      if (view1 != null) {
          if (view1Call == null) {
              view1Call = Laya.Handler.create(this, function () { });
          }
          // Laya.Tween.to(view1,{skewX:-80,scaleX:0,scaleY:0.5,x:0},time,null, view1Call);
          Laya.Tween.to(view1, { x: -view1.getBounds().width, alpha: 0 }, time, null, view1Call);
      }
      if (view2 != null) {
          if (view2Call == null) {
              view2Call = Laya.Handler.create(this, function () { });
          }
          view2.pos(Laya.stage.width, Laya.stage.height / 2);
          // view2.scaleX = 0;
          // view2.scaleY = -0.5;
          // view2.skewX = -80;
          view2.alpha = 0;
          view2.x = Laya.stage.width + view2.getBounds().width;
          Laya.Tween.to(view2, { x: Laya.stage.width / 2, alpha: 1 }, time, null, view2Call);
          // Laya.Tween.to(view2,{skewX:0,scaleX:1, scaleY:1,x: Laya.stage.width / 2},time, null, view2Call);
      }
  }

  Game.showNotice = function (text) {
      var skip = new Laya.Sprite();
      skip.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#44443c");
      skip.size(Laya.stage.width, Laya.stage.height);
      skip.zOrder = 999999999;
      skip.alpha = 0.8;
      skip.mouseEnabled = true;
      //弹框
      var tips = new Laya.Sprite();
      tips.graphics.drawRect(0, 0, 400, 300, "#ee4400");
      tips.alpha = 0.8;
      this.setCenter(tips);
      tips.pos(skip.getBounds().width / 2, skip.getBounds().height / 2);
      skip.addChild(tips);
      //文字
      var txt = new Laya.Text();
      txt.text = text;
      tips.addChild(txt);
      Laya.stage.addChild(skip);
  };
  Game.createInput = function (tips, width, height) {
      var inputText = new Laya.Input();
      inputText.size(width, height);
      Game.setCenter(inputText);
      // 移动端输入提示符
      inputText.prompt = tips;

      // 输入期间输入框的位置偏移
      // inputText.inputElementXAdjuster = 0;
      // inputText.inputElementYAdjuster = 1;

      // 设置字体样式
      // inputText.bold = true;
      inputText.bgColor = "#ffffff";
      inputText.color = "#000000";
      inputText.fontSize = 22;
      return inputText;
  },
      Game.sendHttp = function (url, data, target, callback) {
          var hr = new Laya.HttpRequest();
          hr.once(Laya.Event.COMPLETE, target, callback);
          hr.once(Laya.Event.ERROR, this, function (e) {
              alert("请求初始数据失败", e);
          });
          if (data == null) {
              data = "";
          }
          hr.send(url, data, "post", "text");
      }
  Game.post = function (url, data, callback) {
      var hr = new Laya.HttpRequest();
      hr.once(Laya.Event.COMPLETE, this, function () {
          callback.runWith(hr.data);
      });
      hr.once(Laya.Event.ERROR, this, function (e) {
          alert("请求初始数据失败", e);
      });
      var pstr = "";
      data = data || {};
      var i = 0;
      for (var key in data) {
          if (i != 0) {
              pstr += "&";
          }
          var val = data[key];
          pstr += key + "=" + val;
          i += 1;
      }
      console.log("参数为：", pstr);
      hr.send(url, pstr, "post", "text");
  }
  Game.createMask = function (alpha) {
      var loading = new Laya.Sprite();
      loading.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#44443c");
      loading.size(Laya.stage.width, Laya.stage.height);
      loading.name = "system__loading_view";
      loading.alpha = alpha;
      loading.mouseEnabled = true;
      loading.on(Laya.Event.MOUSE_DOWN, this, function () {
      });
      return loading;
  }
  Game.loadView = function (anim) {
      if (this.loading != null)
          return;
      Laya.loader.load("res/loading.png", Laya.Handler.create(this, function () {
          var loading = Game.createMask(0.6);
          if (anim != null) {
              loading.addChild(anim);
          } else {
              var animation = Game.createSprite("res/loading.png");
              animation.name = "animation";
              animation.pos(Laya.stage.width / 2, Laya.stage.height / 2);
              loading.addChild(animation);
              Game.setCenter(animation);
              animation.frameLoop(1, animation, function () {
                  this.rotation += 10;
              });
          }
          this.loading = loading;
          Game.delay(200, Laya.Handler.create(this, function () {
              console.log("loadView 添加到层 : " + Game.loading);
              if (Game.loading != null) {
                  Laya.stage.addChild(loading);
              }
          }));
      }), Laya.Handler.create(this, function () { }), Laya.Loader.IMAGE);
  };
  Game.loadOver = function () {
      console.log("loadOver 删除层 : " + Game.loading);
      if (this.loading == null)
          return;

      var animation = this.loading.getChildByName("animation");
      if (animation != null)
          animation.destroy();
      this.loading.removeSelf();
      this.loading.destroy();
      this.loading = null;
  };
  /**
   * 创建序列帧动画
   * name : json名字
   */
  Game.createAnimation = function (name) {
      var ani = new Laya.Animation();
      ani.loadAtlas(name); // 加载图集动画
      ani.interval = 100; // 设置播放间隔（单位：毫秒）
      ani.index = 1; // 当前播放索引
      ani.play(); // 播放图集动画
      // 获取动画的边界信息
      // var bounds: Laya.Rectangle = ani.getGraphicBounds();
      // ani.pivot(bounds.width / 2, bounds.height / 2);
      // console.log("bounds",bounds);
      return ani;
  };

  /**
   * 注册一个全局的事件监听
   */
  Game.addListener = function (event, handler) {
      Game.listeners = Game.listeners || {};
      var list = Game.listeners[event];
      if (list == null) {
          list = [];
      }
      list.push(handler);
      Game.listeners[event] = list;
  }
  /**
   * 推送一个全局的事件监听
   */
  Game.pushListener = function (event, args) {
      Game.listeners = Game.listeners || {};
      var list = Game.listeners[event];
      if (!list) return;
      for (var i = 0; i < list.length; i++) {
          list[i].runWith(args);
      }
  }

  /**
   * 通过图片集合创建序列帧动画
   */
  Game.arrAnimation = function (arr, interval, play) {
      interval = interval || 180;
      var ani = new Laya.Animation();
      ani.loadImages(arr);
      ani.interval = interval; // 设置播放间隔（单位：毫秒）
      if (play) {
          ani.index = 1; // 当前播放索引
          ani.play(); // 播放图集动画
      }
      return ani;
  }
  //通过资源文件夹名字穿件一个Sprite显示对象
  Game.createSprite = function (name) {
      // 方法1：使用loadImage
      var sprite = new Laya.Sprite();
      var texture = Laya.Loader.getRes(name);
      if (!texture) {
          texture = Laya.Loader.getRes(Laya.URL.basePath + name);
          if (!texture) {
              sprite.loadImage(Laya.URL.basePath + "/" + name);
          }
          else {
              sprite.loadImage(Laya.URL.basePath + name);
          }
      }
      else {
          sprite.loadImage(name);
      }
      return sprite;
  };
  Game.cs = function (name) {
      var sprite = Game.createSprite(name);
      Game.setCenter(sprite);
      return sprite;
  }
  Game.buttonClickAnimate = function (btn, scale) {
      Laya.Tween.to(btn, {scaleX : scale * 0.8, scaleY : scale * 0.8}, 100, null, Laya.Handler.create(this, function () {
          Laya.Tween.to(btn, {scaleX : scale, scaleY : scale}, 200, Laya.Ease.backOut);
      }));
  }
  Game.onceClickBtn = function (btn, func) {
      btn.on(Laya.Event.CLICK, btn, function () {
          if (btn.clicked == true) return;
          btn.clicked = true;
          func();
      });
      btn.resetBtnState = function () {
          this.clicked = false;
      }
  }
  //创建一个按钮精灵
  Game.createButtonSprite = function (name, handler) {
      var button = this.createSprite(name);
      var inDown = false;
      button.onDown = false;
      button.on(Laya.Event.MOUSE_DOWN, this, function (evt) {
          if (button.onDown == true) {
              return;
          }
          inDown = true;
      });
      button.on(Laya.Event.MOUSE_UP, this, function (evt) {
          if (!inDown) {
              return;
          }
          inDown = false;
          button.onDown = true;
          Game.playQQ(button, 200);
          Game.delay(201, Laya.Handler.create(this, function () {
              button.onDown = false;
          }));
          handler.run();
      });
      return button;
  };
  Game.createText = function (str) {
      var text = new Laya.Text();
      text.color = "#000000";
      text.font = "Impact";
      text.fontSize = 24;
      text.text = str;
      Game.setCenter(text);
      return text;
  };
  Game.getParam = function (url, key) {
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
          var str = url.substr(url.indexOf("?") + 1);
          strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
      }
      console.log(theRequest);
      return theRequest[key];
  };
  Game.getEnLength = function (str) {
      if (str == null || str == "")
          return 0;
      console.log("str:", str);
      var cnChar = str.match(/[^\x00-\x80]/g);//利用match方法检索出中文字符并返回一个存放中文的数组  
      var chLen = 0;
      if (cnChar != null)
          chLen = cnChar.length;//算出实际的字符长度
      var enlen = str.length - chLen;
      return chLen * 2 + enlen;
  }
  /**
   * 创建一个飘字
   */
  Game.createFlyText = function (str) {
      var text = Game.createText(str);
      text.color = "#CCFFFF";
      text.bold = true;
      text.stroke = 1;
      text.strokeColor = "#333300";
      text.fontSize = 36;
      Game.setCenter(text);
      text.pos(Laya.stage.width / 2, Laya.stage.height / 2);
      Laya.Tween.to(text, { y: Laya.stage.height / 2 - 300 }, 1500);
      Game.delay(1500, Laya.Handler.create(this, function () {
          text.removeSelf();
      }));
      Laya.stage.addChild(text);
  }
  Game.setGlobalPos = function (target, x, y) {
      var pos = target.globalToLocal(new Laya.Point(x, y));
      target.pos(pos.x - target.pivotX, pos.y - target.pivotY);
  }
  /**
   * 创建一个顶部漂浮提示
   */
  Game.createTopTips = function (str, time) {
      var text = Game.createText(str);
      text.color = "#ff7386";
      text.bold = true;
      text.stroke = 2;
      text.strokeColor = "#333300";
      text.fontSize = 32;
      Game.setCenter(text);
      text.pos(Laya.stage.width / 2, -50);
      Laya.Tween.to(text, { y: 60 }, 500, Laya.Ease.backOut);
      if (time == null) {
          time = 1500;
      }
      Game.delay(time, Laya.Handler.create(this, function () {
          Laya.Tween.to(text, { y: -60 }, 300, Laya.Ease.backIn, Laya.Handler.create(this, function () {
              text.removeSelf();
          }));
      }));
      // Laya.stage.addChild(text);
      Game.al(text, Game.MaxLayer);
  }

  /**
   * 计算两点之间的角度
   */
  Game.getAngle = function (beginPoint, endPoint) {
      var len_y = endPoint.y - beginPoint.y;
      var len_x = endPoint.x - beginPoint.x;
      if (len_y == 0.0) {
          if (len_x < 0) {
              return 90;
          }
          else if (len_x > 0) {
              return 270;
          }
          return 0;
      }
      if (len_x == 0.0) {
          if (len_y >= 0) {
              return 0;
          }
          else if (len_y < 0) {
              return 180;
          }
      }
      var angle = 360 * Math.atan(len_y / len_x) / (2 * Math.PI) + 90;
      if (len_x > 0 && len_y < 0) {
          angle += 180;
      }
      else if (len_x > 0 && len_y > -2) {
          angle += 180;
      }
      return angle;
  };
  Game.repatAnim = function (target, time, call1, call2) {
      target.toLeft = false;
      call1.call(target);
      target.timerLoop(time, target, function () {
          if (this.toLeft) {
              this.toLeft = false;
              call1.call(target);
          } else {
              this.toLeft = true;
              call2.call(target);
          }
      });
  }
  /**
   * 计算字符串长度，中文+2 英文+1
   */
  Game.getStringLength = function (str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
          var c = str.charCodeAt(i);
          //单字节加1 
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
              len++;
          } else {
              len += 2;
          }
      }
      return len;
  }
  /**
   * 获取一个字符串 指定的下标  按中文方式截取在哪一位
   * 一个中文字符 == 2 个数字或者英文字符
   */
  Game.getStringIndex = function (str, index) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
          var c = str.charCodeAt(i);
          //单字节加1 
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
              len++;
              if (len > index) {
                  return --i;
              }
          } else {
              len += 2;
              if (len > index) {
                  return --i;
              }
          }
          if (len == index)
              return i;
      }
      return str.length;
  }


  /**
   * 通过传入一个原点和角度和距离 计算到达的坐标点
   */
  Game.getPointByAngleAndDistance = function (src, angle, distance) {
      angle = angle * (Math.PI / 180);
      var tx = src.x + Math.sin(angle) * distance;
      var ty = src.y - Math.cos(angle) * distance;
      return new Laya.Point(tx, ty);
  };
  /**
   * 计算两点之间的距离
   */
  Game.getDistance = function (beginPoint, endPoint) {
      return Math.sqrt(Math.pow(beginPoint.x - endPoint.x, 2) + Math.pow(beginPoint.y - endPoint.y, 2));
  };
  /**
   * 生成随机数
   */
  Game.randomInt = function (a, b) {
      return parseInt(Math.random() * (b - a + 1) + a);
  };
  Game.randomFloat = function (a, b) {
      // function isNum(n){
      //     return /^\d+$/.test(n);
      // }
      // if(!t1 || (! isNum(t1)) ){t1=0;}
      // if(!t2 || (! isNum(t2)) ){t2=1;}
      // if(!t3 || (! isNum(t3)) ){t3=0;}
      var t3 = 5; // 小数位不能大于15位
      var ra = Math.random() * (b - a) + a, du = Math.pow(10, t3);
      ra = Math.round(ra * du) / du;
      return ra;
  };
  /**
   * 继承
   */
  Game.extends = (this && this.__extends) || function (d, b) {
      for (var p in b)
          if (b.hasOwnProperty(p))
              d[p] = b[p];
      function __() {
          this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  /**
   * 通过类名和参数 实例化一个对象--类似反射
   */
  Game.instance = function (name, params) {
      var instance = Object.create(window[name].prototype);
      instance.constructor.apply(instance, params);
      return instance;
  };
  Game.setGlobal = function (key, value) {
      this.GlobalMapiing[key] = value;
  };
  Game.getGlobal = function (key) {
      return this.GlobalMapiing[key];
  };
  /**
   * 数组操作，删除数组一个元素 按下标
   */
  Game.removeByIndex = function (array, index) {
      array.splice(index, 1);
  };
  /**
   * 数组操作，删除一个元素 按元素本身
   */
  Game.removeBySelf = function (array, target) {
      for (var i = 0; i < array.length; i++) {
          if (array[i] == target) {
              this.removeByIndex(array, i);
              return;
          }
      }
  };
  /*  
  cp在此是四個元素的陣列:  
  cp[0]為起始點，或上圖中的P0  
  cp[1]為第一個控制點，或上圖中的P1  
  cp[2]為第二個控制點，或上圖中的P2  
  cp[3]為結束點，或上圖中的P3  
  t為參數值，0 <= t <= 1  
  */
  Game.PointOnCubicBezier = function (cp, t) {
      var ax, bx, cx;
      var ay, by, cy;
      var tSquared, tCubed;
      var result = new Laya.Point(0, 0);

      /*計算多項式係數*/
      cx = 3.0 * (cp[1].x - cp[0].x);
      bx = 3.0 * (cp[2].x - cp[1].x) - cx;
      ax = cp[3].x - cp[0].x - cx - bx;

      cy = 3.0 * (cp[1].y - cp[0].y);
      by = 3.0 * (cp[2].y - cp[1].y) - cy;
      ay = cp[3].y - cp[0].y - cy - by;

      /*計算位於參數值t的曲線點*/

      tSquared = t * t;
      tCubed = tSquared * t;

      result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
      result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;

      return result;
  }

  /*  
  ComputeBezier以控制點cp所產生的曲線點，填入Point2D結構的陣列。  
  呼叫者必須分配足夠的記憶體以供輸出結果，其為<sizeof(Point2D) numberOfPoints>  
  */
  Game.ComputeBezier = function (target, cp, time) {
      var dt;
      var i;
      var numberOfPoints = 800;
      var curve = [];
      dt = 1.0 / (numberOfPoints - 1);
      for (i = 0; i < numberOfPoints; i++)
          curve[i] = this.PointOnCubicBezier(cp, i * dt);
      var step = time / numberOfPoints;//步长
      target.bezier = Date.now();
      target.frameLoop(1, target, function () {
          var now = Date.now();
          var index = parseInt((now - this.bezier) / step);
          if (index >= numberOfPoints) {
              return;
          }
          if (target == null || target.destroyed) {
              target.clearTimer(target);
          }
          this.pos(curve[index].x, curve[index].y);
      });
  }
  /**
   * 设置一个对象的锚点为中心
   */
  Game.setCenter = function (target) {
      target.pivot(target.getBounds().width / 2, target.getBounds().height / 2);
  };
  /**
   * 改变锚点，自动计算当前坐标
   */
  Game.changePivot = function (target, x, y) {
      target.x -= target.pivotX;
      target.y -= target.pivotY;
      target.pivot(x, y);
      target.x += x;
      target.y += y;
  }
  /**
   * 缩放 从小变大
   */
  Game.minToBig = function (target, time, sx, sy) {
      if (time == null) {
          time = 1000;
      }
      if (sx == null && sy == null) {
          sx = target.scaleX;
          sy = target.scaleY;
      }
      target.scale(0, 0);
      return Laya.Tween.to(target, { scaleX: sx, scaleY: sy }, time, Laya.Ease.bounceOut);
  };
  Game.bigToMin = function (target, time) {
      if (time == null) {
          time = 1000;
      }
      return Laya.Tween.to(target, { scaleX: 0, scaleY: 0 }, time, Laya.Ease.bounceOut);
  };
  Game.createBgm = function (openImg, closeImg, sound) {
      var op = Game.createSprite(openImg);
      var cl = Game.createSprite(closeImg);



      var bgm = new Laya.Sprite();
      bgm.bgm_state = 0;//默认为未播放状态
      bgm.bgm_openImg = openImg;
      bgm.bgm_closeImg = closeImg;
      bgm.bgm_sound = sound;
      bgm.bgm_op = op;
      bgm.bgm_cl = cl;

      op.on(Laya.Event.CLICK, bgm, function (evt) {
          console.log("cp");
          this.playBgm(0);
      });
      cl.on(Laya.Event.CLICK, bgm, function (evt) {
          console.log("cl");
          this.pauseBgm();
      });

      //播放
      bgm.playBgm = function (loop) {
          this.bgm_state = 1;
          this.bgm_op.removeSelf();
          this.addChild(this.bgm_cl);
          Laya.SoundManager.playMusic(sound, loop);
          console.log("playBgm");
      }
      //暂停
      bgm.pauseBgm = function () {
          this.bgm_state = 0;
          this.bgm_cl.removeSelf();
          this.addChild(this.bgm_op);
          Laya.SoundManager.stopMusic();
          console.log("pauseBgm");
      }
      //获取是否播放状态
      bgm.isPlay = function () {
          return this.bgm_state == 1;
      }
      bgm.pauseBgm();
      Game.setCenter(bgm);
      Game.setRepeat(bgm, { rotation: -9 }, { rotation: 9 }, true, 800, 0, 99999, 0);
      return bgm;
  }
  Game.playQQ = function (target, time) {
      if (time == null) {
          time = 1000;
      }
      var sx = target.scaleX;
      var sy = target.scaleY;
      target.scale(sx / 2, sy / 2);
      return Laya.Tween.to(target, { scaleX: sx, scaleY: sy }, time, Laya.Ease.bounceOut);
  };
  //前后动作的循环翻转
  Game.setRepeat = function (target, forword, back, flg, time, waitTime, count, now) {
      // console.log("setRepeat",forword,back,flg,time,count,now);
      if (!now) {
          now = 0;
      }
      if (!waitTime) {
          waitTime = 0;
      }
      if (count != null && now != null && count <= now)
          return;
      now += 1;
      var select = flg ? forword : back;
      Laya.Tween.to(target, select, time, null, Laya.Handler.create(this, function () {
          Game.delay(waitTime, Laya.Handler.create(this, function () {
              Game.setRepeat(target, forword, back, !flg, time, waitTime, count, now);
          }));
      }));
  }
  //两次循环执行动画
  Game.repatAnim = function (target, time, call1, call2) {
      target.toLeft = false;
      call1.call(target);
      target.timerLoop(time, target, function () {
          if (this.toLeft) {
              this.toLeft = false;
              call1.call(target);
          } else {
              this.toLeft = true;
              call2.call(target);
          }
      });
  }
  Game.checkPaddling = function (sprite, callback) {
      function touchBegin(evt) {
          var x = evt.target.mouseX;
          var y = evt.target.mouseY;
          this.check_padding_start = new Laya.Point(x, y);
      };
      function touchMove(evt) {
          if (!this.check_padding_start)
              return;
          var x = evt.target.mouseX;
          var y = evt.target.mouseY;
          var point = new Laya.Point(x, y);
          if (Game.getDistance(point, this.check_padding_start) > 80) {
              sprite.off(Laya.Event.MOUSE_DOWN, sprite, touchBegin)
              sprite.off(Laya.Event.MOUSE_MOVE, sprite, touchMove)
              var fangxiang = "right";
              if (point.x > this.check_padding_start.x) {
                  fangxiang = "left";
              }
              this.check_padding_start = null;
              callback.runWith(fangxiang);
          }
      }
      sprite.on(Laya.Event.MOUSE_DOWN, sprite, touchBegin);
      sprite.on(Laya.Event.MOUSE_MOVE, sprite, touchMove);
  }

  //监听手机是否摇动
  Game.onShake = function (callFunc) {
      var SHAKE_THRESHOLD = 3000;
      var last_update = 0;
      var x = y = z = last_x = last_y = last_z = 0;
      if (window.DeviceMotionEvent) {
          window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
          alert('not support mobile event');
      }
      function deviceMotionHandler(eventData) {
          var acceleration = eventData.accelerationIncludingGravity;
          var curTime = new Date().getTime();
          if ((curTime - last_update) > 100) {
              var diffTime = curTime - last_update;
              last_update = curTime;
              x = acceleration.x;
              y = acceleration.y;
              z = acceleration.z;
              var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

              if (speed > SHAKE_THRESHOLD) {
                  // alert("摇动了");  
                  callFunc.run();
                  window.removeEventListener('devicemotion', deviceMotionHandler, false)
              }
              last_x = x;
              last_y = y;
              last_z = z;
          }
      }
  }
  Game.loadHtimImage = function (name, callback) {
      var img = new Image();
      img.src = name;
      img.onload = callback;
  }
  /**
   * 创建html图片
   * 返回图片id
   */
  Game.createHtmlImage = function (img, x, y, imgObj) {
      var id = Game.uuid();
      var element = document.createElement("img");
      element.src = img;
      element.id = id;
      var style = element.style;
      style.position = "absolute";
      style.zIndex = 999;
      document.body.appendChild(element);
      element.width = imgObj.width;
      element.height = imgObj.height;
      Game.htmlScale(element.id);
      Game.htmlPos(element.id, x, y);
      return element.id;
  }
  Game.htmlScale = function (id) {
      var element = document.getElementById(id);
      var oldheight = element.height;
      element.width = element.width * Game.scaleW;
      // if (oldheight === element.height) {
      element.height = element.height * Game.scaleH;
      // } else {
      //     element.height = element.height * Game.scaleH / Game.scaleW;
      // }
  }

  Game.htmlPos = function (id, x, y) {
      var element = document.getElementById(id);
      var style = element.style;
      style.top = (y * Game.scaleH) + "px";
      style.left = (x * Game.scaleW) + "px";
  }
  Game.destroyHtmlImage = function (id) {
      var element = document.getElementById(id);
      element.remove();
  }
  Game.uuid = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }
  Game.defaultParams = function (params, def) {
      for (var key in def) {
          params[key] = params[key] || def[key];
      }
  }
  /**
   * 延迟执行 时间和回调
   */
  Game.delay = function (time, callback) {
      var temp = {};
      Laya.Tween.to(temp, {}, time, null, callback);
  };
  Game.addHandler = function (mod, type, handler) {
      this.handlerMap[mod + "_" + type] = handler;
  };
  Game.addSkipHandler = function (skip, handler) {
      this.handlerMap[skip] = handler;
  }
  Game.connect = function (url, onOpen) {
      this.onOpen = onOpen;
      this.socket = new Laya.Socket();
      this.socket.connectByUrl(url);
      this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
      this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
      this.socket.on(Laya.Event.MESSAGE, this, this.onSocketMessage);
      this.socket.on(Laya.Event.ERROR, this, this.onSocketError);
  };
  Game.close = function () {
      if (this.socket != null) {
          this.socket.close();
      }
  }
  Game.sendMsg = function (msg) {
      this.socket.send(msg.toString());
      // // 使用output.writeByte发送
      // var message: string = "demonstrate <output.writeByte>";
      // for (var i: number = 0; i < message.length; ++i) {
      //     this.output.writeByte(message.charCodeAt(i));
      // }
      // this.socket.flush();
  };
  Game.onSocketOpen = function () {
      this.onOpen.run();
  };
  Game.onSocketClose = function () {
      var handler = this.handlerMap["onSocketClose"];
      if (handler != null) {
          handler.run()
      }
  };
  Game.onSocketMessage = function (message) {
      var data = JSON.parse(message);
      var handler = this.handlerMap[data._m + "_" + data._t];
      if (handler == null) {
          console.log("发现一条没有处理的消息 ： ", data);
          return;
      }
      console.log("onMessage", message);
      var showMsg = new Message(data._m, data._t);
      showMsg.putData(data);
      handler.runWith(showMsg);
      // func.call(target, showMsg);
  };
  Game.onSocketError = function (e) {
      console.error("onSocketError", e);
      var handler = this.handlerMap["onSocketError"];
      if (handler != null) {
          handler.runWith(e)
      }
  };
  Game.onMoveUp = function (target, call) {
      function _down(evt) {
          this._game_move_up_down_y = evt.target.mouseY;
      }
      function _move(evt) {
          if (this._game_move_up_down_y == null)
              return;
          if (this._game_move_up_down_y - evt.target.mouseY < 50)
              return;
          this._game_move_up_down_y = null;
          // target.off( Laya.Event.MOUSE_DOWN, target, target._down);
          // target.off( Laya.Event.MOUSE_MOVE, target, target._move);
          // target.off( Laya.Event.MOUSE_UP, target, target._up);
          call.run();
      }
      function _up(evt) {
          this._game_move_up_down_y = null;
      }
      target.on(Laya.Event.MOUSE_DOWN, target, _down);
      target.on(Laya.Event.MOUSE_MOVE, target, _move);
      target.on(Laya.Event.MOUSE_UP, target, _up);
  }
  Game.onMoveDown = function (target, call) {
      function _down(evt) {
          this._game_move_up_down_y = evt.target.mouseY;
      }
      function _move(evt) {
          if (this._game_move_up_down_y == null)
              return;
          if (evt.target.mouseY - this._game_move_up_down_y < 50)
              return;
          this._game_move_up_down_y = null;
          // target.off( Laya.Event.MOUSE_DOWN, target, target._down);
          // target.off( Laya.Event.MOUSE_MOVE, target, target._move);
          // target.off( Laya.Event.MOUSE_UP, target, target._up);
          call.run();
      }
      function _up(evt) {
          this._game_move_up_down_y = null;
      }
      target.on(Laya.Event.MOUSE_DOWN, target, _down);
      target.on(Laya.Event.MOUSE_MOVE, target, _move);
      target.on(Laya.Event.MOUSE_UP, target, _up);
  }
  Game.onMoveLeftRight = function (target, leftcall, rightcall) {
      function _down(evt) {
          this._game_move_up_down_y = evt.target.mouseX;
      }
      function _move(evt) {
          if (this._game_move_up_down_y == null)
              return;
          if (evt.target.mouseX - this._game_move_up_down_y < -50) {
              leftcall.run();
          } else if (evt.target.mouseX - this._game_move_up_down_y > 50) {
              rightcall.run();
          }
          this._game_move_up_down_y = null;
          
      }
      function _up(evt) {
          this._game_move_up_down_y = null;
      }
      target.on(Laya.Event.MOUSE_DOWN, target, _down);
      target.on(Laya.Event.MOUSE_MOVE, target, _move);
      target.on(Laya.Event.MOUSE_UP, target, _up);
  }
  /**
   * 注册和获取全局变量
   */
  Game.GlobalMapiing = {};
  /**
   * websocket
   */
  Game.handlerMap = {};
  return Game;
}());
var Message = (function () {
  function Message(mod, type) {
      this.data = {};
      this.data["_m"] = mod;
      this.data["_t"] = type;
  }
  Message.prototype.put = function (key, val) {
      this.data[key] = val;
  };
  Message.prototype.toString = function () {
      return JSON.stringify(this.data);
  };
  Message.prototype.get = function (key) {
      return this.data[key];
  };
  Message.prototype.putData = function (data) {
      this.data = data;
  };
  Message.prototype.remove = function (key) {
      delete this.data[key];
  }
  return Message;
}());
