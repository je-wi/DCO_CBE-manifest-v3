'use strict';

/*  popup.js  
                         
    @need js/browser.js
    @need js/extension.functions.js 
           
    @need browser.runtime
    @need browser.storage
    @need browser.i18n
    @need browser.browserAction
    @need browser.tabs        
*/ 

/* CBE default actions after loading the popup */
document.addEventListener("DOMContentLoaded", function(event) { 

/* some DOM elements */
var isActiveSwitch = document.querySelector('#isActiveSwitch'); // cbe on ? true:false
var LVisActive = document.querySelector('#LVisActive'); // lv on ? true:false

//var LVEisActive = document.querySelector('#LVEisActive'); // lve on ? true:false

var popup_div_lvstart = document.querySelector('#popup_div_lvstart'); // button start
var popup_div_iss = document.querySelector('#popup_div_iss'); // button archive
var popup_button_options = document.querySelector('#popup_button_options'); // button options
var popup_div_content = document.querySelector('#popup_div_content'); // div with the cbe content
var title_popup = document.querySelector('#popup_h1'); // title cbe
var title_h2_lv = document.querySelector('#popup_h2_lv'); // title lv

//var title_h2_lve = document.querySelector('#popup_h2_lve'); // title lv

  document.querySelectorAll('.localize').forEach(function(node) {
    localizeNode(node);
    });   

  /* get all stored data */
  browser.storage.local.get(null, function(data) {
    isActiveSwitch.checked = data.isActive;
    LVisActive.checked = data.LVisActive;
    //LVEisActive.checked = data.LVEisActive;
    var isArchiveLoaded = data.archiveLoaded;

    if( data.isActive )
      {
      // badge
      browser.action.setBadgeText({text: 'DCO'});
      browser.action.setBadgeBackgroundColor({color: "#2968a6"});
      
      // set the main div visible
      popup_div_content.classList.remove("display_none");
      popup_div_content.classList.add("display_block");
      title_popup.style.color = 'var(--bg-color1)';
      
      if(!isArchiveLoaded)
        {
        popup_div_iss.classList.remove("display_none");
        popup_div_iss.classList.add("display_block");        
        }
          
      // lv
      if( data.LVisActive )
        title_h2_lv.style.color = 'var(--bg-color1)';                
      else
        title_h2_lv.style.color = 'var(--bg-color2)';              

      // lve
      /*
      if( data.LVEisActive )
        title_h2_lve.style.color = 'var(--bg-color1)';                
      else
        title_h2_lve.style.color = 'var(--bg-color2)';  
      */                  
      
       execScripts(data);
       
      if( data.LVisActive)
        {
         popup_div_lvstart.classList.remove("display_none");
         popup_div_lvstart.classList.add("display_block");
        }           
      
      }
    else
      {
      // badge stuff
      browser.action.setBadgeText({text: ''});
      browser.action.setBadgeBackgroundColor({color: "gray"});  
      
      // set the main div invisible
      popup_div_content.classList.remove("display_block");
      popup_div_content.classList.add("display_none");
      
      popup_div_iss.classList.remove("display_block");
      popup_div_iss.classList.add("display_none");      
      
      title_popup.style.color = 'var(--bg-color2)';    
      title_h2_lv.style.color = 'var(--bg-color2)';
      
      //title_h2_lve.style.color = 'var(--bg-color2)';      

      data.LVisActive = false; 
      data.LVEisActive = false; 
                 
      browser.storage.local.set({LVisActive: false, LVEisActive: false}, function() 
        {          
        LVisActive.checked = false;
        //LVEisActive.checked = false;         
        });     
                         
      execScripts(data);
                     
      }    
    
    });
    
    
  
  /* switch CBE on / off */  
  isActiveSwitch.addEventListener("click", function(el) {
    var status = el.target.checked;
    browser.storage.local.set({isActive: status}, function() 
      {
       browser.storage.local.get(null, function(data)
        { 

        if( data.isActive )
          {
          
          // badge
          browser.action.setBadgeText({text: 'DCO'});
          browser.action.setBadgeBackgroundColor({color: "#2968a6"});
          
          // set the main div visible
          popup_div_content.classList.remove("display_none");
          popup_div_content.classList.add("display_block");
          
          popup_div_iss.classList.remove("display_none");
          popup_div_iss.classList.add("display_block");
                
          title_popup.style.color = 'var(--bg-color1)';
          
          execScripts(data);         
         
          }
        else
          {
          // badge
          browser.action.setBadgeText({text: ''});
          browser.action.setBadgeBackgroundColor({color: "gray"});  
          
          // set the main div invisible
          popup_div_content.classList.remove("display_block");
          popup_div_content.classList.add("display_none");

          popup_div_iss.classList.remove("display_block");
          popup_div_iss.classList.add("display_none");          
          
          title_popup.style.color = 'var(--bg-color2)'; 
          title_h2_lv.style.color = 'var(--bg-color2)';
          
          //title_h2_lve.style.color = 'var(--bg-color2)';      
    
          data.LVisActive = false; 
          data.LVEisActive = false; 
                     
          browser.storage.local.set({LVisActive: false, LVEisActive: false, archiveLoaded: false, archiveAdd: false}, function() 
            {          
            LVisActive.checked = false;
            //LVEisActive.checked = false;         
            }); 
            
          popup_div_lvstart.classList.remove("display_block");
          popup_div_lvstart.classList.add("display_none");                 
                             
          // remove the extra content from dom in active tab
          execScripts(data);  
          
          // close archive url
           var url = data.option2+'/index.php/'+data.option3+'/issue/archive';
           browser.tabs.query({currentWindow: true}, function(res) {
           for(var r=0;r<res.length;r++ )
             {
              if( res[r].url==url )
                {
                browser.tabs.remove(res[r].id,function(){} );
                }           
             }  
  
           });  
         
                         
          }            
        }); 
      }); 
    });
  /* switch CBE on / off */      
    

  
  /* switch LV on / off */  
  LVisActive.addEventListener("click", function(el) {
    var status = el.target.checked;
    browser.storage.local.set({LVisActive: status}, function() 
      {
       browser.storage.local.get(null, function(data)
        { 
        if( data.LVisActive )
          title_h2_lv.style.color = 'var(--bg-color1)'; 
        else
          title_h2_lv.style.color = 'var(--bg-color2)';

        execScripts(data);  

        if( data.LVisActive)
          {
           popup_div_lvstart.classList.remove("display_none");
           popup_div_lvstart.classList.add("display_block");
          }
        else
          {
           popup_div_lvstart.classList.remove("display_block");
           popup_div_lvstart.classList.add("display_none");          
          }                
       
        }); 
      }); 
    });
  /* switch LV on / off */   
  
  /* switch LVE on / off */  
  /*
  LVEisActive.addEventListener("click", function(el) {
    var status = el.target.checked;
    browser.storage.local.set({LVEisActive: status}, function() 
      {
       browser.storage.local.get(null, function(data)
        { 
        if( data.LVEisActive )
          title_h2_lve.style.color = 'var(--bg-color1)'; 
        else
          title_h2_lve.style.color = 'var(--bg-color2)';

         execScripts(data);    

          if( data.LVisActive || data.LVEisActive)
            {
             popup_div_lvstart.classList.remove("display_none");
             popup_div_lvstart.classList.add("display_block");
            }    
          else
            {
             popup_div_lvstart.classList.remove("display_block");
             popup_div_lvstart.classList.add("display_none");          
            }                       
                           
        }); 
      }); 
    });
  */
  /* switch LVE on / off */     

  
  /* startButton */
  popup_button_lvstart.addEventListener("click", function(el) {  
  browser.storage.local.get(null, function(data)
    { 
    var tabId = data.tabId;

    browser.scripting.executeScript({ 
      target: {tabId: tabId},
      files: ['js/content_lv_do.js']        
    }, function() 
      {
      if (browser.runtime.lastError) 
        console.log('There was an error injecting content_lv_do.js: \n' + browser.runtime.lastError.message);
      });   
    });     

   popup_div_lvstart.classList.add("display_none");
   popup_div_lvstart.classList.remove("display_block");  
  }); 
 
 
  /* archive button */
    var popup_button_iss = document.querySelector('#popup_button_iss'); 

    popup_button_iss.addEventListener("click", function(ev) { 
    
      browser.storage.local.get(null, function(data)
        {  
         var url = data.option2+'/index.php/'+data.option3+'/issue/archive';
        
          /* execute dco_archive.js over listener listenTabUpdated */        
          if(!data.archiveLoaded)
            {
             browser.tabs.create({ url: url, active: true }, function(tab) {
               browser.storage.local.set({archiveLoaded: true, tabId: tab.id }, function(){}); 
               }); 
            }                 
          });          

        ev.srcElement.parentElement.classList.remove("display_block");
        ev.srcElement.parentElement.classList.add("display_none");
      });
      

  
  /* optionButton */
  popup_button_options.addEventListener("click", function(el) {  
    browser.runtime.openOptionsPage();  
  }); 
  
});
/* CBE default actions after loading the popup */    