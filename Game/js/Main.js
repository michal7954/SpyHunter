var data;
var events;

window.onload = function () {

    data = new Data();
    events = new Events();
    render();
};

function render() {

    // MAPA
    data.ctx.drawImage(data.area, 0, data.frame, 480, 65535);
    data.frame = data.frame + data.speed.curr;


    //KOLIZJE Z MAPĄ
    var kol = {
        pl: data.ctx.getImageData(data.poz.x - data.poz.r, data.poz.y - 1, 1, 1).data,
        pr: data.ctx.getImageData(data.poz.x + data.poz.r + data.map.player[2], data.poz.y - 1, 1, 1).data,
    }

    kol.wl = !(kol.pl[0] == 120 && kol.pl[1] == 120 && kol.pl[2] == 120 && kol.pl[3] == 255);
    kol.wr = !(kol.pr[0] == 120 && kol.pr[1] == 120 && kol.pr[2] == 120 && kol.pr[3] == 255);


    if (kol.wl && kol.wr) {
        //bum
        data.speed.curr = 0;
    }
    else if (kol.wl || kol.wr) {
        //drgawki
        if (data.frame % 2 == 0) {
            data.poz.trans = 1;
        }
        else {
            data.poz.trans = -1;
        }
    }
    else {
        //gut
        data.poz.trans = 0;
    }



    data.ctx.beginPath();

    data.ctx.moveTo(data.poz.x - data.poz.r, data.poz.y);
    data.ctx.lineTo(data.poz.x - data.poz.r, data.poz.y - 2);

    data.ctx.moveTo(data.poz.x + data.poz.r + data.map.player[2], data.poz.y);
    data.ctx.lineTo(data.poz.x + data.poz.r + data.map.player[2], data.poz.y - 2);

    data.ctx.lineWidth = 1;
    data.ctx.strokeStyle = "rgba(0,0,0,1)"
    data.ctx.stroke();




    // STEROWANIE GRACZEM
    if (events.up && data.speed.curr <= data.speed.max) {
        data.speed.curr = data.speed.curr + data.speed.acceleration;
        data.poz.y = (data.speed.max - data.speed.curr) * data.speed.poz_range + data.speed.poz_addition

        data.ctx.drawImage(data.elements, data.map.speedy[0], data.map.speedy[1], data.map.speedy[2], data.map.speedy[3], data.poz.x + data.poz.trans, data.poz.y, data.map.speedy[2], data.map.speedy[3]);
    }
    else {
        data.ctx.drawImage(data.elements, data.map.player[0], data.map.player[1], data.map.player[2], data.map.player[3], data.poz.x + data.poz.trans, data.poz.y, data.map.player[2], data.map.player[3]);
    }

    if (events.down) {
        if (data.speed.curr + data.speed.deceleration < data.speed.min) {
            data.speed.curr = data.speed.min;
        }
        else {
            data.poz.y = (data.speed.max - data.speed.curr) * data.speed.poz_range + data.speed.poz_addition;
            data.speed.curr = data.speed.curr + data.speed.deceleration
        }
    }

    if (events.left) {
        data.poz.x = data.poz.x - data.speed.turn_radius;
    }
    if (events.right) {
        data.poz.x = data.poz.x + data.speed.turn_radius;
    }












    requestAnimationFrame(render);
};