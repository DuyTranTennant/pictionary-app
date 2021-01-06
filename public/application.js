//Problem: No user interaction causes no change to application

// Solution: When user interacts cause changes appropriately
$(document).ready(() => {
    let HOST = location.origin.replace(/^http/, 'ws')
    let ws = new WebSocket(HOST);
    $("#status").text("Connecting")
    var $canvas = $("canvas");
    var canvas = $canvas[0];
    var context = canvas.getContext("2d");
    var $preview = $("#preview");
    var lastEvent;
    var mouseDown = false;

    const clearSketchPad = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        ws.send(canvas.toDataURL())
    }

    const init = () => {
        $("#status").text("Initialising");
        $("#start").prop("disabled", false);
        $("#stop").prop("disabled", "disabled");
        $("#clear").prop("disabled", "disabled")
        $("#board").hide();
        $("#preview").hide();
        clearSketchPad()
    }

    ws.onopen = () => {
        init()

        $("#start").click(() => ws.send(constants.START));
        $("#stop").click(() => ws.send(constants.STOP));
        $("#status").text("Connected")

        //On mouse events on the canvas
        $canvas.mousedown((e) => {
            lastEvent = e;
            mouseDown = true;
        }).mousemove((e) => {
            //draw lines
            if (mouseDown) {
                context.beginPath();
                context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                lastEvent = e;
            }
        }).mouseup(() => {
            ws.send(canvas.toDataURL());
            mouseDown = false;
        }).mouseleave(() => {
            $canvas.mouseup();
        });
        // Added clear functionality
        $("#clear").click(clearSketchPad);
    }

    ws.onclose = () => {
        $("#status").text("Disconnected")
    }

    ws.onmessage = ({ data }) => {
        const { command, payload } = JSON.parse(data);
        switch (command) {
            case constants.SHOW_CANVAS:
                $('#board').show();
                $("#stop").prop("disabled", false)
                $("#clear").prop("disabled", false)
                $("#start").prop("disabled", "disabled")
                break;
            case constants.SHOW_PREVIEW:
                $('#preview').show();
                $("#start").prop("disabled", "disabled");
                $("#stop").prop("disabled", "disabled");
                $("#clear").prop("disabled", "disabled")
                break;
            case constants.DRAWING_STOPPED:
                $("#start").prop("disabled", false)
                $("#stop").prop("disabled", "disabled")
                $('#board').hide();
                break;
            case constants.DRAWING:
                $preview.prop("src", payload);
                break;
            case constants.INITIALISE:
                init()
                break;
            default:
                break;
        }
    };

    ws.onerror = (event) => {
        console.error(event)
    }
})
