# DCO_CBE
![Screen](/readme_img/dco_cbe_01.jpg)


Due to some changes in the extension programming Manifest V3 (MV3) a simple migration from MV2 to MV3 is not possible. The extension must be adapted in many areas for this purpose. Because of the currently unclear support of Manifest v3 in the various browsers, the extension is explicitly named after version 3.

The extension uses following JavaScript APIs:
* action
* activeTab
* downloads
* i18n
* runtime
* scripting
* storage
* tabs

### v04
* LV extern: removed (CORS policy)
* DCO Archive: stop downloading
* DCO Archive: resume downloading
* DCO Archive: downloads are shuffled before being placed in the queue

## Link Validation
Looks for all a-Tags in the active Tab and marks them with an extra class, the attribute "dco_m" andd the attribute "href_origin". With the button in the popup everey marked url can validate with a HEAD-request.

![Screen](/readme_img/dco_cbe_lv_01.jpg)
![Screen](/readme_img/dco_cbe_lv_02.jpg)

### LV intern
Top- and second-level domian must be the same to mark the link.

## DCO Archive

Lists all issues with all articles. 

For each article are listed:
* Title
* Authorship
* Link to PDF Galley
* Abstract
* DOI
* URN (no longer supported since 2021)

![Screen](/readme_img/003_download.jpg)

