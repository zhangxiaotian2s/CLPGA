(function($) {
	$.fn.slideBox = function(number) {
		function banner(number) {
			this.banner_ul = $('#banner-ul');
			this.banner_li = this.banner_ul.children('li')
			this.li_length = this.banner_ul.children('li').length || number;
			this.li_width = $(window).width() > 640 ? 640 : $(window).width();
			this.timer = '';
			this.banner_dian = $('#banner-dian');
			this.banner_dian_li = this.banner_dian.children('li');
			this.index = 0;
		};
		banner.prototype.init = function() {
			var _this = this;
			//设置远点位置
			_this.banner_dian.css({
				'margin-left': -_this.banner_dian.width() / 2 + 'px'
			});
			//设置bannerli的宽度
			_this.banner_ul.children('li').css({
				'width': _this.li_width + 'px'
			});
			//设置初始化的translate3d 
			_this.banner_ul.css({
					'-webkit-transform': 'translate3d(-' + _this.li_width + 'px,0,0)',
					'transform': 'translate3d(-' + _this.li_width + 'px,0,0)'
				})
				//把最后一个插入的第一个
			_this.banner_ul.prepend(_this.banner_li.eq(_this.li_length - 1));
			//设置自动执行4000
			_this.timer = setInterval(function() {
				_this.slideBoxAction();
			}, 4000);
			//拖动执行切换
			_this.dragSlideBoxAction();
		};
		banner.prototype.slideBoxAction = function(direction) {
			var _this = this;
			var _direction = direction || -1;
			var _append_li, _offx
			if (_direction < 0) {
				_this.index++;
				var _append_li = $('#banner-ul').children('li').eq(0);
				_offx = -_this.li_width * 2;

			} else {
				_this.index--;
				var _append_li = $('#banner-ul').children('li').eq(this.li_length - 1);
				_offx = 0;
			}
			_this.banner_ul.css({
				'-webkit-transition': '0.5s  linear',
				'transition': '0.5s  linear',
				'-webkit-transform': 'translate3d(' + _offx + 'px,0,0)',
				'transform': 'translate3d(' + _offx + 'px,0,0)'
			})
			_this.banner_ul.on('webkitTransitionEnd', function() {
				if (_direction < 0) {
					$('#banner-ul').append(_append_li);
				} else {
					$('#banner-ul').prepend(_append_li);
				}
				_this.index = _this.getIndex(_this.index);

				_this.banner_dian_li.eq(_this.index).addClass('current').siblings('li').removeClass('current');
				_this.banner_ul.css({
					'-webkit-transition': '0s linear',
					'transition': '0s linear',
					'-webkit-transform': 'translate3d(-' + _this.li_width + 'px,0,0)',
					'transform': 'translate3d(-' + _this.li_width + 'px,0,0)'
				})
			})
		};
		//计算index
		banner.prototype.getIndex = function(index) {
			var _this = this;
			if (index < 0) {
				return _this.li_length - 1;
			} else if (index > (_this.li_length - 1)) {
				return 0;
			} else {
				return index;
			}
		};
		//drag切换
		banner.prototype.dragSlideBoxAction = function() {
			var _this = this;
			touch.on('#banner-ul', 'touchstart', function(ev) {
				ev.preventDefault();
				clearInterval(_this.timer)
			})
			var dx = -_this.li_width;
			var _direction = "";
			touch.on('#banner-ul', 'drag', function(ev) {
				var _offx = dx + ev.x + "px";
				_direction = ev.x;
				_this.banner_ul.css({
					'-webkit-transform': 'translate3d(' + _offx + ',0,0)',
					'transform': 'translate3d(' + _offx + ',0,0)'
				})
			})
			touch.on('#banner-ul', 'dragend', function(ev) {
				_this.slideBoxAction(_direction);
				_this.timer = setInterval(function() {
					_this.slideBoxAction();
				}, 4000);
			})
		}
		var banner = new banner();
		banner.init();
	};
})(Zepto);

