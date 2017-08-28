/*
 +----------------------------------------------------------------------------------------------------------------------------------------------
 * jQuery gcxRegslideForm Plugin v1.1.0
 * update：2017.2
 * Plugin Introduce ：This plugin is based on jQuery development, using the plugin page form, according to user needs, custom plug-in content,
 * 					  with the help of validate, can be dynamically to verify the form and submit verification.
 * Copyright (c) 2017.2  高仓雄（gcx / Spring of broccoli）   In Hangzhou, China
 * Contact ：Wechat（lensgcx）
 +----------------------------------------------------------------------------------------------------------------------------------------------
 */
;(function( factory )
{
	if( typeof define === "function" && define.amd )
	{
		define( [ "jquery" ], factory );
	}
	else
	{
		factory( jQuery );
	}
}( function( $ )
	{
		var defaults = {
			skin: '',
			//language judgment
			language: 'zh_ch',                   //Simplified Chinese
			transNum:'200'
		};
		//structure Parameters ( can be modified )

		//colors = {
		//	default:{
		//		//默认字体颜色1
		//		colfont_def1: 'rgba(255, 255, 255, .8)',
		//		//默认字体颜色2
		//		colfont_def2: 'rgba(255, 255, 255, .7)',
		//		//默认  鼠标移入 字体颜色
		//		colfont_defIn: 'rgba(255, 255, 255, .98)',     //纯白
		//		//分割线1
		//		line1 :  'rgba(44, 44, 51, .98)',      //灰色
		//		//整体   底色
		//		colbck_entire: ' rgba(0, 0, 0, .98)',         //黑色
		//		//List 模块 底色
		//		colbck_tabList: ' rgba(0, 0, 0, .84)',           //偏黑色
		//		//Action 模块 底色
		//		colbck_tabAction: ' rgba(0,94,184,.98)',    //蓝色
		//		//菜单默认 鼠标移入底色
		//		colbck_menuIn: 'rgba(44, 44, 51, .98)',      //灰色
		//		//下拉按钮 底色
		//		colbck_dropOpen: 'rgba(44, 44, 51, .5)',       //淡灰色
		//		//关闭按钮字体颜色
		//		colfont_close: 'rgba(216, 216, 216, .98)',      //偏白色
		//		//关闭按钮  鼠标移入 字体颜色
		//		colfont_closeIn: 'rgba(255, 255, 255, .98)' ,   //纯白
		//		//简化侧边栏 底色
		//		colbck_tabSimple:'rgba(221, 221, 221, 0.2)'
		//}
		//};
		//Speed or time Parameters ( can be modified )
		var speedOrtime = {
			slideSpeedL_s: 500, 				//Left(next) slip speed
			slideSpeedR_s: 300, 				//Right(back) slip speed
			slide_speed: 300, 					//Click the step button, the page sliding speed
			jump_click_s: 0.92, 				//Step button jump click speed change parameters
			jump_clickCue_t: 2000, 				//Prompt POP display time
			submit_fade_s: 300, 				//Submit button appear / disappear time，please set between 100~1000, or use the default value 300
			backModule_fadeIn_s: 1000, 			//Back button showing speed, please set between 100~1600, or use the default value 1000
			backModule_fadeOut_s: 300           //Back button hiding speed，please set between 100~1000, or use the default value 300
		};

		//Parameters ( cannot be modified )
		var tagName = {
			content: '#bg', 				//内容区域父级
			tabPanel: '#tabpanel',		//侧边栏整体模块
			tabMask: '#tabmask',		//侧边栏遮罩层
			tabClose: '.tabclose',		//侧边栏菜单关闭按钮
			tabList: '.tablist',
			tabActions: '.tabactions',
			tabMenu: '.tabmenu', 		//右侧内容菜单整体
			siteTree: '.site_tree',	//右侧内容菜单  分内容
			siteLevel:'.sitelevel',
			dropTit: '.droptit',       //右侧内容菜单  分内容 标题
			dropOpen: '.dropopen',	//下拉菜单开关
			dropMenu: '.dropmenu',    //下拉菜单显示部分
			tabLinks: '.tab_links',
			tabIpt: '.tabipt',				//侧边栏菜单 搜索框
			searChempty: '.searchempty',  //侧边栏菜单 搜索清空按钮
			tabSub: '.tabsub',
			tabPanelSimple: 'tabpanel-simple',  	//简化侧边栏
			openTabPanel: 'open-tabpanel', 			//简化侧边栏（打开侧边栏菜单按钮模块）
			goWinTop: 'go-wintop',   				//简化侧边栏（回到顶部按钮模块）
			goWintopMask: 'go-wintop-mask',    		//简化侧边栏（回到顶部按钮模块遮罩层）
			icon_openTab: 'icon-all1',				//打开栏菜单按钮  字体图标
			icon_goWinTop: 'icon-up',			//回到顶部按钮 字体图标
			icon_huoJian: 'icon-huojian1',			//火箭  字体图标
			animate250: 'animate250'

		};

		$.fn.gcxSpringsideBar = function(options){
				var t = this;
				// Extend with options
				opts = $.extend( true, {},defaults, speedOrtime, tagName, $.fn.gcxSpringsideBar.colors.defalut, options );
				//opts = $.extend(true, {}, opts, $.trumbowyg.opts);
				// Localization management
				//if(typeof options.colors === 'undefined' || typeof $.gcxSpringsideBar.colors[options.colors] === 'undefined')
				//	t.skin = $.gcxSpringsideBar.colors.default;
				//else
				//	t.skin = $.extend(true, {}, $.gcxSpringsideBar.colors.default, $.gcxSpringsideBar.colors[options.skin]);
				//
				//t.options= $.extend(true, {}, {
				//	colors: 'default'
				//
				//});


				//language judgment
				//_lanJudge( opts );

				//Check whether the user enters the parameters are legitimate
				if( !isValid( options ) )
				{
					return this;
				}
				return this.each( function()
				{
					//'return' is JQuery object ,this in order to support chain calls
					//each all the DOM to execute
					//plug-in initialization
					_init( opts );
				} );
			};

		//language judgment
		//function _lanJudge( opts )
		//{
		//	if( opts.language == 'en' )
		//		lan = jQuery.gcxRegslideForm.langs.en;
		//	if( opts.language == 'zh_ch' )
		//		lan = jQuery.gcxRegslideForm.langs.zh_ch;
		//}

		//Check whether the user enters the parameters are legitimate
		function isValid( options )
		{
			return !options || (options && typeof options === "object") ? true : false;
		}

		//插件准备
		function _init( opts )
		{
			//为body增加属性
			$( document.body ).addClass( 'wintile' );
			//定义的全局参数
			parameter( opts );

			selectSkin( opts )

			setskin( opts );

			//创建遮罩层
			_buildMask( opts );
			//每个标签列表按钮点击，切换导航菜单内容，启动侧边栏显示动画
			_tabListswitch( opts );
			//点击关闭按钮关闭侧边菜单
			_tabBtnClose( opts );
			//点击空白区域（遮罩层区域），关闭侧边菜单
			_tabBlankClose( opts );
			//打开下拉菜单，关闭下拉菜单
			_dropSwitch( opts );
			//创建简化侧边栏
			_buildSimpleBar( opts );
			//滚轮移动事件
			_scrollEvent( opts );
			//点击清空搜索框
			_searchempty( opts );
			//监听窗口大小事件
			_winResize( opts );
		}

		function selectSkin( opts )
		{
			if( opts.skin == 'default' || opts.skin == '' )
			{
				return jQuery.gcxSpringsideBar.color.default;
				////默认字体颜色1
				//opts.colfont_def1 = 'rgba(255, 255, 255, .8)';
				////默认字体颜色2
				//opts.colfont_def2 = 'rgba(255, 255, 255, .7)';
				////默认  鼠标移入 字体颜色
				//opts.colfont_defIn = 'rgba(255, 255, 255, .98)';     //纯白
				////分割线1
				//opts.line1 =  'rgba(44, 44, 51, .98)';      //灰色
				////分割线2
				//opts.line2 =  'rgba(44, 44, 51, .98)';      //灰色
				////整体   底色
				//opts.colbck_entire = ' rgba(0, 0, 0, .98)';         //黑色
				////List 模块 底色
				//opts.colbck_tabList = ' rgba(0, 0, 0, .84)';           //偏黑色
				////Action 模块 底色
				//opts.colbck_tabAction = ' rgba(0,94,184,.98)';    //蓝色
				////菜单默认 鼠标移入底色
				//opts.colbck_menuIn = 'rgba(44, 44, 51, .98)';      //灰色
				////下拉按钮 底色
				//opts.colbck_dropOpen = 'rgba(44, 44, 51, .5)';       //淡灰色
				////关闭按钮字体颜色
				//opts.colfont_close = 'rgba(216, 216, 216, .98)';      //偏白色
				////关闭按钮  鼠标移入 字体颜色
				//opts.colfont_closeIn = 'rgba(255, 255, 255, .98)';   //纯白
				////简化侧边栏 底色
				//opts.colbck_tabSimple = 'rgba(221, 221, 221, 0.2)';
			}
			else if( opts.skin == 'greenleaf' )
			{
				//默认字体颜色1
				opts.colfont_def1 = 'rgba(255, 255, 255, .8)';
				//默认字体颜色2
				opts.colfont_def2 = 'rgba(255, 255, 255, .7)';
				//默认  鼠标移入 字体颜色
				opts.colfont_defIn = 'rgba(255, 255, 255, .98)';     //纯白
				//分割线1
				opts.line1 = 'rgba(20, 40, 20, 0.98)';
				//分割线2
				opts.line2 =  'rgba(20, 40, 20, 0.98)';
				//整体   底色
				opts.colbck_entire = 'rgba(10, 68, 54, 0.98)';         //中绿色
				//List 模块 底色
				opts.colbck_tabList = ' rgba(10, 20, 10,.84)';           //深绿色
				//Action 模块 底色
				opts.colbck_tabAction = 'rgba(20, 40, 20, 0.98)';    //深绿色
				//菜单默认 鼠标移入底色
				opts.colbck_menuIn = 'rgba(20, 40, 20, 0.98)';      //深绿色
				//下拉按钮 底色
				opts.colbck_dropOpen = 'rgba(20, 40, 20, .4)';       //深绿色  透明
				//关闭按钮字体颜色
				opts.colfont_close = 'rgba(216, 216, 216, .98)';      //偏白色
				//关闭按钮  鼠标移入 字体颜色
				opts.colfont_closeIn = 'rgba(255, 255, 255, .98)';   //纯白
				//简化侧边栏 底色
				opts.colbck_tabSimple = 'rgba(221, 221, 221, 0.4)';   //浅灰色
			}
			else if( opts.skin == 'pangold' )
			{
				//默认字体颜色1
				opts.colfont_def1 = 'rgba(255, 255, 255, .8)';
				//默认字体颜色2
				opts.colfont_def2 = 'rgba(255, 255, 255, .7)';
				//默认  鼠标移入 字体颜色
				opts.colfont_defIn = 'rgba(255, 255, 255, .98)';     //纯白
				//分割线1
				opts.line1 =  'rgba(190, 120, 10, 0.98)';      //灰色
				//分割线2
				opts.line2 =  'rgba(44, 44, 51, .7)';      //灰色
				//整体   底色
				opts.colbck_entire = ' rgba(0, 0, 0, .98)';         //黑色
				//List 模块 底色
				opts.colbck_tabList = ' rgba(0, 0, 0, .84)';           //偏黑色
				//Action 模块 底色
				opts.colbck_tabAction = ' rgba(190, 120, 10, 0.98)';    //蓝色
				//菜单默认 鼠标移入底色
				opts.colbck_menuIn = 'rgba(190, 120, 10, 0.98)';      //灰色
				//下拉按钮 底色
				opts.colbck_dropOpen = 'rgba(190, 120, 10, 0.7)';       //淡灰色
				//关闭按钮字体颜色
				opts.colfont_close = 'rgba(216, 216, 216, .98)';      //偏白色
				//关闭按钮  鼠标移入 字体颜色
				opts.colfont_closeIn = 'rgba(255, 255, 255, .98)';   //纯白
				//简化侧边栏 底色
				opts.colbck_tabSimple = 'rgba(221, 221, 221, 0.2)';
			}
			else
			{

			}
		}

		function setskin( opts )
		{
			$( '' + opts.tabPanel + '' ).css( { 'background-color': opts.colbck_entire } );
			/*菜单整体*/
			$( '' + opts.tabPanel + ' ' + opts.tabMenu + '' ).css( { 'background-color': opts.colbck_entire } );
			//关闭按钮
			var iClose = $( '' + opts.tabPanel + ' ' + opts.tabClose + ' i' );
			iClose.css( { 'color': opts.colfont_close } );
			mousecol( iClose, opts.colfont_closeIn, opts.colfont_close );
			//List 模块 颜色
			var tabList = $( '' + opts.tabPanel + ' ' + opts.tabList + ' ul li' );
			var tabLista = $( '' + opts.tabPanel + ' ' + opts.tabList + ' ul li a' );
			tabList.css( { 'background-color': opts.colbck_tabList } );
			tabLista.css( { 'color': opts.colfont_def1 } );
			mousebackc( tabList, opts.colbck_entire, opts.colbck_tabList );
			mousecol( tabLista, opts.colfont_defIn, opts.colfont_def1 );
			//actions 模块 颜色
			var tabactions = $( '' + opts.tabPanel + ' ' + opts.tabActions + ' ul li' );
			tabactions.css( { 'background-color': opts.colbck_tabAction, 'color': opts.colfont_def1 } );
			mousecol( tabLista, opts.colfont_defIn, opts.colfont_def1 );


			//右侧菜单栏目 border
			var siteLevel = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' li' + opts.siteLevel+ '' );
			siteLevel.css( { 'border-color': opts.line1 } );

			//右侧菜单栏目
			var dropTit = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' ' + opts.dropTit + '' );
			dropTit.css( { 'color': opts.colfont_defIn } );
			mousebackc( dropTit, opts.colbck_menuIn, '' );
			//菜单下拉按钮
			var dropOpen = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' ' + opts.dropOpen + '' );
			dropOpen.css( { 'background-color': opts.colbck_dropOpen } );
			mousebackc( dropOpen, opts.colbck_menuIn, opts.colbck_dropOpen );
			dropOpen.find( 'i' ).css( { 'color': opts.colfont_def1 } );
			mousecol( dropOpen.find( 'i' ), opts.colfont_defIn, opts.colfont_def1 );
			//菜单下拉按钮
			var dropMenu = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' ' + opts.dropMenu + ' li a' );
			dropMenu.css( { 'color': opts.colfont_def2, 'border-color': opts.line2 } );
			mousebackc( dropMenu, opts.colbck_menuIn, '' );
			//菜单下方链接 颜色
			var tabLinks = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' ' + opts.tabLinks + ' li a' );
			tabLinks.css( { 'color': opts.colfont_def2 } );
			mousecol( tabLinks, opts.colfont_defIn, opts.colfont_def2 );
			//清空按钮 颜色
			var searChempty = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' ' + opts.searChempty + '' );
			searChempty.css( { 'color': opts.colbck_entire } );
			//提交按钮颜色
			var tabSub = $( '' + opts.tabPanel + ' ' + opts.tabMenu + ' ' + opts.siteTree + ' ' + opts.tabSub + '' );
			tabSub.css( { 'color': opts.colfont_def1, 'background-color': opts.colbck_menuIn } );
			mousecol( tabSub, opts.colfont_defIn, opts.colfont_def1 );
			mousebackc( tabSub, opts.colbck_tabAction, opts.colbck_menuIn );

		}

		//鼠标移入对象，字体颜色变化
		function mousecol( obj, valIn, valOut )
		{
			obj.mouseover( function()
			{
				$( this ).css( { color: valIn } );
			} );
			obj.mouseout( function()
			{
				$( this ).css( { color: valOut } );
			} );
		}

		//鼠标移入对象，背景颜色变化
		function mousebackc( obj, valIn, valOut )
		{
			obj.mouseover( function()
			{
				$( this ).css( { 'background-color': valIn } );
			} );
			obj.mouseout( function()
			{
				$( this ).css( { 'background-color': valOut } );
			} );
		}

		//定义的全局参数
		function parameter( opts )
		{
			tabPanelW = $( '' + opts.tabPanel + '' ).width();    	 	//整体宽度
			tabListW = $( '' + opts.tabList + '' ).width();				//菜单列表点击模块宽度
			ovs = true; 	 //简化侧边栏模块，鼠标移入开关
			ots = true;		//简化侧边栏模块，鼠标移出开关
			//获取到当前的滚动条所在位置
			winCurT = parseInt( $( window ).scrollTop() );
			dms = true;   // 侧边栏模块操作开关
			scs = true;		//屏幕尺寸变化监听开关
			mks = true;    //遮罩层显示开关
		}

		//创建遮罩层
		function _buildMask( opts )
		{
			var tabPanel = $( '' + opts.tabPanel + '' );
			tabPanel.after( $( "<div id='tabmask'>" + "</div>" ) );
			$( '' + opts.tabMask + '' ).css( {
				'position': 'fixed',
				'display': 'none',
				'width': winSize().width,
				'height': '100%',
				'top': 0,
				'right': '0',
				'background-color': 'rgba(44, 44, 51, .7)',
				'z-index': tabPanel.css( 'z-index' ) - 1
			} );
		}

		//每个标签列表按钮点击，切换导航菜单内容，启动侧边栏显示动画
		function _tabListswitch( opts )
		{
			$( '' + opts.tabPanel + ' ' + opts.tabList + ' ul li' ).each( function( i )
			{
				$( this ).on( 'click', function()
				{
					console.log( "winCurT::", winCurT );
					console.log( "监听开关：", scs );
					//设置 内容部分的 top高度
					_setconTop( opts );

					console.log( '判断加载开关：', dms );
					//判断加载开关
					if( dms )
					{
						// 打开侧边栏模块操作，默认模块行为
						_defModShow( opts );
						_tabmaskShow( opts );   //遮罩层出现
					}
					//判断当前点击的按钮所对应的菜单模块是否已经存在，如果存在加载不同的动画
					if( $( '' + opts.tabMenu + ' ' + opts.siteTree + '' ).eq( i ).is( ":hidden" ) )
					{
						//清空内容部分
						_eachHide( opts, opts.siteTree );
						$( '' + opts.tabPanel + ' ' + opts.siteTree + '' ).eq( i ).show();    //显示当前内容
						//里面内容 动画
						_tabMenuMove( opts );
					}
					else
					{
						$( '' + opts.tabPanel + ' ' + opts.tabMenu + '' ).css( 'right', '1rem' ).animate( { 'right': 0 }, 1600, 'easeOutBounce' );
					}
				} )
			} );
		}

		//点击关闭按钮关闭侧边菜单
		function _tabBtnClose( opts )
		{
			$( '' + opts.tabClose + '' ).on( 'click', function()
			{
				scs = true;
				if( winCurT < opts.transNum )
				{
					_defModHide( opts );
				}
				else
				{
					_defModHide( opts );
					// tabSimple 模块出现
					_simplePshow( opts );
				}
			} );
		}

		//点击空白区域（遮罩层区域），关闭侧边菜单
		function _tabBlankClose( opts )
		{
			$( '' + opts.tabMask + '' ).on( 'click', function()
			{
				scs = true;
				console.log( "winCurT::", winCurT );
				console.log( "监听开关：", scs );
				console.log( $( document ).scrollTop() );
				if( winCurT < opts.transNum )
				{
					_defModHide( opts );
				}
				else
				{
					_defModHide( opts );
					// tabSimple 模块出现
					_simplePshow( opts );
				}
			} );
		}

		//监听窗口大小事件
		function _winResize( opts )
		{
			var ws = true;
			$( window ).resize( function()
			{
				console.log( '窗口高度：', $( window ).height() );
				if( $( window ).height() <= 400 )
				{
					if( ws )
					{
						// tabSimple 模块出现
						_simplePshow( opts );
						//简化 侧边栏模块 点击事件
						_simpleBarEvt( opts );
						ws = false;
					}
				}
				else
				{
					if( !ws )
					{
						// tabSimple 模块消失
						_simplePHide( opts );
						ws = true;
					}
				}
			} );
		}

		//监听滚轮移动事件
		function _scrollEvent( opts )
		{
			var fs = true;

			//监听开关，条件if，来控制，遮罩层不坚挺
			$( window ).scroll( function()
			{
				console.log( "winCurT::", winCurT );
				console.log( "监听开关：", scs );
				if( scs )
				{
					//获取到当前的滚动条所在位置
					winCurT = $( document ).scrollTop();
					console.log( '滚轮高度:', $( document ).scrollTop() );
					if( $( document ).scrollTop() > 600 )
					{
						if( fs )
						{
							// tabSimple 模块出现
							_simplePshow( opts );
							//简化 侧边栏模块 点击事件
							_simpleBarEvt( opts );
							fs = false;
						}
					}
					else
					{
						if( !fs )
						{
							// tabSimple 模块消失
							_simplePHide( opts );
							fs = true;
						}
					}
				}
				else
				{
					return false;
				}
			} );
		}

		//打开下拉菜单，关闭下拉菜单
		function _dropSwitch( opts )
		{
			$( '' + opts.tabPanel + ' ' + opts.dropOpen + '' ).each( function( i )
			{
				var dropMenu = $( '' + opts.tabPanel + ' ' + opts.dropMenu + '' );
				$( this ).on( 'click', function()
				{
					scs = false;
					//$( '' + opts.content + '' ).css( "top", q );
					console.log( "winCurT::", winCurT );
					console.log( "监听开关：", scs );
					//设置一下 内容部分的 top高度
					_setconTop( opts );
					//没有打开标识的情况，允许打开；有打开标识，则不能打开下拉菜单
					if( !$( this ).hasClass( 'opened' ) )
					{
						//改变开关图标
						$( this ).find( 'i' ).removeClass( 'icon-jia2' ).addClass( 'icon-jian' );
						//下拉菜单
						dropMenu.eq( i ).stop( true, true ).animate( {
							'max-height': _dropMenuH( opts, i )
						}, 1000, 'easeOutBounce', function()
						{
							$( '' + opts.tabPanel + ' ' + opts.dropOpen + '' ).eq( i ).addClass( 'opened' );
						} );
					}
					else
					{
						//改变开关图标
						$( this ).find( 'i' ).removeClass( 'icon-jian' ).addClass( 'icon-jia2' );
						//合上菜单
						dropMenu.eq( i ).stop( true, true ).animate( {
							'max-height': 0
						}, 600, 'easeOutExpo', function()
						{
							$( '' + opts.tabPanel + ' ' + opts.dropOpen + '' ).eq( i ).removeClass( 'opened' );
						} );
					}
				} )
			} );
		}

		//计算下拉菜单的高度
		function _dropMenuH( opts, i )
		{
			var menuH = 0;
			var eachP = $( '' + opts.tabPanel + ' ' + opts.dropMenu + '' ).eq( i ).find( 'li' );
			eachP.each( function()
			{
				var g = $( this );
				var gh = (g.height() + parseInt( g.css( 'margin-bottom' ) ) + parseInt( g.css( 'margin-top' ) ) + parseInt( g.css( 'padding-top' ) ) + parseInt( g.css( 'padding-bottom' ) ));
				menuH = menuH + gh;
			} );
			return menuH;
		}

		//创建 简化侧边栏模块
		function _buildSimpleBar( opts )
		{
			//创建简化侧边栏模块整体
			$( '' + opts.tabPanel + '' ).before(
				$( "<div id=" + opts.tabPanelSimple + " style='width: " + tabPanelW * 4 / 400 + "rem;height: " + tabPanelW * 6 / 400 + "rem;right: " + -tabPanelW * 4 / 400 + "rem'>" +
				   "<li class='" + opts.openTabPanel + " " + opts.animate250 + "'>" + "<i class='iconfont " + opts.icon_openTab + "'>" + "</i>" + "</li>" +
				   "<li class='" + opts.goWinTop + " " + opts.animate250 + "' style='top: " + tabPanelW * 3 / 400 + "rem'>" + "<div>" + "<i class='iconfont " + opts.icon_goWinTop + "'>" + "</i>" + "</div>" + "</li>" +
				   "</div>" ) );
			//简化侧边栏（回到顶部按钮模块遮罩层）
			$( '.' + opts.goWinTop + ' div i' ).before( $( "<p class=" + opts.goWintopMask + ">" + "</p>" ) );
			$( '#' + opts.tabPanelSimple + ' .' + opts.goWintopMask + '' ).css( {
				'position': 'absolute',
				'width': '100%',
				'height': '100%',
				'left': 0,
				'top': 0,
				'z-index': $( '#' + opts.tabPanelSimple + ' li i' ).css( 'z-index' ) - 1
			} );
			$( '#' + opts.tabPanelSimple + ' li' ).css( {
				'width': tabPanelW * 4 / 400 + 'rem',
				'height': tabPanelW * 3 / 400 + 'rem',
				'background-color': opts.colbck_tabSimple
			} );
			//简化侧边栏模块 鼠标事件
			_hoverSimplesbar( opts );

		}

		//简化侧边栏模块 鼠标事件
		function _hoverSimplesbar( opts )
		{
			var tabSimpleLi = $( '#' + opts.tabPanelSimple + ' li' );
			var tabSimpleLiW = tabSimpleLi.width();
			var tabSimpleLiH = tabSimpleLi.height();
			$( '#' + opts.tabPanelSimple + ' li i' ).each( function( i )
			{
				$( this ).mouseover( function()
				{
					if( ovs )
					{
						tabSimpleLi.eq( i ).animate( {
							'margin-left': -tabSimpleLiH / 2,
							'width': tabSimpleLiW + tabSimpleLiH / 2,
							'background-color': opts.colbck_tabAction
						}, 50, 'linear' );
						$( this ).animate( { 'color': 'rgba(255, 255, 255,0.98)' }, 1, 'linear' );
					}
				} );
				$( this ).mouseout( function()
				{
					if( ots )
					{
						tabSimpleLi.eq( i ).animate( {
							'margin-left': 0,
							'width': tabSimpleLiW,
							'background-color': opts.colbck_tabSimple
						}, 50, 'linear' );
						$( this ).animate( { 'color': 'rgba(0, 0, 0,0.98)' }, 1, 'linear' );
					}
				} );
			} );
		}

		//简化侧边栏模块 点击事件
		function _simpleBarEvt( opts )
		{
			var tabPanelSimple = $( '#' + opts.tabPanelSimple + '' );
			var mn = 0;
			var gt = 1;
			//菜单按钮点击
			tabPanelSimple.find( 'li' ).eq( mn ).on( 'click', function()
			{
				//简化侧边栏模块 点击加载内容菜单
				_simplemenuload( opts );
			} );
			//返回页面顶部模块点击
			tabPanelSimple.find( 'li' ).eq( gt ).on( 'click', function()
			{
				//加载回页面顶部事件
				_goWinTopload( opts )
			} )
		}

		//简化侧边栏模块 点击加载内容菜单
		function _simplemenuload( opts )
		{
			// 打开侧边栏模块操作，默认模块行为
			_defModShow( opts );
			// tabSimple 模块消失
			_simplePHide( opts );

			//遮罩层显示
			$( '' + opts.tabMask + '' ).css( { 'width': winSize().width } ).fadeIn( 1000 );
			//清除滚动条，界面停留在当前位置
			$( '' + opts.content + '' ).css( 'top', 0 );
			$( document.body ).css( 'overflow', 'hidden' );   //增加overfloat：hidden
			scs = false;
			mks = false;

			//清空内容部分
			_eachHide( opts, opts.siteTree );
			$( '' + opts.tabPanel + ' ' + opts.siteTree + '' ).eq( 0 ).show();    //显示当前内容
			//菜单 里面内容 动画
			_tabMenuMove( opts );
		}

		//加载回页面顶部事件
		function _goWinTopload( opts )
		{
			var tabPanelSimple = $( '#' + opts.tabPanelSimple + '' );
			var goWinTop = $( '#' + opts.tabPanelSimple + ' .' + opts.goWinTop + '' );
			var tabSimpleLi = $( '#' + opts.tabPanelSimple + ' li' );
			var tabSimpleLiW = tabSimpleLi.width();
			var tabSimpleLiH = tabSimpleLi.height();
			//点击事件开始后，鼠标移入移出事件开关关闭
			ovs = false;
			ots = false;
			var mh = $( window ).height() / 2 - parseInt( tabPanelSimple.css( 'top' ) );
			//简化侧边栏整体移出屏幕
			tabPanelSimple.stop().animate( {
				'right': -(tabSimpleLiW + tabSimpleLiH / 2)
			}, 600, 'easeOutQuint', function()
			{
				//回到顶部模块改变宽高颜色
				goWinTop.css( {
					'height': tabSimpleLiH * 1.3,
					'background-color': 'rgba(221, 221, 221, 0.2)'
				} );
				//回到顶部模块字体图标改变
				goWinTop.find( 'i' ).removeClass( opts.icon_goWinTop ).addClass( opts.icon_huoJian ).css( 'color', 'rgba(255, 255, 255,0.98)' );
				//回到顶部模块内容往下平移
				goWinTop.find( 'div' ).animate( {
					'top': mh
				}, 1, 'easeOutQuint', function()
				{
					//回到顶部模块字体图标 移进屏幕
					goWinTop.find( 'i' ).stop( true, false ).animate( {
						'left': -(tabSimpleLiW + tabSimpleLiH / 2),
						'font-size': '3em'
					}, 600, 'easeOutBounce' );
					//回到顶部模块遮罩层迅速 移进屏幕，同时，完成后出发屏幕滚动条往上移动，页面回到顶部
					$( '.' + opts.goWintopMask + '' ).animate( {
						'left': -(tabSimpleLiW + tabSimpleLiH / 2),
						'z-index': goWinTop.find( 'i' ).css( 'z-index' ) + 1
					}, 1, 'easeOutBounce', function()
					{
						goWinTop.find( 'i' ).animate( {
							'color': 'rgba(0, 94, 184, 0.98)'
						}, 600, 'linear' );
						$( 'html, body' ).animate( { scrollTop: 0 }, 2000, 'easeInOutQuint', function()
						{
							//点击事件开始后，鼠标移入移出事件开关打开
							ovs = true;
							ots = true;
							//回到顶部模块回归初始值
							goWinTop.css( {
								'width': tabSimpleLiW,
								'height': tabSimpleLiH,
								'margin-left': tabSimpleLiH / 2
							} );
							//回到顶部模块内容整体回归初始值
							goWinTop.find( 'div' ).css( { 'top': 0 } );
							$( '.' + opts.goWintopMask + '' ).css( {
								'left': 0,
								'z-index': goWinTop.find( 'i' ).css( 'z-index' ) - 1
							} );
							//回到顶部模块字体图标回归初始值
							goWinTop.find( 'i' ).removeClass( opts.icon_huoJian ).addClass( opts.icon_goWinTop ).css( 'color', 'rgba(0, 0, 0,0.98)' ).animate( {
								'left': 0, 'font-size': '1.5em'
							}, 1, 'easeOutQuint' );
						} );
					} );
				} );
			} );

		}

		// tabSimple 模块出现
		function _simplePshow( opts )
		{
			_tabActionsMove( opts );  //action 模块移开
			//List 模块移开，tabSimple 模块出现
			$( '' + opts.tabList + '' ).stop( true, false ).animate( {
				'right': tabPanelW - tabListW
			}, 400, 'easeInQuart', function()
			{
				$( '#' + opts.tabPanelSimple + '' ).stop( true, false ).animate( {
					'right': '0'
				}, 300, 'easeOutQuart' );
			} );
			$( '#' + opts.tabPanelSimple + '' ).fadeIn( 300 );
		}

		// tabSimple 模块消失
		function _simplePHide( opts )
		{
			var tabPanelSimple = $( '#' + opts.tabPanelSimple + '' );
			var tabSimpleLi = $( '#' + opts.tabPanelSimple + ' li' );
			var tabSimpleLiW = tabSimpleLi.width();
			var tabSimpleLiH = tabSimpleLi.height();
			// tabSimple 模块消失，List 模块出现，Action 模块出现
			tabPanelSimple.stop( true, false ).animate( {
				'right': -(tabSimpleLiW + tabSimpleLiH / 2)
			}, 300, 'easeInQuart', function()
			{
				$( '' + opts.tabList + '' ).stop( true, false ).animate( {
					'right': tabPanelW
				}, 600, 'easeOutBounce' );
				_tabActionsBack( opts );
			} );
			tabPanelSimple.fadeOut( 300 );
		}

		// 关闭侧边栏模块操作，默认模块行为
		function _defModHide( opts )
		{
			//鼠标手型删除
			_hoverDel( opts );
			//遮罩层消失
			_tabmaskHide( opts );
			//body 返回
			_bodyBack( opts );
			//侧边栏模块整体  返回
			_tabPanelBack( opts );
			//内容 返回
			_tabMenuBack( opts );
			dms = true;
		}

		// 打开侧边栏模块操作，默认模块行为
		function _defModShow( opts )
		{
			//鼠标手型变化
			_hoverChange( opts );
			//body 左移
			_bodyMove( opts );
			//侧边栏模块整体  出现
			_tabPanelMove( opts );
			//让当前动画直接到达末状态,并且回归right 初始值
			$( '' + opts.tabPanel + '' ).find( opts.tabMenu ).stop( false, true ).css( 'right', '-12.5em' );
			dms = false;
		}

		//body 左移
		function _bodyMove( opts )
		{
			$( document.body ).animate( { 'margin-left': -tabPanelW }, 1200, 'easeOutQuart' );
		}

		//body 返回
		function _bodyBack( opts )
		{
			$( document.body ).stop( true, true ).animate( { 'margin-left': 0 }, 800, 'easeOutQuart' );
		}

		//侧边栏模块整体  出现
		function _tabPanelMove( opts )
		{
			$( '' + opts.tabPanel + '' ).animate( {
				'right': 0
			}, 800, 'easeOutQuart' );
		}

		//侧边栏模块整体  返回
		function _tabPanelBack( opts )
		{
			var tabPanel = $( '' + opts.tabPanel + '' );
			tabPanel.stop( true, true ).animate( {
				'right': -tabPanelW
			}, 800, 'easeOutQuart' );
		}

		//遮罩层出现
		function _tabmaskShow( opts )
		{
			if( mks )
			{
				console.log( "winCurT::", winCurT );
				scs = false;
				var $tabmask = $( '' + opts.tabMask + '' );
				//遮罩层显示
				$tabmask.stop( true, true ).fadeIn( 800 );
				//清除滚动条，界面停留在当前位置
				_setconTop( opts );
				$( document.body ).css( 'overflow', 'hidden' );   //增加overfloat：hidden
				$tabmask.show();
				mks = false;
			}
			else
			{
				return false
			}
		}

		//遮罩层消失
		function _tabmaskHide( opts )
		{
			if( !mks )
			{
				console.log( "winCurT::", winCurT );
				var $tabmask = $( '' + opts.tabMask + '' );
				//遮罩层隐藏，
				$tabmask.stop( true, true ).fadeOut( 2000 );
				//重新显示滚动条，界面停留在当前位置
				$( '' + opts.content + '' ).removeAttr( "style", "top" );
				$( window ).scrollTop( winCurT );
				$( document.body ).removeAttr( 'style', 'overflow', 'hidden' );  //去除overfloat：hidden
				mks = true;
			}
			else
			{
				return false
			}
		}

		//设置网页部分 的top值
		function _setconTop( opts )
		{
			$( '' + opts.content + '' ).attr( "style", "top:" + (-Math.abs( winCurT ) ) + "px" );
		}

		//内容 移动
		function _tabMenuMove( opts )
		{
			$( '' + opts.tabPanel + ' ' + opts.tabMenu + '' ).stop( true, false ).animate( { 'right': 0 }, 600, 'easeOutBounce' );
		}

		//内容 返回
		function _tabMenuBack( opts )
		{
			$( '' + opts.tabPanel + ' ' + opts.tabMenu + '' ).stop( true, false ).animate( { 'right': -tabPanelW / 2 }, 600, 'easeInOutExpo', function()
			{
				//清空内容部分
				_eachHide( opts, opts.siteTree );
			} );
		}

		//Action 栏目移动
		function _tabActionsMove( opts )
		{
			$( '' + opts.tabPanel + ' ' + opts.tabActions + '' ).stop().animate( {
				'right': tabPanelW - tabListW
			}, 600, 'easeInQuart' );
		}

		//Action 栏目返回
		function _tabActionsBack( opts )
		{
			$( '' + opts.tabActions + '' ).stop().animate( {
				'right': tabPanelW
			}, 800, 'easeOutBounce' );
		}

		//遍历所有，隐藏
		function _eachHide( opts, eve )
		{
			$( '' + opts.tabPanel + ' ' + eve + '' ).each( function()
			{
				$( this ).hide();
			} );
		}

		//鼠标手型变化
		function _hoverChange( opts )
		{
			$( '' + opts.tabMask + '' ).hover( function()
			{
				//	$( this ).css( { cursor: "url(3dgnwse.cur),auto" } )
				$( this ).css( { cursor: 'pointer' } )
			}, function()
			{
				$( this ).css( { cursor: "pointer" } )
			} );
		}

		//鼠标手型删除
		function _hoverDel( opts )
		{
			$( '' + opts.tabMask + '' ).hover( function()
			{
				$( this ).css( { cursor: '' } )
			}, function()
			{
				$( this ).css( { cursor: "" } )
			} );
		}

		//点击清空搜索框
		function _searchempty( opts )
		{
			$( '' + opts.tabPanel + ' ' + opts.searChempty + '' ).on( 'click', function()
			{
				$( '' + opts.tabPanel + ' ' + opts.tabIpt + '' ).val( "" ).focus();
			} );
		}

		//获取可视区域的宽高
		var winSize = function()
		{
			var e = window,
				a = 'inner';

			if( !('innerWidth' in window ) )
			{
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] };
		};

		//window.onload=window.onresize= function () {                        //640
		//	document.documentElement.style.fontSize=32/320*document.documentElement.clientWidth+'px';
		//	//1rem=document.documentElement.style.fontSize 100px
		//	//console.log(原来px/document.documentElement.clientWidth)
		//}

	}
) );

