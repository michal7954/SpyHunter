var data;
var events;
var f;
var player;

var bots = [];
var old_shot;

window.onload = function () {
    f = new Functions()
    data = new Data();
    events = new Events();
    player = new Player();

    render();
};

function render() {

    // draw map
    if (data.game) {
        data.ctx.drawImage(data.area, 0, data.height, 480, 65535);
        data.height = data.height + data.speed.curr;
    }

    // find true colors
    if (data.colors.grey[0] == 0) {

        data.ctx.drawImage(data.area, 0, 65534, 3, 1, 0, 299, 3, 1)

        data.colors.grey = data.ctx.getImageData(0, 299, 1, 1).data;
        data.colors.blue = data.ctx.getImageData(1, 299, 1, 1).data;
        data.colors.red = data.ctx.getImageData(2, 299, 1, 1).data;
    }

    if (player && data.game) {
        player.renderer();
    }

    if (data.frame % 60 == 0 && data.colors.curr == data.colors.grey) {
        bots.push(new Bot());
    }

    // bots
    for (i = 0; i < bots.length; i++) {
        bots[i].render()

        try {

            if (data.poz.y < bots[i].poz.y1 &&
                data.poz.y1 > bots[i].poz.y) {

                if (bots[i].type.slice(0, 5) == "enemy") {
                    if (data.poz.x > bots[i].poz.x) {
                        bots[i].poz.x = bots[i].poz.x + data.pression;
                    }
                    else {
                        bots[i].poz.x = bots[i].poz.x - data.pression;
                    }
                }

                // player collision
                if (data.poz.x < bots[i].poz.x1 &&
                    data.poz.x1 > bots[i].poz.x) {

                    if (data.poz.x + 10 > bots[i].poz.x) {
                        f.playerCollision()
                    }
                    else {
                        //if (bots[i]) {
                        if (bots[i].type.slice(0, 5) == "enemy") {
                            data.points++;
                        }
                        else {
                            data.points--;
                        }
                        bots.splice(i, 1);
                        data.poz.x = data.poz.x + data.kick;
                        bots[i].poz.x = bots[i].poz.x - data.kick;
                        //}
                    }
                    //if (bots[i]) {
                    if (data.poz.y < bots[i].poz.y) {
                        data.poz.y = data.poz.y - data.kick;
                        bots[i].poz.y = bots[i].poz.y + data.kick;
                    }
                    else {
                        data.poz.y = data.poz.y + data.kick;
                        bots[i].poz.y = bots[i].poz.y - data.kick;
                    }
                }
            }
        }
        catch {}

        //bullets collision
        for (j = 0; j < data.shots.length; j++) {
            if (bots[i]) {
                var bot = {}
                bot.x = bots[i].poz.x
                bot.y = bots[i].poz.y
                bot.x1 = bots[i].poz.x1
                bot.y1 = bots[i].poz.y1

                var shot = {}
                shot.x = data.shots[j].x
                shot.y = data.shots[j].y

                if (shot.x < bot.x1 &&
                    shot.x > bot.x &&
                    shot.y < bot.y1 &&
                    shot.y > bot.y) {

                    if (bots[i].type.slice(0, 5) == "enemy") {
                        data.points++;
                    }
                    else {
                        data.points--;
                    }

                    bots.splice(i, 1);
                    data.shots.splice(j, 1);
                }
            }
        }
    }

    if (data.game) {
        f.updateTime();
        f.info()
    }

    data.frame++;
    requestAnimationFrame(render);
};
