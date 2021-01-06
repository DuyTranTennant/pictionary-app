function showCanvasEvent() {
    $('#board').show();
    $("#stop").prop("disabled", false);
    $("#clear").prop("disabled", false);
    $("#start").prop("disabled", "disabled");
}

function showPreviewEvent() {
    $('#preview').show();
    $("#start").prop("disabled", "disabled");
    $("#stop").prop("disabled", "disabled");
    $("#clear").prop("disabled", "disabled");
}
function drawingStopEvent() {
    $("#start").prop("disabled", false);
    $("#stop").prop("disabled", "disabled");
    $('#board').hide();
}