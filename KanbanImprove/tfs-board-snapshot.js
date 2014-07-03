// ==UserScript==
// @name       tfs board Snapshot 
// @namespace  http://tfs2010.it.volvo.net/t
// @version    0.1
// @description  Adds links To Business Board and team board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/*/_backlogs/board
// @copyright  2014+, Volvo IT
// ==/UserScript==

addJavaScriptHubGroupLink("Snapshot", "#","report", report);
var genericItemUrl = getGenericItemUrl();

function itemTitleAndLink(element){
	return("---"+ element.textContent + " <" + genericItemUrl + element.getAttribute("data-item-id")+ ">\n")
}

var itemRepresentation = itemTitleAndLink;

function addJavaScriptHubGroupLink(caption, url ,id, call) {
    var link = document.createElement('li');
    link.innerHTML = "<a id='"+ id +"'href='" + url + "' >" + caption + " </a>";
    appendLiToUlByClass("hub-groups", link);
    link.onclick = call;
}

function appendLiToUlByClass(matchClass, li) {
    var elems = document.getElementsByTagName('ul'), i;
    for (i in elems) {
        if ((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
            elems[i].appendChild(li);
        }
    }
}

function getGenericItemUrl(){
    //http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/_workitems#_a=edit&id=247482
    var projectName = document.getElementsByClassName("project-name")[0].textContent;
    console.log("Url = "+document.URL);
    return document.URL.split(projectName)[0] + projectName + "/_workitems#_a=edit&id=";
}

function report(){
    var report = "Board Snapshot\n";
    var i;
    //var genericItemUrl = getGenericItemUrl();
    var teamName = document.getElementsByClassName("team-name")[0].textContent;
    report +=("Snapshot of board for team : " + teamName); 
    var headerContainer = document.getElementsByClassName("header-container")[0];
    var headers = headerContainer.getElementsByClassName("member-header-content");
    var columnContainer = document.getElementsByClassName("content-container")[0];
    var columns = columnContainer.getElementsByClassName("member-content");
    for (i in headers) {
        if(headers[i].textContent != undefined){
            report +=("\n");
            report +=( "Lane = " + headers[i].textContent + "\n");
            var tickets = columns[i].getElementsByClassName("board-tile");
            var j;
            for (j in tickets){
                if (tickets[j].textContent != undefined){
                     report += itemRepresentation(tickets[j]);
                    //report +=("---"+ tickets[j].textContent + " <" + genericItemUrl + tickets[j].getAttribute("data-item-id")+ ">\n");
                    
                }
            }
            report +=("\n");
        }
    }
    console.log(report);
    document.location = 'data:Application/octet-stream,' +
        encodeURIComponent(report);
}

