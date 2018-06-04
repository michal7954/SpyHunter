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
        max: 8,
        min: 0,
        acceleration: 0.2,
        deceleration: -0.3,
        poz_range: 10,
        poz_addition: 180,
        turn_radius: 4
    }

    this.poz = {
        x: 200,
        y: (this.speed.max - this.speed.curr) * this.speed.poz_range + this.speed.poz_addition,
        trans: 0,
        r: 4
    }

    this.map = {
        player: [21, 23, 13, 23],
        speedy: [45, 23, 13, 31],
    }
}