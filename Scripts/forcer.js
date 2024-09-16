"use strict";
(function () {
    let window_loc = window.parent.location.href;
    if (window_loc != null && window_loc == window.location.href) {
        window.location.replace("/");
    }
})();
