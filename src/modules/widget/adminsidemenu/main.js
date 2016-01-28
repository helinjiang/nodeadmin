var Vue = require('lib/vue');

var App = require('common/app');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            treeData: {
                name: 'My Tree',
                children: [{
                    name: 'Dashboard',
                    url: 'index.html',
                    icon: 'home'
                }, {
                    name: 'Page Layouts',
                    icon: 'home',
                    children: [{
                        name: 'Sidebar Fixed Page',
                        url: 'layout_sidebar_fixed.html',
                        icon: 'anchor'
                    }, {
                        name: 'Sidebar Closed Page',
                        url: 'layout_sidebar_closed.html',
                        icon: 'anchor'
                    }, {
                        name: 'Boxed Page',
                        url: 'layout_sidebar_fixed.html',
                        icon: 'pin'
                    }, {
                        name: 'Session Timeout',
                        url: 'layout_sidebar_fixed.html',
                        icon: 'vector',
                        tagType: 'warning',
                        tagName: 'new'
                    }]
                }, {
                    name: '4 Level Menu',
                    icon: 'share',
                    children: [{
                        name: 'Item 1',
                        icon: 'anchor',
                        children: [{
                            name: ' Sample Link 1',
                            url: 'layout_sidebar_fixed.html',
                            icon: 'anchor',
                            children: [{
                                name: 'sub-4',
                                url: 'layout_sidebar_fixed.html',
                                icon: 'anchor'
                            }, {
                                name: 'sub-4',
                                url: 'layout_sidebar_closed.html',
                                icon: 'anchor'
                            }, {
                                name: 'sub-4',
                                url: 'layout_sidebar_closed.html',
                                icon: 'anchor'
                            }]
                        }, {
                            name: ' Sample Link 2',
                            url: 'layout_sidebar_closed.html',
                            icon: 'anchor'
                        }, {
                            name: ' Sample Link 2',
                            url: 'layout_sidebar_closed.html',
                            icon: 'anchor'
                        }]
                    }, {
                        name: 'Item 2',
                        icon: 'anchor'
                    }, {
                        name: 'Item 3',
                        url: 'layout_sidebar_fixed.html',
                        icon: 'pin'
                    }]
                }, {
                    name: 'Login',
                    url: 'login.html',
                    icon: 'user'
                }]
            }
        }
    },
    ready: function() {
        _init();
    }
});

Vue.component('admin-side-menu', MyComponent);

function _init() {
    $(function() {
        handleResponsiveOnResize(); // set and handle responsive    

        handleFixedSidebar(); // handles fixed sidebar menu
        handleFixedSidebarHoverable(); // handles fixed sidebar on hover effect 
        handleSidebarMenu(); // handles main menu
        handleQuickSearch(); // handles quick search
        handleSidebarToggler(); // handles sidebar hide/show     
    });
}

var sidebarWidth = 215;
var sidebarCollapsedWidth = 40;


// To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
var _getViewPort = function() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
}

// reinitialize the laypot on window resize
var handleResponsive = function() {
    handleFixedSidebar();
}

// handle the layout reinitialization on window resize
var handleResponsiveOnResize = function() {
    var resize;
    if (App.isIE8) {
        var currheight;
        $(window).resize(function() {
            if (currheight == document.documentElement.clientHeight) {
                return; //quite event since only body resized not window.
            }
            if (resize) {
                clearTimeout(resize);
            }
            resize = setTimeout(function() {
                handleResponsive();
            }, 50); // wait 50ms until window resize finishes.                
            currheight = document.documentElement.clientHeight; // store last body client height
        });
    } else {
        $(window).resize(function() {
            if (resize) {
                clearTimeout(resize);
            }
            resize = setTimeout(function() {
                handleResponsive();
            }, 50); // wait 50ms until window resize finishes.
        });
    }
}

// Handle sidebar menu
var handleSidebarMenu = function() {
    jQuery('.page-sidebar').on('click', 'li > a', function(e) {
        var menu = $('.page-sidebar-menu');

        // 如果没有子菜单
        if (!$(this).next().hasClass('sub-menu')) {
            // 如果当前不是收起来的，则跳转之，否则返回
            if (!$('.btn-navbar').hasClass('collapsed')) {
                $('.btn-navbar').click();
            }
            return;
        }

        // 如果有子菜单，而且是保持开启的，则返回
        if ($(this).next().hasClass('sub-menu.always-open')) {
            return;
        }

        var parent = $(this).parent().parent();
        var the = $(this);

        parent.children('li.open, li.active').children('a').children('.arrow').removeClass('open');
        parent.children('li.open, li.active').children('.sub-menu').slideUp(200);
        parent.children('li.open').removeClass('open');

        var sub = jQuery(this).next();
        var slideOffeset = -200;
        var slideSpeed = 200;

        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(slideSpeed, function() {
                if ($('body').hasClass('page-sidebar-closed') == false) {
                    if ($('body').hasClass('page-sidebar-fixed')) {
                        menu.slimScroll({
                            'scrollTo': (the.position()).top
                        });
                    } else {
                        App.scrollTo(the, slideOffeset);
                    }
                }
                App.fixContentHeight();
            });
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(slideSpeed, function() {
                if ($('body').hasClass('page-sidebar-closed') == false) {
                    if ($('body').hasClass('page-sidebar-fixed')) {
                        menu.slimScroll({
                            'scrollTo': (the.position()).top
                        });
                    } else {
                        App.scrollTo(the, slideOffeset);
                    }
                }
                App.fixContentHeight();
            });
        }
        e.preventDefault();
    });
}

