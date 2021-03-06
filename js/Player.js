function Player() {

    this.renderer = function () {
        
        // map collisions
        var kol = {
            pl: data.ctx.getImageData(data.poz.x - data.map.curr[4], data.poz.y - 1, 1, 1).data,
            pr: data.ctx.getImageData(data.poz.x + data.map.curr[4] + data.map.curr[2], data.poz.y - 1, 1, 1).data,
            wl: true,
            wr: true,
        }

        for (i = 0; i < data.colors_tab.length; i++) {
            if (kol.pl[0] == data.colors[data.colors_tab[i]][0] && kol.pl[1] == data.colors[data.colors_tab[i]][1] && kol.pl[2] == data.colors[data.colors_tab[i]][2] && kol.pl[3] == data.colors[data.colors_tab[i]][3]) {
                kol.wl = false;
            }
            if (kol.pr[0] == data.colors[data.colors_tab[i]][0] && kol.pr[1] == data.colors[data.colors_tab[i]][1] && kol.pr[2] == data.colors[data.colors_tab[i]][2] && kol.pr[3] == data.colors[data.colors_tab[i]][3]) {
                kol.wr = false;
            }
        }

        if (kol.wl && kol.wr) {
            //bum
            f.playerCollision()
        }
        else if (kol.wl || kol.wr) {
            //drgawki
            if (data.height % 2 == 0) {
                data.poz.trans = 2;
            }
            else {
                data.poz.trans = -2;
            }
        }
        else {
            //gut
            data.poz.trans = 0;
        }
        if (data.poz.x < 128 || data.poz.x > 351) {
            data.height = data.height + 100
            f.playerCollision()
        }

        // select type of vehicle
        var pixel = data.ctx.getImageData(data.poz.x, data.poz.y - 4, 1, 1).data;

        if (pixel[0] == data.colors.blue[0] && pixel[1] == data.colors.blue[1] && pixel[2] == data.colors.blue[2] && pixel[3] == data.colors.blue[3]) {

            if (events.up && data.speed.curr <= data.speed.max) {
                data.map.curr = data.map.fastship;
                data.colors.curr = data.colors.blue;
            }
            else {
                data.map.curr = data.map.ship;
                data.colors.curr = data.colors.blue;
            }
        }

        else if (pixel[0] == data.colors.grey[0] && pixel[1] == data.colors.grey[1] && pixel[2] == data.colors.grey[2] && pixel[3] == data.colors.grey[3]) {

            if (events.up && data.speed.curr <= data.speed.max) {
                data.map.curr = data.map.speedy;
                data.colors.curr = data.colors.grey;

            }
            else {
                data.map.curr = data.map.player;
                data.colors.curr = data.colors.grey;

            }
        }

        // player control
        if (events.up && data.speed.curr <= data.speed.max) {
            data.speed.curr = data.speed.curr + data.speed.acceleration;
            data.poz.y = (data.speed.max - data.speed.curr) * data.speed.poz_range + data.speed.poz_addition
        }

        data.ctx.drawImage(data.elements, data.map.curr[0], data.map.curr[1], data.map.curr[2], data.map.curr[3], data.poz.x + data.poz.trans, data.poz.y, data.map.curr[2], data.map.curr[3]);

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


        data.poz.x1 = data.poz.x + data.map.curr[2]
        data.poz.y1 = data.poz.y + data.map.curr[3]
        data.poz.w = data.map.curr[2]
        data.poz.h = data.map.curr[3]


        // weapon
        if (events.fire) {
            if (data.frame - data.shot_frame > data.shot_freq || data.shot_frame == undefined) {
                data.shot_frame = data.frame

                var shot = {
                    x: data.poz.x + 2.5,
                    y: data.poz.y,
                    ttl: data.distance / data.bullet_speed,
                }
                data.shots.push(shot)

                var shot = {
                    x: data.poz.x + data.map.curr[2] - 2.5,
                    y: data.poz.y,
                    ttl: data.distance / data.bullet_speed,
                }
                data.shots.push(shot)
            }
        }


        for (i = 0; i < data.shots.length; i++) {

            if (data.shots[i].ttl > 0) {
                data.ctx.beginPath();

                data.ctx.moveTo(data.shots[i].x, data.shots[i].y);
                data.ctx.lineTo(data.shots[i].x, data.shots[i].y - 2);

                //data.ctx.moveTo(data.shots[i].x + data.map.curr[2], data.shots[i].y);
                //data.ctx.lineTo(data.shots[i].x + data.map.curr[2], data.shots[i].y - 2);

                data.ctx.lineWidth = 2;
                data.ctx.strokeStyle = "rgba(1,0,0,1)"
                data.ctx.stroke();

                data.shots[i].ttl--;
                data.shots[i].y = data.shots[i].y - data.bullet_speed;
            }
            else {
                data.shots.splice(i, 1);
            }
        }
    }
}