### XML-Directory
The displayed archive page can be downloaded as an XML file.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<text xmlns="http://www.w3.org/1999/xhtml" id="dco_archive_content" date="26/10/2021">
  <div type="bibliography" subtype="issue" title="Bd. 7 (2021)" id="issue_id_5420">
    <listbibl>
      <bibl type="publication" subtype="completeIssue">
        <url type="view" status="200">https://journals.ub.uni-heidelberg.de/index.php/dco/issue/view/5420</url>
        <url type="cover">https://journals.ub.uni-heidelberg.de/public/journals/102/cover_issue_5420_de_DE.jpg</url>
      </bibl>
      <bibl type="publication" subtype="Editorial" title="DIE VERSTECKTE MACHT DER LISTEN" authors="Charlotte Schubert" pages="I-IV" id="article_id_78582">
        <url type="view" status="200">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/78582</url>
        <url type="PDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/78582/72572</url>
        <url type="DOI">https://doi.org/10.11588/dco.2021.7.78582</url>
        <url type="downloadPDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/download/78582/72572/215356</url>
      </bibl>
      <bibl type="publication" subtype="Digital Classics Online Artikel" title="CREATING THE FIRST DIGITAL HANDBOOK OF LATIN PHONETICS: BETWEEN LINGUISTICS, DIGITAL HUMANITIES AND LANGUAGE TEACHING" authors="Tommaso Spinelli" pages="1-20" id="article_id_76079">
        <url type="view" status="200">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/76079</url>
        <url type="PDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/76079/72579</url>
        <url type="DOI">https://doi.org/10.11588/dco.2021.7.76079</url>
        <abstract>Dieser Artikel beschreibt die Schaffung einer innovativen E-Learning-Ressource, die eine einzigartige Breite an Informationen zu Frequenz der Wörter und zu grammatikalischen und phonetischen Aspekten sowohl zum klassischen als auch zum Kirchenlatein bietet. Das digitale Toolkit, das sowohl als online Programm als auch als mobile Android-App erhältlich ist und eine Brücke zwischen Lehre und Forschung schlägt, bietet eine Liste der häufigsten lateinischen Lemmata sowie phonetischer und grammatikalischer Informationen, einschließlich ihrer Silbenbildung, Akzentuierung und klassischer und kirchlicher phonetischer Transkription gemäß den Standards des Internationalen Phonetischen Alphabets. Nach einem kurzen Überblick über die verschiedenen Arten, wie Latein ausgesprochen wurde und immer noch wird, werden die methodischen und praktischen Probleme erörtert, mit denen die Erstellung des Toolkits bei der Auswahl einer effektiven Lemmatisierungstechnik zur Identifizierung und Kategorisierung von gebeugten Wortformen, Schaffung von Algorithmen, Akzentuierung lateinischer Lemmata und Übertragung lateinischer Klänge (möglicherweise mit mehreren Zeichen des lateinischen Alphabets) in IPA-Zeichen konfrontiert wird. Dabei gibt es Einblicke in die Technologien, mit denen die Auswirkungen dieser neuen E-Learning-Ressource auf Lehre und Forschung maximiert werden.</abstract>
        <url type="downloadPDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/download/76079/72579/215371</url>
      </bibl>
      <bibl type="publication" subtype="Digital Classics Online Artikel" title="BUILDING A REPOSITORY OF EXERCISES FOR LEARNING LATIN" authors="Konstantin Schulz" pages="21-38" id="article_id_77313">
        <url type="view" status="200">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/77313</url>
        <url type="PDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/77313/72576</url>
        <url type="DOI">https://doi.org/10.11588/dco.2021.7.77313</url>
        <abstract>Die vorliegende Studie enthält Gütekriterien und eine Referenzimplementierung für eine Übungsdatenbank mit lateinischen Spracherwerbsübungen, insbesondere in Hinblick auf Wortschatz. Die Datenbank soll auch ohne Vorkenntnisse der Korpus- oder Computerlinguistik leicht zugänglich sein. Dadurch können Lehrkräfte an Gymnasien selbstständig Übungen erstellen, die weitestgehend an die Bedürfnisse der Lernenden anpassbar sind.</abstract>
        <url type="downloadPDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/download/77313/72576/215365</url>
      </bibl>
      <bibl type="publication" subtype="Digital Classics Online Artikel" title="DIGITAL HUMANITIES AUF DEM WEG ZU EINER WISSENSCHAFTSMETHODIK: TRANSPARENZ UND FEHLERKULTUR" authors="Charlotte Schubert" pages="39-53" id="article_id_82371">
        <url type="view" status="200">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/82371</url>
        <url type="PDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/82371/76588</url>
        <url type="DOI">https://doi.org/10.11588/dco.2021.7.82371</url>
        <abstract>Die Methoden der Digital Humanities sind seit längerer Zeit einer massiven Kritik ausgesetzt. Es sind vor allem zwei Vorwürfe, die immer wieder erhoben werden: Zum einen führten die Digital Humanities nicht zu neuen Ergebnissen, sondern würden Bekanntes in anderem Gewand präsentieren. Zum anderen würden die Methoden der Digital Humanities sogar auch zu falschen Ergebnissen führen. Weiterhin wird daraus gefolgert, daß die Reproduzierbarkeit und damit auch die wissenschaftliche Solidität der Ergebnisse fraglich sei. Der vorliegende Beitrag beschäftigt sich mit diesem Thema der (unterstellten oder tatsächlichen) Fehlerhaftigkeit, in dem dieser Vorwurf analysiert und ein Vorschlag zum kritischen Umgang mit Fehlern unterbreitet wird, der den Digital Humanities ihren wissenschaftsmethodischen Platz sichern kann.</abstract>
        <url type="downloadPDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/download/82371/76588/223161</url>
      </bibl>
      <bibl type="publication" subtype="Digital Classics Online Artikel" title="PAIN AND THE BODY IN CORPUS HIPPOCRATICUM: A DISTRIBUTIONAL SEMANTIC ANALYSIS" authors="Vojtěch Linka, Vojtěch Kaše" pages="54-71" id="article_id_81212">
        <url type="view" status="200">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/81212</url>
        <url type="PDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/view/81212/77994</url>
        <url type="DOI">https://doi.org/10.11588/dco.2021.7.81212</url>
        <abstract>Die Autoren der im
          <em>Corpus Hippocraticum</em>versammelten medizinischen Abhandlungen erwähnen häufig den Schmerz, seine Eigenschaften und seinen Ursprung. Gleichzeitig liefern sie jedoch keine ausdrückliche Definition oder Theorie des Schmerzes, seiner Natur und seiner Beziehung zu anderen wichtigen Aspekten der hippokratischen Medizin. Außerdem verwenden sie mindestens vier Wortfamilien, von denen man annimmt, dass sie im Altgriechischen Schmerzen bezeichnen. Dies bringt moderne Forscher zu der Frage, wie sich diese vier Schmerzwörter semantisch unterscheiden und inwieweit sie auf einer gemeinsamen Vorstellung von Schmerz beruhen. In diesem Artikel versuchen wir, diese Fragen zu beantworten, indem wir das Korpus mit Hilfe verschiedener computergestützter Textanalysemethoden analysieren, insbesondere mit Hilfe eines Ansatzes zur distributionellen semantischen Modellierung. Unsere Ergebnisse zeigen einen engen Zusammenhang zwischen einigen dieser Schmerzwörter, Körperteilen und pathologischen Zuständen. Die Ergebnisse werden außerdem mit den Erkenntnissen verglichen, die durch traditionelles genaues Lesen der Quellen gewonnen wurden.</abstract>
        <url type="downloadPDF">https://journals.ub.uni-heidelberg.de/index.php/dco/article/download/81212/77994/225972</url>
      </bibl>
    </listbibl>
  </div>
 ...
 
</text>
```

### Download all Issues as PDF
The PDF galleys of all issues and their individual contributions can be downloaded at once. The download iterates over a queue with adjustable delay from 3 to 5 seconds.

### Download all Issues as XML
As for PDF, only in the form of XML with Base64 encoded string.

### Stop downloading
Does exactly what it claims to do.

### Resume downloading
The automatic download can be interrupted when the window or tab lose focus and no interaction happens. The API Reference for Manifest Version 3 recommends working with chrome.alarms to schedule code to run periodically or at a specified time in the future. Since at the moment only periods of time can be specified in minutes, this is not an option here and the resumption must be done by clicking the button.

## Options
* Journal URL
* Journal Shortname
* Validation delay in seconds
* Download count
* Download interval in seconds

![Screen](/readme_img/004_options.jpg)
