"use strict";

/*************** API-EXAMPLES TAB ***************/
var $apiTab = $('#api-tab');
var $examplesTab = $('#examples-tab');
var $lnbAPI = $('.lnb-api');
var $lnbExamples = $('.lnb-examples');

function showLnbExamples() {
    $apiTab.removeClass('selected');
    $examplesTab.addClass('selected');
    $lnbAPI.addClass('hidden');
    $lnbExamples.removeClass('hidden');
}

function showLnbApi() {
    $examplesTab.removeClass('selected');
    $apiTab.addClass('selected');
    $lnbAPI.removeClass('hidden');
    $lnbExamples.addClass('hidden');
}

$apiTab.click(showLnbApi);
$examplesTab.click(showLnbExamples);

/*************** SEARCH - AUTOCOMPLETE ***************/
var $searchContainer = $('#sidebar-search');
var $searchInput = $searchContainer.find('input');
var $searchedList = $searchContainer.find('ul');
var $anchorList = $('nav ul li a');
var $selected = $();

var KEY_CODE_UP = 38;
var KEY_CODE_DOWN = 40;
var KEY_CODE_ENTER = 13;

$(window).on('click', function (event) {
    if (!$searchContainer[0].contains(event.target)) {
        clear();
    }
});

$searchedList.on('click', 'li', function (event) {
    moveToPage($(event.currentTarget).find('a').attr('href'));
});

$searchInput.on({
    keyup: onKeyupSearchInput,
    keydown: onKeydownInput
});

function onKeyupSearchInput(event) {
    var inputText = removeWhiteSpace($searchInput.val()).toLowerCase();

    if (event.keyCode === KEY_CODE_UP || event.keyCode === KEY_CODE_DOWN) {
        return;
    }

    if (!inputText) {
        $searchedList.html('');
        return;
    }

    if (event.keyCode === KEY_CODE_ENTER) {
        onKeyupEnter();
        return;
    }

    setList(inputText);
}

function onKeydownInput(event) {
    $selected.removeClass('highlight');

    switch (event.keyCode) {
        case KEY_CODE_UP:
            $selected = $selected.prev();
            if (!$selected.length) {
                $selected = $searchedList.find('li').last();
            }
            break;
        case KEY_CODE_DOWN:
            $selected = $selected.next();
            if (!$selected.length) {
                $selected = $searchedList.find('li').first();
            }
            break;
        default:
            break;
    }

    $selected.addClass('highlight');
}

function onKeyupEnter() {
    if (!$selected.length) {
        $selected = $searchedList.find('li').first();
    }
    moveToPage($selected.find('a').attr('href'));
}

function moveToPage(url) {
    if (url) {
        window.location = url;
    }
    clear();
}

function clear() {
    $searchedList.html('');
    $searchInput.val('');
    $selected = $();
}

function setList(inputText) {
    var html = '';

    $anchorList.filter(function (idx, item) {
        return isMatched(item.text, inputText);
    }).each(function (idx, item) {
        html += makeListItemHtml(item, inputText);
    });
    $searchedList.html(html);
}

function isMatched(itemText, inputText) {
    return removeWhiteSpace(itemText).toLowerCase().indexOf(inputText) > -1;
}

function makeListItemHtml(item, inputText) {
    var itemText = item.text;
    var itemHref = item.href;
    var $parent = $(item).closest('div');
    var memberof = '';

    if ($parent.length && $parent.attr('id')) {
        memberof = $parent.attr('id').replace('_sub', '');
    } else {
        memberof = $(item).closest('div').find('h3').text();
    }

    if (memberof) {
        memberof = '<span>' + memberof + '</span>';
    }

    itemText = itemText.replace(new RegExp(inputText, 'ig'), function (matched) {
        return '<strong>' + matched + '</strong>';
    });

    return '<li><a href="' + itemHref + '">' + itemText + '</a>' + memberof + '</li>';
}

function removeWhiteSpace(value) {
    return value.replace(/\s/g, '');
}

/*************** TOGGLE SUB NAV ***************/
function toggleSubNav(e) {
    var temp = $(e.currentTarget).nextAll()[1];

    $(temp).toggle(300);
    $(e.currentTarget).find('.glyphicon').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
}

$lnbAPI.each(function () {
    $(this).find('.toggle-subNav')
        .filter(function () {
            return !!$(this).nextAll()[1].childNodes.length;
        }).each(function () {
            $(this).removeClass('visible-hidden').on('click', toggleSubNav);
        });
});

/*************** TOGGLE SIDEBAR ***************/
$(".toggle-btn").click(function () {
    $("body").toggleClass("toggled");
});

/*************** OPTIMIZE NAV ANIMATION ***************/
$('.lnb-api ul li a').click(function () {
    if (location.pathname === this.pathname && this.hash !== '') {
        // slow scroll
        var $pageContainer = $('main.page-container');
        var $main = $pageContainer.find('.main');
        var target = document.getElementById(this.hash.substring(1)); // do not use jQuery

        $pageContainer.animate({
            scrollTop: target.offsetTop - $main[0].offsetTop
        }, 800);
        return false;
    } else {
        // store value to preset nav onload
        var HEADER_HEIGHT = 56 + 5;

        var $apis = $('.lnb-api ul li .api-detail');
        var apiDisplayState = [];

        for (var i = 0, len = $apis.length; i < len; i++) {
            apiDisplayState.push(window.getComputedStyle($apis[i], null).getPropertyValue("display"));
        }
        window.sessionStorage.setItem('apiDisplayState', JSON.stringify(apiDisplayState));

        var refPoint = (this.hash === '' || this.pathname === '/global.html') ? this : this.offsetParent;
        var offsetValue = refPoint.offsetTop - $(refPoint).offset().top + HEADER_HEIGHT;

        window.sessionStorage.setItem('offsetValue', offsetValue);
    }
});

/*************** CODE LINE NUMBERS ***************/
(function () {
    var source = document.getElementsByClassName('prettyprint source linenums');

    if (source[0]) {
        var lines = source[0].getElementsByTagName('li');
        var selectedLine = document.location.hash;

        selectedLine && (lines[selectedLine.substring(5) - 1].className += ' selected');
        for (var i = 0, lineNumberHTML = '', totalLines = lines.length; i < totalLines; i++) {
            lineNumberHTML = '<span class="number">' + (i + 1) + ': </span>';
            lines[i].insertAdjacentHTML('afterBegin', lineNumberHTML);
        }
    }
})();
