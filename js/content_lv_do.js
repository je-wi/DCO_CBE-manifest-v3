/*  content_lv_do.js  
  
  the script has the same rights as in a single website
  we can manipulate the dom here as usuly                         
     
*/ 

if( browser!=undefined && document!=undefined )
  {
  var dco_cbe_co = document.getElementById('dco_cbe_co');
  
  browser.storage.local.get(null, function(data)
    { 
    var LVisActive = data.LVisActive;
    var LVEisActive = data.LVEisActive;
    var isActive = data.isActive; 
    var linkdelay = parseInt(data.option1);
    var i = 0;
    var ok = 0;
    var nok = 0;
  
    
    if( isActive )  
      {
      document.querySelectorAll('.dco_cbe_lk').forEach(function(dco_cbe_link) {
      var ld = i * linkdelay;             
        setTimeout(function(){  
            var url = dco_cbe_link.href;
 

            doRequest(url, 'HEAD', function(request) {
/*
CORS: Some External Links dont work: 'Access-Control-Allow-Origin' on the server is missing
Access to XMLHttpRequest at 'https://stats.wikimedia.org/#/de.wikipedia.org' from origin 'https://de.wikipedia.org' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

*/


              if(request.status==200)
                {
                dco_cbe_link.classList.remove('dco_cbe_lk');   
                ok++;
                dco_cbe_co.innerHTML = '<span class="dco_cbe_lk_ok">ok: '+url+'</span><br />'+ dco_cbe_co.innerHTML;
                }
              else
                {
                dco_cbe_link.classList.remove('dco_cbe_lk');   
                dco_cbe_link.classList.add('dco_cbe_lk_nok');
                nok++; 
                dco_cbe_co.innerHTML = '<span class="dco_cbe_lk_nok">'+request.status+': '+url+'</span><br />'+dco_cbe_co.innerHTML;             
                }  
                                     
              });

              
          }, ld);  
      
        i++;
        });   
          
     };    
  
    });
  }//end if
