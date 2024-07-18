tile_width = 0
tile_num = 20

canvas = null
ctx = null
map = []
head = [0,0]

addEventListener('DOMContentLoaded', (evt) => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resize()
    start()
});

addEventListener('resize', (evt) => {
    resize()
});

function resize() {
    if (window.innerHeight >= window.innerWidth) {
        document.getElementById('canvas').width = window.innerWidth
        document.getElementById('canvas').height = window.innerWidth
        tile_width = window.innerWidth/tile_num
    }
    else {
        document.getElementById('canvas').width = window.innerHeight
        document.getElementById('canvas').height = window.innerHeight
        tile_width = window.innerHeight/tile_num
    }
}

function start() {
    for (let y = 0; y < tile_num; y++) {
        map.push([])
        for (let x = 0; x < tile_num; x++) {
            if (x === Math.round(tile_num/2) && y === Math.round(tile_num/2)) {
                map[y].push(2)
                head = [x,y]
            }
            else {
                map[y].push(0)
            }
        }
    }
    render_frame
}

function render_frame(frame) {
    for (let y = 0; y < tile_num; y++) {
        for (let x = 0; x < tile_num; x++) {
            if (frame[y][x] === 0) {
                ctx.fillStyle = '#000000'
            }
            else if ([1,2,3,4].includes(frame[y][x]) === true) {
                ctx.fillStyle = '#20b236';
            }
            ctx.fillRect(x*tile_width, y*tile_width, (x+1)*tile_width, (y+1)*tile_width);
        }
    }
}