(function($) {
	$.fn.fallsFlow = function(listdata) {
		function waterPull(data) {
			this.data = data;
			this.list_1 = $('#list1');
			this.list_2 = $('#list2');
			this.list_b_1 = $('#list-bottom1');
			this.list_b_2 = $('#list-bottom2');
			this.bottom_blank = $('#bottom-blank');
			this.win_h = $(window).height();
			this.water_pull_loading = $('#water-pull-loading');
			this.isshare = getUrlParam('from_') == "share" ? true : false;
		};
		waterPull.prototype.init = function() {
			var _this = this;
			//当获得了 数据时删除
			_this.water_pull_loading.remove()
			_this.arrimg = ['http://7xl619.com1.z0.glb.clouddn.com/m1.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m2.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m3.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m4.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m5.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m6.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m7.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m8.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m9.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m10.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m11.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m12.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m13.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m14.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m15.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m16.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m17.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m18.jpg',
			];
			_this.insertDome(0, 10, _this.isshare)
			var _arr_length = _this.arrimg.length;
			var start_i = 10;
			$(window).bind('scroll', function() {
				var _bottom_blank_top = _this.bottom_blank.offset().top - 100;
				if (_bottom_blank_top - $(window).scrollTop() < _this.win_h) {
					var _add_end_i = start_i + 10;
					if (_add_end_i > _arr_length) {
						_add_end_i = _arr_length;
					}
					_this.insertDome(start_i, _add_end_i, _this.isshare);
					start_i = _add_end_i;
					if (start_i >= _arr_length) {
						$(window).unbind('scroll')
						return;
					}
				}
			})
		};
		//获取list中 图片距离顶部最近的list
		waterPull.prototype.getNowListMinTop = function() {
			var _this = this;
			var _list_1_top = _this.list_b_1.offset().top,
				_list_2_top = _this.list_b_2.offset().top;
			var min_top = Math.min(_list_1_top, _list_2_top);
			if (_list_1_top == min_top) {
				return 1;
			} else if (_list_2_top == min_top) {
				return 2;
			}
		};
		waterPull.prototype.insertDome = function(start_i, end_i, isshare) {
			var _this = this;
			var _img = new Image();
			_img.onload = function() {
				var _html = '';
				_html += '<div class="waterone clearfix"><div class="water-img-box clearfix pr">';
				_html += '<img src="' + _this.arrimg[start_i] + '" class="img-responsive" />';
				_html += '<div class="water-img-box-mes pa"><p>得票数:<strong>1999</strong></p><span>26张</span></div></div>';
				_html += '<h3>我老婆</h3><div class="water-img-des"><p>我要吃苹果苹果苹果苹果苹果苹果</p></div>';

				if (isshare == true) {
					_html += '<div class="water-img-bottom inapp">';
					_html += '<div class="share-box"><a href="javascript:void(0)" class="share-btn"><span class="iconfont icon-fenxiang"></span> 分享</a></div>';
					_html += '<div class="water-img-voting clearfix"><a href="javascript:void(0)" class="vote-btn">投票</a></div>';
				} else {
					_html += '<div class="water-img-bottom">';
					_html += '<div class="water-img-voting clearfix"><a href="javascript:void(0)" class="vote-btn">投票</a></div>';
				}
				_html += '</div></div>';
				var now_i = _this.getNowListMinTop();
				switch (now_i) {
					case 1:
						_this.list_1.append(_html)
						break;
					case 2:
						_this.list_2.append(_html)
						break;
				}
				start_i++;
				if (start_i < end_i) {
					_this.insertDome(start_i, end_i, isshare);
				}
			}
			_img.src = _this.arrimg[start_i];
		}
		var waterpull = new waterPull(listdata)
		waterpull.init();
	}
})(Zepto);

