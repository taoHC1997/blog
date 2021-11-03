// ==UserScript==
// @name         移出网页 canvas
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  电脑性能太差，出此下策
// @author       James Tao
// @include        *://www.cnblogs.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function delCanvas() {
    let domArr = [...document.getElementsByTagName("canvas")];
    domArr.forEach((element) => {
      element.remove();
    });
  }
  delCanvas();
})();
