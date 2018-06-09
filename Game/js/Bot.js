function Bot() {
    console.log("Bot")
    console.log(data)

    var poz={
        x:200,
        y:200
    }

    this.render = function(){

        
        data.ctx.beginPath();

    data.ctx.moveTo(poz.x - data.map.civil3[4], poz.y-20);
    data.ctx.lineTo(poz.x - data.map.civil3[4], poz.y- 22);

    data.ctx.moveTo(poz.x + data.map.civil3[4] + data.map.civil3[2], poz.y-20);
    data.ctx.lineTo(poz.x + data.map.civil3[4] + data.map.civil3[2], poz.y - 22);

    //data.ctx.moveTo(data.poz.x, data.poz.y - 4);
    //data.ctx.lineTo(data.poz.x, data.poz.y - 6);

    data.ctx.lineWidth = 1;
    data.ctx.strokeStyle = "rgba(0,0,0,1)"
    data.ctx.stroke();
        
        data.ctx.drawImage(data.elements, data.map.civil3[0], data.map.civil3[1], data.map.civil3[2], data.map.civil3[3],poz.x, poz.y, data.map.civil3[2], data.map.civil3[3]);
    
    }








}