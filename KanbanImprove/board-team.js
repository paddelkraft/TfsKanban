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