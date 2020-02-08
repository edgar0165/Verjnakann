var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('', function (req, res) {
    res.redirect('index.html')
});
server.listen(3000, function () {
    console.log("Server worked")
});


var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var GrasseaterEater = require("./GrasseaterEater.js");
var Mard = require("./Mard.js");
var Hulk = require("./Hulk.js");
//
let random = require('./random.js');


grassArr = [];
xotakerArr = [];
gishatichArr = [];
mardArr = [];
hulkArr = [];
//
matrix = [];
//
grassHashiv = 0;

//
Weather = "Summer";
Weatherinit = 0;


function matrixGenerator(matrixSize, grass, grassEater, GrasseaterEater, Mard, Hulk) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < GrasseaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < Mard; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Hulk; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 10, 5);
//! Creating MATRIX -- END
io.sockets.on("fire",()=>console.log("fghj"))
// console.log(matrix)
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)
            grassArr.push(gr)
            grassHashiv++;
        }
        else if (matrix[y][x] == 2) {
            var xt = new GrassEater(x, y)
            xotakerArr.push(xt)
        }
        else if (matrix[y][x] == 3) {
            var gish = new GrasseaterEater(x, y)
            gishatichArr.push(gish)
        }
        else if (matrix[y][x] == 4) {
            var md = new Mard(x, y)
            mardArr.push(md)
        }
        else if (matrix[y][x] == 5) {
            var hk = new Hulk(x, y)
            hulkArr.push(hk)
        }
    }
}

function getWeather(){
    Weatherinit++;
    
    if (Weatherinit == 5){
        Weatherinit = 1;
    }
    else if(Weatherinit == 4){
        weather = "Autumn";
    }
    else if(Weatherinit == 3){
        weather = "Winter";
    }
    else if(Weatherinit == 2){
        weather = "Spring";
    }
    else if(Weatherinit == 1){
        weather = "Summer";
    }
   // console.log(Weatherinit);
    
}

function drawserver() {

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mult();
        }
    }
    if (xotakerArr[0] !== undefined) {
        for (var i in xotakerArr) {
            xotakerArr[i].eat()
            xotakerArr[i].move()
            xotakerArr[i].mult()
            xotakerArr[i].die()
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat()
            gishatichArr[i].move()
            gishatichArr[i].mult()
            gishatichArr[i].die()
        }
    }
    if (mardArr[0] !== undefined) {
        for (var i in mardArr) {
            mardArr[i].eat1()
            mardArr[i].eat2()
            mardArr[i].move()
            mardArr[i].mult()
            mardArr[i].die()
        }
    }
    if (hulkArr[0] !== undefined) {
        for (var i in hulkArr) {
            hulkArr[i].eat1()
            hulkArr[i].eat2()
            hulkArr[i].eat3()
            hulkArr[i].move()
            hulkArr[i].mult()
            hulkArr[i].die()
        }
    }

    getWeather();
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        weatherserver: weather
    }

    io.sockets.emit("data", sendData);
}
var obj = {"info": []};

function writefile(){
    var file = "Statics.json";
    obj.info.push({"cnvac xoteri qanak " : grassHashiv});
    fs.writeFileSync(file, JSON.stringify(obj, null,3))
}

setInterval(drawserver, 1000);
setInterval(getWeather, 3000);
setInterval(writefile, 6000);