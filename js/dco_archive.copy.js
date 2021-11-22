'use strict';

/*  dco_archive.js  
                         
    @need js/browser.js
    @need js/extension.functions.js 
           
    @need browser.runtime
    @need browser.storage
    @need browser.i18n
    @need browser.browserAction
    @need browser.tabs
    
 
Reading information from the parsed HTML page is primarily based on DOM selectors. 
Therefore, even minor changes to the appearance of the web page can disrupt functionality.    
           
*/ 
/*
xml-sitemap from ojs 
https://journals.ub.uni-heidelberg.de/index.php/dco/sitemap
contain a set of viewable urls
*/

var xml_div;
var content2show;


  browser.storage.local.get(null, function(data)
    {  
      var doc = document.cloneNode(true);

      /* add the archive body to the visible div */
      var body = doc.querySelector('body');
      //document.querySelector('body').innerHTML = body.innerHTML;
      
      /* add the invisible div on the end of body - the div is for dco_issues.xml */
      var xml_div = document.createElement("text");
      xml_div.classList.add('display_none');
      xml_div.setAttribute('id','dco_archive_content');      
      xml_div.setAttribute('date', getDateFromNow(1) );           
      document.querySelector('body').appendChild(xml_div);      
      xml_div = document.querySelector('#dco_archive_content');      
     
     
      /* copy all links (primarily css and favicon) from HTML-head */
      for(var value of doc.querySelectorAll('head link'))
        {
        //document.querySelector('head').appendChild(value);
        }

      /* copy all classes to body */
      for(var value of body.classList.values()) 
        {
        //document.querySelector('body').classList.add(value);
        }
        
      /* remove all the script stuff (primary js) */
      for(var value of document.querySelectorAll('script')) 
        {
        //value.parentNode.removeChild(value);
        }      

      /* remove the original content of the archive-site - will be particular filled */
      var content2show = document.querySelector('.issues_archive');        
      content2show.innerHTML='';
      
      /* central images from block plugin */
      addLeadingHost(document,data.option2);
    

      var all_issues = doc.querySelectorAll('.obj_issue_summary .title'); 
      for(var i=0;i<all_issues.length;i++)
        {
        /* hidden xml_div - begin */
        var issue = all_issues[i];
        var href = issue.getAttribute('href').trim();
        var title = issue.innerHTML.trim();
        var issue_id = 'issue_id_'+href.replace(data.option2+'/index.php/'+data.option3+'/issue/view/',''); 
        
        var issueElement = document.createElement("div");
        issueElement.setAttribute('type','bibliography');
        issueElement.setAttribute('subtype','issue');
        issueElement.setAttribute('title',title);
        issueElement.setAttribute('id',issue_id); //htmlids
        
        xml_div.appendChild(issueElement);
        
        var listBiblElement = document.createElement("listbibl");
        issueElement.appendChild(listBiblElement);
        
        var biblElement = document.createElement("bibl");
        biblElement.setAttribute('type','publication');  
        biblElement.setAttribute('subtype','completeIssue');     
        listBiblElement.appendChild(biblElement);     
        
        var urlViewElement = document.createElement("url");
        urlViewElement.setAttribute('type','view');
        urlViewElement.innerHTML=href;
        biblElement.appendChild(urlViewElement);
        /* hidden xml_div - end */    
        
        
        /* visible content div -begin */  
        var titleElement2show = document.createElement('h1');
        titleElement2show.innerHTML = title;
        content2show.appendChild(titleElement2show);
        
        var issue_sum = issue.parentNode;
        issue_sum.setAttribute('id',issue_id);
        issue_sum.classList.add('obj_issue_toc');
        content2show.appendChild(issue_sum);

        var hr2sep = document.createElement('hr');
        hr2sep.setAttribute('style','border: 0; border-top: 1px solid #2968a6; margin-bottom:20px; margin-top:10px;'); 
        content2show.appendChild(hr2sep);
        /* visible content div -end */           


        // because of async request we can only processing infos from the request itself and not from the calling environment
        // so we have to operate with the issue id
        doRequest(href, 'GET', function(request) { 
        
        // issue id from request 
        var id = 'issue_id_'+request.responseURL.replace(data.option2+'/index.php/'+data.option3+'/issue/view/','');         
        var urlElement = xml_div.querySelector('#'+id+' url[type="view"]');
        urlElement.setAttribute('status',request.status); 
        var listBiblElement = xml_div.querySelector('#'+id+' listbibl');            

        if(request.status==200)
          {
          var doc_issue = new DOMParser().parseFromString(request.responseText, 'text/html');
          
          /* visible content div -begin */   
          var issueElement2show = content2show.querySelector('#'+id);
          /* visible content div -end */  
                      
          var issue_galleys = doc_issue.querySelector('.galleys');          
          if(issue_galleys!=null)
            {
            var issue_galleys_list = issue_galleys.querySelectorAll('.obj_galley_link');
            for(var g=0; g<issue_galleys_list.length;g++)
              {
              var galleyElement = document.createElement("url");
              var type = issue_galleys_list[g].innerText.trim();
              type = type.replace(' (Deutsch)','');
              type = type.replace(' (English)','');
              galleyElement.setAttribute('type',type);
              galleyElement.innerHTML=issue_galleys_list[g].getAttribute('href');
              urlElement.parentNode.appendChild(galleyElement);
              if(type=='PDF')
                {
                /* adding an element with type downloadPDF */
                var galleyElement2 = document.createElement("url");
                galleyElement2.setAttribute('type',"downloadPDF");
                galleyElement2.innerHTML=issue_galleys_list[g].getAttribute('href').replace('/view/','/download/'); 
                urlElement.parentNode.appendChild(galleyElement2);               
                }
              
              }            
            
            /* visible content div -begin */  
            
            /*
            var pdf_gal = issue_galleys.querySelector('.obj_galley_link.pdf');
            if( pdf_gal!=undefined )
              {
              var inputel = document.createElement('input');
              inputel.setAttribute('type','checkbox');
              inputel.setAttribute('value',pdf_gal.getAttribute('href') );
              pdf_gal.parentNode.insertBefore(inputel,pdf_gal);
              }
            */ 
            issueElement2show.appendChild(issue_galleys);
            issueElement2show.appendChild(document.createElement('br'));
            issueElement2show.appendChild(document.createElement('br'));
            /* visible content div -end */                  
            
            }//end if

          var dco_sections = doc_issue.querySelectorAll('.sections div.section');
          for(var s=0; s<dco_sections.length; s++)
            {

            var section = dco_sections[s];
            var section_id = section.getAttribute('id');
            var section_name = '';            
            var section_title = section.querySelector('h2');
            if( section_title!=null )
              section_name = section_title.innerText.trim();   

            /* visible content div -begin */  
            var minus_circle = section.querySelectorAll('.fa-minus-circle');
            for(var mc=0; mc<minus_circle.length;mc++)
              {
              minus_circle[mc].parentNode.removeChild(minus_circle[mc]);
              }               
            issueElement2show.appendChild(section); 
            /* visible content div -end */                      
            

            var section_articles = section.querySelectorAll('ul[class="cmp_article_list articles"] li .obj_article_summary'); 

            for(var sas=0; sas<section_articles.length;sas++)
              {
              var s_article = section_articles[sas]; 
                          
              var s_article_element = s_article.querySelector('.title a');
              var s_article_view_href = s_article_element.getAttribute('href').trim();
              var s_article_name = s_article_element.innerText.trim();


              var s_article_authors = '';
              var s_article_authors_element = s_article.querySelector('.meta .authors');
              if( s_article_authors_element ) s_article_authors = s_article_authors_element.innerText.trim();
               
              var s_article_pages = '';
              var s_article_pages_element = s_article.querySelector('.meta .pages');
              if( s_article_pages_element ) s_article_pages = s_article_pages_element.innerText.trim();          
              

              var biblElement = document.createElement("bibl");
              biblElement.setAttribute('type','publication');  
              biblElement.setAttribute('subtype',section_name);
              biblElement.setAttribute('title',s_article_name);
              biblElement.setAttribute('authors',s_article_authors);
              biblElement.setAttribute('pages',s_article_pages);  
              listBiblElement.appendChild(biblElement);
              
              var article_view = s_article.querySelector('.title a');
              var viewurl = article_view.getAttribute('href').trim(); 
              var urlElement = document.createElement("url");
              urlElement.setAttribute('type','view');
              urlElement.innerHTML=viewurl;     
                       
              var article_id = 'article_id_'+viewurl.replace(data.option2+'/index.php/'+data.option3+'/article/view/','');     
              biblElement.setAttribute('id',article_id);   
              biblElement.appendChild(urlElement);
              
              /* visible content div -begin */     
              s_article.setAttribute('id',article_id);           
              /* visible content div -end */                 
              
              /* galleys of article and pid */
              doRequest(viewurl, 'GET', function(ArticleRequest) {
              
                var article_id = 'article_id_'+ArticleRequest.responseURL.replace(data.option2+'/index.php/'+data.option3+'/article/view/','');     
                var biblElement = xml_div.querySelector('#'+article_id);
                var urlElement = xml_div.querySelector('#'+article_id+' url[type="view"]');
                urlElement.setAttribute('status',ArticleRequest.status);
                
                var doc_article = new DOMParser().parseFromString(ArticleRequest.responseText, 'text/html');
                var galleys_links = doc_article.querySelectorAll('.galleys_links li a');
                for(var gli=0; gli<galleys_links.length; gli++)
                  {
                  var galley_link = galleys_links[gli];
                  var galley_href = galley_link.getAttribute('href').trim();
                  var galley_type = galley_link.innerText.trim();
                  galley_type = galley_type.replace(' (Deutsch)','');
                  galley_type = galley_type.replace(' (English)','');

                  var urlElement = document.createElement("url");
                  urlElement.setAttribute('type',galley_type);
                  urlElement.innerHTML=galley_href;
                  biblElement.appendChild(urlElement);
                  if( galley_type=="PDF" )
                    {
                    var urlElement2 = document.createElement("url");
                    urlElement2.setAttribute('type','downloadPDF');
                    urlElement2.innerHTML=galley_href.replace('/view/','/download/');
                    biblElement.appendChild(urlElement2);
                    }
                  
                  }
                  
                

                  
                /* visible content div -begin */ 
                var article_div = document.querySelector('#'+article_id);     
                var abstract_p = doc_article.querySelector('.abstract p');
                if( abstract_p!=null)
                  article_div.appendChild(abstract_p);                            
                /* visible content div -end */
           
                var pids = doc_article.querySelectorAll('.pubid_list');
                for(var pi=0; pi<pids.length; pi++)
                  {
                  var pid = pids[pi];
                  var pid_label = pid.querySelector('.label').innerText.trim();
                  var pid_value_el = pid.querySelector('.value a');
                  var pid_value = pid_value_el.getAttribute('href').trim();                                   
                  
                  var pidElement = document.createElement("url");
                  pidElement.setAttribute('type',pid_label.replace(':',''));
                  pidElement.innerHTML=pid_value; 
                  biblElement.appendChild(pidElement);

                  /* visible content div -begin */ 
                  var pidPElement = document.createElement("p");
                  pidPElement.innerHTML = pid_label + ' <a href="'+pid_value+'">' + pid_value + '</a>';
                  article_div.appendChild(pidPElement); 
                  /* visible content div -end */                                    
                  
                  }//end for pids 
                  
                if( abstract_p!=null)
                  {
                  var abstractElement = document.createElement("abstract");
                  abstractElement.innerHTML=abstract_p.innerHTML; 
                  biblElement.appendChild(abstractElement);                  
                  }                   
                  
                  
                /* visible content div -begin */                 
                var hr2sep = document.createElement('br');
                article_div.appendChild(hr2sep);    
                /* visible content div -end */                
                             
              });
              
              }//end for section_articles
            
            }//end for dco_sections

          }//end if request status 200    
   
        });

        }//end for all_issues
        
      
      /* visible content div -begin */ 
      var issue_cover = content2show.querySelectorAll('.cover');
      issue_cover.forEach(function(item){
        item.classList.add('float_none','mbo');
       });

      var issue_title = content2show.querySelectorAll('.obj_issue_summary .title');
      issue_title.forEach(function(item){
        item.parentNode.insertBefore(document.createElement("p"),item);
       });
      /* visible content div -end */  

    window.setTimeout(dcoArchiveSomeExtraButtons,5000);

    });