let ShallowWaterThreshhold=0.05107;
let GrassNoiseThreshhold=0.05449;
let StoneNoiseThreshhold=0.0949;
let Stone2NoiseThreshhold=0.2102;

let NoiseScale=0.025;
let a=[];
let t;

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
  
  //M A G I C   N U M B E R   (I don't remember what this does)
  t-=1.5;
  if(t>=Stone2NoiseThreshhold){return 3;}
  if(t>=StoneNoiseThreshhold){return 2;}
  if(t>=GrassNoiseThreshhold){return 1;}
  if(t>=ShallowWaterThreshhold){return 0;}
  return -1;
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
      let a=noiseProcess(n*NoiseScale,m*NoiseScale);
      ///*
      if(a==3){stroke(200,200,200);point(2*n,2*m);}
      if(a==2){stroke(100,100,10);point(2*n,2*m);}
      if(a==1){stroke(0,255,0);point(2*n,2*m);}
      if(a==0){stroke(90,127,255);point(2*n,2*m);}
      if(a==-1){stroke(5,5,225);point(2*n,2*m);}
      //*/
      /*
      if(a==3){stroke(200,200,200);point(n,m);}
      if(a==2){stroke(100,100,10);point(n,m);}
      if(a==1){stroke(0,255,0);point(n,m);}
      if(a==0){stroke(90,127,255);point(n,m);}
      if(a==-1){stroke(5,5,225);point(n,m);}
      */
    }
  }
  noLoop();
}

