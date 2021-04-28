$(function () {
	"use strict";

	/*if ( localStorage.colorStyle ) {
		styler(localStorage.getItem("colorStyle"));
	}
	else {
		styler('teal');
	}*/

	if ( localStorage.sidebarMenu ) {
		var getBodyClass = localStorage.getItem("sidebarMenu");
		$('#body-collapse').prop('class', getBodyClass);
	}
	//Activate tooltips
	$("[data-toggle='tooltip']").tooltip();

	$("[data-toggle='utility-menu']").click(function() {
		$(this).next().slideToggle(300);
		$(this).toggleClass('open');
		return false;
	});

	// Login Page Flipbox control
	$('#toFlip').click(function() {
		loginFlip();
		return false;
	});

	$('#noFlip').click(function() {
		loginFlip();
		return false;
	});

	$('.sidebar-menu').slimscroll({
		height: ($(window).height() - $(".main-header").height() - '46') + "px",
	    size: '8px',
  	});
});

// Sidenav prototypes
// Inspired from AdminLTE (https://almsaeedstudio.com/preview)

$.pushMenu = {
	activate: function (toggleBtn) {

	//Enable sidebar toggle
	$(toggleBtn).on('click', function (e) {
		e.preventDefault();

		//Enable sidebar push menu
		if ($(window).width() > (767)) {
			if ($("body").hasClass('sidebar-collapse')) {
				$("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
				$('.sidebar-toggle').removeClass('open');
			} else {
				$("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
				$('.sidebar-toggle').addClass('open');
			}
		}
		//Handle sidebar push menu for small screens
		else {
			if ($("body").hasClass('sidebar-open')) {
				$("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
				$('.sidebar-toggle').removeClass('open');
			} else {
				$("body").addClass('sidebar-open').trigger('expanded.pushMenu');
				$('.sidebar-toggle').addClass('open');
			}
		}
		if ( $('body').hasClass('fixed') && $('body').hasClass('sidebar-mini')) {
			$('.sidebar-content').css("overflow","visible");
			$('.main-sidebar').find(".slimScrollDiv").css("overflow","visible");
		}
		if ($('body').hasClass('only-sidebar')) {
			$('.sidebar-content').css("overflow","visible");
			$('.main-sidebar').find(".slimScrollDiv").css("overflow","visible");
		};
	});

	$(".content-wrapper").click(function () {
		//Enable hide menu when clicking on the content-wrapper on small screens
		if ($(window).width() <= (767) && $("body").hasClass("sidebar-open")) {
			$("body").removeClass('sidebar-open');
		}
	});
	}
};
$.tree = function (menu) {
  var _this = this;
  var animationSpeed = 200;
  $(document).on('click', menu + ' li a', function (e) {
	//Get the clicked link and the next element
	var $this = $(this);
	var checkElement = $this.next();

	//Check if the next element is a menu and is visible
	if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
	  //Close the menu
	  checkElement.slideUp(animationSpeed, function () {
		checkElement.removeClass('menu-open');
		//Fix the layout in case the sidebar stretches over the height of the window
		//_this.layout.fix();
	  });
	  checkElement.parent("li").removeClass("active");
	}
	//If the menu is not visible
	else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
	  //Get the parent menu
	  var parent = $this.parents('ul').first();
	  //Close all open menus within the parent
	  var ul = parent.find('ul:visible').slideUp(animationSpeed);
	  //Remove the menu-open class from the parent
	  ul.removeClass('menu-open');
	  //Get the parent li
	  var parent_li = $this.parent("li");

	  //Open the target menu and add the menu-open class
	  checkElement.slideDown(animationSpeed, function () {
		//Add the class active to the parent li
		checkElement.addClass('menu-open');
		parent.find('li.active').removeClass('active');
		parent_li.addClass('active');
	  });
	}
	//if this isn't a link, prevent the page from being redirected
	if (checkElement.is('.treeview-menu')) {
	  e.preventDefault();
	}
  });
};

// Activate sidenav treemenu and off canvas
$.tree('.sidebar');
$.pushMenu.activate("[data-toggle='offcanvas']");

// Login Page flipping Animation
function loginFlip () {
	$('.login-box').toggleClass('flipped');
}

// Button Loading Plugin

$.fn.loadingBtn = function( options ) {

	var settings = $.extend({
			text: "Loading"
		}, options );
	this.html('<span class="btn-spinner"></span> ' + settings.text + '');
	this.addClass("disabled");
};

$.fn.loadingBtnComplete = function( options ) {
	var settings = $.extend({
			html: "submit"
		}, options );
	this.html(settings.html);
	this.removeClass("disabled");
};

/*function styler (sname) {
	localStorage.setItem('colorStyle',sname);
	$('#skin-css').prop('href', 'css/skin/'+sname+'.css');
}*/

$('.sidebar-toggle').click(function(){
	if ($('#body-collapse').hasClass('sidebar-collapse')) {
		localStorage.setItem('sidebarMenu','sidebar-mini fixed sidebar-collapse');
	} else {
		localStorage.setItem('sidebarMenu','sidebar-mini fixed');
	}
});

$('.logout').on('click',function(){
	var this_find_fa = $(this).find('i.fa-angle-right');
	if ($(this).hasClass('open')) {
		$(this).removeClass('open');
		$('.logout-modal').hide();
		this_find_fa.css('transform','rotate(0deg)');
	} else {
		$(this).addClass('open');
		$('.logout-modal').show();
		this_find_fa.css('transform','rotate(-90deg)');
	}
});

$('.content-wrapper').click(function(){
	if ($('.logout').hasClass('open')) {
		alert('a');
	}
});

$('a').addClass('waves-effect waves-light');
$('.sidebar-menu a').removeClass('waves-effect waves-light');
$('.breadcrumb li a').removeClass('waves-effect waves-light');
$('.btn').addClass('waves-effect waves-dark');

$("#checkAll").change(function () {
	var change_all_tr_bg = $(this).closest('.table').find('tbody tr');
    $(".checkbox:checkbox").prop('checked', $(this).prop("checked"));
	var count_all_delete = $(".checkbox:checked").length;
	$('#delete-btn').toggle();
	if ($(this).is(":checked")) {
		change_all_tr_bg.css('background-color','#fffbe9');
		$('.number-delete').show();
		$('.number-delete span.num_item').text(count_all_delete + ' ');
	}
	else{
		$('.number-delete').hide();
		change_all_tr_bg.css('background-color','#fff');
	}
});

$(document).on('change','.checkbox',function(){
	var close_table = $(this).closest('.table');
	var find_checkbox = close_table.find('.checkbox');
	var change_tr_bg = $(this).closest('tr');
	var count_delete = $(".checkbox:checked").length;
	if ($(this).is(":checked")) {
		change_tr_bg.css('background-color','#fffbe9');
	}
	else{
		change_tr_bg.css('background-color','#fff');
	}
	if(find_checkbox.is(":checked")) {
		$('.number-delete').show();
		$('.number-delete span.num_item').text(count_delete + ' ');
		$('#delete-btn').show();
	} else {
		$('.number-delete').hide();
		$('#delete-btn').hide();
	}
});

$(document).ready(function(){
	$('form').submit(function(){
        $('.disabled-btn').addClass('disabled');
        $('.overlay').css('display','flex');
    });
	$('.bulk-dropdown').on('click',function(){
		$('.bulk-box').toggleClass('active');
	});
});