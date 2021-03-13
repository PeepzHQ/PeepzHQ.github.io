var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**

Donations welcome:
	BTC: 122MeuyZpYz4GSHNrF98e6dnQCXZfHJeGS
	LTC: LY1L6M6yG26b4sRkLv4BbkmHhPn8GR5fFm
		~ Thank you!

------------

MIT License (MIT)

Copyright (c) 2013 http://coinwidget.com/ 
Copyright (c) 2013 http://scotty.cc/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

if (typeof CoinWidgetComCounter != 'number')
var CoinWidgetComCounter = -1;

if (typeof CoinWidgetCom != 'object')
var CoinWidgetCom = {
	source: window.location.protocol + '//web.archive.org/web/20160905003053/http://blockr.io'
	, config: []
	, go :function(config) {
		config = CoinWidgetCom.validate(config);
		
		CoinWidgetComCounter++;

		CoinWidgetCom.config[CoinWidgetComCounter] = config;

		CoinWidgetCom.loader.jquery();
	}
	, validate: function(config) {
		var $accepted = [];
		$accepted['currencies'] = ['bitcoin','litecoin','digitalcoin','worldcoin','quark','dogecoin','peercoin','megacoin','testnet'];
		$accepted['counters'] = ['count','amount','countdown','hide'];
		$accepted['alignment'] = ['al','ac','ar','bl','bc','br'];
		if (!config.currency || !CoinWidgetCom.in_array(config.currency,$accepted['currencies']))
			config.currency = 'bitcoin';
		if (!config.counter || !CoinWidgetCom.in_array(config.counter,$accepted['counters']))
			config.counter = 'count';
		if (!config.alignment || !CoinWidgetCom.in_array(config.alignment,$accepted['alignment']))
			config.alignment = 'bl';
		if (typeof config.qrcode != 'boolean')
			config.qrcode = true;
		if (typeof config.auto_show != 'boolean')
			config.auto_show = false;
		if (!config.wallet_address)
			config.wallet_address = 'My '+ config.currency +' wallet_address is missing!';
		if (!config.lbl_button) 
			config.lbl_button = 'Donate';
		if (!config.element)
			config.element = null;
		if (!config.lbl_address)
			config.lbl_address = 'My Address:';
		if (!config.lbl_count)
			config.lbl_count = 'Donation';
		if (!config.lbl_amount)
			config.lbl_amount = 'BTC';
		if (typeof config.singlewidget != 'boolean')
			config.singlewidget = false;
		if (typeof config.decimals != 'number' || config.decimals < 0 || config.decimals > 10)
			config.decimals = 4;
		if (!config.color)
			config.color = 'dark';
		if (!config.size)
			config.size = 'small';
		if (!config.countdownFrom)
			config.countdownFrom = 0;
		if (!config.lbl_goal)
			config.lbl_goal = 'Goal';
		if (!config.domain)
			config.domain = CoinWidgetCom.source;
		return config;
	}
	, init: function() {
		window.jQuery(document).ready(function(){
			window.jQuery.each(CoinWidgetCom.config, function(position, config) {
				if (config.element === null) {
					document.write('<span data-coinwidget-instance="'+position+'" class="COINWIDGETCOM_CONTAINER COINWIDGETCOM_'+config.color.toUpperCase()+' COINWIDGETCOM_'+config.size.toUpperCase()+'"></span>');
				} else {
					window.jQuery(config.element).html('<span data-coinwidget-instance="'+position+'" class="COINWIDGETCOM_CONTAINER COINWIDGETCOM_'+config.color.toUpperCase()+' COINWIDGETCOM_'+config.size.toUpperCase()+'"></span>');
				}
			});

			CoinWidgetCom.loader.stylesheet();

			setTimeout(function(){
				CoinWidgetCom.build();
			}, 800);		
		});
	}
	, build: function(){
		$containers = window.jQuery("span[data-coinwidget-instance]");
		$containers.each(function(i,v){
			$config = CoinWidgetCom.config[window.jQuery(this).attr('data-coinwidget-instance')];
			$counter = $config.counter == 'hide'?'':('<span><img src="'+CoinWidgetCom.source+'/js_external/coinwidget/icon_loading.gif" width="16" height="11" /></span>');
			$button = '<a class="COINWIDGETCOM_BUTTON_'+$config.currency.toUpperCase()+'" href="#"><img alt="'+$config.currency+' | Blockr.io" src="'+CoinWidgetCom.source+'/js_external/coinwidget/icon_'+$config.currency+'.png" /><span>'+$config.lbl_button+'</span></a>'+$counter;
			window.jQuery(this).html($button);
			window.jQuery(this).find('> a').unbind('click').click(function(e){
				e.preventDefault();
				CoinWidgetCom.show(this);
			});
		});
		CoinWidgetCom.counters();
	}
	, window_position: function($instance){
		$config = CoinWidgetCom.config[$instance];
		coin_window = "#COINWIDGETCOM_WINDOW_"+$instance;
		obj = "span[data-coinwidget-instance='"+$instance+"'] > a";
		if (window.jQuery(coin_window).is(':visible')) {
			window.jQuery(coin_window).stop().css({'z-index':99999999998}).fadeIn(300);
		} else {
			window.jQuery(coin_window).stop().css({'z-index':99999999999}).fadeIn(300);
		}
	}
	, counter: []
	, counters: function(){
		$addresses = [];
		window.jQuery.each(CoinWidgetCom.config,function(i,v){
			$instance = i;
			$config = v;
			if ($config.counter != 'hide')
				$addresses.push($instance+'_'+$config.currency+'_'+$config.wallet_address);
			else {
				if ($config.auto_show) 
					window.jQuery("span[data-coinwidget-instance='"+i+"']").find('> a').click();
			}
		});
		if ($addresses.length) {
			CoinWidgetCom.loader.script({
				id: 'COINWIDGETCOM_INFO'+Math.random()
				, source: (CoinWidgetCom.source+'/donator/?data='+$addresses.join('|'))
				, callback: function(){
					if (typeof COINWIDGETCOM_DATA == 'object') {
						CoinWidgetCom.counter = COINWIDGETCOM_DATA;
						window.jQuery.each(CoinWidgetCom.counter,function(i,v){
							$config = CoinWidgetCom.config[i];

							if (typeof v.domain !== 'undefined') {
								$config.domain = window.location.protocol + '//' + v.domain;
							}

							if (!v.count || v == null) v = {count:0,amount:0};
							
							var counter = v.count;

							if($config.counter=='count') {
								counter = v.count
							} else if($config.counter=='amount') {
								counter = (v.amount.toFixed($config.decimals)+' '+$config.lbl_amount);
							} else if($config.counter=='countdown') {
								var amount = (-Math.abs(parseFloat($config.countdownFrom).toFixed($config.decimals))) + parseFloat(v.amount.toFixed($config.decimals));
								if(amount >= 0) {
									counter = '<span>+' + amount.toFixed(8) + ' ' + $config.lbl_amount + '</span>';
								} else {
									counter = '<span>' + amount.toFixed(8) + ' ' + $config.lbl_amount + '</span>';
								}
							}

							window.jQuery("span[data-coinwidget-instance='"+i+"']").find('> span').html(counter);
							
							if ($config.auto_show) {
								window.jQuery("span[data-coinwidget-instance='"+i+"']").find('> a').click();
							}
						});
					}
					if (window.jQuery("span[data-coinwidget-instance] > span img").length > 0) {
						setTimeout(function(){CoinWidgetCom.counters();},2500);
					}
				}
			});
		}
	}
	, show: function(obj) {
		$instance = window.jQuery(obj).parent().attr('data-coinwidget-instance');
		$config = CoinWidgetCom.config[$instance];
		coin_window = "#COINWIDGETCOM_WINDOW_"+$instance;
		window.jQuery(".COINWIDGETCOM_WINDOW").css({'z-index':99999999998});
		if (!window.jQuery(coin_window).length) {

			$sel = !navigator.userAgent.match(/iPhone/i)?'onclick="this.select();"':'onclick="prompt(\'Select all and copy:\',\''+$config.wallet_address+'\');"';

			$html = '<div class="BLOCKRWIDGET_FRAME">'
				  + '<label>'+$config.lbl_address+'</label>'
				  + '<div class="COINWIDGET_ADDRESS">'
				  + '<img class="COINWIDGET_INPUT_ICON" src="'+CoinWidgetCom.source+'/js_external/coinwidget/icon_'+$config.currency+'.png" width="16" height="16" title="This is a '+$config.currency+' wallet address." />'
				  + '<input type="text" readonly '+$sel+'  value="'+$config.wallet_address+'" />'
				  + '<a class="COINWIDGETCOM_WALLETURI" href="'+$config.currency.toLowerCase()+':'+$config.wallet_address+'" target="_blank" title="Click here to send this address to your wallet (if your wallet is not compatible you will get an empty page, close the white screen, click and copy the address by hand)" ><img alt="Blockr.io '+$config.currency+' Wallet" src="'+CoinWidgetCom.source+'/js_external/coinwidget/icon_wallet.png?v=2" width="30" height="33" /></a>' 
				  + '</div>'
  				  
  				  + '<a class="COINWIDGETCOM_CLOSER" href="javascript:;" onclick="CoinWidgetCom.hide('+$instance+');" title="Close this window">x</a>'
  				  
				  ;

			if ($config.counter != 'hide') {
				$html +='<div class="BLOCKRWIDGET_ADDRESS_INFO">' 
					  +'<span class="COINWIDGETCOM_COUNT"><small>'+$config.lbl_count+'</small>0</span>'
				  	  + '<span class="COINWIDGETCOM_AMOUNT end"><small>'+$config.lbl_amount+'</small>0.00</span>';
			}

			if ($config.counter == 'countdown') {
				$html +='<span class="COINWIDGETCOM_GOAL"><small>'+$config.lbl_goal+':</small>0.00</span>';
			}
			
			if ($config.counter != 'hide') {
				$html +='<div class="clear"></div>'
				  	  +'</div>';			  
			}

			if ($config.qrcode) {
				$html += '<div class="BLOCKRWIDGET_QRCODE"><img class="COINWIDGETCOM_QRCODE_LARGE" src="'+CoinWidgetCom.source+'/api/v1/address/Qr/'+$config.wallet_address+'" /><img class="COINWIDGETCOM_PHONE" alt="Blockr.io '+$config.currency+' Mobile Wallet" src="'+CoinWidgetCom.source+'/js_external/coinwidget/icon_phone.png?v=2" width="29" height="39" /></div>'
				  	   ;
			}
			$html +='<div class="BLOCKRWIDGET_CREDITS"><a href="'+$config.domain+'/address/info/'+$config.wallet_address+'" title="'+$config.currency+' Blockchain Explorer Chart Market price" target="_blank"><span><img alt="Blockr.io '+$config.currency+' Block Explorer Charts" src="'+CoinWidgetCom.source+'/js_external/coinwidget/blockr_logo.png?v=1" /></span></a></div>' 
				  +'</div>';
			var $div = window.jQuery('<div></div>');
			window.jQuery('body').append($div);
			$div.attr({
				'id': 'COINWIDGETCOM_WINDOW_'+$instance
			}).addClass('COINWIDGETCOM_WINDOW COINWIDGETCOM_WINDOW_'+$config.currency.toUpperCase()+' COINWIDGETCOM_WINDOW_'+$config.alignment.toUpperCase()).html($html).unbind('click').bind('click',function(){
				window.jQuery(".COINWIDGETCOM_WINDOW").css({'z-index':99999999998});
				window.jQuery(this).css({'z-index':99999999999});
			});
		} else {
			if (window.jQuery(coin_window).is(':visible')) {
				CoinWidgetCom.hide($instance);
				return;
			}
		}
		CoinWidgetCom.window_position($instance);
		window.jQuery(coin_window).show();
		$pos = window.jQuery(coin_window).find('input').position();
		window.jQuery(coin_window).find('img.COINWIDGET_INPUT_ICON');
		window.jQuery(coin_window).find('.COINWIDGETCOM_WALLETURI');
		if ($config.counter != 'hide') {
			$counters = CoinWidgetCom.counter[$instance];
			if ($counters == null) {
				$counters = {
					count: 0,
					amount: 0
				};
			}
		 	if ($counters.count == null) $counters.count = 0;
		 	if ($counters.amount == null) $counters.amount = 0;
			window.jQuery(coin_window).find('.COINWIDGETCOM_COUNT').html('<small>'+$config.lbl_count+'</small>'+ $counters.count );
			window.jQuery(coin_window).find('.COINWIDGETCOM_AMOUNT').html('<small>'+$config.lbl_amount+'</small>'+ $counters.amount.toFixed($config.decimals) );
			window.jQuery(coin_window).find('.COINWIDGETCOM_GOAL').html('<small>'+$config.lbl_goal+'</small>'+ parseFloat($config.countdownFrom).toFixed($config.decimals) );
		}
		if (typeof $config.onShow == 'function') 
			$config.onShow();
	}
	, hide: function($instance) {
		$config = CoinWidgetCom.config[$instance];
		coin_window = "#COINWIDGETCOM_WINDOW_"+$instance;
		window.jQuery(coin_window).fadeOut(function(){
			window.jQuery(coin_window).remove();
		});
		if (typeof $config.onHide == 'function') {
			$config.onHide();
		}
	}
	, in_array: function(needle,haystack) {
		for (i=0;i<haystack.length;i++) {
			if (haystack[i] == needle) { 
				return true;
			}
		}
		return false;
	}
	, loader: {
		loading_jquery: false,
		script: function(obj){
			if (!document.getElementById(obj.id)) {
				var x = document.createElement('script');
				x.onreadystatechange = function(){
					switch (this.readyState) {
						case 'complete':
						case 'loaded':
							obj.callback();
							break;
					}
				};
				x.onload = function(){
					obj.callback();
				};
				x.src = obj.source;
				x.id  = obj.id;
				document.body.appendChild(x);
			}
		}
		, stylesheet_loaded: false
		, stylesheet: function(){
			if (!CoinWidgetCom.loader.stylesheet_loaded) {
				CoinWidgetCom.loader.stylesheet_loaded = true;
				var $link = window.jQuery('<link/>');
				window.jQuery("head").append($link);
				$link.attr({
					id 		: 'COINWIDGETCOM_STYLESHEET'
					, rel 	: 'stylesheet'
					, type 	: 'text/css'
					, href 	: CoinWidgetCom.source+'/js_external/coinwidget/coin.css'
				});
			}
		}
		, jquery: function(){
			if (!window.jQuery && !CoinWidgetCom.loader.loading_jquery) {
				$prefix = window.location.protocol=='file:'?'http:':'';
				CoinWidgetCom.loader.script({
					id			: 'COINWIDGETCOM_JQUERY'
					, source 	: $prefix + '//web.archive.org/web/20160905003053/http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
					, callback  : function(){
						CoinWidgetCom.init();
					}
				});
				return;
			}

			CoinWidgetCom.init();
		}
	}
};

}
/*
     FILE ARCHIVED ON 00:30:53 Sep 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:11:28 Mar 13, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots.policy: 0.269
  LoadShardBlock: 92.213 (3)
  captures_list: 135.668
  RedisCDXSource: 9.038
  CDXLines.iter: 20.066 (3)
  PetaboxLoader3.resolve: 142.384 (2)
  esindex: 0.021
  PetaboxLoader3.datanode: 139.037 (5)
  exclusion.robots: 0.289
  load_resource: 245.72 (2)
*/