// Handles fixed sidebar
var handleFixedSidebar = function() {
    var menu = $('.page-sidebar-menu');

    if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
        menu.slimScroll({
            destroy: true
        });
        menu.removeAttr('style');
        $('.page-sidebar').removeAttr('style');
    }

    if ($('.page-sidebar-fixed').size() === 0) {
        App.fixContentHeight();
        return;
    }

    var viewport = _getViewPort();
    if (viewport.width >= 992) {
        var sidebarHeight = App.getFixedSidebarViewportHeight();

        menu.slimScroll({
            size: '7px',
            color: '#a1b2bd',
            opacity: .3,
            position: App.isRTL() ? 'left' : 'right',
            height: sidebarHeight,
            allowPageScroll: false,
            disableFadeOut: false
        });
        App.fixContentHeight();
    }
}

// Handles the sidebar menu hover effect for fixed sidebar.
var handleFixedSidebarHoverable = function() {
    if ($('body').hasClass('page-sidebar-fixed') === false) {
        return;
    }

    $('.page-sidebar').off('mouseenter').on('mouseenter', function() {
        var body = $('body');

        if ((body.hasClass('page-sidebar-closed') === false || body.hasClass('page-sidebar-fixed') === false) || $(this).hasClass('page-sidebar-hovering')) {
            return;
        }

        body.removeClass('page-sidebar-closed').addClass('page-sidebar-hover-on');

        if (body.hasClass("page-sidebar-reversed")) {
            $(this).width(sidebarWidth);
        } else {
            $(this).addClass('page-sidebar-hovering');
            $(this).animate({
                width: sidebarWidth
            }, 400, '', function() {
                $(this).removeClass('page-sidebar-hovering');
            });
        }
    });

    $('.page-sidebar').off('mouseleave').on('mouseleave', function() {
        var body = $('body');

        if ((body.hasClass('page-sidebar-hover-on') === false || body.hasClass('page-sidebar-fixed') === false) || $(this).hasClass('page-sidebar-hovering')) {
            return;
        }

        if (body.hasClass("page-sidebar-reversed")) {
            $('body').addClass('page-sidebar-closed').removeClass('page-sidebar-hover-on');
            $(this).width(sidebarCollapsedWidth);
        } else {
            $(this).addClass('page-sidebar-hovering');
            $(this).animate({
                width: sidebarCollapsedWidth
            }, 400, '', function() {
                $('body').addClass('page-sidebar-closed').removeClass('page-sidebar-hover-on');
                $(this).removeClass('page-sidebar-hovering');
            });
        }
    });
}

// Handles sidebar toggler to close/hide the sidebar.
var handleSidebarToggler = function() {
    var viewport = _getViewPort();

    // handle sidebar show/hide
    $('.page-sidebar').on('click', '.sidebar-toggler', function(e) {
        var body = $('body');
        var sidebar = $('.page-sidebar');

        if ((body.hasClass("page-sidebar-hover-on") && body.hasClass('page-sidebar-fixed')) || sidebar.hasClass('page-sidebar-hovering')) {
            body.removeClass('page-sidebar-hover-on');
            sidebar.css('width', '').hide().show();
            App.fixContentHeight(); //fix content & sidebar height
            e.stopPropagation();
            App.runResponsiveHandlers();
            return;
        }

        if (body.hasClass("page-sidebar-closed")) {
            body.removeClass("page-sidebar-closed");
            if (body.hasClass('page-sidebar-fixed')) {
                sidebar.css('width', '');
            }
        } else {
            body.addClass("page-sidebar-closed");
        }
        App.fixContentHeight(); //fix content & sidebar height
        App.runResponsiveHandlers();
    });
}

var handleQuickSearch = function() {
    // handle search for sidebar search input on enter press
    $('.search-form-sidebar').on('keypress', 'input.form-control', function(e) {
        if (e.which == 13) {
            $('.search-form-sidebar').submit();
            return false;
        }
    });

    // handle search for sidebar search input on icon click
    $('.search-form-sidebar').on('click', '.icon-search', function(e) {
        $('.search-form-sidebar').submit();
        return false;
    });
}
