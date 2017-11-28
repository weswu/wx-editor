///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        ColorPicker = baidu.editor.ui.ColorPicker = function (options){
            this.initOptions(options);
            this.noColorText = this.noColorText || this.editor.getLang("clearColor");
            this.initUIBase();
            this.recentlyColor=localStorage.getItem('useColor') ? localStorage.getItem('useColor').split(",").slice(0, 8) : ["#000"];
        };

    ColorPicker.prototype = {
        getHtmlTpl: function (){
            return genColorPicker(this.noColorText,this.editor,this);
        },
    		_initColorPicker: function() {
    			var e = this,
    				t = this.getDom("colorpicker"),
    				n = this.getDom("colorinput_preview"),
    				i = e.getDom("colorinput");
    			$(t).addClass("cp cp-default");
    			o(t, function(t) {
    				if (t) {
    					t = t.substr(1), i.value = t;
    					var o = e._getColor();
    					o && (n.style.backgroundColor = o ? o : "#fff");
    				}
    			});
    		},
        _onTableClick: function (evt){
          var tgt = evt.target || evt.srcElement;
          var color = tgt.getAttribute('data-color');
          if (color) {
              var i = this.getDom("colorinput_preview"),
              o = this.getDom("colorinput");
              i.style.backgroundColor = color, o.value = (color || "").substr(1);
              this._saveColor(color);
              this.fireEvent('pickcolor', color);
          }else{
            if(tgt.getAttribute('title') == '清除颜色'){this._onPickNoColor()}
          }
        },
    		_saveColor: function(e) {
          for (var t = this.recentlyColor || ["#000"], n = [], o = 0, r = t.length; r > o; ++o) {
    				var l = t[o];
    				l != e && n.push(l);
    			}
    			n.unshift(e);
          t = n.slice(0, 8);
          this.recentlyColor = t;
          localStorage.setItem('useColor', t.join(","))
          var html='<span onclick="return false;" title="清除颜色" class="ue_colorpicker_nocolor_bg ue_colorpicker_square edui-default"></span>';
          for(var c=0; c<t.length; c++){
            html+='<span onclick="return false;" title="'+t[c]+'" data-color="'+t[c]+'" class="ue_colorpicker_square edui-default" style="background-color:'+t[c]+'"></span>';
          }
    			this.getDom("recently_color").innerHTML = html;
    		},
        _onTableOver: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.getDom('preview').style.backgroundColor = color;
            }
        },
        _onTableOut: function (){
            this.getDom('preview').style.backgroundColor = '';
        },
        _onPickNoColor: function (){
            this.fireEvent('picknocolor');
        },
        _onInputKeyup: function (e) {
          e.preventDefault();
          var cip=this.getDom("colorinput_preview");
          var color=this._getColor();
          var key=e.keyCode||e.which;
          cip.style.backgroundColor=color?color:"#fff"
          color&&13==key&&(this._saveColor(color),this.fireEvent("pickcolor", color));
        },
        _onBtnClick: function (e) {
          e.preventDefault();
          var color = this._getColor();
          color && (this._saveColor(color), this.fireEvent("pickcolor", color));
        },
    		_getColor: function() {
    			var e = this.getDom("colorinput"),
    				t = e.value || "";
    			t = t.toLowerCase();
    			var n = t.split(""),
    				i = n.length;
    			if (3 != i && 6 != i) return !1;
    			for (var o = 0; i > o; ++o) {
    				var r = n[o];
    				if (!(r >= "0" && "9" >= r || r >= "a" && "f" >= r)) return !1;
    			}
    			return "#" + t;
    		}
    };
    utils.inherits(ColorPicker, UIBase);

    var COLORS = ("ffffff,ffd7d5,ffdaa9,fffed5,d4fa00,73fcd6,a5c8ff,ffacd5,ff7faa,d6d6d6,ffacaa,ffb995,fffb00,73fa79,00fcff,78acfe,d84fa9,ff4f79,b2b2b2,d7aba9,ff6827,ffda51,00d100,00d5ff,0080ff,ac39ff,ff2941,888888,7a4442,ff4c00,ffa900,3da742,3daad6,0052ff,7a4fd6,d92142,000000,7b0c00,ff4c41,d6a841,407600,007aaa,021eaa,797baa,ab1942").split(",");
    function genColorPicker(noColorText,editor, ctx){

        // 已使用的颜色
        var useColor= ctx.recentlyColor;
        var useColorHtml='';
        for(var c=0; c<useColor.length; c++){
          useColorHtml+='<span onclick="return false;" title="'+useColor[c]+'" data-color="'+useColor[c]+'" class="ue_colorpicker_square edui-default" style="background-color:'+useColor[c]+'"></span>';
        }

        var html = '<div id="##" class="edui-colorpicker %%" style="padding: 10px;">' +
            '<div class="edui-colorpicker-topbar edui-clearfix">' +
            '<div class="edui-colorpicker-preview edui-default"><div  id="##_preview" style="display:none"></div>最近使用颜色</div>' +
            '<div id="##_recently_color" class="edui-colorpicker-nocolor" onclick="return $$._onTableClick(event, this);"><span onclick="return false;" title="清除颜色" class="ue_colorpicker_nocolor_bg ue_colorpicker_square edui-default"></span>'+ useColorHtml +'</div>' +
            '</div>' +
            '<table  class="ue_colorpicker_group" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' +
            '<tr style="color:#666;font-size: 13px;line-height: 25px;padding-top: 2px"><td colspan="9">'+editor.getLang("themeColor")+'</td> </tr>'+
            '<tr class="edui-colorpicker-tablefirstrow" >';
        for (var i=0; i<COLORS.length; i++) {
            if (i && i%9 === 0) {
                html += '</tr>'+(i==50?'<tr style="font-size: 13px;line-height: 25px;color:#333;"><td colspan="9">'+editor.getLang("standardColor")+'</td></tr>':'')+'<tr'+(i==50?' class="edui-colorpicker-tablefirstrow"':'')+'>';
            }
            html += i<60 ? '<td style="padding:2px;"><a hidefocus title="'+COLORS[i]+'" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' +
                ' data-color="#'+ COLORS[i] +'"'+
                ' style="background-color:#'+ COLORS[i] +';border:solid #eee;'+
                (i<9 || i>=50?'border-width:1px;' : i>=9&&i<20?'border-width:1px 1px 1px 1px;':'border-width:1px 1px 1px 1px;')+
                '"></a></td>':'';
        }
        html += '</tr></table>';
        html += "<div class='ue_colorpicker_toolbar'><span id='##_colorinput_preview' class='showColor'></span>";
        html += "<span class='ue_colorpicker_input_box'><span class='ue_colorpicker_input_append'>#</span><input type='text' id='##_colorinput' name='customColor' class='customColor' value='' onclick='$(this).focus();' onkeyup='return $$._onInputKeyup(event, this);'/></span>";
        html += "<button class='buttonColor btn btn-default' data-color='#EA0606' onclick='return $$._onBtnClick(event, this);'>确定</button></div>";
        html += '</div>';
        return html;
    }
})();
