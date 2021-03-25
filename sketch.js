const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var chain,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;

function preload()
{
  bg_img = loadImage('assets/background.jpg');
  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');
  
}
function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('assets/cut_button.png');
  button.position(230,40);
  button.size(40,40);
  button.mouseClicked(drop);
  
  chain = new Chain(6,{x:245,y:30});
  ground = new Ground(200,690,600,20);
  
  var fruit_options={
    density:0.001
  }
     fruit = Bodies.circle(300,300,15,fruit_options);
     Matter.Composite.add(chain.rope,fruit);

   fruit_con = Constraint.create(
    {
      bodyA:chain.rope.bodies[5],
      pointA:{x:0,y:0},
      bodyB:fruit,
      pointB:{x:5,y:5},
      length:5,
      stiffness:0.01
    });
    World.add(engine.world,fruit_con)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  //    drawConstraint(fruit_con)
  image(bg_img,width/2,height/2,490,690);
  image(food,fruit.position.x,fruit.position.y,60,60);
  image(rabbit,240,600,200,200);
  chain.show();
  //chain.showConstraints(fruit_con)

  Engine.update(engine);
  ground.show();

}

function drop()
{
  chain.break();
  World.remove(engine.world,fruit_con);
  fruit_con = null;
}

// function drawConstraints(constraints) {
//   for (let i = 0; i < constraints.length; i++) {
//     drawConstraint(constraints[i]);
//   }
// }

// function drawConstraint(constraint) {
//   if(constraint!=null)
//     {
//   const offsetA = constraint.pointA;
//   let posA = {x:0, y:0};
//   if (constraint.bodyA) {
//     posA = constraint.bodyA.position;
//   }
//   const offsetB = constraint.pointB;
//   let posB = {x:0, y:0};
//   if (constraint.bodyB) {
//     posB = constraint.bodyB.position;
//   }
//   push()
//   strokeWeight(4);
//   stroke(255);
//   line(
//     posA.x + offsetA.x,
//     posA.y + offsetA.y,
//     posB.x + offsetB.x,
//     posB.y + offsetB.y
//   );
//   pop();
//     }
// }
