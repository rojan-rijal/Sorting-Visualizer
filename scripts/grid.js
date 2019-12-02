let BOARD_WIDTH = 41;
let BOARD_HEIGHT = 41;
let scale_factor = BOARD_WIDTH;
let width = Math.pow(BOARD_WIDTH,2);
let height = Math.pow(BOARD_HEIGHT,2);

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

const MAX_SUM = 16;

const random_mode = true;

let grid = [];
let matrix = [];

let visited = [];

//OBJECTS

class Coord{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Node{
  constructor(position){
    this.position = position;
    this.random_pos = null;
    this.width = BOARD_WIDTH;
    this.height = BOARD_HEIGHT;
    this.adj_list = [];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function colorFound(node){
  context.beginPath();
  context.fillStyle = "green";
  context.rect(node.random_pos.x * scale_factor, node.random_pos.y * scale_factor, node.width, node.height);
  context.fillRect(node.random_pos.x * scale_factor, node.random_pos.y * scale_factor, node.width, node.height);
  context.stroke();
}

function colorRed(node){
  context.beginPath();
  context.fillStyle = "red";
  context.rect(node.random_pos.x * scale_factor, node.random_pos.y * scale_factor, node.width, node.height);
  context.fillRect(node.random_pos.x * scale_factor, node.random_pos.y * scale_factor, node.width, node.height);
  context.stroke();
}

function colorYellow(node){
  context.beginPath();
  context.fillStyle = "yellow";
  context.rect(node.random_pos.x * scale_factor, node.random_pos.y * scale_factor, node.width, node.height);
  context.fillRect(node.random_pos.x * scale_factor, node.random_pos.y * scale_factor, node.width, node.height);
  context.stroke();
}

function createEdge(i, j){
  context.beginPath();
  context.strokeStyle = "orange"
  context.moveTo(nodes[i].random_pos.x*scale_factor, nodes[j].random_pos.y*scale_factor);
  context.lineTo(nodes[i].random_pos.x*scale_factor, nodes[j].random_pos.y*scale_factor);
  context.stroke();
}


function hasBeenVisited(node){
  for(var i = 0; i < visited.length; i++){
    if(visited[i] == node)
      return true;
  }
  return false;
}

//DRAWING FUNCTIONS

function drawBoard(){
  context.beginPath();
  context.strokeStyle = "gray";
  context.fillStyle=  "black";

  for(var i = 0; i < BOARD_HEIGHT; i++){
    grid[i] = [];
    for(var j = 0; j < BOARD_WIDTH; j++){
      grid[i][j] = new Node(i, j, 0)
      context.rect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
      context.fillRect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
    }
  }
  context.stroke();
}

function drawNode(node, isBotNode){
  context.beginPath();
  context.strokeStyle = "gray";
  if(isBotNode){
    node.random_pos = node.position;
    context.fillStyle = "red";
  } else {
    context.fillStyle=  "yellow";
  }
  if(random_mode){
    context.rect(node.random_pos.x*scale_factor, node.random_pos.y*scale_factor, node.width, node.height);
    context.fillRect(node.random_pos.x*scale_factor, node.random_pos.y*scale_factor, node.width, node.height);
  } else {
    context.rect(node.position.x*scale_factor, node.position.y*scale_factor, node.width, node.height);
    context.fillRect(node.position.x*scale_factor, node.position.y*scale_factor, node.width, node.height);
  }
  context.stroke();
}

//UNIT TESTING
class Tester {
}


//RUNNING UNIT TESTS

let tester = new Tester();

//MAIN RUNNING

let bot = new Node(new Coord(16, 0, 0));

drawBoard();
// let interval = setInterval(() => { moveAnt(myBot); }, 20)
