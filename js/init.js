
var params = {
	// useauth : true,//是否需要获取用户信息，
	// scope : "snsapi_userinfo",//scope可选：snsapi_userinfo --用户信息 snsapi_base --基础数据
	// debugserver : "http://172.16.0.91:8080/orange/userinfo/",//如果有后台则必填，如果没后台则一定不能填
	// releaseserver : "http://www.i-oranges.com/sevr_org/userinfo/",//如果有后台则必填，如果没后台则一定不能填
	// initAjax : { openid : "test018", nickname : "测试姓名1", headimgurl : "http://website-1251224541.file.myqcloud.com/heishi20180308/img/fx.jpg"},//初始化ajax的参数，有后台时，本地测试使用的模拟参数
	// initMsg : function (obj) {//如果有后台则必填
	// 	return {mod : "s180809"}
	// },
	onShare : function () {//如果页面需要分享则必填
		var info = {
			title : "家，一笔一划，皆是温柔...",//分享标题
            link : "http://www.i-oranges.com/btjt20190325/index.html",//分享链接，可以直接写地址栏地址
            imgUrl : "http://www.i-oranges.com/btjt20190325/fx.jpg",//缩略图
            desc : "12年邦泰，为爱筑家！",//分享描述
		}

		
		return info;
	},
}

var wxauth = new WxAuth(params);




