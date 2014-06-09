// ==UserScript==
// @name       Kanban improve (common)
// @namespace  http://tfs2010.it.volvo.net/
// @version    0.1
// @description  Does the usability improvements over standard SharePoint Kanban board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaBusiness/_backlogs/board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaTeam/_backlogs/board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaTeam/_boards
// @copyright  2014+, Volvo IT
// ==/UserScript==a

(function () {

    var is_focused = true;

    //function freezeHeaders() {

    //    if (!is_focused || $(".content-container.row.content").length < 1) {
    //        setTimeout(freezeHeaders, 1000);
    //        return;
    //    }

    //}

    function improveBoard() {

        if (!is_focused || ($(".board-tile").length < 1)) {
            setTimeout(improveBoard, 1000);
            return;
        }

        var allIds = [];

        $(".board-tile")
            .each(function () {
                var itemElm = $(this);
                allIds.push(itemElm.data('item-id'));
            });

        console.log("Kanban improve: item ids: " + allIds);

        $.each(allIds, function (itemIndex, itemId) {
            console.log("Kanban improve: querying item: " + itemId);

            $.get("//" + window.location.host + "/tfs/Global/_api/_wit/workitems?ids=" + itemId, function (data) {

                var itemIsBlocked = data.__wrappedArray[0].fields["10160"] || "No";
                var itemClassification = data.__wrappedArray[0].fields["10986"] || "";

                console.log("Kanban improve: item " + itemId + " is blocked: " + itemIsBlocked + "; classification: " + itemClassification);

                var $itemElm = $(".board-tile[data-item-id=" + itemId + "]");

                setClassBasedOnExpectation($itemElm,
                    ['CRExpedited', 'ATExpedited'], itemClassification,
                    'expediter');

                setClassBasedOnExpectation($itemElm,
                    "Yes", itemIsBlocked,
                    'blocked');

                setClassBasedOnExpectation($itemElm,
                    'CR', itemClassification,
                    'cr');

                setClassBasedOnExpectation($itemElm,
                    'AT', itemClassification,
                    'at');

            });
        });

        setTimeout(improveBoard, 10000);
    }

    function setClassBasedOnExpectation($elm, expected, actual, className) {

        var evaluationResult = false;

        if ($.isArray(expected)) {
            $.each(expected, function (_, elm) {
                evaluationResult |= elm == actual;
            });
        } else {
            evaluationResult = expected == actual;
        }

        if (evaluationResult) {
            $elm.addClass(className);
        } else {
            $elm.removeClass(className);
        }
    }

    $(function () {

        improveBoard();

        //freezeHeaders();

        $(window)
            .focus(function () { is_focused = true; })
            .blur(function () { is_focused = false; });
    });

})();
