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


    // STEROWANIE GRACZEM
    if (events.up && data.speed.curr <= data.speed.max) {
        data.speed.curr = data.speed.curr + data.speed.acceleration;
        data.poz.y = (data.speed.max - data.speed.curr) * data.speed.poz_range + data.speed.poz_addition

        data.ctx.drawImage(data.elements, data.map.speedy[0], data.map.speedy[1], data.map.speedy[2], data.map.speedy[3], data.poz.x, data.poz.y, data.map.speedy[2], data.map.speedy[3]);
    }
    else {
        data.ctx.drawImage(data.elements, data.map.player[0], data.map.player[1], data.map.player[2], data.map.player[3], data.poz.x, data.poz.y, data.map.player[2], data.map.player[3]);
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
        data.poz.x = data.poz.x - 4;
    }
    if (events.right) {
        data.poz.x = data.poz.x + 4;
    }

    requestAnimationFrame(render);
};