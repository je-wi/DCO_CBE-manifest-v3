/*  content.unload.js  
  
  same as in content.js                  
     
*/ 

document.querySelectorAll('a').forEach(function(item) {
  item.classList.remove("dco_cbe_lk");
  item.classList.remove("dco_cbe_lk_ok");
  item.classList.remove("dco_cbe_lk_nok");  
  item.removeAttribute('href_orig');
  item.removeAttribute('dco_m');  
}); 

var dco_cbe = document.getElementById('dco_cbe');
if( dco_cbe )
  {
  browser.storage.local.get(null, function(data) {
    
    if(!data.isActive)
      {
      bodywith = JSON.parse(data.bodywith);    
      var width = bodywith[data.tabId];
      var bbb = document.querySelector('body');    
      //bbb.setAttribute('style','width:'+width+'px !important; max-width:'+width+'px !important;');
      
      bbb.removeAttribute('style');       
      }

    //console.log( JSON.stringify(data));
  });   
  
  dco_cbe.parentNode.removeChild(dco_cbe); 
  }
 
document.querySelectorAll('.dco_cbe_zindex').forEach(function(dcz) { 
  dcz.classList.remove('dco_cbe_zindex');
  }); 


                                                                          