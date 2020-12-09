//Problem: No user interaction causes no change to application
// Solution: When user interacts cause changes appropriately
$(document).ready(function () {
    let HOST = location.origin.replace(/^http/, 'ws')
    let ws = new WebSocket(HOST);
    var color = $(".selected").css("background-color");
    var $canvas = $("canvas");
    var context = $canvas[0].getContext("2d");
    var lastEvent;
    var mouseDown = false;
    //When click on control list items
    $(".controls").on("click", "li", function () {
        // Deselect sibling elements
        $(this).siblings().removeClass("selected");
        // select clicked element
        $(this).addClass("selected");
        //cache current color
        color = $(this).css("background-color");
    });


    //when new color is pressed
    $("#revealColorSelect").click(function () {
        //show color select or hide color select
        changeColor();
        $("#colorSelect").toggle();
    });

    //update the new color span 
    function changeColor() {
        var r = $("#red").val();
        var g = $("#green").val();
        var b = $("#blue").val();
        $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    }
    //when color slider change 
    $("input[type=range]").change(changeColor);

    //when add color is pressed 
    $("#addNewColor").click(function () {
        //append the color to the controls ul
        var $newColor = $("<li></li>");
        $newColor.css("background-color", $("#newColor").css("background-color"));
        $(".controls ul").append($newColor);
        // select the new color
        $newColor.click();
    });


    //On mouse events on the canvas
    $canvas.mousedown(function (e) {
        lastEvent = e;
        mouseDown = true;
    }).mousemove(function (e) {
        //draw lines
        if (mouseDown) {
            context.beginPath();
            context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
            context.lineTo(e.offsetX, e.offsetY);
            context.strokeStyle = color;
            context.stroke();
            lastEvent = e;
        }
    }).mouseup(function () {
        ws.send(document.getElementById('myCanvas').toDataURL());
        mouseDown = false;
    }).mouseleave(function () {
        $canvas.mouseup();
    });
    // Added clear functionality
    $("#clear").click(function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        ws.send(document.getElementById('myCanvas').toDataURL());

    });



})
