function Functions() {

    var f = this;


    this.colorColl = function (x, y, color) {

        pixel = data.ctx.getImageData(x, y, 1, 1).data;
        if (pixel[0] == color[0] && pixel[1] == color[1] && pixel[2] == color[2] && pixel[3] == color[3]) {
            return true;
        }
        else {
            return false;
        }
    }

    this.info = function () {

        data.ctx.rect(128, 0, 224, 50)
        data.ctx.fillStyle = "black";
        data.ctx.fill();

        data.ctx.closePath();
        data.ctx.font = "15px Arial";
        data.ctx.fillStyle = "white";
        data.ctx.fillText("    Score: " + data.score + "           Time left: " + data.timeLeft, 130, 30);
    }

    this.getStartPoint = function () {
        var time = new Date().getTime();
        var seconds = parseInt(time / 1000)
        return seconds;
    }

    this.updateTime = function () {
        var date = new Date().getTime();
        var seconds = parseInt(date / 1000)
        var time = seconds - data.startPoint
        data.timeLeft = data.time - time

        if (data.timeLeft > 0) {
            data.score = data.points
        }
        else {
            data.score = data.points - data.timeLeft
            data.speed.min = 3
            if (data.speed.curr < data.speed.min) {
                data.speed.curr = data.speed.min
            }
        }
    }

    this.playerCollision = function () {

        if (data.timeLeft > 0) {

            player = null
            data.speed.curr = 0;
            data.poz.y = (data.speed.max - data.speed.curr) * data.speed.poz_range + data.speed.poz_addition
            data.points = data.points - 5
            //data.height = data.height + 50
            data.speed.curr = 0;
            setTimeout(function () {
                for (i = 352; i > 128; i--) {
                    if (f.colorColl(i, data.poz.y, data.colors.curr)) {
                        var point = i - data.map.curr[2];
                        console.log("bla")
                        if (f.colorColl(point, data.poz.y, data.colors.curr) &&
                            f.colorColl(point + data.map.curr[2], data.poz.y, data.colors.curr) &&
                            f.colorColl(point, data.poz.y + data.map.curr[3], data.colors.curr) &&
                            f.colorColl(point + data.map.curr[2], data.poz.y + data.map.curr[3], data.colors.curr)
                        ) {
                            data.poz.x = point;

                            i = 127
                        }
                    }
                }
                player = new Player()
            }, 2000);


        }
        else {
            f.gameOver();
        }


    }

    this.gameOver = function () {
        data.game = false;
        player = null;
        bots = []

        setTimeout(function () {
            data.ctx.rect(128, 0, 224, 300)
            data.ctx.fillStyle = "black";
            data.ctx.fill();

            data.ctx.closePath();
            data.ctx.font = "20px Arial";
            data.ctx.fillStyle = "white";
            data.ctx.fillText("GAME OVER!", 175, 150);
            data.ctx.fillText("Score: " + data.score, 205, 180);
        }, 10);

    }
}