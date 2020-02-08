var socket = io();
var side = 8;
function setup() {
    background("#acacac");
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    var client = document.getElementById("weather")

    socket.on("data", drawMatrix);


    function drawMatrix(data) {
        
         //! after getting data pass it to matrix variable
         matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
         client.innerText = data.weatherserver;
         //! Every time it creates new Canvas woth new matrix size
         createCanvas(matrix[0].length * side, matrix.length * side)
         //! clearing background by setting it to new grey color
         background('#acacac');
         //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)


        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 0) {
                    fill("#acacac")
                }
                else if (matrix[y][x] == 1) {
                    fill("#3ADF10");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("brown");
                }
                else if (matrix[y][x] == 5) {
                    fill("#275D19");
                }
    
                rect(x * side, y * side, side, side)
                // fill("blue")
                // text(x + "" + y, x * side + side / 2, y * side + side / 2)
            }
        }
    }


}

function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    var arr = [x,y];
    console.log(arr);
    socket.emit("fire", arr)
}

// mousePressed();