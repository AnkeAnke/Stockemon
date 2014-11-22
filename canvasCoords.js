// Set the standard ratio to full HD.
const DefaultWidth = 1900;
const DefaultHeight = 1000;
var ratio = DefaultWidth / DefaultHeight;

// Scales the images accordingly.
function GetCoords(x, y) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    if(height*ratio < width)
    {
        width = height * ratio;
    }
    else
    {
        height = width / ratio;
    }

    var out = new Object();
    out.x = (width * (x / DefaultWidth));
    out.y = (height * (y / DefaultHeight));

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
    var coord = GetCoords(x, y+size, size,0);
    context.font = "" + size.toFixed(0) + "px Arial";
    context.textAlign = align;
    context.fillText(text, coord.x, coord.y);
}