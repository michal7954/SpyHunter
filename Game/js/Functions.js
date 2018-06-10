function Functions() {


    this.colorColl = function (x, y, color) {

        pixel = data.ctx.getImageData(x, y, 1, 1).data;
        if (pixel[0] == color[0] && pixel[1] == color[1] && pixel[2] == color[2] && pixel[3] == color[3]) {
            return true;
        }
        else {
            return false;
        }
    }
}