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

        setTimeout(pretendTilesAreLikeInKanbanBoard, 1000);

        if (!isFocused || $("#taskboard-table").length < 1) {
            return;
        }

        $("[id^='taskboard-table_p']")
            .each(function () {
                var $elm = $(this);
                var itemId = $elm.attr("id").slice("taskboard-table_p".length);
                $elm.closest("tr")
                	.addClass("board-tile")
                	.attr("data-item-id", itemId);
            });

        $(".tbTile")
            .each(function () {
                var $elm = $(this);
                var itemId = $elm.attr("id").slice("tile-".length);
                $elm.find(".tbTileContent")
                	.addClass("board-tile")
                	.attr("data-item-id", itemId);
            });
    }

    $(function () {

        pretendTilesAreLikeInKanbanBoard();

        addGlobalStyle(
            ".board-tile.cr { } " +
            ".board-tile.at { } " +
            ".taskboard-row.board-tile.expediter {background-color: #fcf8e3; border-color: #d58512;} " +
            ".tbTile .tbTileContent.board-tile.expediter {background-color: #ed9c28; border-color: #d58512;} " +
            ".tbTile .tbTileContent.board-tile.expediter .witTitle, .tbTile .tbTileContent.board-tile.expediter .witRemainingWork, .tbTile .tbTileContent.board-tile.expediter .witAssignedTo  { color: white} " +

            ".tbTile .tbTileContent.board-tile.blocked {background-color: #d2322d; border-color: #ac2925; } " +
            ".tbTile .tbTileContent.board-tile.blocked .witTitle, .tbTile .tbTileContent.board-tile.blocked .witRemainingWork, .tbTile .tbTileContent.board-tile.blocked .witAssignedTo { color: white} " +
            ".taskboard-row.board-tile.blocked {background-color: #f2dede; } "
        );

        $(window)
            .focus(function () { isFocused = true; })
            .blur(function () { isFocused = false; });
    });

})(jQuery);