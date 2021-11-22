if( typeof(window) !== "undefined")
  window.browser = (function () { return window.msBrowser || window.browser || window.chrome; })();
else
  browser = (function () { return chrome; })(); 