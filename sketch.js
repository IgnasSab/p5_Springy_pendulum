//With value:

let width = 1200
let height = 800
let lineDiameter = 10
let radius = 45
let onCircle = false
let k = 0.0008
let ballVx = 0
let ballVy = 0
let angleV = 0
let moveCircle = 0
let gravitationalForce = 0.5
let multiplier = 0.997

//No value:

let ballAx
let ballAy
let ballD
let angleA_Pendulum
let length
let angleA
let angle

function setup() 
{

  createCanvas(width, height)
  background(100)
  origin = createVector(width/2, 0)
  myVector = createVector (width/2, height/2)
  printFrame()

}

function draw() 
{

  if(mouseIsPressed === true)
  {  
      if(radius > dist(0, 0, mouseX - width/2, mouseY - height/2))
    {
      onCircle = true 
      moveCircle = 1
    }
  }
  if(onCircle)
  {
    myVector.x = mouseX
    myVector.y = mouseY
    if(myVector.x < radius + 5)
    {
      myVector.x = radius + 6
    }
    if(myVector.x > width - radius - 5)
    {
      myVector.x = width-radius-6
    }  
    if(myVector.y > height - radius -5)
    {
      myVector.y = height - radius-6
    }
    if(myVector.y < radius + 5)
    {
      myVector.y = radius + 6
    }

    printFrame()
  }
  if(mouseIsPressed === false)
  {
      onCircle = false
   
      length = dist(origin.x,origin.y, myVector.x, myVector.y)
      angle = asin((myVector.x - width/2)/length)

      angleA_Pendulum = sin(angle)*gravitationalForce
      angleA = -angleA_Pendulum/length
      angleV += angleA
      angle += angleV
      
      ballD = dist(origin.x, origin.y, myVector.x, myVector.y) - dist(origin.x, origin.y, width/2, height/2)
      ballAx = -sin(angle)*k * ballD
      ballAy = -cos(angle)*k * ballD
      ballVx += ballAx
      ballVy += ballAy 

      myVector.x = sin(angle)*length + origin.x
      myVector.y = cos(angle)*length + origin.y
    
      myVector.y += ballVy
      myVector.x += ballVx

      ballVx *= multiplier
      ballVy *= multiplier
      angleV *= multiplier


      printFrame()
    
  }
  if(moveCircle === 1 && mouseIsPressed === true)
  {
    
   onCircle = true
   ballVx = 0
   ballVy = 0
   angleV = 0
   
  }

}


function printFrame()
{
  background(100)
  strokeWeight(lineDiameter)
  stroke(0,255,0)
  fill(100)
  rect(0,0,width, height)

  strokeWeight(lineDiameter/2)
  stroke(0,255,0)
  line(origin.x, origin.y, myVector.x, myVector.y)
  
  strokeWeight(lineDiameter/2)
  fill(255,0,255)
  stroke(255,255,0)
  ellipse(origin.x, origin.y, 100, 50)

  strokeWeight(lineDiameter/2)
  stroke(255,255,0)
  fill(250,0,255)
  circle(myVector.x, myVector.y, radius*2)

}