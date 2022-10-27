
 const { adaptV4Theme } = require('@mui/material');
const canvasSketch = require('canvas-sketch');
 const p5 = require('p5');
 
 // Attach p5.js it to global scope
 new p5()
 
 var tileCount = 50;
 
 var tileWidth;
 var tileHeight;
 var shapeSize = 15;
 var newShapeSize = shapeSize;
 var shapeAngle = 0;
//  var maxDist;
 var currentShape;
 var shapes;
 var sizeMode = 0;
 
 const settings = {

  // pixelsPerInch: 300,
   // Tell canvas-sketch we're using p5.js
   p5: true,
   // Turn on a render loop (it's off by default in canvas-sketch)
   animate: true,
    // We can specify dimensions if we want a fixed size on the first render
    dimensions: [1024, 1024],
    // orientation: 'landscape',
    bleed: 1 / 8,
    attributes: {
    antialias: true
    }
 };
 
 // Optionally preload before you load the sketch
 window.preload = () => {
   shapes = [];
  
   shapes.push(loadImage('https://storage.ning.com/topology/rest/1.0/file/get/10855955869?profile=original'));
 

 };
 
 canvasSketch(() => {
   // Inside this is a bit like p5.js 'setup' function
   // ...

//  createCanvas(settings.dimensions / 2, settings.dimensions / 2);
const margin = width * 0.1;
noCursor()




   
   imageMode(CENTER);
   // set the current shape to the first in the array
   currentShape = shapes[0];
   tileWidth = width / tileCount;
   tileHeight = height / tileCount;
   maxDist = sqrt(pow(width, 3) + pow(height, 3));

   // Attach events to window to receive them
   window.keyReleased = () => {
  
    if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
    if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3;
    if (key == 'g' || key == 'G') {
      tileCount += 5;
      if (tileCount > 60) {
        tileCount = 20;
      }
      tileWidth = width / tileCount;
      tileHeight = height / tileCount;
    }
  
    // if (key == '1') currentShape = shapes[0];
    // if (key == '2') currentShape = shapes[1];
    // if (key == '3') currentShape = shapes[2];
    // if (key == '4') currentShape = shapes[3];
    // if (key == '5') currentShape = shapes[4];
    // if (key == '6') currentShape = shapes[5];
    // if (key == '7') currentShape = shapes[6];
  
    if (keyCode == UP_ARROW) shapeSize += 5;
    if (keyCode == DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
    if (keyCode == LEFT_ARROW) shapeAngle += 5;
    if (keyCode == RIGHT_ARROW) shapeAngle -= 5;
  
   };
 
   // Return a renderer to 'draw' the p5.js content
   return ({ width, height }) => {
     // Draw with p5.js things
     clear();
    //  background(255,5);
     //no background and it exports transparent background
     for (var gridY = 0; gridY < tileCount; gridY++) {
       for (var gridX = 0; gridX < tileCount; gridX++) {
     2
   
         var posX = (tileWidth * gridX  + tileWidth);
         var posY =   (tileHeight * gridY + tileWidth);
   
         // calculate angle between mouse position and actual position of the shape
         var angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));
   
         if (sizeMode == 0) newShapeSize = shapeSize;
         if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
         if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
   
         push();
         translate(posX, posY);
         rotate(angle);
         noStroke();
        //  image(currentShape, 0, 0, newShapeSize, newShapeSize);
    
         image(currentShape, mouseX, mouseX / mouseX, newShapeSize, newShapeSize);
         image(currentShape, mouseY, mouseY / mouseY, newShapeSize, newShapeSize);

          pop();
       
       }
     }
 } }, settings);
 
