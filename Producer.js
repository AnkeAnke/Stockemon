var producers = 0;
var numProducersUnlocked = -1;
var maxNumProducers = 8;

var costMultiplier = 1.1;


function OnClickButton(id) {
    if (id > numProducersUnlocked + 1)
        return;
    if (numCookies < producers[id].cost)
        return;

    // Buy one instance.
    numCookies -= producers[id].cost;
    producers[id].cost *= costMultiplier;
    producers[id].cost = producers[id].cost.toFixed(0);
    producers[id].posX[producers[id].instances] = Math.random();
    producers[id].posY[producers[id].instances] = Math.random();

    // Order the list by Y. Insertion sort.
    var tmpY = producers[id].posY[producers[id].instances];
    var tmpX = producers[id].posX[producers[id].instances];
    var insertIndex = producers[id].instances;

    for (var i = 0; i < producers[id].instances; ++i) {
        // If the new object would be in front of other object...
        if (producers[id].posY[i] > tmpY) {
            insertIndex = i;
            break;
        }
    }
    for (var j = producers[id].instances; j > insertIndex; --j) {
        producers[id].posX[j] = producers[id].posX[j - 1];
        producers[id].posY[j] = producers[id].posY[j - 1];
    }
    producers[id].posX[insertIndex] = tmpX;
    producers[id].posY[insertIndex] = tmpY;

    producers[id].instances++;
    

    // If this was the first bought item of this type, unlock new content.
    if (producers[id].instances == 1 && id < maxNumProducers-1)
        numProducersUnlocked++;

    // Update income.
    numCookiesPerSecond += producers[id].income;
    
}

function DrawProducer(canvas, id) {
    var xPos = id > (maxNumProducers/2 -1) ? 1300 : 0;
    var yPos = (id % (maxNumProducers/2)) * 250;
    DrawScaledPos(canvas, images.data["frame"], xPos, yPos, 600, 250);

    for(var i = 0; i < producers[id].instances; ++i){
        var xPosInst = xPos + 30 + producers[id].posX[i] * (540 - 60);
        var yPosInst = yPos + 30 + producers[id].posY[i] * (190 - 60);
        DrawScaledPos(canvas, producers[id].image, xPosInst, yPosInst, 60, 60);
    }
}

function DrawProducerButton(canvas, id) {
    
    var xPos = id > (maxNumProducers / 2 - 1) ? 950 : 600;
    var yPos = 720 + (id % (maxNumProducers / 2)) * 70;
    DrawScaledPos(canvas, images.data["button"], xPos, yPos, 350, 70);
    
    DrawScaledText(canvas, "+" + GetFormattedNumber(producers[id].income, 1), xPos + 75, yPos + 25, 20, "left");

    DrawScaledText(canvas, "" + GetFormattedNumber(producers[id].cost, 0), xPos + 350 - 75, yPos + 25, 20, "right");

    if (id <= numProducersUnlocked) {
        DrawScaledPos(canvas, producers[id].image, xPos, yPos, 70, 70);
        DrawScaledText(canvas, producers[id].instances, xPos + 70, yPos + 70 - 20, 20, "center");
    }else
        DrawScaledPos(canvas, images.data["nothing"], xPos, yPos, 70, 70);
}

function DrawProducers(canvas)
{
    for (var i = 0; i <= numProducersUnlocked; ++i) {
        DrawProducer(canvas, i);
    }

    for (var i = 0; i <= Math.min(numProducersUnlocked+1, maxNumProducers); ++i) {
        DrawProducerButton(canvas, i);
    }
}

function  InitializeProducers()
{
    producers = {};
    // Setting up the elements
    for (var i = 0; i < maxNumProducers; ++i) {
        producers[i] = new Object();
        producers[i].instances = 0;
        producers[i].posX = {};
        producers[i].posY = {};
    }

    // Trees
    producers[0].image = images.data["tree"];
    producers[0].income = 0.5;
    producers[0].cost = 100;

    // Elves
    
    producers[1].image = images.data["elf"];
    producers[1].income = 5;
    producers[1].cost = 500;

    // x
    producers[2].image = images.data["elf"];
    producers[2].income = 20;
    producers[2].cost = 1000;
    
}