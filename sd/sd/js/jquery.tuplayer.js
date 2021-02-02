/*----------------------------------------------- 
Project: Techumber Custom HTML5 Video Player
URL: http://techumber.com 
Version: 1.1 
Creator: Aravind Buddha
Last changed: 05/April/13   
-------------------------------------------------*/ 
;(function ( $, window, document, undefined ) {
    var pluginName = "tuPlayer",
        defaults = {   //default settings
            width: "100%",
			height: "900"
            ,autoplay:true
            ,preload:true
            ,loop:true
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this._video="";
        this._tuPlayer="";
        this._contorls="";
        this._play="";
        this._progress="";
        this._progressBar="";
        this._progressBtn="";
        this._time="";
        this._vol="";
        this._volBar="";
        this._volBtn="";
        this._flag="";
        this._dur="";
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            //setting Global attribute
            var self=this;
            _video=$(this.element)[0]; 
            _video.removeAttribute("controls");
            _dur=$(this.element)[0].duration;
            _flag=0;

           this.createPlayer();
           this.getControls();
           this.setCSS();
           //to show total time
           this.showTotalTime();
           //HTML5 Video event to update time
           _video.addEventListener('timeupdate', function(){self.showTime();});
           _play.click(function(){self.clicktoggle() });
           //for seek contorl dragging
           _progress.bind('mousedown',function(e){
                self.progSeek(e);
           });
           //for volume contorl dragging
           _vol.bind('mousedown',function(e){
                self.volSeek(e);
           });
            
        },

        //Jquery default toggle function depricated in 1.9.1,
        //this is custom toggle function for 1.9.1
        clicktoggle:function() { 
            if(_flag){
                this.pause();
                _flag=0;
            }
            else{
                _flag=1;
                this.play();
            }
            
        },
        //creating dom for player
        createPlayer:function(){
            $(this.element).wrap('<div class="tu-player" />');
           _tuPlayer=$(".tu-player");
           _tuPlayer.append('<div class="contrl">'
                +'<div class="play">&#9658;</div>'
                +'<div class="progress"><div class="bar"></div><div class="button"></div></div>'
                +'<div class="time">0:00</div>'
                +'<div class="vlume">'
                    +'<div class="bar" style="width: 50px;"></div>'
                    +'<div class="button"> </div>'
                +'</div>');
        },
        //getting contorl variables for future usage.
        getControls:function(){
            _contorls=$(".tu-player .contrl");
           _play=_contorls.find(".play");
           _progress=$(".tu-player .progress");
           _progressBar=_progress.find(".bar");
           _progressBtn=$(".tu-player .progress .button");
           _time=$(".tu-player .time");
           _vol=$(".tu-player .vlume");
           _volBar=$(".tu-player .vlume .bar");
           _volBtn=$(".tu-player .vlume .button");
        },
        //setting css rules on custom contorls
        setCSS:function(){
            _tuPlayer.css({"width":this.options.width});
            _tuPlayer.find('video').css({"width":"100%"});
            _contorls.css({
                'height':'30px'
                ,'color': '#fff'
                ,'border':'1px solid #404040'
                ,'background': '#2a2a2a'
                ,'opacity': '0.75'
                ,'width':'98%'
                ,'margin':'0 auto 20px'
                ,'border-radius': '5px'
                ,'position':'relative'
                ,'top':'-42px'
            });

            _play.css({
                'width':'15px'
                ,'cursor':'pointer'
                ,'float': 'left'
                ,'margin-left':'10px'
                ,'line-height': '30px'
            });
            _progress.css({
                'height': '5px'
                ,'border-bottom':'1px solid #1f1f1f'
                ,'border-top':'1px solid #222'
                ,'width':'60%'
                ,'border-radius': '5px'
                ,'background':'#676767'
                ,'box-shadow':'inset 0 -5px 10px rgba(0,0,0,0.1)'
                ,'cursor':'pointer'
                ,'margin':'12px 0 0 10px'
                ,'float': 'left'
                ,'margin-left':'10px'
                ,'line-height': '30px'
            });
            _progressBar.css({
                'background':'#33b5d5'
                ,'height':'5px'
                ,'width':'0'
                ,'float':'left'

            });
            _progressBtn.css({
                'border-radius':'5px'
                ,'width':'19px'
                ,'height':'11px'
                ,'background':'#fff'
                ,'margin':'-3px 0 0 0'
                ,'float': 'left'
                ,'line-height': '30px'
            });
            _time.css({
                'float': 'left'
                ,'margin-left':'10px'
                ,'line-height': '30px'
            });
            _vol.css({
                'width':'20%'
                ,'height':'5px'
                ,'margin':'12px 0 0 0'
                ,'border-bottom':'1px solid #333'
                ,'border-radius':'3px'
                ,'background': '#111'
                ,'float': 'left'
                ,'margin-left':'10px'
                ,'line-height': '30px'
            });
            _volBar.css({
                'background':'#c61003'
                ,'height':'5px'
                ,'border-radius':'3px 0 0 3px'
                ,'cursor':'pointer'
                ,'float':'left'
            });
            _volBtn.css({
                'width':'5px'
                ,'height':'15px'
                ,'background':'#696969'
                ,'border-radius':'3px'
                ,'margin-top':'-5px'
                ,'cursor':'pointer'
                ,'float':'left'
            });
        },
        //on play
        play:function(){
             _video.play();
            _play.html("&#2405;");
        },
        //on pause
        pause:function(){
            _video.pause();
            _play.html("&#9658;");
        },
        //display video time
        showTime:function(){
            var time,min=0,sec=00;
            time = Math.round(_video.currentTime);
            min = Math.floor(time / 60);
            if(time) {
                sec = Math.round(time) - (60*min);
                if(sec > 59) {
                    sec = Math.round(time) - (60*min);
                    if(sec == 60) {
                        min = Math.round(time / 60); 
                        sec = 0;
                    }
                }
            } 
            _time.html(("0" + min).slice(-2)+':'+("0" + sec).slice(-2));
        },
        //display total video time
        showTotalTime:function(){
            var time,min=0,sec=00;
            time = Math.round(_dur);
            min = Math.floor(time / 60);
            if(time) {
                sec = Math.round(time) - (60*min);
                if(sec > 59) {
                    sec = Math.round(time) - (60*min);
                    if(sec == 60) {
                        min = Math.round(time / 60); 
                        sec = 0;
                    }
                }
            } 
            _time.html(("0" + min).slice(-2)+':'+("0" + sec).slice(-2));
        },
        //progress seek
        progSeek:function(e){
            var x = e.pageX - _progress.offset().left;
            _progressBar.css({'max-width': _progress.width()-20});
            _progressBar.css({'width':x});
            _video.currentTime = (x / _progress.width()) * _dur;
        },
        //volume seek
        volSeek:function(e){
            var x = e.pageX - _vol.offset().left;
            _volBar.css({'max-width': _vol.width()-6})
            _volBar.css({'width':x});
            _video.volume=x / _vol.width();
        }
    };

    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
