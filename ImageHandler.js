﻿// global, so images can raise this value.
var NumLoadedImages = 0;

var MapSize = 0;

// An object loading and organizing all images. Please create one only.
function ImageHandler() {
    // Has the drawing been started jet?
    this.gameStarted = false;

    this.data = {};
    this.numImages = 0;

    // Returns the image.
    this.GetImage = function (name) {
        //if(!(typeof this.data[name] === Image)) alert("This image does not exist: "+name);
        if(!this.gameStarted) alert("Game has not started jet - cannot Draw!");
        return this.data[name];
    }

    // Add an image to be loaded. If the game has started already, this will fail.
    this.AddImage = function (name, source) {
        if (this.gameStarted) alert("Game started! Cannot load!");

        this.data[name] = new Image();
        this.data[name].src = source;

        // Assert that loading is done before an image is shown.
        this.numImages++;
        this.data[name].addEventListener("load", function () {
            NumLoadedImages++;
            if (this.src == "map.bmp") {
                MapSize = new Object();
                MapSize.x = this.width;
                MapSize.y = this.height;
                alert("Loaded map");
            }
        }, false);
    }
    function waitUntilImageIsValid() {
        if (this.numImages != NumLoadedImages) {
            setTimeout(waitUntilImageIsValid, 500);
        }
    }
    this.WaitForLoad = function () {
        
        waitUntilImageIsValid();
        this.gameStarted = true;
    }
}

function Box(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

function ClickableBox(box, boxFunction) {
    this.box = box;
    this.boxFunction = boxFunction;
}

// Handles a number of clickable boxes and reacts to mouse click.
function ClickHandler() {
    this.data = [];

    this.AddButton = function(clickableBox) {
        this.data.push(clickableBox);
    }

    // Calls the boxFunction of all boxes being clicked on.
    this.Update = function (clickX, clickY) {
        for (var key in this.data) {
            var coordsBox = GetCoordsBox(this.data[key].box);
            if (pos.x < clickX && pos.w + pos.x > clickX
                && pos.y < clickY && pos.y + pos.h > clickY) {
                this.data[key].boxFunction();
            }
        }
    }
}