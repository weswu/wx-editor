if (!-[ 1, ]) {
	timer = null;
	String.prototype.colorHex = function() {
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		var that = this;
		if (/^(rgb|RGB)/.test(that)) {
			var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
			var strHex = "#";
			for ( var i = 0; i < aColor.length; i++) {
				var hex = Number(aColor[i]).toString(16);
				if (hex === "0") {
					hex += hex
				}
				strHex += hex
			}
			if (strHex.length !== 7) {
				strHex = that
			}
			return strHex
		} else if (reg.test(that)) {
			var aNum = that.replace(/#/, "").split("");
			if (aNum.length === 6) {
				return that
			} else if (aNum.length === 3) {
				var numHex = "#";
				for ( var i = 0; i < aNum.length; i += 1) {
					numHex += (aNum[i] + aNum[i])
				}
				return numHex
			}
		} else {
			return that
		}
	};
	String.prototype.colorRgb = function() {
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		var sColor = this.toLowerCase();
		if (sColor && reg.test(sColor)) {
			if (sColor.length === 4) {
				var sColorNew = "#";
				for ( var i = 1; i < 4; i += 1) {
					sColorNew += sColor.slice(i, i + 1).concat(
							sColor.slice(i, i + 1))
				}
				sColor = sColorNew
			}
			var sColorChange = [];
			for ( var i = 1; i < 7; i += 2) {
				sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)))
			}
			return "RGB(" + sColorChange.join(",") + ")"
		} else {
			return sColor
		}
	};
	function getfg(id) {
		var color = $('#' + id).val();
		if (color.indexOf('rgb') != -1) {
			color = color.colorHex()
		} else {
			color = color.colorRgb();
			color = color.colorHex()
		}
		return color.replace('#', '')
	}
	window.logo = '';
	function upload(json) {
		if (typeof (json) !== "object")
			json = $.parseJSON(json);
		if (json.status) {
			window.logo = '&logo=' + json.url;
			setBaseParam({
				el : 'H'
			});
			$('#level')[0].options[3].selected = true;
			$('#level').attr('disabled', 'disabled');
			createPic()
		}
	}
	function doPicSetFn(alubmArr){
		var item = alubmArr[0];
		item['status']=true;
		item['url']=item.src;
		upload(item);
		$("#picelem span").html(item['fileName']);
		$("#picelem").show();
	}
	function loadimg(src) {
		var img = new Image();
		$(img).load(function() {
			$(this).attr('src', src)
		}).attr('src', src)
	}
	function paramFn() {
		this.string = '';
		this.bgcolor = null;
		this.fgcolor = null;
		this.gccolor = null;
		this.ptcolor = null;
		this.inptcolor = null;
		this.getString = function() {
			if (this.bgcolor)
				this.string += '&bg=' + this.bgcolor;
			if (this.fgcolor)
				this.string += '&fg=' + this.fgcolor;
			if (this.gccolor)
				this.string += '&gc=' + this.gccolor;
			if (this.ptcolor)
				this.string += '&pt=' + this.ptcolor;
			if (this.inptcolor)
				this.string += '&inpt=' + this.inptcolor;
			return this.string
		}
	}
	window.params = '';
	setBaseParam();
	window.colorParams = '';
	function emptyFn() {
	}
	function setColor(id) {
		paramFn.apply(this);
		this[id] = getfg(id);
		window.colorParams += this.getString();
		createPic()
	}
	function setBaseParam(options, callback) {
		if (!callback)
			callback = emptyFn;
		options = $.extend({
			w : '300',
			el : 'l',
			m : '10'
		}, options);
		window.params = '&el=' + options.el + '&m=' + options.m + '&w='
				+ options.w;
		callback()
	}
	function resetColor(type) {
		if (window.colorParams) {
			var arr = window.colorParams.split('&');
			for ( var i = 0, len = arr.length; i < len; i++) {
				if (arr[i].indexOf(type) != -1) {
					break
				}
			}
			window.colorParams = window.colorParams.replace(arr[i], '');
			createPic()
		}
	}
	function resetAllColor(callback) {
		if (!callback)
			callback = emptyFn;
		if (window.colorParams) {
			window.colorParams = '';
			callback()
		}
	}
	function createPic(type) {
		clearTimeout(timer);
		var picpath = '/images/2013/';
		var colorParam = window.colorParams + window.params + window.logo;
		timer = setTimeout(function() {
			var qrcodeimg = $('#qrcodeimg');
			var picobj = $('#pic');
			var apiobj = $('#apiUrl');
			var uri = '', uripart = '';
			if (type) {
				var obj = new window["Mode_" + type];
				var str = obj.getString();
				if (type == 'text' && str == '支持文本、网址和电子邮箱') {
					str = ''
				} else if (type == 'url' && str == 'http://') {
					str = ''
				}
				$('#apiText').attr('title', str);
				var len = str.length;
				if (len > 0) {
					if (len > 1500) {
						picobj.attr('href', '/');
						qrcodeimg.attr('src', picpath + 'wordlong.gif');
						return
					} else {
						uripart = 'text=' + encodeURIComponent(str)
					}
				} else {
					picobj.attr('href', '/');
					qrcodeimg.attr('src', picpath + 'liantu.png');
					apiobj.attr('title', '');
					return
				}
			} else {
				var apiurl = $('#apiUrl').attr('title')
						|| "http://m.liantu.com";
				var arr = apiurl.split('&').pop();
				if (arr.indexOf('text=') !== -1) {
					uripart = arr
				} else {
					picobj.attr('href', '/');
					qrcodeimg.attr('src', picpath + 'liantu.png');
					apiobj.attr('title', '');
					return
				}
			}
			uri = 'http://qr.liantu.com/api.php?'  + colorParam.substr(1, colorParam.length) + '&'
			+ uripart;
			if (!uripart || uri == apiobj.attr('title'))
				return;
			$("#qrcodeimg").attr('src', "/user_v2/tools/images/ajax-loader.gif");
			$("#qrcodeimg").attr("src",uri);
			$("#apiUrl").attr("title",uri);
			//apiobj.attr('src',uri);
			
			
			
		}, 500)
	}
	
	$('#fntab li').click(function() {
		createPic($(this).attr('rel'))
	});
	$('#gradientWay').attr('disabled', 'disabled');
	$('#diy_div,#logotypes,#tabset>a:eq(2),#fnblock>div:eq(2)').hide();
	$('.fnrow').addClass('mrow');
	$('#rotate').attr("disabled", "disabled");
	$('#text_text').keyup(function() {
		if ($(this).val() != '支持文本、网址和电子邮箱') {
			countSize($(this));
			createPic('text')
		}
	});
	$('#text_text').blur(function() {
		if ($(this).val() != '支持文本、网址和电子邮箱') {
			countSize($(this));
			createPic('text')
		}
	});
	$('#url_url').keyup(function() {
		createPic('url')
	});
	$('#telephone_tel').keyup(function() {
		createPic('telephone')
	});
	$('#sms_tel').keyup(function() {
		createPic('sms')
	});
	$('#sms_sms').keyup(function() {
		countSize($(this));
		createPic('sms')
	});
	$('#sms_sms').blur(function() {
		countSize($(this));
		createPic('sms')
	});
	$(
			'#card_n,#card_tel,#card_phone,#car_note,#card_org,#card_til,#card_mail,#card_adr')
			.keyup(function() {
				createPic('card')
			});
	$('#hidetel').click(function() {
		createPic('card')
	});
	$('#mail_mail').keyup(function() {
		createPic('mail')
	});
	$('#wifi_ssid,#wifi_p').keyup(function() {
		createPic('wifi')
	});
	$('#wifi_t').change(function() {
		createPic('wifi')
	});
	$('#margin').change(function() {
		setBaseParam({
			m : parseInt($(this).val())
		}, createPic)
	});
	$('#level').change(function() {
		setBaseParam({
			el : $(this).val()
		}, createPic)
	});
	$('#size').change(function() {
		setBaseParam({
			w : $(this).val()
		}, createPic)
	});
	$('#resetPtColor').click(function() {
		resetColor('pt');
		$('#icp_ptcolor').css('background-color', '#000');
		$(this).hide()
	});
	$('#resetInPtColor').click(function() {
		resetColor('inpt');
		$('#icp_inptcolor').css('background-color', '#000');
		$(this).hide()
	});
	$('#resetGcColor').click(function() {
		resetColor('gc');
		$('#icp_gccolor').css('background-color', '#000');
		$(this).hide()
	});
	$('#resetAll').click(function() {
		window.logo = '';
		resetAll();
		resetAllColor();
		setBaseParam();
		createPic()
	});
	$('#resetLogoimg').click(function() {
		$('#logoimg').val('');
		$('#picelem').hide();
		$('#format').show();
		$('#turn').hide();
		window.logo = '';
		$('#level').removeAttr('disabled');
		createPic()
	});
	$('#savepng').click(function() {
		var uri = $('#apiUrl').attr('title');
		if (!uri) {
			uri = location.href + $('#qrcodeimg').attr('src')
		} else {
			uri = uri.replace('/126.php?', '/api.php?')
		}
		location.href = 'http://www.liantu.com/saveqr.php?url=' + encodeURIComponent(uri);
		return false
	});
	$('#copy').click(function() {
		var clipBoardContent = $('#pic').attr('shorturl');
		if (clipBoardContent.indexOf('http://') == -1) {
			clipBoardContent = 'http://' + location.hostname + clipBoardContent
		}
		window.clipboardData.setData("Text", clipBoardContent);
		alert("复制成功!")
	});
	$('#logoimg').change(function() {
		$('#logoform').submit()
	})
	
}
