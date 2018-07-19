function Bot() {

    var num = Math.floor(Math.random() * 6);

    this.poz = {
        x: -1000,
        y: -20,
        speed: Math.floor((Math.random() * 3) + 1)
    }

    for (i = 128; i < 352; i++) {
        pixel = data.ctx.getImageData(i, 1, 1, 1).data;
        if (pixel[0] == data.colors.grey[0] && pixel[1] == data.colors.grey[1] && pixel[2] == data.colors.grey[2] && pixel[3] == data.colors.grey[3]) {
            this.poz.x = i + 60
            i = 400
        }
    }

    var last_col;
    var bot = this;
    var types = ["civil1", "civil2", "civil3", "enemy1", "enemy2", "enemy3",];
    
    this.type = types[num]
    this.render = function () {
        
        // collisions
        var points = {
            l: bot.poz.x - data.map[types[num]][4],
            r: bot.poz.x + data.map[types[num]][4] + data.map[types[num]][2],
            odl: 10,
        }

        var kol = {
            pl: data.ctx.getImageData(points.l, bot.poz.y - points.odl, 1, 1).data,
            pr: data.ctx.getImageData(points.r, bot.poz.y - points.odl, 1, 1).data,
            wl: true,
            wr: true,
        }

        if (f.colorColl(points.l, bot.poz.y - points.odl, data.colors.trans) && f.colorColl(points.r, bot.poz.y - points.odl, data.colors.trans)) {
            
            l = f.colorColl(bot.poz.x, 1, data.colors.grey)
            r = f.colorColl(bot.poz.x + data.map[types[num]][2], 1, data.colors.grey)

            if (l == true && r == true) {
                if (last_col) {
                    bot.poz.x = bot.poz.x + last_col
                }
            }
            else if (kol.l == true) {
                last_col = 3
                bot.poz.x = bot.poz.x + 3
            }
            else if (kol.r == true) {
                last_col = -3
                bot.poz.x = bot.poz.x - 3
            }
        }
        else {
            if (kol.pl[0] == data.colors.grey[0] && kol.pl[1] == data.colors.grey[1] && kol.pl[2] == data.colors.grey[2] && kol.pl[3] == data.colors.grey[3]) {
                kol.wl = false;
            }
            if (kol.pr[0] == data.colors.grey[0] && kol.pr[1] == data.colors.grey[1] && kol.pr[2] == data.colors.grey[2] && kol.pr[3] == data.colors.grey[3]) {
                kol.wr = false;
            }
            if (kol.wl == true && kol.wr == true) {
                if (last_col) {
                    bot.poz.x = bot.poz.x + last_col
                }
                else {
                    //poz.x = poz.x + last_col
                    bot.poz.speed = 0
                    last_col = -3
                }
            }
            else if (kol.wl == true) {
                last_col = 3
                bot.poz.x = bot.poz.x + 3
                //console.log(kol.wl)
            }
            else if (kol.wr == true) {
                last_col = -3
                bot.poz.x = bot.poz.x - 3
            }
        }
        bot.poz.y = bot.poz.y + (data.speed.curr - bot.poz.speed)
        
        data.ctx.drawImage(
            data.elements,
            data.map[types[num]][0],
            data.map[types[num]][1],
            data.map[types[num]][2],
            data.map[types[num]][3],
            bot.poz.x, bot.poz.y,
            data.map[types[num]][2],
            data.map[types[num]][3]
        );

        bot.poz.x1 = bot.poz.x + data.map[types[num]][2]
        bot.poz.y1 = bot.poz.y + data.map[types[num]][3]
        bot.poz.w = data.map[types[num]][2]
        bot.poz.h = data.map[types[num]][2]

        if (bot.poz.x < -100 || bot.poz.x > 580 || bot.poz.y < -200 || bot.poz.y > 400) {
            var index = bots.indexOf(bot);
            if (index > -1) {
                bots.splice(index, 1);
            }
        }
    }
}
