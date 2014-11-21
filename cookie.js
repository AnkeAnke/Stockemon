var numCookies = 100000;
var numCookiesPerSecond = 0;
var images = 0;

function OnCookieClick() {
    numCookies++;
}

function OnBuy0Click() {
    alert('buy0');
}

function OnBuy1Click() {
    alert('buy1');
}



function DrawCounter(canvas)
{
    // Get the correct string for the number of cookies.
    var cookieText = GetFormattedNumber(numCookies, 0);
    var cookiePlusText = GetFormattedNumber(numCookiesPerSecond, 1);
    //    DrawScaledText(canvas, cookieText, 710, 60, 50, false);
    DrawScaledText(canvas, cookieText, 1050, 280, 50, "center");
    canvas.fillStyle = "#999999";
    DrawScaledText(canvas, "+" + cookiePlusText + " Kipferl per Second", 1050, 350, 20, "center");
    canvas.fillStyle = "#ffffff";
//    DrawScaledPos(canvas, images.data["kipferl"], 650, 60, 50, 50);  
}

function DrawGameContent(canvas)
{
    DrawCounter(canvas);
    DrawProducers(canvas);
}

function UpdateCookies(timeSinceLastFrame)
{
    numCookies += timeSinceLastFrame * numCookiesPerSecond;
}

