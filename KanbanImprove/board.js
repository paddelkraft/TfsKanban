// ==UserScript==
// @name       Kanban improve
// @namespace  http://tfs2010.it.volvo.net/
// @version    0.1
// @description  Does the usability omprovements over standard SharePoint Kanban board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaTeam/_backlogs/board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaBusiness/_backlogs/board
// @copyright  2014+, Volvo IT
// ==/UserScript==a

// TODOs:
// Difference on Business board between AT and CR
// Difference on Scrum board between AT and Bug

(function () {

    var is_focused = true;

    function freezeHeaders() {

        if (!is_focused || $(".content-container.row.content").length < 1) {
            setTimeout(freezeHeaders, 1000);
            return;
        }

        //$('.hub-pivot-content')
        //	.clone()
        //	.remove(".content-container.row.content")
        //	.appendTo($('.hub-pivot-content').parent());
    }

    function improveBoard() {

        if (!is_focused || $(".content-container.row.content").length < 1) {
            setTimeout(improveBoard, 1000);
            return;
        }

        var allIds = [];

        var $allExpeditorItems = $(".board-tile")
            .each(function () {
                var itemElm = $(this);
                allIds.push(itemElm.data('item-id'));
            });

        console.log("Kanban improve: item ids: " + allIds);

        $.each(allIds, function (itemIndex, itemId) {
            console.log("Kanban improve: querying item: " + itemId);

            $.get("http://tfs2010.it.volvo.net:8080/tfs/Global/_api/_wit/workitems?ids=" + itemId, function (data) {

                var itemIsBlocked = data.__wrappedArray[0].fields["10160"] || "No";
                var itemClassification = data.__wrappedArray[0].fields["10986"] || "";

                console.log("Kanban improve: item " + itemId + " is blocked: " + itemIsBlocked + "; classification: " + itemClassification);

                var $itemElm = $(".board-tile[data-item-id=" + itemId + "]");

                if (itemClassification == 'CRExpedited' || itemClassification == 'ATExpedited') {
                    $itemElm.addClass('expediter');
                } else {
                    $itemElm.removeClass('expediter');
                }

                if (itemIsBlocked == "Yes") {
                    $itemElm.addClass('blocked');
                } else {
                    $itemElm.removeClass('blocked');
                }

                if (itemClassification == 'CR') {
                    $itemElm.addClass('cr');
                } else {
                    $itemElm.removeClass('cr');
                }

                if (itemClassification == 'AT') {
                    $itemElm.addClass('at');
                } else {
                    $itemElm.removeClass('at');
                }

            });
        });

        setTimeout(improveBoard, 10000);
    }

    $(function () {

        if ($(".agile-board").length > 0) {
            improveBoard();
        }

        freezeHeaders();

        $(window)
            .focus(function () { is_focused = true; })
            .blur(function () { is_focused = false; });
    });

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
})();
