function Data() {

    this.canvas = document.getElementById("#canvas");
    this.ctx = canvas.getContext("2d");

    this.elements = new Image();
    this.elements.src = "gfx/elements.png";
    this.elements.alt = "elements";

    this.area = new Image();
    this.area.src = "gfx/area.png";
    this.area.alt = "area";

    //this.height = -65535 + 590;
    this.height = -54642
    //this.height = -65535 + 300

    this.frame = 0;
    this.shot_frame;
    this.shot_freq = 1;
    this.shots = []
    this.distance = 150
    this.bullet_speed = 5;

    this.speed = {
        curr: 0,
        max: 8,
        min: 0,
        acceleration: 0.2,
        deceleration: -0.3,
        poz_range: 10,
        poz_addition: 180,
        turn_radius: 5
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

        civil3: [300, 32, 12, 23, 8]
    }

    this.colors_tab = ["grey", "blue", "red"];

    this.colors = {
        grey: [0],
        //grey: [121, 121, 121, 255],
        blue: [76, 109, 243, 255],
        red: [207, 0, 0, 255],
        curr: [121, 121, 121, 255],
    }
}