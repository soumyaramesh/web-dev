$(document).ready(function () {
    $("#resizable").resizable({
        alsoResize: "#also",
        aspectRatio: true,
        autoHide: true,
        ghost: true,
        maxHeight: 300
    });
});