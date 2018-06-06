function Data() {

    this.canvas = document.getElementById("#canvas");
    this.ctx = canvas.getContext("2d");

    this.elements = new Image();
    this.elements.src = "gfx/elements.png";
    this.elements.alt = "elements";

    this.area = new Image();
    this.area.src = "gfx/area.png";
    this.area.alt = "area";

    //this.frame = -65535 + 590;
    this.frame = -54642

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
        player: [21, 23, 13, 23, 4],
        speedy: [45, 23, 13, 31, 4],
        ship: [13, 258, 26, 38, -8],
        fastship: [43, 258, 26, 38, -8],
        curr: [21, 23, 13, 23, 4],
    }

    this.colors_tab = ["grey", "blue", "red"];

    this.colors = {
        grey: [121, 121, 121, 255],
        blue: [76, 109, 243, 255],
        red: [207, 0, 0, 255],
        curr: [121, 121, 121, 255],
    }
}