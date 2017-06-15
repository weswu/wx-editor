$("#nav a").eq(0).hover(function() {
    $(".subnav").show();
    $(this).css("border-bottom", "3px solid #2c2c2c");
}, function() {
    $('.subnav').hover(function() {
        $(this).show();
        $("#nav a.frist").css("border-bottom", "3px solid #3f3f3f");
    }, function() {
        $(this).hide();
        if ($("#nav a.frist").attr('class') == "active frist") {
            $("#nav a.frist").css("border-bottom", "3px solid #33b5e5");
        }
        else {
            $("#nav a.frist").css("border-bottom", "3px solid #3f3f3f");
        }
    });
    if ($("#nav a.frist").attr('class') == "active frist") {
        $("#nav a.frist").css("border-bottom", "3px solid #33b5e5");
    }
    else {
        $("#nav a.frist").css("border-bottom", "3px solid #3f3f3f");
    }
    $('.subnav').hide();
});