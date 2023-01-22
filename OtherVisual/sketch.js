let GrassNoiseThreshhold=0.0415;
let StoneNoiseThreshhold=0.1515;

let NoiseScale=0.025;
let a=[];
let t;

function noiseProcess(x,y){
  //offset to prevent symmetry
  t=noise(x+123123,y-6969);
  
  //adding octaves
  t*=2;
  for(let n=1;n<5;n++){
    t+=pow(t,-n);
  }
  
  //scaling noise down
  t=sqrt(t);
  
  //subtracting a paraboloid with values clamped so that the island forms an imperfect cirlce
  t-=constrain((x*x/4+y*y/4-3)/5,-0.015,0.15);
  
  //M A G I C   N U M B E R   (I don't remember what this does)
  t-=1.5;
  
  return t;
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
      if(a>0.5){stroke(255*a,0,0);}
      else{stroke(0,255*a*2,255*a*2);}
      point(n,m);
    }
  }
  noLoop();
}
