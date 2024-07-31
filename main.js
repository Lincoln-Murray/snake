tile_width = 0
tile_num = 20

canvas = null
ctx = null
snake = [[10,10]]
snake_direction = 2
fruits = []
snake_grow = false
game_over = false
frame_time = 150
gradient = -1.125/(tile_num*tile_num-1)
can_move = true

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
        else {
            ctx.fillStyle = '#000000'
            ctx.fillRect(0,0,document.getElementById('canvas').width, document.getElementById('canvas').height)
            ctx.fillStyle = '#d50909';
            ctx.font = document.getElementById('canvas').width/3 + 'px sans-serif'
            ctx.fillText('Game Over', 0, document.getElementById('canvas').height/2, document.getElementById('canvas').width-10)
            ctx.font = document.getElementById('canvas').width/6 + 'px sans-serif'
            ctx.fillText('Score: ' + (10*snake.length-10), document.getElementById('canvas').width/4, document.getElementById('canvas').height*5/8, document.getElementById('canvas').width/2)
        }
    }, frame_time);
}

function move_snake() {
    if (snake_grow === true) {
        snake_grow = false
        new_piece = [snake[snake.length-1][0], snake[snake.length-1][1]]
    }
    else {
        new_piece = null
    }
    if (snake_direction === 1) {
        if (snake[0][1] != 0 && find_in(snake, [snake[0][0],snake[0][1]-1]) === false) {
            for (let s = snake.length-1; s > 0; s--) {
                snake[s][0] = snake[s-1][0]
                snake[s][1] = snake[s-1][1]
            }
            snake[0][1] -= 1
        }
        else {
            game_over = true
        }
    }
    else if (snake_direction === 2) {
        if (snake[0][0] != tile_num-1&& find_in(snake, [snake[0][0]+1,snake[0][1]]) === false) {
            for (let s = snake.length-1; s > 0; s--) {
                snake[s][0] = snake[s-1][0]
                snake[s][1] = snake[s-1][1]
            }
            snake[0][0] += 1
        }
        else {
            game_over = true
        }
    }
    else if (snake_direction === 3) {
        if (snake[0][1] != tile_num-1&& find_in(snake, [snake[0][0],snake[0][1]+1]) === false) {
            for (let s = snake.length-1; s > 0; s--) {
                snake[s][0] = snake[s-1][0]
                snake[s][1] = snake[s-1][1]
            }
            snake[0][1] += 1
        }
        else {
            game_over = true
        }
    }
    else if (snake_direction === 4) {
        if (snake[0][0] != 0&& find_in(snake, [snake[0][0]-1,snake[0][1]]) === false) {
            for (let s = snake.length-1; s > 0; s--) {
                snake[s][0] = snake[s-1][0]
                snake[s][1] = snake[s-1][1]
            }
            snake[0][0] -= 1
        }
        else {
            game_over = true
        }
    }
    if (new_piece != null) {
        frame_time = (gradient)*snake.length+144
        snake.push([new_piece[0], new_piece[1]])
    }
    if (typeof find_in(fruits, snake[0]) === 'number') {
        remove_fruit(snake[0][0], snake[0][1])
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
            ctx.fillRect(Math.floor(x*tile_width), Math.floor(y*tile_width), Math.floor((x+1)*tile_width), Math.floor((y+1)*tile_width));
        }
    }
}

function new_frame() {
    can_move = true
    move_snake()
    render_frame()
}

document.addEventListener("keydown", (evt) => {
    if (can_move === true) {
        can_move = false
        if((evt.code === 'ArrowUp' || evt.code === 'KeyW') && snake_direction != 3) {
            snake_direction = 1
        }
        else if((evt.code === 'ArrowRight' || evt.code === 'KeyD') && snake_direction != 4) {
            snake_direction = 2
        }
        else if((evt.code === 'ArrowDown' || evt.code === 'KeyS') && snake_direction != 1) {
            snake_direction = 3
        }
        else if((evt.code === 'ArrowLeft' || evt.code === 'KeyA') && snake_direction != 2) {
            snake_direction = 4
        }
        else {
            can_move = true
        }
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

function remove_fruit(x,y) {
    index = find_in(fruits, [x,y])
    fruits.splice(index, 1)
    snake_grow = true
    if ((fruits.length+snake.length) < (tile_num*tile_num)) {
        generate_fruit()
    }
}

function generate_fruit() {
    while (true) {
        let x = Math.floor(Math.random()*tile_num)
        let y = Math.floor(Math.random()*tile_num)
        if (x === tile_num) {
            x -= 1
        }
        if (y === tile_num) {
            y -= 1
        }
        if (find_in(snake, [x, y]) === false && find_in(fruits, [x, y]) === false) {
            fruits.push([x,y])
            break
        }
    }
}