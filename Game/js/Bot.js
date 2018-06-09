function Bot() {
    //console.log("Bot")
    //console.log(data)

    var poz = {
        x: 200,
        y: -20,
        speed: 4
    }
    var last_col
    var bot = this

    this.render = function () {

        var points = {
            l: poz.x - data.map.civil3[4],
            r: poz.x + data.map.civil3[4] + data.map.civil3[2],
            odl: 60,
        }

        var kol = {
            pl: data.ctx.getImageData(points.l, poz.y - points.odl, 1, 1).data,
            pr: data.ctx.getImageData(points.r, poz.y - points.odl, 1, 1).data,
            wl: true,
            wr: true,
        }
        //console.log(kol.pl)


        if (kol.pl[0] == data.colors.grey[0] && kol.pl[1] == data.colors.grey[1] && kol.pl[2] == data.colors.grey[2] && kol.pl[3] == data.colors.grey[3]) {
            kol.wl = false;
        }
        if (kol.pr[0] == data.colors.grey[0] && kol.pr[1] == data.colors.grey[1] && kol.pr[2] == data.colors.grey[2] && kol.pr[3] == data.colors.grey[3]) {
            kol.wr = false;
        }

        if (kol.wl == true && kol.wr == true) {
            //koniec
            if (last_col) {
                poz.x = poz.x + last_col
            }

        }
        else if (kol.wl == true) {
            last_col = 3
            poz.x = poz.x + 3
            //console.log(kol.wl)
        }
        else if (kol.wr == true) {
            last_col = -3
            poz.x = poz.x - 3
        }


        poz.y = poz.y + (data.speed.curr - poz.speed)


        data.ctx.beginPath();

        data.ctx.moveTo(points.l, poz.y - points.odl);
        data.ctx.lineTo(points.l, poz.y - points.odl - 2);

        data.ctx.moveTo(points.r, poz.y - points.odl);
        data.ctx.lineTo(points.r, poz.y - points.odl - 2);

        //data.ctx.moveTo(data.poz.x, data.poz.y - 4);
        //data.ctx.lineTo(data.poz.x, data.poz.y - 6);

        data.ctx.lineWidth = 1;
        data.ctx.strokeStyle = "rgba(0,0,0,1)"
        //data.ctx.stroke();

        data.ctx.drawImage(data.elements, data.map.civil3[0], data.map.civil3[1], data.map.civil3[2], data.map.civil3[3], poz.x, poz.y, data.map.civil3[2], data.map.civil3[3]);


        if (poz.x < -100 || poz.x > 580 || poz.y < -200) {
            var index = bots.indexOf(bot);
            if (index > -1) {
                bots.splice(index, 1);
            }
            console.log(bots.length)
        }

    }








}