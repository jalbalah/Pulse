var img = document.getElementById("scream");

var cnvs = document.getElementById("canvases");
var numCnvs = 0;
var cnvsArr = []; // array of cnv2d objects

var boxArr = [];  // array of box coordinates (MECE)
var boxSize = 50;  //px

function main(){
    randLayerCanvases();  // create layers of partial images
    setTimeout(function(){
        showLayers(50);  // flicker layered images n times
        //cnvsArr[cnvsArr.length-1].style.display = "inline";
    }, 50);
}

window.onload = function() { 
    setBoxArray();  // split img into grid
    shuffle(boxArr);  // shuffle partial images
    main();
}

function showLayers(numTimes){
    if(numTimes > 0){
        var MS_SHOW = 6;
        //var MS_SHOW_TIME = 10; 
        for(var c = 0; c < boxArr.length; c++){ //boxArr.length
            setTimeout(function(c){
                //console.log("show:",c);
                cnvsArr[c].style.display = "inline";
                setTimeout(function(c){
                    //console.log("hide:",c);
                    cnvsArr[c].style.display = "none";
                    if(c == boxArr.length - 1){
                        showLayers(numTimes - 1);
                    }
                }, MS_SHOW, c);
            }, c * MS_SHOW + c * 0, c);
        }
    }
}
function randLayerCanvases(){
    var canvas2d;
    for(var c = 0; c < boxArr.length; c++){
        addCnv();  // add to cnvsArr
    }
    setCanvasArray();  // separate step to allow DOM to load
    for(var c = 0; c < boxArr.length; c++){
        canvas2d = cnvsArr[c].getContext("2d");  // get from cnvsArr
        drawImage(canvas2d);
        whitewash(canvas2d, c);
    }
}
function addCnv(){
    numCnvs++; //style="border:1px solid #d3d3d3;"
    var elem = '<canvas id="cnv'+ numCnvs +'"'
               + ' width="'+ img.width +'"'
               + ' height="'+ img.height +'"'
               + ' style="position:absolute; left:0px; right:0px; display:none;"'
               + ' ></canvas>';
    cnvs.innerHTML += elem;
}
function setCanvasArray(){
    for(var c= 1; c <= numCnvs; c++){
        cnvsArr.push( document.getElementById('cnv' + c) );
    }
}
function setBoxArray(){
    for(var y = 0; y < img.height; y += boxSize){
        for(var x = 0; x < img.width; x += boxSize){
            boxArr.push( [x, y, boxSize, boxSize] );
        }
    }
}
function whitewash(ctx, skipIndex){
    var boxCoord;
    for(var c = 0; c < boxArr.length; c++){ //boxArr.length
        //if(c != skipIndex){
        if(sameGroup(c, skipIndex, boxArr.length, 20)){
            boxCoord = boxArr[c];
            drawRect(ctx, boxCoord[0],boxCoord[1],boxCoord[2],boxCoord[3], "white");
        }
    }
}
function sameGroupEq(a, b){
    return a == b;
}
function sameGroup(a, b, LEN, GROUP_SIZE){
    var i = Math.ceil(LEN / GROUP_SIZE);
    return (a % i) == (b % i);
}
function whitewash2(ctx, skipIndex){
    var boxCoord;
    for(var c = 0; c < boxArr.length; c++){ //boxArr.length
        if(c != skipIndex){
            boxCoord = boxArr[c];
            drawRect(ctx, boxCoord[0],boxCoord[1],boxCoord[2],boxCoord[3], "white");
        }
    }
}

function drawImage(ctx){
    ctx.drawImage(img, 0, 0);
}
function drawRect(ctx, x0, y0, x, y, color){
    ctx.beginPath();
    ctx.rect(x0, y0, x, y);
    ctx.fillStyle = color;
    ctx.fill();
}

function shuffle(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}