//球员内容页面列表
(function($) {
	$.fn.playerFallsFlow = function(apiurl) {
		function waterPull() {
			this.list_1 = $('#list1');
			this.list_2 = $('#list2');
			this.list_b_1 = $('#list-bottom1');
			this.list_b_2 = $('#list-bottom2');
			this.bottom_blank = $('#bottom-blank');
			this.win_h = $(window).height();
			this.first_img = $('#player-img-first');
			//			this.water_pull_loading=$('#water-pull-loading');
			this.isshare = getUrlParam('from_') == "share" ? true : false;
		};
		waterPull.prototype.init = function() {
			var _this = this;
			//当获得了 数据时删除
			//			_this.water_pull_loading.remove()

			_this.arrimg = ['http://7xl619.com1.z0.glb.clouddn.com/m1.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m2.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m3.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m4.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m5.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m6.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m7.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m8.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m9.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m10.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m11.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m12.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m13.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m14.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m15.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m16.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m17.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m18.jpg',
			];

			//插入第一张图片到指定的位置
			var _first_img = '<img src="' + _this.arrimg[0] + '" class="img-responsive">'
			_this.first_img.append(_first_img)

			_this.insertDome(1, 10, _this.isshare)
			var _arr_length = _this.arrimg.length;
			var start_i = 10;
			$(window).bind('scroll', function() {
				var _bottom_blank_top = _this.bottom_blank.offset().top - 100;
				if (_bottom_blank_top - $(window).scrollTop() < _this.win_h) {
					var _add_end_i = start_i + 10;
					if (_add_end_i > _arr_length) {
						_add_end_i = _arr_length;
					}
					_this.insertDome(start_i, _add_end_i, _this.isshare);
					start_i = _add_end_i;
					if (start_i >= _arr_length) {
						$(window).unbind('scroll')
						return;
					}
				}
			})
		};
		//获取list中 图片距离顶部最近的list
		waterPull.prototype.getNowListMinTop = function() {
			var _this = this;
			var _list_1_top = _this.list_b_1.offset().top,
				_list_2_top = _this.list_b_2.offset().top;
			var min_top = Math.min(_list_1_top, _list_2_top);
			if (_list_1_top == min_top) {
				return 1;
			} else if (_list_2_top == min_top) {
				return 2;
			}
		};
		waterPull.prototype.insertDome = function(start_i, end_i, isshare) {
			var _this = this;
			var _img = new Image();
			_img.onload = function() {
				var _html = '';
				_html += '<div class="waterone clearfix" data-img-index="' + start_i + '">';
				_html += '<img src="' + _this.arrimg[start_i] + '" class="img-responsive" />';
				_html += '</div>';
				var now_i = _this.getNowListMinTop();
				switch (now_i) {
					case 1:
						_this.list_1.append(_html)
						break;
					case 2:
						_this.list_2.append(_html)
						break;
				}
				start_i++;
				if (start_i < end_i) {
					_this.insertDome(start_i, end_i, isshare);
				}
			}
			_img.src = _this.arrimg[start_i];
		}
		var waterpull = new waterPull()
		waterpull.init();
	}
})(Zepto);

//点击放大图片
(function($) {
	$.fn.showPlayerBigImg = function(arrimg) {
		function showBig(arrimg) {
			this.arrimg = ['http://7xl619.com1.z0.glb.clouddn.com/m1.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m2.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m3.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m4.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m5.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m6.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m7.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m8.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m9.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m10.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m11.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m12.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m13.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m14.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m15.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m16.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m17.jpg',
				'http://7xl619.com1.z0.glb.clouddn.com/m18.jpg',
			];
			this.win_w = $('body').width();
			this.win_h = $(window).height();
			this.index = 0
		};
		showBig.prototype.insertDome = function(index) {
			var _this = this
			var _ul_width = _this.win_w * _this.arrimg.length;
			var　 _html = '';
			//设置平移位置
			_this.defalueOffx = -_this.win_w * index
			_html += '<div class="big-img-box pf" id="big-img-box"><table class="big-img-table"  id="big-img-table" border="0" cellspacing="0" cellpadding="0"  width="' + _ul_width + 'px" style="-webkit-transition: 0s  linear; -webkit-transform:translate3d(' + _this.defalueOffx + 'px,0,0) "><tr>';
			for (var i = 0; i < _this.arrimg.length; i++) {
				if (i == index) {
					_html += '<td  style="width:' + _this.win_w + 'px;height:' + _this.win_h + 'px;overflow:hidden"><img src=' + _this.arrimg[i] + '  data-src=' + _this.arrimg[i] + '  class="show_img img-responsive"></td>';
				} else {
					_html += '<td  style="width:' + _this.win_w + 'px;height:' + _this.win_h + 'px;overflow:hidden"><img  data-src=' + _this.arrimg[i] + ' class="show_img img-responsive"></td>';
				}
			}
			_html += '</tr></table></div>';
			$('body').append(_html)
			_this.bigimgtable = $(document).find('#big-img-table');
			_this.dragTab(index)
//			_this.scaleBigImg(index) 
		};
		showBig.prototype.dragTab = function(index) {
			var _this = this;
			_this.index = index;
			touch.on('.show_img', 'drag', function(ev) {
				var dx = _this.defalueOffx;
				var _offx = dx + ev.x
				_this.bigimgtable.css({
					'-webkit-transition': '0s  linear',
					'-webkit-transform': 'translate3d(' + _offx + 'px,0,0)'
				})
			})
			touch.on('.show_img', 'dragend', function(ev) {
				if (Math.abs(ev.x) < 80) {
					_this.bigimgtable.css({
						'-webkit-transition': '0.5s  linear',
						'-webkit-transform': 'translate3d(' + _this.defalueOffx  + 'px,0,0)'
					})
					return
				}

				if (ev.x < 0) {
					_this.index++;
					_this.index = getIndex(_this.index)
				} else {
					_this.index--;
					_this.index = getIndex(_this.index)

				}
				var _end_offx = -_this.win_w * _this.index;
				_this.defalueOffx = _end_offx;
				var _nextshowimg = _this.bigimgtable.find('td').eq(_this.index).children('img')
				_nextshowimg.attr('src', _nextshowimg.attr('data-src'))
				_this.bigimgtable.css({
					'-webkit-transition': '0.5s  linear',
					'-webkit-transform': 'translate3d(' + _end_offx + 'px,0,0)'
				})
			})

			function getIndex(index) {
				if (index < 0) {
					index = 0
				} else if (index > _this.arrimg.length - 1) {
					index = _this.arrimg.length - 1;
				}
				return index
			}
		};

		showBig.prototype.scaleBigImg = function() {
			var _this = this;
			touch.on('.show_img', 'doubletap', function(ev) {
				var _x = -(ev.position.x - _this.win_w / 2),
					_y = -((ev.position.y - $(window).scrollTop()) - _this.win_h / 2);
				$(this).css({
					'-webkit-transition': '0.5s  linear',
					'-webkit-transform': 'scale(2,2) translate3d(' + _x + 'px,' + _y + 'px,0)'
				})
			})
		};

		var showbig = new showBig(arrimg);
		//点击显示点击的图片
		$(document).bind('tap', '.waterone', function() {
			var _index = $(this).attr('data-img-index')
			showbig.insertDome(_index)

		});
		//阻止默认行为
		$(document).bind('touchstart', '#big-img-box', function(e) {
			e.preventDefault()
		});
		//点击删除图片浏览
		$(document).bind('tap', '#big-img-box', function() {
			$(this).css({
				'-webkit-transition': '0.5s  linear',
				'transition': '0.5s  linear',
				'-webkit-opacity': '0',
				'opacity': '0'
			})
			$(this).on('webkitTransitionEnd', function() {
				$(this).remove()
			})
		});

	}
})(Zepto);

