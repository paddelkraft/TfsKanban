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


        $.post(
            "//" + window.location.host + "/tfs/Global/_api/_wit/pageWorkItems",
            {
                workItemIds: "" + allIds,
                fields: "System.Id,System.State,System.TeamProject,System.Title,System.WorkItemType,Volvo.ecomTeam,Microsoft.VSTS.CMMI.Blocked,Volvo.Common.CaseOrigin,Volvo.Common.CaseOriginNumber",
                __RequestVerificationToken: "HEe_gvHuFM-KTkUMtR1tOgbMwjbCxiAitzOsZHtXoa15x0S_QjahxLzq-Qcb39IaGitJ1xE4ubv_pSD7wZwD0ztin6vQcZYCDniiPmg3F9VEtbVLJxW3jDUDnjlfj5cDFe-w4oJhwZP2LCP_5pWiq2DcCD41"
            },
            function (data) {
                $.each(data.rows, function (_, item) {
                    var itemId = item[0];
                    var itemIsBlocked = item[6] || "No";
                    var itemClassification = item[5] || "";
                    var caseId = (item[7] || "") + "|" + (item[8] || "");

                    var $itemElm = $(".board-tile[data-item-id=" + itemId + "]");

                    $itemElm.attr('data-case-id', caseId);

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

        setTimeout(improveBoard, 5000);
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

        $(window)
            .focus(function () { is_focused = true; })
            .blur(function () { is_focused = false; });
    });

})();
