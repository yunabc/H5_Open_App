var jumpObj={
      //跳转app
      openApp:function(subjecttype,params){
        //android 使用Scheme 协议
        var android_scheme="mybapp://";
        //ios9 以上用 universal link
        var ios_universal_link="https://ioslinks.meiyuanbang.com/jump/";
        //跳转连接 包括拼接参数值
        var jump_url='';
        //下载连接 android 和ios 分别赋值
        var android_down_url='https://img.meiyuanbang.com/download/meiyuanbang_myb.apk';
        var ios_down_url='https://itunes.apple.com/cn/app/id1029814155';
        var ua = navigator.userAgent.toLowerCase();
        //安卓和IOS判断
        if(ua.indexOf("iphone") > -1  && ua.indexOf("meiyuanbang") <= -1){
            if(this.isIOS9()){
              //判断ios9 以上用 universal link
              jump_url=ios_universal_link+this.getAddress(subjecttype,params);
              //console.log(jump_url);return false;
              window.location.href=jump_url;
              return false;
            }else{
              jump_url=android_scheme+this.getAddress(subjecttype,params);
              //微信Ios9 以下跳转到下载页
              if(ua.match(/MicroMessenger/i)=="micromessenger"){
                   jump_url=down_url;
               }
            }
           this.openUrlIframe(jump_url,down_url);
        }
        if(ua.indexOf("android") > -1  && ua.indexOf("meiyuanbang") <= -1){
           if(ua.match(/MicroMessenger/i)=="micromessenger"){
              //微信内 显示浮层 去浏览器打开
              $(".float").show();
              return false;
           }
           jump_url="mybapp://"+this.getAddress(subjecttype,params);
           this.openUrlIframe(jump_url,android_down_url);
        }
        
      },
      //获取参数 对象转换成参数
      //例如 {'courseid':1,'url':1} 转换成：courseid=1&url=1
      getParamStr:function (param_obj){
          var param_arr=[];
            for (var key in param_obj) {
              //参数 encode
              param_arr.push(key+"="+encodeURIComponent(param_obj[key]));
            } 
            return param_arr.join('&');
      },
      //通过类型获取url
      //例如：getAddress(1,{'courseid':1,'url':1}) 转换成 course/detail?courseid=1&url=1
      getAddress:function(subjecttype,param_obj){
                switch(subjecttype)
                {
                  //点播详情
                 case  1:
                      ret_address='course/detail';
                      break;
                  //可增加更多跳转类型
                default:
                    break;
                }
                var param_str=this.getParamStr(param_obj);
                if(param_str){
                    ret_address=ret_address+"?"+param_str;
                }
                return ret_address;
        },
        //通过iframe 打开Scheme 内置定时器
        openUrlIframe:function(jump_url,down_url){
             var iframe = document.createElement('iframe');
             var body = document.body;
             iframe.style.cssText='display:none;width=0;height=0';
             var timer = null;

             body.appendChild(iframe);
             iframe.src = jump_url;
             timer = setTimeout(function() {
               window.location.href = down_url;
             }, 2000);

             /*隐藏下载不要在弹出来*/
             $(document).on('visibilitychange webkitvisibilitychange',function(){
                 var tag = document.hidden || document.webkitHidden;
                 if(tag){
                    clearTimeout(timer);
                 }
             });
             $(window).on('pagehide', function() {
                 clearTimeout(timer);
             });
        },
        //判断ios9
        isIOS9:function() {
          //获取固件版本
          var getOsv = function () {
              var reg = /OS ((\d+_?){2,3})\s/;
              if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                  var osv = reg.exec(navigator.userAgent);
                  if (osv.length > 0) {
                      return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
                  }
              }
              return '';
          };
          var osv = getOsv();
          var osvArr = osv.split('.');
          //初始化显示ios9引导
          if (osvArr && osvArr.length > 0) {
              if (parseInt(osvArr[0]) >= 9) {
                  return true
              }
          }
          return false;
      },
      //获取url参数
      getQueryString:function(name)
      {  
             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
              var r = window.location.search.substr(1).match(reg);
              if (r != null)
              return  unescape(r[2]);
          return null;
      }
}







