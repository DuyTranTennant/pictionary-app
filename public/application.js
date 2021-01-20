
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

    const toggleChatboxBtn = document.querySelector(".js-chatbox-toggle");
    const chatbox = document.querySelector(".js-chatbox");
    const chatboxMsgDisplay = document.querySelector(".js-chatbox-display");
    const chatboxForm = document.querySelector(".js-chatbox-form");

    // Toggle the visibility of the chatbox element when clicked
    // And change the icon depending on visibility

    toggleChatboxBtn.addEventListener("click", function () {
        toggleChatbox(chatbox, toggleChatboxBtn);
    });

    // Form input using method createChatBubble
    // To append any user message to display
    chatboxForm.addEventListener("submit", e => {
        sendChatmessage(chatboxMsgDisplay, ws, chatboxForm, e);
    });

    const clearSketchPad = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        ws.send(JSON.stringify({ command: constants.DRAWING, message: canvas.toDataURL() }));
    }

    const init = () => {
        $("#status").text("Initialising");
        $("#start").prop("disabled", false);
        $("#stop").prop("disabled", "disabled");
        $("#clear").prop("disabled", "disabled")
        $("#board").hide();
        $("#preview").hide();
        clearSketchPad();
        $('#word').text('--------')
    }

    ws.onopen = () => {
        init()

        $("#start").click(() => ws.send(JSON.stringify({ command: constants.START })));
        $("#stop").click(() => ws.send(JSON.stringify({ command: constants.STOP })));
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
            ws.send(JSON.stringify({ command: constants.DRAWING, message: canvas.toDataURL() }));
            mouseDown = false;
        }).mouseleave(() => {
            $canvas.mouseup();
        });
        // Added clear functionality
        $("#clear").click(clearSketchPad);
    }

    ws.onclose = () => { $("#status").text("Disconnected") }

    ws.onmessage = ({ data }) => {
        const { command } = JSON.parse(data);
        switch (command) {
            case constants.SHOW_CANVAS:
                showCanvasEvent();
                showWordToDraw(JSON.parse(data).word);
                break;
            case constants.SHOW_PREVIEW:
                showPreviewEvent();
                break;
            case constants.DRAWING_STOPPED:
                drawingStopEvent();
                break;
            case constants.DRAWING:
                $preview.prop("src", JSON.parse(data).payload);
                break;
            case constants.INITIALISE:
                init();
                break;
            case constants.CHAT:
                createChatBubble(JSON.parse(data).message, 'their_chatbox__display_chat', chatboxMsgDisplay);
                openChatBox(chatbox, toggleChatboxBtn);
                break;
            default:
                break;
        }
    };

    ws.onerror = (event) => {
        console.error(event);
    }
})
