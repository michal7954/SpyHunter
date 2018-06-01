function Data() {

    this.canvas = document.getElementById("#canvas");
    this.ctx = canvas.getContext("2d");

    this.elements = new Image();
    this.elements.src = "gfx/elements.png";
    this.elements.alt = "elements";

    this.area = new Image();
    this.area.src = "gfx/area.png";
    this.area.alt = "area";

    this.frame = -65535 + 590;

    this.speed = {
        curr: 0,
        max: 14,
        min: 0,
        acceleration: 0.4,
        deceleration: -0.7,
        poz_range: 6,
        poz_addition: 160,
    }

    this.poz = {
        x: 200,
        y: 238
    }

    this.map = {
        player: [21, 23, 13, 23],
        speedy: [45, 23, 13, 31],
    }

}