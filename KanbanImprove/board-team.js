// ==UserScript==
// @name       Kanban improve (Team-specific)
// @namespace  http://tfs2010.it.volvo.net/t
// @version    0.1
// @description  Does the usability improvements over standard SharePoint Kanban board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaTeam/_backlogs/board
// @copyright  2014+, Volvo IT
// ==/UserScript==a

(function () {

    var customStyle =
    ".board-tile.cr {} " +
    ".board-tile.at {} " +
    ".board-tile.expediter {background-color: #ed9c28; border-color: #d58512; color: white} " +
    ".board-tile.blocked {background-color: #d2322d; border-color: #ac2925; color: white} "
    ;

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    $(function () {
        addGlobalStyle(customStyle);
    });

})(jQuery);