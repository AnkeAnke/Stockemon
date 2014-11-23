// Set the standard ratio to full HD.
const DefaultWidth = 1900;
const DefaultHeight = 1000;
var ratio = DefaultWidth / DefaultHeight;

// Create a canvas
var canvas = document.createElement("canvas");
if (window.innerHeight * ratio < window.innerWidth) {
    canvas.width = window.innerHeight * ratio;
    canvas.height = window.innerHeight;
}
else {
    canvas.height = window.innerWidth / ratio;
    canvas.width = window.innerWidth;
}

// Scales the images accordingly.
function GetCoords(x, y) {
    //var width = window.innerWidth;
    //var height = window.innerHeight;
    //if(height*ratio < width)
    //{
    //    width = height * ratio;
    //}
    //else
    //{
    //    height = width / ratio;
    //}

    var out = new Object();
    out.x = (canvas.width * (x / DefaultWidth));
    out.y = (canvas.height * (y / DefaultHeight));

    return out;
}

function GetCoordsBox(box) {
    var out = GetCoords(box.x, box.y);
    var tmp = GetCoords(box.w, box.h);
    out.w = tmp.x;
    out.h = tmp.y;
    return out;
}

// Draw an image without clickability
function DrawScaledPos(context, img, box) {
    var coord = GetCoordsBox(box);
    context.drawImage(img, coord.x, coord.y, coord.w, coord.h);
}

function DrawScaledText(context, text, x, y, size, align) {
    // 0.8 is a fix to make it look good.
    var coord = GetCoords(x, y+size);
    var coordSize = GetCoords(size,0);
    context.font = "" + (coordSize.x).toFixed(0) + "px Arial";
    context.textAlign = align;
    var subst = text;

    var n = subst.indexOf("\n");
    while (n > -1) {
        context.fillText(text.substr(0, n), coord.x, coord.y);
        subst = subst.substr(n+1, subst.length-1);
        coord.y += coordSize.x*1.2;
        n = subst.indexOf("\n");
    }
    
    context.fillText(subst, coord.x, coord.y);
}