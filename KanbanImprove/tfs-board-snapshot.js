// ==UserScript==
// @name       ecom Columns Snapshot 
// @namespace  http://tfs2010.it.volvo.net/t
// @version    0.1
// @description  Adds links To Business Board and team board
// @match      http://tfs2010.it.volvo.net:8080/*/_backlogs/board
// @copyright  2014+, Volvo IT
// ==/UserScript==

addProductBacklogViewTabsLink("Snapshot", "#","report", report);
var genericItemUrl = getGenericItemUrl();



function createTicketObject(element){
    return{
        id : element.getAttribute("data-item-id"),
        title : element.textContent,
        url : genericItemUrl + element.getAttribute("data-item-id")
    };
}

function appendLiToUlByClass(matchClass, li) {
    var elems = document.getElementsByTagName('ul'), i;
    for (i in elems) {
        if ((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
            elems[i].appendChild(li);
        }
    }
}

function addProductBacklogViewTabsLink(caption, url ,id, call) {
    var link = document.createElement('li');
    link.innerHTML = "<a id='"+ id +"'href='" + url + "' >" + caption + " </a>";
    appendLiToUlByClass("productbacklog-view-tabs", link);
    link.onclick = call;
}



function getGenericItemUrl(){
    var projectName = document.getElementsByClassName("project-name")[0].textContent;
    console.log("Url = "+document.URL);
    return document.URL.split(projectName)[0] + projectName + "/_workitems#_a=edit&id=";
}

function report(){
    var snapshot = {};
    var i;
    snapshot.time = new Date().getTime();
    //var genericItemUrl = getGenericItemUrl();
    var teamName = document.getElementsByClassName("team-name")[0].textContent;
    snapshot.board=teamName;
    var headerContainer = document.getElementsByClassName("header-container")[0];
    var headers = headerContainer.getElementsByClassName("member-header-content");
    var columnContainer = document.getElementsByClassName("content-container")[0];
    var columns = columnContainer.getElementsByClassName("member-content");
    snapshot.lanes = [];
    for (i in headers) {
        if(headers[i].textContent != undefined){
            var lane ={};
            snapshot.lanes.push(lane);
            lane.name =  headers[i].getAttribute("title");
            
            if(headers[i].getElementsByClassName("current")[0]){
                lane.wip = {};
                lane.wip.current = headers[i].getElementsByClassName("current")[0].textContent;
            }
            if(headers[i].getElementsByClassName("limit")[0])
            {
            	lane.wip.limit = headers[i].getElementsByClassName("limit")[0].textContent.replace("/","");
            }
            var tickets = columns[i].getElementsByClassName("board-tile");
            lane.tickets = []
            var j;
            for (j in tickets){
                var ticket={};
                if (tickets[j].textContent != undefined){
                    lane.tickets.push(createTicketObject(tickets[j]));
                    
                }
            }
            
        }
    }
    console.log(JSON.stringify(snapshot));
    document.location = 'data:Application/octet-stream,' + JSON.stringify(snapshot);
}

function checkWip(){
    var i;
     var wipCurrent = 0;
     var wipLimit = 0;
    console.log("checkWip()");
    var headerContainer = document.getElementsByClassName("header-container")[0];
    if(!headerContainer){
    	setTimeout(checkWip,1000);
        return;
    }
    var headers = headerContainer.getElementsByClassName("member-header-content");
    var columnContainer = document.getElementsByClassName("content-container")[0];
    var columns = columnContainer.getElementsByClassName("member-content");
    for (i in headers) {
        if(headers[i].textContent != undefined){
            console.log(headers[i].textContent);
            wipCurrent = 0;
            wipLimit = 0;
            if(headers[i].getElementsByClassName("current")[0]){
                wipCurrent = parseInt(headers[i].getElementsByClassName("current")[0].textContent);
            }
            if(headers[i].getElementsByClassName("limit")[0])
            {
            	wipLimit = parseInt(headers[i].getElementsByClassName("limit")[0].textContent.replace("/",""));
            }
            console.log("wipCurrent ="+wipCurrent);
            console.log("wipLimit ="+wipLimit);
            if(wipCurrent > wipLimit){
            	columns[i].setAttribute("style","background-color:#FBEFEF");
                headers[i].parentNode.setAttribute("style","background-color:#FBEFEF");
                console.log("Wip brooken");
            }
            else{
            	columns[i].setAttribute("style","");
                headers[i].parentNode.setAttribute("style","");
            }
        }
    }
   // setTimeout(checkWip,3000);
}

setTimeout(checkWip,2000);

function addHashes(){
    var tiles = document.getElementsByClassName("board-tile");
    console.log("AddHashes");
    if(!tiles[0]){
    	setTimeout(addHashes,500);
        return;
    }
    for (i in tiles) {
        if(tiles[i].textContent != undefined){
            var tile = tiles[i];
            var crId = tile.innerHTML.match(/\d{8}-\d{3}/);
            if(crId){
            	//tile.innerHTML = tile.innerHTML.replace(/\d{8}-\d{3}/,"#" + crId);
            	tile.setAttribute("data-item-id",crId);
            	console.log("AddHashes " + crId);
            }
            
        }
    }
    setTimeout(addHashes,5000);
    
}


//addHashes();
