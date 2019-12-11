let BOARD_WIDTH = 25;
let BOARD_HEIGHT = 25;
let scale_factor = BOARD_WIDTH;
let width = Math.pow(BOARD_WIDTH,2);
let height = Math.pow(BOARD_HEIGHT,2);

let merge = document.getElementById('merge');
let quick = document.getElementById('quick');
let insert = document.getElementById('insert');

let merge_context = contextGenerator(merge)
let quick_context = contextGenerator(quick)
let insert_context = contextGenerator(insert)

let merge_button = document.getElementById('merge_button');
let quick_button = document.getElementById('quick_button');
let insert_button = document.getElementById('insert_button');

setDimensions(merge);
setDimensions(quick);
setDimensions(insert);

function setDimensions(element){
  element.width = width;
  element.height = height;
}

function contextGenerator(canvas){
  return canvas.getContext("2d");
}


const MAX_SUM = 16;

const random_mode = false;

let merge_grid = [];
let quick_grid = [];
let insert_grid = [];

//OBJECTS

//Booleans to keep record of the state of whether or not one comparison has
//been made
let mergeStep = false;
let quickStep = false;
let insertStep = false;

//Main classes for the sorting algos
// Kizar
class Mergesort{

  //Step func will make a singular comparison within
  step(){}
}

// Ean
class Quicksort{
  // step(){}

  //constructor
  constructor(size, inputArr){
    this.size;
    this.inputArr[size];
  }

  //The main sorting algo for Quicksort
  partition(low, high)
  {
     let pivot = inputArr[low];

     //Left "Dog", looking for something smaller than pivot
     let i = low;
     while(inputArr[i] < pivot)
     {
       i++
     }

     //Right "Dog", looking for something bigger than pivot
     let j = inputArr[high];
     while(inputArr[j] > pivot)
     {
       j--;
     }

     //swap the elements in the array
     swap(inputArr, i, j);
  }

//Used to swap two numbers in an array
  swap(index1, index2){
    let temp = myArr[index1];
    inputArr[index1] = myArr[index2];
    inputArr[index2] = temp;
  }
}

// Rojan
class Insertionsort{
  step(){}
}

//This will call each sorting algo's step function
//Wait for all 3 to return 0 to update the GUI
//Pause for 1/2 after each step call
function RaceManager(){

}

class Coord{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Node{
  constructor(position, value){
      this.position =  position,
      this.width = BOARD_WIDTH,
      this.height = BOARD_HEIGHT,
      this.value = value
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hasBeenVisited(context, node){
  for(var i = 0; i < visited.length; i++){
    if(visited[i] == node)
      return true;
  }
  return false;
}

//DRAWING FUNCTIONS

function drawBoard(context, index, grid){
  context.beginPath();
  context.strokeStyle = "gray";
  context.fillStyle=  "black";

  for(var i = 0; i < 12; i++){
    grid[i] = [];
    for(var j = 0; j < 20; j++){
      grid[i][j] = new Node(new Coord(i, j, 0),  i)
      context.rect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
      context.fillRect(i*BOARD_HEIGHT, j*BOARD_WIDTH, BOARD_WIDTH, BOARD_HEIGHT);
    }
  }
  context.stroke();
}

function drawNode(context, node){
  context.beginPath();
  context.strokeStyle = "gray";
  context.fillStyle=  "yellow";
  context.rect(node.position.x*scale_factor, node.position.y*scale_factor, node.width, node.height);
  context.fillRect(node.position.x*scale_factor, node.position.y*scale_factor, node.width, node.height);
  context.stroke();
}

//TESTING
class Tester {

  constructor(grid, context){
    this.unsorted_array = [];
    this.grid = grid;
    this.context = context;

    for(var i = 0; i < 12; i++){
      this.unsorted_array.push(new Node(new Coord(i, 12-i, 0), i))
    }
  }

  //nodes will be Node objects
  sort(all_nodes, context){
    for(var i = 0; i < all_nodes.length; i++){
      if(i != all_nodes.length - 1){
        // console.log(all_nodes[i].contents.value, all_nodes[i+1].contents.value)
        if(all_nodes[i].value < all_nodes[i+1].value){
          // console.log(all_nodes);
          // console.log("Before: " + all_nodes[i].contents.value)
          this.swap(all_nodes[i], all_nodes[i+1], context);
          // console.log("After: " + all_nodes[i].contents.value)
          //pause momentarily
        }
      }
    }
  }

  swap(greater, lesser, context){
    //erase old nodes
    this.eraseNode(greater, context);
    this.eraseNode(lesser, context);
    //swap node objects
    this.swapNode(greater, lesser);
    //draw nodes on specific canvas
    this.drawNode(greater, context);
    this.drawNode(lesser, context);
  }

  //helpers
  eraseNode(node, context, grid){
    for(var i = 0; i < node.position.x; i++){
      for(var j = 0; j < node.position.y; j++){
        context.clearRect(this.grid[i][j].position.x*scale_factor, this.grid[i][j].position.y*scale_factor, this.grid[i][j].width, this.grid[i][j].height);
      }
    }
  }

  swapNode(greater, lesser){
    for(let property in greater){
      if(property == "position"){
        for(var coord in greater[property]){
          var buffer = greater[property][coord]
          greater[property][coord] = lesser[property][coord];
          lesser[property][coord] = buffer;
        }
      } else {
        let buffer = greater[property];
        greater[property] = lesser[property];
        lesser[property] = buffer;
      }
    }
  }

  drawNode(node, context){
    for(var i = 0; i < node.position.x; i++){
      for(var j = 0; j < node.position.y; j++){
        context.beginPath();
        
        context.strokeStyle = "gray";
        context.fillStyle = "red";
        context.rect((+this.grid[i][j].position.x)*scale_factor, this.grid[i][j].position.y*scale_factor, this.grid[i][j].width, this.grid[i][j].height);
        context.fillRect(this.grid[i][j].position.x*scale_factor, this.grid[i][j].position.y*scale_factor, this.grid[i][j].width, this.grid[i][j].height);
        context.stroke();
      }
    }
  }
}

//RUNNING UNIT TESTS

//MAIN RUNNING

drawBoard(merge_context, 0, merge_grid);
drawBoard(quick_context, 1, quick_grid);
drawBoard(insert_context, 2, insert_grid);

let tester1 = new Tester(merge_grid, merge_context);
let tester2 = new Tester(quick_grid, quick_context);
let tester3 = new Tester(insert_grid, insert_context);

merge_button.onclick = () => { tester1.sort(tester1.unsorted_array, tester1.context); };
quick_button.onclick = () => { tester2.sort(tester2.unsorted_array, tester2.context); };
insert_button.onclick = () => { tester3.sort(tester3.unsorted_array, tester3.context); };

// tester1.sort(tester1.unsorted_array, tester1.context);
// tester2.sort(tester2.unsorted_array, tester2.context);
// tester3.sort(tester3.unsorted_array, tester3.context);
// let interval = setInterval(() => { moveAnt(myBot); }, 20
