const points = [ // the points that define the triangle
  [
      253,
      73
  ],
  [
      174,
      173
  ],
  [
      382,
      214
  ]
]; // this would be the default triangle

let current_edit_index = 0; // used to handle the mouse button press

function setup() { // making the canvas
  const width = Math.max(300, window.innerWidth - 300);
  const height = Math.max(300, window.innerHeight - 100);
  createCanvas(width, height);
}

function finding_circle_center() { // finding the circumcircle
  // defining each point for easier access and cleaner code
  const pointA = points[0];
  const pointB = points[1];
  const pointC = points[2];

  const mBC = (pointB[0] - pointC[0])/(pointC[1] - pointB[1]); // the slope of redefined lines
  const mAC = (pointA[0] - pointC[0])/(pointC[1] - pointA[1]); // with 90 deg angle

  const pointM = [(pointA[0] + pointC[0])/2, (pointA[1] + pointC[1])/2]; // between A and C
  const pointN = [(pointB[0] + pointC[0])/2, (pointB[1] + pointC[1])/2]; // between B and C

  // calculating the collision point of the lines
  const x = (pointN[0] * mBC - pointM[0] * mAC + pointM[1] - pointN[1])/(mBC - mAC);
  const y = mBC * (x - pointN[0]) + pointN[1];

  return [x,y];
}

function draw() {
  const edit_index = current_edit_index % points.length;

  background(255);

  for (let i = 0; i < points.length; i++) { // drawing each point on the triangle
    // if the point is next, to be moved, it's color and size will be different 
    const color = edit_index === i ? [110, 40, 140] : [0,0,0];
    stroke(color[0], color[1], color[2]);
    strokeWeight(edit_index === i ? 20 : 4);
    point(points[i][0], points[i][1]);
  }

  // drawing the triangle
  strokeWeight(1);
  triangle(points[0][0], points[0][1], points[1][0], points[1][1], points[2][0], points[2][1]);

  const center_point = finding_circle_center(); // getting the circumcircle center

  stroke(255,0,0);
  strokeWeight(5);
  point(center_point[0], center_point[1]); // drawing the centeral point

  const pointM = [(points[0][0] + points[2][0])/2, (points[0][1] + points[2][1])/2];
  const pointN = [(points[1][0] + points[2][0])/2, (points[1][1] + points[2][1])/2];
  const pointQ = [(points[1][0] + points[0][0])/2, (points[1][1] + points[0][1])/2]

  // drawing all the middle points to show the 90 deg angle made
  point(pointM[0], pointM[1]);
  point(pointN[0], pointN[1]);
  point(pointQ[0], pointQ[1]);

  strokeWeight(2);

  // drawing a line from each middle point to the circumcircle centeral point
  line(pointM[0], pointM[1], center_point[0], center_point[1]);
  line(pointN[0], pointN[1], center_point[0], center_point[1]);
  line(pointQ[0], pointQ[1], center_point[0], center_point[1]);

  fill(0,0,0,0)
  stroke(60,50,130)
  const distance = Math.sqrt(Math.pow(center_point[0] - points[2][0], 2) + Math.pow(points[2][1] - center_point[1], 2));
  circle(center_point[0], center_point[1], distance * 2); // drawing the circumcircle
}

function mouseClicked(e) { // handing mouse click to replace the points
  const edit_index = current_edit_index % points.length; // which point index is being replaced

  points[edit_index] = [e.offsetX, e.offsetY]; // replacing

  current_edit_index++; // moving to the next index
}