
// getting access of paddle
let userPaddle = document.querySelector("#user-paddle")
let computerPaddle = document.querySelector("#computer-paddle")
let ball = document.querySelector("#ball")


let computerScore=document.querySelector("#computer-score")
let userScore=document.querySelector("#user-score")


// positioning the initial of paddle and the ball
userPaddle.style.marginLeft = `10px`
userPaddle.style.marginTop = `0px`
computerPaddle.style.marginLeft = `1458px`
computerPaddle.style.marginTop = `0px`

ball.style.marginLeft = `741px`
ball.style.marginTop = `412px`

arrow_up = false;
arrow_down = false;

Vx = -1;
Vy = -1;
// providing the velocity to the ball 
V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)));


// Event listenr for arrow key of up and down for user paddle movement

document.addEventListener('keydown', (e)=> {

    if (e.keyCode == '38') {
        arrow_up = true
    }
    else if (e.keyCode == '40') {
        arrow_down = true
    }
})

document.addEventListener('keyup', (e) => {

    if (e.keyCode == '38') {
        arrow_up = false
    } else if (e.keyCode == '40') {
        arrow_down = false
    }
})

let id;

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        gameLoop()
        if(Number(computerScore.innerHTML)==0){
            document.querySelector("#wins").innerHTML=''
        }else if(Number(userScore.innerHTML)==0){
            document.querySelector("#wins").innerHTML=''
        }
    }
  }


function reset() {

    clearInterval(id)
    Vx = -1;
    Vy = -1;

    V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)));

    ball.style.marginLeft = `741px`
    ball.style.marginTop = `412px`


    if(Number(computerScore.innerHTML)==3){
        document.querySelector("#wins").innerHTML=`Computer Wins😔`
        computerScore.innerHTML='0'
        
    }else if(Number(userScore.innerHTML)==3){
        document.querySelector("#wins").innerHTML="You Wins😎🥳"
        userScore.innerHTML='0'
    }else{
        document.querySelector("#wins").innerHTML=''
    }

}




gameLoop();

function gameLoop() {

    setTimeout(() => {
        id = setInterval(() => {

            if (marginLeft(ball)<-0 ) {
                document.querySelector("#computer-score").innerHTML = Number(document.querySelector("#computer-score").innerHTML) + 1
                reset()
                return
            }
            if (marginLeft(ball) > 1470) {
                document.querySelector("#user-score").innerHTML = Number(document.querySelector("#user-score").innerHTML) + 1
                reset()
                return
            }

            if (marginTop(ball) < 0 || (marginTop(ball)) > 823) {
                Vy = -Vy
            }

            let paddle  = (marginLeft(ball)+10)<744 ? userPaddle :computerPaddle

            if(collisionDetected(paddle)){

                let angle

                let type =(marginLeft(paddle)==10)? "user" :"computer"

                if(ball.centerY<paddle.centerY){
                    angle= (type=="user" ? -Math.PI/4 : (-3*Math.PI)/4)
                }else if(ball.centerY>paddle.centerY){
                    angle= (type=="user" ? Math.PI/4 : (3*Math.PI)/4)
                }else if(ball.centerY==paddle.centerY){
                    angle= (type=="user" ? 0 : Math.PI)
                }

                V += .25
                Vx= V*Math.cos(angle)
                Vy= V*Math.sin(angle)
            }


            let computerLevel= 0.05
            computerPaddle.style.marginTop=`${marginTop(computerPaddle)+((ball.centerY - (marginTop(computerPaddle)+70))) * computerLevel}px`

            

            ball.style.marginLeft = `${marginLeft(ball) +Vx }px`
            ball.style.marginTop = `${marginTop(ball) + Vy}px`
            
            

         
 

            if (arrow_up && marginTop(userPaddle) >0) {
                userPaddle.style.marginTop = `${marginTop(userPaddle) - 4}px`
            }
            else if (arrow_down && marginTop(userPaddle) < 704) {
                userPaddle.style.marginTop = `${marginTop(userPaddle) + 4}px`
            }


            if(marginTop(computerPaddle)<0){
                computerPaddle.style.marginTop= '0px'
            }
            if(marginTop(computerPaddle)>704){
                computerPaddle.style.marginTop= '704px'
            }


        }, 5)

    }, 500)
}

function collisionDetected(paddle){

    ball.top=marginTop(ball)
    ball.bottom=marginTop(ball)+20
    ball.left=marginLeft(ball)
    ball.right=marginLeft(ball)+20
    ball.centerX=marginLeft(ball)+10
    ball.centerY=marginTop(ball)+10

    paddle.top=marginTop(paddle)
    paddle.bottom=marginTop(paddle)+140
    paddle.left=marginLeft(paddle)
    paddle.right=marginLeft(paddle)+10
    paddle.centerX=marginLeft(paddle)+10
    paddle.centerY=marginTop(paddle)+70

    return ball.left<paddle.right && ball.top < paddle.bottom && ball.right >paddle.left && ball.bottom > paddle.top
}


function marginTop(el) {
    return Number(el.style.marginTop.split('p')[0])
}

function marginLeft(el) {
    return Number(el.style.marginLeft.split('p')[0])
}
