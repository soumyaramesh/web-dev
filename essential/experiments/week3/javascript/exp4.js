$(document).ready(function () {
    $("#blue").mouseenter(function () {
        $("#blue").fadeTo('fast', 1)
    });
    $("#blue").mouseleave(function () {
        $("#blue").fadeTo('fast', 0.5)
    });
    $("#orange").click(function () {
        $("#orange").fadeOut('slow');
    });
});