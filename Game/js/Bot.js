function Bot() {
    //console.log("Bot")
    //console.log(data)
    //console.log(bots.length)

    //console.log(rand)
    var num = Math.floor(Math.random() * 3);

    var poz = {
        x: -1000,
        y: -20,
        speed: Math.floor((Math.random() * 3) + 2)
    }

    for (i = 128; i < 352; i++) {
        pixel = data.ctx.getImageData(i, 1, 1, 1).data;
        if (pixel[0] == data.colors.grey[0] && pixel[1] == data.colors.grey[1] && pixel[2] == data.colors.grey[2] && pixel[3] == data.colors.grey[3]) {
            poz.x = i + 60
            i = 400
        }
    }



    var last_col;
    var bot = this;
    var types = ["civil1", "civil2", "civil3"];

    this.render = function () {

        var points = {
            l: poz.x - data.map[types[num]][4],
            r: poz.x + data.map[types[num]][4] + data.map[types[num]][2],
            odl: 10,
        }

        var kol = {
            pl: data.ctx.getImageData(points.l, poz.y - points.odl, 1, 1).data,
            pr: data.ctx.getImageData(points.r, poz.y - points.odl, 1, 1).data,
            wl: true,
            wr: true,
        }
        //console.log(kol.pl)

        if (f.colorColl(points.l, poz.y - points.odl, data.colors.trans) && f.colorColl(points.r, poz.y - points.odl, data.colors.trans)) {
            //punkty poza obszarem

            //punkty tylne
            l = f.colorColl(poz.x, 1, data.colors.grey)
            r = f.colorColl(poz.x + data.map[types[num]][2], 1, data.colors.grey)

            if (l == true && r == true) {
                if (last_col) {
                    poz.x = poz.x + last_col
                }
            }
            else if (kol.l == true) {
                last_col = 3
                poz.x = poz.x + 3
                //console.log(kol.wl)
            }
            else if (kol.r == true) {
                last_col = -3
                poz.x = poz.x - 3
            }

        }
        else {
            //punkty kontrolne w obszarze

            if (kol.pl[0] == data.colors.grey[0] && kol.pl[1] == data.colors.grey[1] && kol.pl[2] == data.colors.grey[2] && kol.pl[3] == data.colors.grey[3]) {
                kol.wl = false;
            }
            if (kol.pr[0] == data.colors.grey[0] && kol.pr[1] == data.colors.grey[1] && kol.pr[2] == data.colors.grey[2] && kol.pr[3] == data.colors.grey[3]) {
                kol.wr = false;
            }

            if (kol.wl == true && kol.wr == true) {

                if (last_col) {
                    poz.x = poz.x + last_col
                }
                else {
                    //poz.x = poz.x + last_col
                    poz.speed = 0
                    last_col = -3
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
        data.ctx.stroke();

        data.ctx.drawImage(
            data.elements,
            data.map[types[num]][0],
            data.map[types[num]][1],
            data.map[types[num]][2],
            data.map[types[num]][3],
            poz.x, poz.y,
            data.map[types[num]][2],
            data.map[types[num]][3]
        );


        if (poz.x < -100 || poz.x > 580 || poz.y < -200 || poz.y > 400) {
            var index = bots.indexOf(bot);
            if (index > -1) {
                bots.splice(index, 1);
            }
            //console.log(bots.length)
        }

    }








}