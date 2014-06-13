// ==UserScript==
// @name       ecom Direct Board links 
// @namespace  http://tfs2010.it.volvo.net/t
// @version    0.1
// @description  Adds links To Business Board and team board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/*
// @copyright  2014+, Volvo IT
// ==/UserScript==

addHubGroupLink("Business Board", "http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaBusiness/_backlogs/board");
addHubGroupLink("Team Board", "http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaTeam/_backlogs/board");
addHubGroupLink("Definition Of Done", "http://tfs2010.it.volvo.net/sites/Global/SEGOT-eCom-VolvoPentaShop/Wiki%20Pages/Definition%20Of%20Done.aspx" );
addHubGroupLink("Process Information","http://tfs2010.it.volvo.net/sites/Global/SEGOT-eCom-VolvoPentaShop/Kanban/Forms/AllItems.aspx?RootFolder=%2Fsites%2FGlobal%2FSEGOT%2DeCom%2DVolvoPentaShop%2FKanban%2FProcess%20and%20Guidlines&FolderCTID=0x012000C1829E356508ED43BF1B0C3254A4C219&View={18BD1F16-2726-4EBC-8373-6D1A4C2DA3BF}");
addHubGroupLink("Enhancement planning","http://tfs2010.it.volvo.net/sites/Global/SEGOT-eCom-VolvoPentaShop/Kanban/eCom-Penta-IAT-Enhancement-Planning.xlsx");
//addHubGroupLink("caption", "url");

function addHubGroupLink(caption, url){
    var link = document.createElement('li');
    link.innerHTML = "<a href='"+ url +"' >" + caption + " </a>";
    appendLiToUlByClass("hub-groups", link);
}

function appendLiToUlByClass(matchClass, li) {
    var elems = document.getElementsByTagName('ul'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1) {
            elems[i].appendChild(li);
        }
    }
}
