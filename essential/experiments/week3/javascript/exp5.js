$(document).ready(function () {
    $("#button").click(function () {
        var li = $('input[name=listItem]').val();
        $(".list").append('<div class="delItem">' + li + '</div>');
    });
    
    $(document).on('click', '.delItem', function () {
        $(this).remove()
    });
});