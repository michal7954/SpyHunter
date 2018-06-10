var data;
var events;
var f;
var player;

var bots = [];
var old_shot;

window.onload = function () {

    data = new Data();
    events = new Events();
    f = new Functions()
    player = new Player();

    data.ctx.drawImage(data.area, 0, data.height, 480, 65535);

    setTimeout(function () {
        render();


        bots.push(new Bot());
    }, 1000)


};

function render() {

    // MAPA
    data.ctx.drawImage(data.area, 0, data.height, 480, 65535);
    data.height = data.height + data.speed.curr;


    //TRUE COLORS
    if (data.colors.grey[0] == 0) {

        data.ctx.drawImage(data.area, 0, 65534, 3, 1, 0, 299, 3, 1)

        data.colors.grey = data.ctx.getImageData(0, 299, 1, 1).data;
        data.colors.blue = data.ctx.getImageData(1, 299, 1, 1).data;
        data.colors.red = data.ctx.getImageData(2, 299, 1, 1).data;
    }

    player.renderer();


    if (data.frame % 60 == 0) {
        bots.push(new Bot());
    }

    //BOTY
    for (i = 0; i < bots.length; i++) {
        bots[i].render()

        //console.log(bots)
        if (bots[i]) {
            if (data.poz.x < bots[i].poz.x1 &&
                data.poz.x1 > bots[i].poz.x &&
                data.poz.y < bots[i].poz.y1 &&
                data.poz.y1 > bots[i].poz.y) {
                console.log("coll")

                if (data.poz.x < bots[i].poz.x) {
                    data.poz.x = data.poz.x - 3;
                    bots[i].poz.x = bots[i].poz.x + 3;
                }
                else {
                    data.poz.x = data.poz.x + 3;
                    bots[i].poz.x = bots[i].poz.x - 3;
                }

                if (data.poz.y < bots[i].poz.y) {
                    data.poz.y = data.poz.y - 3;
                    bots[i].poz.y = bots[i].poz.y + 3;
                }
                else {
                    data.poz.y = data.poz.y + 3;
                    bots[i].poz.y = bots[i].poz.y - 3;
                }
            }
        }


    }


    //console.log(player)


    data.frame++;
    requestAnimationFrame(render);
};

