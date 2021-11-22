'use strict';

/*  options.js  
                         
    @need js/browser.js
    @need js/extension.functions.js 
           
    @need browser.storage
    @need browser.i18n
    
*/ 

document.addEventListener("DOMContentLoaded", function(event) {
  var save_el = document.querySelector('#saveButton');
  var canc_el = document.querySelector('#cancelButton');
  
  
  /* localization of html-elements */
  document.querySelectorAll('.localize').forEach(function(node) {
    localizeNode(node);
    });   

  /* get all stored data an fill the html */
  setTheOptions();
  
  
  /* adding event listener */
  setTimeout(function() { 
  
    /* click on saveButton */  
    save_el.addEventListener("click", function(el) {
      //console.log(el);
      saveTheOptions();
      });
      
    /* click on cancelButton */  
    canc_el.addEventListener("click", function(el) {
      setTimeout(function() { window.close(); }, 450);
      });    
  
    }, 2000);
}); 