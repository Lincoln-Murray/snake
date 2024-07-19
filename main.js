tile_width = 0
tile_num = 20

canvas = null
ctx = null
map = []
head = [0,0]
snake_direction = 2

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
    generate_fruit()
    var timer = setInterval(function() {
        if (game_over === false) {
            new_frame()
        }
    }, 150);
}

function move_snake() {
    if (snake_direction === 1 && snake[0][1] != 0) {
        snake[0][1] -= 1
    }
    else if (snake_direction === 2 && snake[0][0] != tile_num-1) {
        snake[0][0] += 1
    }
    else if (snake_direction === 3 && snake[0][1] != tile_num-1) {
        snake[0][1] += 1
    }
    else if (snake_direction === 4 && snake[0][0] != 0) {
        snake[0][0] -= 1
    }
}

function render_frame() {
    for (let y = 0; y < tile_num; y++) {
        for (let x = 0; x < tile_num; x++) {
            if (typeof find_in(snake, [x,y]) === 'number') {
                ctx.fillStyle = '#20b236'
            }
            else if (typeof find_in(fruits, [x,y]) === 'number') {
                ctx.fillStyle = '#d50909';
            }
            else {
                ctx.fillStyle = '#000000';
            }
            ctx.fillRect(x*tile_width, y*tile_width, (x+1)*tile_width, (y+1)*tile_width);
        }
    }
}

function new_frame() {
    move_snake()
    render_frame()
}

document.addEventListener("keydown", (evt) => {
    if(evt.code === 'ArrowUp' && snake_direction != 3) {
        snake_direction = 1
    }
    if(evt.code === 'ArrowRight' && snake_direction != 4) {
        snake_direction = 2
    }
    if(evt.code === 'ArrowDown' && snake_direction != 1) {
        snake_direction = 3
    }
    if(evt.code === 'ArrowLeft' && snake_direction != 2) {
        snake_direction = 4
    }
});

function find_in(array, value) {
    for(var i=0;i<array.length;i++)
    {
        if(array[i][0] === value[0] && array[i][1] === value[1]){
            return i
        }
    }
    return false
}
