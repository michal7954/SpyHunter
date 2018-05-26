window.onload = function () {

    //data = new Data();
    //var ctx = data.ctx



    //img = document.getElementsByTagName("img")[0];
    //console.log(data.area)
    //var c = document.getElementById("canvas");
    //var ctx = c.getContext("2d");

    //console.log(data.elements)


};


var img = document.getElementById("area")
img.on('imageloadend', function () {
    draw()
});

function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = this.canvas.getContext("2d");

    ctx.drawImage(img, 10, 10, 150, 180);
}