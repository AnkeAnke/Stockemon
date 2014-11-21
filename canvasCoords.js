// Set the standard ratio to full HD.
var ratio = 1900 / 1000;

// Scales the images accordingly.
function GetCoords(x, y, w, h) {
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
    out.x = (width * (x / 1900));
    out.w = (width * (w / 1900));
    out.y = (height * (y / 1000));
    out.h = (height * (h / 1000));

    return out;
}

function GetCoordsImg(img) {
    var out = GetCoords(img.cookieX, img.cookieY, img.cookieW, img.cookieH);
    return out;
}

// Draw an image in the image object
function DrawScaled(context, img)
{
    var coord = GetCoordsImg(img);
    context.drawImage(img, coord.x, coord.y, coord.w, coord.h);
}

// Draw an image without clickability
function DrawScaledPos(context, img, x, y, w, h) {
    var coord = GetCoords(x, y, w, h);
    context.drawImage(img, coord.x, coord.y, coord.w, coord.h);
}

function DrawScaledText(context, text, x, y, size, align) {
    // 0.8 is a fix to make it look good.
    var coord = GetCoords(x, y+size*0.8, size,0);
    context.font = "" + (coord.w).toFixed(0) + "px Arial";
    context.textAlign = align;
    context.fillText(text, coord.x, coord.y);
}

function GetFormattedNumber(number, fixNum) {
    var cookieText = "";
    if (number >= 1000000000) {
        cookieText = "" + (number / 1000000000).toFixed(3) + " B"
    }
    else
        if (number >= 1000000) {
            cookieText = "" + (number / 1000000).toFixed(3) + " M"
        }
        else {
            cookieText = "";
            if (number >= 1000000)
                cookieText += (number / 1000000).toFixed(0) + ".";
            if (number >= 1000) {
                var thousands = ((number % 1000000) / 1000).toFixed(0);
                if (number > 1000000) {
                    if (thousands < 100)
                        cookieText += 0;
                    if (thousands < 10)
                        cookieText += 0;
                }
                cookieText += thousands + ".";
            }
            var small = (number % 1000);
            if (small == small.toFixed(0)) {
                small = small.toFixed(0);
            }
            else
                small = small.toFixed(fixNum);
            if (number >= 1000) {
                if (small < 100)
                    cookieText += 0;
                if (small < 10)
                    cookieText += 0;
            }
            cookieText += small;
        }

    return cookieText;
}