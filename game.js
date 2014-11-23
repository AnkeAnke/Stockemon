// Constants
var TARGET_FRAMETIME = 1.0 / 60.0;
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

// Game variables
var playTime = 0;
var globalImageHandler;
var clickHandler0;

// World
var world;
var fight;
var activeScreen;

// Key press.
var keyPressCode = -1;

//document.onkeydown = function (modifier) {
//    keyPressCode = modifier.keyCode;
//    console.log(keyPressCode);
//}

// Log all keys being pressed
var keys = [];
window.addEventListener("keydown",
    function (e) {
        keys[e.keyCode] = true;
    },
false);

window.addEventListener('keyup',
    function (e) {
        keys[e.keyCode] = false;
    },
false);


window.onresize = function () {
    if (window.innerHeight * ratio < window.innerWidth) {
        canvas.width = window.innerHeight * ratio;
    }
    else {
        canvas.height = window.innerWidth / ratio;
    }
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
}

// Gamelogic updates.
function update(timeSinceLastFrame) {
    playTime += timeSinceLastFrame;

    canvas.onmousedown = function (canvas) {
        clickHandler0.Update(canvas.clientX, canvas.clientY);
    };

    // Check keys.
    //    world.Update(keys, timeSinceLastFrame);
    activeScreen = activeScreen.Update(keys, timeSinceLastFrame);
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

    // Draw game
    //    world.Draw(context);
    activeScreen.Draw(context);
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

function LoadImages() {
    globalImageHandler.AddImage("Map", "map.bmp");
    globalImageHandler.AddImage("UP", "UP.png");
    globalImageHandler.AddImage("LEFT", "LEFT.png");
    globalImageHandler.AddImage("DOWN", "DOWN.png");
    globalImageHandler.AddImage("RIGHT", "RIGHT.png");

    globalImageHandler.AddImage("UIleft", "UIleft.png");
    globalImageHandler.AddImage("UIright", "UIright.png");
    globalImageHandler.AddImage("UIoff", "UIselection.png");
    globalImageHandler.AddImage("UIon", "UiselectionOn.png");
    globalImageHandler.AddImage("UIbar", "bar.png");
    globalImageHandler.AddImage("UItext", "UItext.png");
    globalImageHandler.AddImage("UIworld", "UIworld.png");
    globalImageHandler.AddImage("UIworldBG", "UIworldBG.png");
    
    globalImageHandler.AddImage("gras", "gras.png");
    globalImageHandler.AddImage("enemy", "enemy.png");
    globalImageHandler.AddImage("mud", "mud.png");
    globalImageHandler.AddImage("wall", "wall.png");
    globalImageHandler.AddImage("pc", "pc.png");
    globalImageHandler.AddImage("heal", "heal.png");

    globalImageHandler.AddImage("Stock", 'Stab.png');
    globalImageHandler.AddImage("Schwert", 'Schwert.png');
    globalImageHandler.AddImage("Langschwert", 'Langschwert.png');
    globalImageHandler.AddImage("Zweihaender", 'Zweihaender.png');
    globalImageHandler.AddImage("Aua Aua", 'GreatSword.png');
    globalImageHandler.AddImage("Griff mit Brett", 'Brett.png');
    globalImageHandler.AddImage("Schild", 'Shield.png');
    globalImageHandler.AddImage("Grossschild", 'spike.png');
    globalImageHandler.AddImage("Pieks Pieks", 'morespikes.png');
    globalImageHandler.AddImage("Speer", 'speer.png');
    globalImageHandler.AddImage("Hellebarde", 'alberd.png');
    globalImageHandler.AddImage("Dreizack", 'trident.png');
    globalImageHandler.AddImage("Aua Pieks", 'piekspiekspieks.png');
    globalImageHandler.AddImage("Tannenbaum", 'tannemon.png');

    globalImageHandler.WaitForLoad();
}

function Initialize(){
    clickHandler0 = new ClickHandler();
    globalImageHandler = new ImageHandler();
    LoadImages();

    var stockemon = new Stockemon("0", 0, 5);

    world = new World(stockemon, document);
    // DEBUG
    fight = new Fight(stockemon, new Stockemon("0", 0, 1), world);
    activeScreen = fight;
}
// Cross-browser support for requestAnimationFrame;
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var lastFrameTime = Date.now();

Initialize();
run();