'use strict';

/*  background.js
    primarily registers listeners for some events                         
    @need js/browser.js
    @need js/extension.functions.js 
           
    @need browser.runtime
    @need browser.storage
    @need browser.i18n
    @need browser.browserAction
    @need browser.tabs
    @need browser.downloads        
*/ 

try 
  {
  importScripts('browser.js','extension.functions.js');
  } 
catch (error) 
  {
  console.error('background.js: '+error);
  }


/* browser.runtime */
/* set default values after install or update extension */
if(!browser.runtime.onInstalled.hasListener(listenOnInstalled))
  browser.runtime.onInstalled.addListener(listenOnInstalled);
/* messages from content srcipt */
if(!browser.runtime.onMessage.hasListener(listenOnMessage))
  browser.runtime.onMessage.addListener(listenOnMessage);

 
/* browser.tabs */
/* active tab */
if(!browser.tabs.onActivated.hasListener(listenTabActivated))
  browser.tabs.onActivated.addListener(listenTabActivated);
/* refreshing page */
browser.tabs.onUpdated.addListener(listenTabUpdated);


/* browser.storage */ 
/* changing storage value */
//if(!browser.storage.onChanged.hasListener(logStorageChange))
//  browser.storage.onChanged.addListener(logStorageChange);
  

/* browser.downloads  */ 
/* changing download state */
if(!browser.downloads.onChanged.hasListener(listenDownloadsChange))
  browser.downloads.onChanged.addListener(listenDownloadsChange);
