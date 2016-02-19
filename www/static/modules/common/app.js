define('modules/common/app', function(require, exports, module) {

  /**
  Core script to handle the entire theme and core functions
  **/
  'use strict';
  
  var App = (function () {
  
      // IE mode
      var _isRTL = false;
      var _isIE8 = false;
      var _isIE9 = false;
      var isIE10 = false;
  
      var responsiveHandlers = [];
  
      // initializes main settings
      var handleInit = function handleInit() {
  
          if ($('body').css('direction') === 'rtl') {
              _isRTL = true;
          }
  
          _isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
          _isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
          isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);
  
          if (isIE10) {
              jQuery('html').addClass('ie10'); // detect IE10 version
          }
  
          if (isIE10 || _isIE9 || _isIE8) {
              jQuery('html').addClass('ie'); // detect IE10 version
          }
      };
  
      // runs callback functions set by App.addResponsiveHandler().
      var runResponsiveHandlers = function runResponsiveHandlers() {
          // reinitialize other subscribed elements
          for (var i in responsiveHandlers) {
              var each = responsiveHandlers[i];
              each.call();
          }
      };
  
      // reinitialize the laypot on window resize
      var handleResponsive = function handleResponsive() {
          handleSidebarAndContentHeight();
          // handleFixedSidebar();
          runResponsiveHandlers();
      };
  
      // initialize the layout on page load
      var handleResponsiveOnInit = function handleResponsiveOnInit() {
          handleSidebarAndContentHeight();
      };
  
      // handle the layout reinitialization on window resize
      var handleResponsiveOnResize = function handleResponsiveOnResize() {
          var resize;
          if (_isIE8) {
              var currheight;
              $(window).resize(function () {
                  if (currheight == document.documentElement.clientHeight) {
                      return; //quite event since only body resized not window.
                  }
                  if (resize) {
                      clearTimeout(resize);
                  }
                  resize = setTimeout(function () {
                      handleResponsive();
                  }, 50); // wait 50ms until window resize finishes.               
                  currheight = document.documentElement.clientHeight; // store last body client height
              });
          } else {
                  $(window).resize(function () {
                      if (resize) {
                          clearTimeout(resize);
                      }
                      resize = setTimeout(function () {
                          handleResponsive();
                      }, 50); // wait 50ms until window resize finishes.
                  });
              }
      };
  
      //* BEGIN:CORE HANDLERS *//
      // this function handles responsive layout on screen size resize or mobile device rotate.
  
      // Set proper height for sidebar and content. The content and sidebar height must be synced always.
  
      var handleSidebarAndContentHeight = function handleSidebarAndContentHeight() {
          var content = $('.page-content');
          var sidebar = $('.page-sidebar');
          var body = $('body');
          var height;
  
          if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
              var available_height = this.getViewPort().height - $('.footer').outerHeight() - $('.header').outerHeight();
              if (content.height() < available_height) {
                  content.attr('style', 'min-height:' + available_height + 'px');
              }
          } else {
              if (body.hasClass('page-sidebar-fixed')) {
                  height = _calculateFixedSidebarViewportHeight();
                  if (body.hasClass('page-footer-fixed') === false) {
                      height = height - $('.footer').outerHeight();
                  }
              } else {
                  var headerHeight = $('.header').outerHeight();
                  var footerHeight = $('.footer').outerHeight();
  
                  if (App.getViewPort().width < 992) {
                      height = App.getViewPort().height - headerHeight - footerHeight;
                  } else {
                      height = sidebar.height() + 20;
                  }
  
                  if (height + headerHeight + footerHeight <= App.getViewPort().height) {
                      height = App.getViewPort().height - headerHeight - footerHeight;
                  }
              }
              content.attr('style', 'min-height:' + height + 'px');
          }
      };
  
      // Helper function to calculate sidebar height for fixed sidebar layout.
      var _calculateFixedSidebarViewportHeight = function _calculateFixedSidebarViewportHeight() {
          var sidebarHeight = App.getViewPort().height - $('.header').outerHeight();
          if ($('body').hasClass("page-footer-fixed")) {
              sidebarHeight = sidebarHeight - $('.footer').outerHeight();
          }
  
          return sidebarHeight;
      };
  
      // Handles portlet tools & actions
      var handlePortletTools = function handlePortletTools() {
          jQuery('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function (e) {
              e.preventDefault();
              jQuery(this).closest(".portlet").remove();
          });
  
          jQuery('body').on('click', '.portlet > .portlet-title > .tools > a.reload', function (e) {
              e.preventDefault();
              var el = jQuery(this).closest(".portlet").children(".portlet-body");
              App.blockUI({ target: el });
              window.setTimeout(function () {
                  App.unblockUI(el);
              }, 1000);
          });
  
          jQuery('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function (e) {
              e.preventDefault();
              var el = jQuery(this).closest(".portlet").children(".portlet-body");
              if (jQuery(this).hasClass("collapse")) {
                  jQuery(this).removeClass("collapse").addClass("expand");
                  el.slideUp(200);
              } else {
                  jQuery(this).removeClass("expand").addClass("collapse");
                  el.slideDown(200);
              }
          });
      };
  
      // Handles custom checkboxes & radios using jQuery Uniform plugin
      var handleUniform = function handleUniform() {
          if (!jQuery().uniform) {
              return;
          }
          var test = $("input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)");
          if (test.size() > 0) {
              test.each(function () {
                  if ($(this).parents(".checker").size() == 0) {
                      $(this).show();
                      $(this).uniform();
                  }
              });
          }
      };
  
      var handleBootstrapSwitch = function handleBootstrapSwitch() {
          if (!$().bootstrapSwitch) {
              return;
          }
          $('.make-switch').bootstrapSwitch();
      };
  
      // Handles Bootstrap Accordions.
      var handleAccordions = function handleAccordions() {
          var lastClicked;
          //add scrollable class name if you need scrollable panes
          jQuery('body').on('click', '.accordion.scrollable .accordion-toggle', function () {
              lastClicked = jQuery(this);
          }); //move to faq section
  
          jQuery('body').on('show.bs.collapse', '.accordion.scrollable', function () {
              jQuery('html,body').animate({
                  scrollTop: lastClicked.offset().top - 150
              }, 'slow');
          });
      };
  
      // Handles Bootstrap Tabs.
      var handleTabs = function handleTabs() {
          // fix content height on tab click
          $('body').on('shown.bs.tab', '.nav.nav-tabs', function () {
              handleSidebarAndContentHeight();
          });
  
          //activate tab if tab id provided in the URL
          if (location.hash) {
              var tabid = location.hash.substr(1);
              $('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each(function () {
                  var tabid = $(this).attr("id");
                  $('a[href="#' + tabid + '"]').click();
              });
              $('a[href="#' + tabid + '"]').click();
          }
      };
  
      // Handles Bootstrap Modals.
      var handleModals = function handleModals() {
          // fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class.
          $('body').on('hide.bs.modal', function () {
              if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') == false) {
                  $('html').addClass('modal-open');
              } else if ($('.modal:visible').size() <= 1) {
                  $('html').removeClass('modal-open');
              }
          });
  
          $('body').on('show.bs.modal', '.modal', function () {
              if ($(this).hasClass("modal-scroll")) {
                  $('body').addClass("modal-open-noscroll");
              }
          });
  
          $('body').on('hide.bs.modal', '.modal', function () {
              $('body').removeClass("modal-open-noscroll");
          });
      };
  
      // Handles Bootstrap Tooltips.
      var handleTooltips = function handleTooltips() {
          jQuery('.tooltips').tooltip();
      };
  
      // Handles Bootstrap Dropdowns
      var handleDropdowns = function handleDropdowns() {
          /*
            For touch supported devices disable the 
            hoverable dropdowns - data-hover="dropdown"  
          */
          if (App.isTouchDevice()) {
              $('[data-hover="dropdown"]').each(function () {
                  $(this).parent().off("hover");
                  $(this).off("hover");
              });
          }
          /*
            Hold dropdown on click  
          */
          $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
              e.stopPropagation();
          });
      };
  
      // Handle Hower Dropdowns
      var handleDropdownHover = function handleDropdownHover() {
          $('[data-hover="dropdown"]').dropdownHover();
      };
  
      // Handles Bootstrap Popovers
  
      // last popep popover
      var lastPopedPopover;
  
      var handlePopovers = function handlePopovers() {
          jQuery('.popovers').popover();
  
          // close last poped popover
  
          $(document).on('click.bs.popover.data-api', function (e) {
              if (lastPopedPopover) {
                  lastPopedPopover.popover('hide');
              }
          });
      };
  
      // Handles scrollable contents using jQuery SlimScroll plugin.
      var handleScrollers = function handleScrollers() {
          $('.scroller').each(function () {
              var height;
              if ($(this).attr("data-height")) {
                  height = $(this).attr("data-height");
              } else {
                  height = $(this).css('height');
              }
              $(this).slimScroll({
                  size: '7px',
                  color: $(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#a1b2bd',
                  railColor: $(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#333',
                  position: _isRTL ? 'left' : 'right',
                  height: height,
                  alwaysVisible: $(this).attr("data-always-visible") == "1" ? true : false,
                  railVisible: $(this).attr("data-rail-visible") == "1" ? true : false,
                  disableFadeOut: true
              });
          });
      };
  
      // Handles Image Preview using jQuery Fancybox plugin
      var handleFancybox = function handleFancybox() {
          if (!jQuery.fancybox) {
              return;
          }
  
          if (jQuery(".fancybox-button").size() > 0) {
              jQuery(".fancybox-button").fancybox({
                  groupAttr: 'data-rel',
                  prevEffect: 'none',
                  nextEffect: 'none',
                  closeBtn: true,
                  helpers: {
                      title: {
                          type: 'inside'
                      }
                  }
              });
          }
      };
  
      // Fix input placeholder issue for IE8 and IE9
      var handleFixInputPlaceholderForIE = function handleFixInputPlaceholderForIE() {
          //fix html5 placeholder attribute for ie7 & ie8
          if (_isIE8 || _isIE9) {
              // ie8 & ie9
              // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
              jQuery('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
  
                  var input = jQuery(this);
  
                  if (input.val() == '' && input.attr("placeholder") != '') {
                      input.addClass("placeholder").val(input.attr('placeholder'));
                  }
  
                  input.focus(function () {
                      if (input.val() == input.attr('placeholder')) {
                          input.val('');
                      }
                  });
  
                  input.blur(function () {
                      if (input.val() == '' || input.val() == input.attr('placeholder')) {
                          input.val(input.attr('placeholder'));
                      }
                  });
              });
          }
      };
  
      // Handle Select2 Dropdowns
      var handleSelect2 = function handleSelect2() {
          if (jQuery().select2) {
              $('.select2me').select2({
                  placeholder: "Select",
                  allowClear: true
              });
          }
      };
  
      //* END:CORE HANDLERS *//
  
      return {
  
          //main function to initiate the theme
          init: function init() {
  
              //IMPORTANT!!!: Do not modify the core handlers call order.
  
              //core handlers
              handleInit(); // initialize core variables
              handleResponsiveOnResize(); // set and handle responsive   
              handleUniform(); // hanfle custom radio & checkboxes
              handleScrollers(); // handles slim scrolling contents
              handleResponsiveOnInit(); // handler responsive elements on page load
  
              //layout handlers
              // handleFixedSidebar(); // handles fixed sidebar menu
              // handleFixedSidebarHoverable(); // handles fixed sidebar on hover effect
              // handleSidebarMenu(); // handles main menu
              // handleQuickSearch(); // handles quick search
              // handleSidebarToggler(); // handles sidebar hide/show           
              handleFixInputPlaceholderForIE(); // fixes/enables html5 placeholder attribute for IE9, IE8
              // handleGoTop(); //handles scroll to top functionality in the footer
              // handleTheme(); // handles style customer tool
  
              //ui component handlers
              handleFancybox(); // handle fancy box
              handleSelect2(); // handle custom Select2 dropdowns
              handlePortletTools(); // handles portlet action bar functionality(refresh, configure, toggle, remove)
              handleDropdowns(); // handle dropdowns
              // handleAlerts() // handle alerts
              handleTabs(); // handle tabs
              handleTooltips(); // handle bootstrap tooltips
              handlePopovers(); // handles bootstrap popovers
              handleAccordions(); //handles accordions
              handleModals(); // handle modals
              handleBootstrapSwitch(); // handles bootstrap switch plugin 
  
              handleDropdownHover(); // handles dropdown hover   
          },
  
          //main function to initiate core javascript after ajax complete
          initAjax: function initAjax() {
              handleSelect2(); // handle custom Select2 dropdowns
              handleDropdowns(); // handle dropdowns
              handleTooltips(); // handle bootstrap tooltips
              handlePopovers(); // handles bootstrap popovers
              handleAccordions(); //handles accordions
              handleUniform(); // hanfle custom radio & checkboxes    
              handleDropdownHover(); // handles dropdown hover    
              handleBootstrapSwitch(); // handles bootstrap switch plugin
          },
  
          //public function to fix the sidebar and content height accordingly
          fixContentHeight: function fixContentHeight() {
              handleSidebarAndContentHeight();
          },
  
          //public function to remember last opened popover that needs to be closed on click
          setLastPopedPopover: function setLastPopedPopover(el) {
              lastPopedPopover = el;
          },
  
          //public function to add callback a function which will be called on window resize
          addResponsiveHandler: function addResponsiveHandler(func) {
              responsiveHandlers.push(func);
          },
  
          // useful function to make equal height for contacts stand side by side
          setEqualHeight: function setEqualHeight(els) {
              var tallestEl = 0;
              els = jQuery(els);
              els.each(function () {
                  var currentHeight = $(this).height();
                  if (currentHeight > tallestEl) {
                      tallestColumn = currentHeight;
                  }
              });
              els.height(tallestEl);
          },
  
          // wrapper function to scroll(focus) to an element
          scrollTo: function scrollTo(el, offeset) {
              var pos = el && el.size() > 0 ? el.offset().top : 0;
              jQuery('html,body').animate({
                  scrollTop: pos + (offeset ? offeset : 0)
              }, 'slow');
          },
  
          // function to scroll to the top
          scrollTop: function scrollTop() {
              App.scrollTo();
          },
  
          // wrapper function to  block element(indicate loading)
          blockUI: function blockUI(options) {
              var options = $.extend(true, {}, options);
              var html = '';
              if (options.iconOnly) {
                  html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="/static/img/loading-spinner-grey.gif" align=""></div>';
              } else if (options.textOnly) {
                  html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
              } else {
                  html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="/static/img/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
              }
  
              if (options.target) {
                  // element blocking
                  var el = $(options.target);
                  if (el.height() <= $(window).height()) {
                      options.cenrerY = true;
                  }
                  el.block({
                      message: html,
                      baseZ: options.zIndex ? options.zIndex : 1000,
                      centerY: options.cenrerY != undefined ? options.cenrerY : false,
                      css: {
                          top: '10%',
                          border: '0',
                          padding: '0',
                          backgroundColor: 'none'
                      },
                      overlayCSS: {
                          backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                          opacity: options.boxed ? 0.05 : 0.1,
                          cursor: 'wait'
                      }
                  });
              } else {
                  // page blocking
                  $.blockUI({
                      message: html,
                      baseZ: options.zIndex ? options.zIndex : 1000,
                      css: {
                          border: '0',
                          padding: '0',
                          backgroundColor: 'none'
                      },
                      overlayCSS: {
                          backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                          opacity: options.boxed ? 0.05 : 0.1,
                          cursor: 'wait'
                      }
                  });
              }
          },
  
          // wrapper function to  un-block element(finish loading)
          unblockUI: function unblockUI(target) {
              if (target) {
                  $(target).unblock({
                      onUnblock: function onUnblock() {
                          $(target).css('position', '');
                          $(target).css('zoom', '');
                      }
                  });
              } else {
                  $.unblockUI();
              }
          },
  
          startPageLoading: function startPageLoading(message) {
              $('.page-loading').remove();
              $('body').append('<div class="page-loading"><img src="/static/img/loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (message ? message : 'Loading...') + '</span></div>');
          },
  
          stopPageLoading: function stopPageLoading() {
              $('.page-loading').remove();
          },
  
          alert: function alert(options) {
  
              options = $.extend(true, {
                  container: "", // alerts parent container(by default placed after the page breadcrumbs)
                  place: "append", // append or prepent in container
                  type: 'success', // alert's type
                  message: "", // alert's message
                  close: true, // make alert closable
                  reset: true, // close all previouse alerts first
                  focus: true, // auto scroll to the alert after shown
                  closeInSeconds: 0, // auto close after defined seconds
                  icon: "" // put icon before the message
              }, options);
  
              var id = App.getUniqueID("app_alert");
  
              var html = '<div id="' + id + '" class="app-alerts alert alert-' + options.type + ' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '') + (options.icon != "" ? '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' : '') + options.message + '</div>';
  
              if (options.reset) {
                  0;
                  $('.app-alerts').remove();
              }
  
              if (!options.container) {
                  $('.page-bar').after(html);
              } else {
                  if (options.place == "append") {
                      $(options.container).append(html);
                  } else {
                      $(options.container).prepend(html);
                  }
              }
  
              if (options.focus) {
                  App.scrollTo($('#' + id));
              }
  
              if (options.closeInSeconds > 0) {
                  setTimeout(function () {
                      $('#' + id).remove();
                  }, options.closeInSeconds * 1000);
              }
  
              return id;
          },
  
          // initializes uniform elements
          initUniform: function initUniform(els) {
              if (els) {
                  jQuery(els).each(function () {
                      if ($(this).parents(".checker").size() == 0) {
                          $(this).show();
                          $(this).uniform();
                      }
                  });
              } else {
                  handleUniform();
              }
          },
  
          //wrapper function to update/sync jquery uniform checkbox & radios
          updateUniform: function updateUniform(els) {
              $.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
          },
  
          //public function to initialize the fancybox plugin
          initFancybox: function initFancybox() {
              handleFancybox();
          },
  
          //public helper function to get actual input value(used in IE9 and IE8 due to placeholder attribute not supported)
          getActualVal: function getActualVal(el) {
              var el = jQuery(el);
              if (el.val() === el.attr("placeholder")) {
                  return "";
              }
              return el.val();
          },
  
          getUniqueID: function getUniqueID(prefix) {
              return 'prefix_' + Math.floor(Math.random() * new Date().getTime());
          },
  
          //public function to get a paremeter by name from URL
          getURLParameter: function getURLParameter(paramName) {
              var searchString = window.location.search.substring(1),
                  i,
                  val,
                  params = searchString.split("&");
  
              for (i = 0; i < params.length; i++) {
                  val = params[i].split("=");
                  if (val[0] == paramName) {
                      return unescape(val[1]);
                  }
              }
              return null;
          },
  
          // check for device touch support
          isTouchDevice: function isTouchDevice() {
              try {
                  document.createEvent("TouchEvent");
                  return true;
              } catch (e) {
                  return false;
              }
          },
  
          // check IE8 mode
          isIE8: function isIE8() {
              return _isIE8;
          },
  
          // check IE9 mode
          isIE9: function isIE9() {
              return _isIE9;
          },
  
          //check RTL mode
          isRTL: function isRTL() {
              return _isRTL;
          },
  
          // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
          getViewPort: function getViewPort() {
              var e = window,
                  a = 'inner';
              if (!('innerWidth' in window)) {
                  a = 'client';
                  e = document.documentElement || document.body;
              }
              return {
                  width: e[a + 'Width'],
                  height: e[a + 'Height']
              };
          },
  
          getFixedSidebarViewportHeight: function getFixedSidebarViewportHeight() {
              return _calculateFixedSidebarViewportHeight();
          },
  
          runResponsiveHandlers: runResponsiveHandlers
  
      };
  })();
  
  module.exports = App;

});
