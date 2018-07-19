function Events() {
    
    events = this;
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.fire = false;

    document.onkeydown = function (e) {
        if (e.code == "ArrowUp") {
            events.up = true
        }
        else if (e.code == "ArrowDown") {
            events.down = true
        }
        else if (e.code == "ArrowLeft") {
            events.left = true
        }
        else if (e.code == "ArrowRight") {
            events.right = true
        }
        else if (e.code == "ControlRight") {
            events.fire = true
        }
    };

    document.onkeyup = function (e) {
        if (e.code == "ArrowUp") {
            events.up = false
        }
        else if (e.code == "ArrowDown") {
            events.down = false
        }
        else if (e.code == "ArrowLeft") {
            events.left = false
        }
        else if (e.code == "ArrowRight") {
            events.right = false
        }
        else if (e.code == "ControlRight") {
            events.fire = false
        }
    };
}
