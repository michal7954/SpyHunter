var data;

window.onload = function () {
    data = new Data();
    render();
};


function render() {
    data.ctx.drawImage(data.area, 0, data.frame, 480, 65535);
    data.frame = data.frame + data.speed;

    requestAnimationFrame(render);
};