//tab 选项卡
(function($) {
	$.fn.tabFn = function(cfg) {
		var config = {
			tab_header: $('#tab-header'),
			tab_content: $('#tab-content')
		};
		config.tab_header.children('li').on('tap', function() {
			var _index = $(this).index()
			$(this).addClass('current').siblings().removeClass('current')
			config.tab_content.children('ul').eq(_index).show().siblings('ul').hide()
		});

	}
})(Zepto);

//提示操作
function promptMes(cfg) {
	var config = {
		show_time: 1500, //定义显示的时间
		transition_time: 0.2  
	};
	var _this = this;
	$.extend(true, config, cfg);
	//显示提示后自动删除
	promptMes.prototype.removePrompt = function() {
		var _prompt_box = $(document).find("#prompt-box");
		setTimeout(function() {
			_prompt_box.css({
				'-webkit-transition': '' + config.transition_time + 's  linear',
				'transition': '' + config.transition_time + 's  linear',
				'-webkit-transform': 'scale(0,0)',
				'transform': 'scale(0,0)'
			})
			_prompt_box.on('webkitTransitionEnd', function() {
				this.remove()
			})

		}, config.show_time);
	};
	//投票成功提示
	promptMes.prototype.vote = {
		success: function(num) {
			var _html = '';
			_html += '<div class="prompt-box pf" id="prompt-box">';
			_html += '<p class="back-prompt-p">投票成功，您还可以投<span>' + num + '</span>票！</p>';
			_html += '<p class="prompt-p">每天都可以投10票哦~</p>';
			_html += '</div>';
			$('body').append(_html)
			_this.removePrompt()
		},
		error: function() {
			var _html = '';
			_html += '<div class="prompt-box pf" id="prompt-box">';
			_html += '<p class="back-prompt-p">投票失败，请检查网路！</p>';
			_html += '</div>';
			$('body').append(_html)
			_this.removePrompt()
		},
		over: function() {
			var _html = '';
			_html += '<div class="prompt-box pf" id="prompt-box">';
			_html += '<p class="back-prompt-p">您当日投票次数已经用完了哦~</p>';
			_html += '<p class="prompt-p">每天都可以投10票哦~</p>';
			_html += '</div>';
			$('body').append(_html)
			_this.removePrompt()
		},
		end: function() {
			var _html = '';
			_html += '<div class="prompt-box pf" id="prompt-box">';
			_html += '<p class="back-prompt-p">本活动已经结束了哦~</p>';
			_html += '</div>';
			$('body').append(_html)
			_this.removePrompt()
		}
	};

}