function Data() {


    //this.ctx = canvas.getContext("2d");


    this.elements = new Image();
    this.elements.src = "gfx/elements.png";
    this.elements.alt = "elements";

    var area = new Image();
    area.src = "gfx/area.png";
    area.alt = "area";
    console.log(area)
    area.onload = function () {
        ctx.drawImage(area, 10, 10, 150, 180);
    }
}