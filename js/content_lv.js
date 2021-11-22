/*  content_lv.js  
  
  the script has the same rights as in a single website
  we can manipulate the dom here as usuly                         
     
*/ 
if( browser!=undefined && document!=undefined )
  {
  var dco_cbe = document.getElementById('dco_cbe');
  var dco_cbe_co = document.getElementById('dco_cbe_co');
  
  if( !dco_cbe )
    {
    var zindex = getHighestZ(document)+1000; 
    var bbb = document.querySelector('body');
    var width = window.getComputedStyle(bbb).width;  
    var px = width.replace("px", "");
    
    browser.storage.local.get(null, function(data) {
      bodywith = JSON.parse(data.bodywith);
      bodywith[data.tabId] = px;
      browser.storage.local.set({'bodywith': JSON.stringify(bodywith) }, function() { });  
    }); 
    
    dco_cbe = document.createElement("div");   
    dco_cbe.innerHTML = '<div id="dco_cbe_img"><img src="https://journals.ub.uni-heidelberg.de/public/journals/102/pageHeaderLogoImage_de_DE.jpg" width="364" height="40" alt=""></div><div id="dco_cbe_co"></div>';
    dco_cbe.setAttribute("id","dco_cbe");                   
    document.body.appendChild(dco_cbe);
    newwidth = px-400;
    bbb.setAttribute('style','width:'+newwidth+'px !important; max-width:'+px+'px !important;'); 
    dco_cbe.setAttribute('style', 'z-index:'+zindex); 
    }//end if
  
  
  
  browser.storage.local.get(null, function(data)
    { 
    var LVisActive = data.LVisActive;
    var LVEisActive = data.LVEisActive;
    var tabId = data.tabId;
    var marked;
    
    if( LVisActive )
      {
      marked = markILinksInDOC(document,window.location,'intern');
      dco_cbe_co.innerHTML+= marked+' intern links has been marked<br />'; 
      }   
    else
      {
      UnMarkILinksInDOC(document,'intern');     
      }
  
    
    if( LVEisActive )
      {
      marked = markILinksInDOC(document,window.location,'extern'); 
      dco_cbe_co.innerHTML+= marked+' extern links has been marked<br />';  
      }    
    else
      {
      UnMarkILinksInDOC(document,'extern');    
      }
    });  
  }//end if

