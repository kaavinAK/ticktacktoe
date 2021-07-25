console.log("starting main.js")
let canvas = document.querySelector('.canvas')
let result = document.querySelector('.result')
let upperplatform = canvas.getContext('2d')
let lowerplatform = canvas.getContext('2d')
let holecanvas = canvas.getContext('2d')
let boxcanvas = canvas.getContext('2d')
let score = document.querySelector('.score')
let time=0;
let holespeed=15;
let up=false
let upjump=false
let pathways={
    color:'white',
    height:'200px',
    width:'200px'
}
function draw()
{
    upperplatform.fillStyle='black'
    upperplatform.fillRect(0,0,1500,200)
    lowerplatform.fillStyle='black'
lowerplatform.fillRect(0,400,1500,200)
}
class Hole{
    constructor(height,width,color)
    {
        this.height=height
        this.width=width
        this.color=color
        this.position=1500-width

    }
    update()
    {
        if(this.position>=0 && this.position<=1500){
        
        holecanvas.fillStyle="black"
        if(up)
        {
            holecanvas.fillRect(this.position,200-this.height,this.width+1,this.height)
       
        }
        else{
            holecanvas.fillRect(this.position,400,this.width+1,this.height)
       
        }
        this.position-=holespeed
        }
        if(this.position<=0)
        {
            this.position=1500
            let rand = parseInt(Math.random()*2)
            if(rand%2==0)
            {
               up=false
            }
            else{
                up=true
            }
        }
    }
    draw()
    {
        if(up)
        {
            holecanvas.clearRect(this.position,200-this.height,this.width,this.height)
   
        }
        else{
            holecanvas.clearRect(this.position,400,this.width,this.height)
   
        }
    }

}
class Box {
    constructor(height,width,color)
    {
       this.height=height
       this.width=width
       this.color=color
       this.position={
                x:200,
                y:400-this.height
       }
       this.speed={
           x:0,
           y:0
       }
    }
    jump()
    {
        
        if(this.position.y==400-this.height){
        
        this.speed.y=-5
        

        }
        if(this.position.y==200)
        {
            this.speed.y=5
            console.log("upjump")
            
        }

    }
    update()
    {
        
        if((this.position.y==200 ) || ( this.position.y+this.height==400))
        {
             
        }
        else{
            
            boxcanvas.clearRect(this.position.x,this.position.y,this.width,this.height)
            
        }
           
        
       
            this.position.y+=this.speed.y
            if(this.position.y==200 || this.position.y==400-this.height )
        {
            this.speed.x=0
            this.speed.y=0
            
        }
  
       
    }
    draw()
    {
        
        boxcanvas.fillStyle=this.color
       
        boxcanvas.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
let box = new Box(40,40,'blue')
draw();
let hole = new Hole(200,75,'white')
let status;
function gameloop(timestamp)
{
    console.log("inside gameloop")
box.update();
box.draw();
hole.update()
hole.draw()
status=check();

let anime=requestAnimationFrame(gameloop)
if(status)
{
    cancelAnimationFrame(anime)
    console.log("name",name,time)
    axios.post("http://localhost:5000/score/"+name,{name:name,score:time}).then((data)=>
            {
              console.log(data)
          
            }) 
  result.innerHTML="YOU LOST"
  let button = document.createElement('button')
  button.textContent="view score board"
  button.classList="scorebutton"
 
  let buttongroup = document.querySelector('.buttongroup')
  buttongroup.appendChild(button)
  
}
}

document.addEventListener('click',()=>
{
    box.jump();
})

 function check()
{
    if(up && box.position.y==200)
    {
        if(box.position.x>hole.position && box.position.x<hole.position+hole.width)
        {

console.log("wiinigs")
clearInterval(timeinterval)


  return true

        }
    }
    if(!up && box.position.y==400-box.height)
    {
        if(box.position.x>hole.position && box.position.x<hole.position+hole.width)
        {
            console.log("winnings")
            clearInterval(timeinterval)
            
            
            return true        
        }
    }
}

setInterval(()=>
{

 holespeed+=2
},5000)
let timeinterval=setInterval(()=>
{
score.innerHTML=time;
time++;
},1000)


gameloop();