function showCanvasEvent() {
    $('#board').show();
    $("#stop").prop("disabled", false);
    $("#clear").prop("disabled", false);
    $("#start").prop("disabled", "disabled");
}

function showWordToDraw(word) {
    $('#word').text(word);
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

function getWordsFromServer(){
    alert("send");
}

function getRandomWordsFromServer(){
    alert("random");
}