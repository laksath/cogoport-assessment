var ball_x, ball_y, ball_dx, ball_dy;
var brickRows = 4, brickCols = 4, brickWidth = 75, brickHeight = 20, brickPadding = 20, offsetLeft = 15, offsetTop = 25;

var bricks = [];

for (c = 0; c < brickCols; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRows; r++) {
        bricks[c][r] = { x: 0, y: 0, hidden: 0 };
    }
}

var count = 0;

var lives = 3;

function setup() {
    createCanvas(400, 400);

    ball_x = width / 2;
    ball_y = height / 2 + 20;
    ball_dx = 2;
    ball_dy = 2;

    ball_diameter = 25;
    ball_radius = (ball_diameter / 2);

    paddle_width = 90;
    paddle_height = 15;

    paddle_x = width / 2 - paddle_width / 2;
    paddle_y = height - paddle_height - ball_diameter - ball_radius;

    paddle_dx = 5;
}

function createBricks() {

    for (c = 0; c < brickCols; c++) {
        for (r = 0; r < brickRows; r++) {
            if (bricks[c][r].hidden == 0) {
                bricks[c][r].x = offsetLeft + c * (brickWidth + brickPadding);
                bricks[c][r].y = offsetTop + r * (brickHeight + brickPadding);

                fill("#3399FF80");
                rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
            }
        }
    }

}

function startover() {
    ball_x = width / 2;
    ball_y = height / 2 + 20;
    ball_dx = 2;
    ball_dy = 2;
    paddle_x = width / 2 - paddle_width / 2;
    paddle_y = height - paddle_height - ball_diameter - ball_radius;
}

function sideTopBottomCheck() {

    if (ball_y + ball_radius >= height) {
        if (lives > 1) {
            lives--;
            startover();
        } else if (lives == 1) {
            ball_dx = 0;
            ball_dy = 0;
            lives = 0;
        }
    }

    if (ball_x >= width - ball_radius || ball_x < ball_radius) {
        ball_dx = -ball_dx;
    }

    if (ball_y >= height - ball_radius || ball_y <= ball_radius) {
        ball_dy = -ball_dy;
    }

}

function paddleShift() {
    if (keyIsDown(LEFT_ARROW)) {
        paddle_x = paddle_x - paddle_dx;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        paddle_x = paddle_x + paddle_dx;
    }
}

function paddleBounce() {

    if (ball_x + ball_radius >= paddle_x &&
        ball_x - ball_radius <= paddle_x + paddle_width &&
        ball_y + ball_radius >= paddle_y &&
        ball_y - ball_radius <= paddle_y + paddle_height &&
        ball_dy > 0
    ) {
        ball_dy = -ball_dy;
    }
}

function brickContact() {
    for (r = 0; r < 4; r++) {
        for (c = 0; c < 4; c++) {

            ballLeftSide = ball_x - ball_radius;
            ballRightSide = ball_x + ball_radius;

            ballTopSide = ball_y - ball_radius;
            ballBottomSide = ball_y + ball_radius;

            brickTopSide = offsetTop + (r) * (brickHeight) + r * brickPadding;
            brickBottomSide = offsetTop + (r + 1) * (brickHeight) + r * brickPadding;

            brickLeftSide = offsetLeft + (c) * (brickWidth) + c * brickPadding;
            brickRightSide = offsetLeft + (c + 1) * (brickWidth) + c * brickPadding;

            if (
                (
                    (ball_dy > 0 && ballBottomSide >= brickTopSide && ballBottomSide <= brickBottomSide) ||
                    (ball_dy < 0 && ballTopSide <= brickBottomSide && ballTopSide >= brickTopSide)
                ) &&
                (ballRightSide >= brickLeftSide && ballLeftSide <= brickRightSide)
            ) {
                if (bricks[c][r].hidden == 0) {
                    ball_dy = -ball_dy;
                    bricks[c][r].hidden = 1;
                    count++;
                }
            }
        }
    }
}

function draw() {

    clear();
    background("black");

    textSize(15);
    text('Score : ' + count.toString() + ' Lives : ' + lives.toString(), 10, 20);
    createBricks();

    fill("#001FFFD8");
    circle(ball_x, ball_y, ball_diameter);

    fill("grey");
    rect(paddle_x, paddle_y, paddle_width, paddle_height);

    ball_x = ball_x + ball_dx;
    ball_y = ball_y + ball_dy;

    sideTopBottomCheck();

    paddleShift();

    paddleBounce();

    brickContact();

    if (count == 16) {
        ball_dx = 0;
        ball_dy = 0;
    }

}