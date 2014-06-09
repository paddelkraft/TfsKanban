// ==UserScript==
// @name       Kanban improve (Scrum board Specific)
// @namespace  http://tfs2010.it.volvo.net/s
// @version    0.1
// @description  Does the usability improvements over standard SharePoint Kanban board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaTeam/_boards
// @copyright  2014+, Volvo IT
// ==/UserScript==a

(function () {

    var isFocused = true;

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function pretendTilesAreLikeInKanbanBoard() {

        if (!isFocused || $("#taskboard-table").length < 1) {
            setTimeout(pretendTilesAreLikeInKanbanBoard, 1000);
            return;
        }

        $("[id^='taskboard-table_p']")
            .each(function () {
                var $elm = $(this);
                var itemId = $elm.attr("id").slice("taskboard-table_p".length);
                console.log("Kanban improve (Scrum): item #" + itemId);
                $elm.closest("tr")
                	.addClass("board-tile")
                	.attr("data-item-id", itemId);
            });
    }

    $(function () {

        pretendTilesAreLikeInKanbanBoard();

        addGlobalStyle(
            ".board-tile.cr {background-color: #3276b1; border-color: #285e8e; color: white} " +
            ".board-tile.at {color: gray} " +
            ".board-tile.expediter {background-color: #ed9c28; border-color: #d58512; color: white} " +
            ".board-tile.blocked {background-color: #d2322d; border-color: #ac2925; color: white} "
        );
    });

})(jQuery);