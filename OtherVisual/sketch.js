let ShallowWaterThreshhold=1.55107;
let GrassNoiseThreshhold=1.55449;
let StoneNoiseThreshhold=1.5949;
let Stone2NoiseThreshhold=1.7102;

let NoiseScale=0.025;

function noiseProcess(x,y){
  //offset to prevent symmetry
  t=noise(x+123123,y+6969);
  
  //adding octaves
  t*=2.1;
  for(let n=1;n<5;n++){
    t+=pow(t,-n);
  }
  
  //scaling noise down
  t=sqrt(t);
  
  //subtracting a paraboloid with values clamped so that the island forms a cirlce, clamping the values so that the island isn't a perfect circle and has variance on the edges
  t-=constrain(1.6*(x*x/4+y*y/4-3)/5,-0.014,0.15);
  
  l=(t>=Stone2NoiseThreshhold)+(t>=StoneNoiseThreshhold)+(t>=GrassNoiseThreshhold)+ (t>=ShallowWaterThreshhold);
  return [[5,5,225],[90,127,255],[0,255,0],[100,100,10],[200,200,200]][l];
}

function setup() {
  createCanvas(600, 600);
  //noiseSeed(12);
}

function draw() {
  background(220);
  translate(width/2,height/2);
  for(let n=-width/4;n<width/4;n++){
    for(let m=-height/4;m<height/4;m++){
      a=noiseProcess(n*NoiseScale,m*NoiseScale);
      stroke(a[0],a[1],a[2]);
      point(2*n,2*m);
    }
  }
  noLoop();
}
