// ==UserScript==
// @name       Kanban improve (Business-specific)
// @namespace  http://tfs2010.it.volvo.net/b
// @version    0.1
// @description  Does the usability omprovements over standard SharePoint Kanban board
// @match      http://tfs2010.it.volvo.net:8080/tfs/Global/SEGOT-eCom-VolvoPentaShop/PentaBusiness/_backlogs/board
// @copyright  2014+, Volvo IT
// ==/UserScript==a

(function () {

    var customStyle =
    ".board-tile.cr {background-color: #3276b1; border-color: #285e8e; color: white} " +
    ".board-tile.at {color: gray} " +
    ".board-tile.expediter {background-color: #ed9c28; border-color: #d58512; color: white} " +
    ".board-tile.blocked {background-color: #d2322d; border-color: #ac2925; color: white} " +
    ".board-tile.pale {background-color: transparent; border-color: #ddd; color: #ddd}"
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

    function setCaseHighLight() {
        if ($("[data-case-id]").length < 1) {
            setTimeout(setCaseHighLight, 1000);
            return;
        }

        $('[data-case-id]')
            .mouseenter(function (evt) {
                var caseId = $(evt.target).attr('data-case-id');
                console.log('Mouse enter... case #:' + caseId)

                $("[data-case-id!='" + caseId + "']").addClass('pale')
            })
            .mouseleave(function (evt) {
                var caseId = $(evt.target).attr('data-case-id');
                $("[data-case-id]").removeClass('pale')
            });
    }

    $(function () {

        addGlobalStyle(customStyle);

        setCaseHighLight();
    });

})(jQuery);