// Constants
var TARGET_FRAMETIME = 1.0 / 60.0;

// Create a canvas
var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

// Game variables
var playTime = 0;
// var images is in cookie.js
var numLoadedPictures = 0;
var numPictures = 1;

// Key press.
var keyPressCode = -1;

function createfunction(i) {
    return function () { OnClickButton(i); };
}

document.onkeydown = function (modifier) {
    keyPressCode = modifier.keyCode
}

function sign(number) {
    return number ? number < 0 ? -1 : 1 : 0;
}

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var loadImages = function () {
    // Create a container with all needed images
    images = new Object();
    images.data = {};
    images.data["kipferl"]= new Image();
    images.data["kipferl"].mouseclick = function () { OnCookieClick() };
    images.data["kipferl"].cookieX = 700;
    images.data["kipferl"].cookieY = 100;
    images.data["kipferl"].cookieH = 500;
    images.data["kipferl"].cookieW = 500;

    //images.data["buy0"] = new Image();
    //images.data["buy0"].mouseclick = function () { OnBuy0Click() };
    //images.data["buy0"].cookieX = 500;
    //images.data["buy0"].cookieY = 200;
    //images.data["buy0"].cookieH = 100;
    //images.data["buy0"].cookieW = 100;

    images.data["frame"] = new Image();
    images.data["frame"].mouseclick = function () { };
    images.data["frame"].cookieW = 0;
    images.data["frame"].cookieH = 0;

    images.data["tree"] = new Image();
    images.data["tree"].mouseclick = function () { };
    images.data["tree"].cookieW = 0;
    images.data["tree"].cookieH = 0;

    images.data["elf"] = new Image();
    images.data["elf"].mouseclick = function () { };
    images.data["elf"].cookieW = 0;
    images.data["elf"].cookieH = 0;

    images.data["button"] = new Image();
    images.data["button"].mouseclick = function () { };
    images.data["button"].cookieW = 0;
    images.data["button"].cookieH = 0;

    images.data["nothing"] = new Image();
    images.data["nothing"].mouseclick = function () { };
    images.data["nothing"].cookieW = 0;
    images.data["nothing"].cookieH = 0;

    for (var i = 0; i < maxNumProducers; i++) {
        var xPos = i > (maxNumProducers / 2 - 1) ? 950 : 600;
        var yPos = 720 + (i % (maxNumProducers / 2)) * 70;

        images.data["button" + i] = new Image();
        images.data["button" + i].index = i;
        images.data["button" + i].mouseclick = createfunction(i);
        images.data["button"+i].cookieX = xPos;
        images.data["button"+i].cookieY = yPos;
        images.data["button"+i].cookieH = 70;
        images.data["button"+i].cookieW = 350;
    }

    images.numImages = 0;
    for (var key in images.data)
        images.numImages++;
    images.numLoadedImages = 0;

    for (var key in images.data) {
        images.data[key].addEventListener("load", function () {
            images.numLoadedPictures++;
        }, false);
    }
    // Function to get an image
    images.getImage = function (name) {
        return images.data[name];
    }
    // All images loaded?
    images.isValid = function () {
        return images.numImages == images.numLoadedImages;
    }

    images.data["kipferl"].src = 'kipferl.png';
    //images.data["buy0"].src = 'buy.png';
    images.data["frame"].src = 'frame.png';
    images.data["tree"].src = 'tree.png';
    images.data["button"].src = 'button5.png';
    images.data["elf"].src = 'elf.png';
    images.data["nothing"].src = 'nothing.png';

    for (var i = 0; i < maxNumProducers; i++) {
        images.data["button" + i].src = 'pixel.png';
    }
}

// Gamelogic updates.
function update(timeSinceLastFrame) {
    playTime += timeSinceLastFrame;

    UpdateCookies(timeSinceLastFrame);

    canvas.onmousedown = function (canvas) {
        //alert('canvas clicked ' + canvas.clientX)
        for (var key in images.data) {
            if (images.data[key].cookieW <= 0.001)
                continue;
            var img = images.data[key];
            var pos = GetCoordsImg(img);
            if (pos.x < canvas.clientX && pos.w + pos.x > canvas.clientX
                && pos.y < canvas.clientY && pos.y + pos.h > canvas.clientY)
            {
                img.mouseclick();
            }
        }
    };
}

// Draw everything.
var render = function (timeSinceLastFrame) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    context.fillStyle = "#000020";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Timer & length
    {
        context.fillStyle = "#fff";
        context.globalAlpha = 0.5;
        context.font = "bold 20px sans-serif";
        var minutes = playTime / 60;
        var seconds = playTime - Math.floor(minutes) * 60;
        var text = minutes.toFixed(0).concat(":", seconds >= 10 ? "" : "0", seconds.toFixed());
        var textSize = context.measureText(text);
        context.fillText(text, canvas.width - textSize.width - 20, canvas.height - 20);
        context.globalAlpha = 1.0;
    }

    // Draw debug image
    {
        for (var key in images.data)
        {
            if (images.data[key].cookieW > 0.001)
                DrawScaled(context, images.data[key]);
        }
        DrawGameContent(context);
    }
}

// Gameloop.
function run() {
    var now = Date.now();
    var timeSinceLastFrame = (now - lastFrameTime) / 1000;    // duration in seconds

    if (timeSinceLastFrame >= TARGET_FRAMETIME) {
        update(timeSinceLastFrame);
        render(timeSinceLastFrame);
        lastFrameTime = now;
    }

    requestAnimationFrame(run);
}

function initialize(){
    InitializeProducers();
}
// Cross-browser support for requestAnimationFrame;
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var lastFrameTime = Date.now();
loadImages();

function waitUntilImageIsValid() {
    if (!images.isValid()) {
        setTimeout(waitUntilImageIsValid, 500);
    }
}
waitUntilImageIsValid();

initialize();
run();