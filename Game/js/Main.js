var data;
var events;

window.onload = function () {
    data = new Data();
    events = new Events();
    render();
};


function render() {
    data.ctx.drawImage(data.area, 0, data.frame, 480, 65535);
    data.frame = data.frame + data.speed;

    console.log(events)
    requestAnimationFrame(render);
};