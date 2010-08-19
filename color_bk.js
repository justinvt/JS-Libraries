jQuery.fn.extend({
  color: function(array) {
  if (array==null){
    var color_val =  this.eq(0).css("background-color");
    var colors=new Array();
    color_val=color_val.replace("(","");
    color_val=color_val.replace(")","");
    color_val=color_val.replace("rgb","");
    colors = color_val.split(",");
    for (var i in colors){colors[i]=parseInt(colors[i]);} 
    return colors;
  }
  else{
    for (var i in array){
      array[i]=(parseInt(array[i])).toString(16,2);
      if(array[i].length==1){array[i]="0"+array[i];}
      } 
    var color_val="#"+array.join("");
    return this.css({background:color_val});
  }
  },
  colorTransform: function(string){
    var instructions = string.split(" ");
    var operation = instructions[0];
    var args=instructions.slice(1);
    var colors=new Array();
    var old=new Object();
    old = this.color();
    var cols=new col(old[0],old[1],old[2]);
    if (operation=="scale"){cols.scale(args[0]);}
    else if (operation=="rotate"){cols.rotate(args[0],args[1]);}
    echo(cols.vector());
    return this.color(cols.vector());
    /*
    echo(cols.vector());
    old.avg=old.sum/3; 
    colors = string.split(",");
    // Three color transform
    if (colors.length==3){
    for (var i in colors){
      var operation = colors[i].substring(0,1);
      var scalar = colors[i].substring(1,colors[i].length);
      if (operation=="+"){colors[i]=parseInt(old[i])+parseFloat(scalar);}
      else if (operation=="-"){colors[i]=parseInt(old[i])-parseFloat(scalar);}
      else if (operation=="i"){colors[i]=parseFloat(255-parseInt(old[i]));}
      else if (operation=="s"){colors[i]=old[parseInt(scalar)];}
      else if (operation=="g"){colors[i]=old.avg;}
      else if (operation=="*"){colors[i]=parseInt(old[i])*parseFloat(scalar);}
      else if (operation=="="){colors[i]=parseInt(scalar);}
      else{colors[i]=parseInt(old[i]);}
      if (colors[i]>255){colors[i]=255}
      if (colors[i]<0){colors[i]=0}
    }}
    // Full transform
     if (colors.length<3){
     var parts = new Array();
     parts = string.split(/[^a-z^A-Z^0-9^_^\.^\-]/);
     var operation=parts[0];
     var arguments=parts.slice(1);
     if (operation=="greyscale" || operation=="grayscale"){colors[0]=old.avg;colors[1]=old.avg;colors[2]=old.avg;}
     if (operation=="colorize"){
     var c=arguments[0];
     var a=arguments[1];
     //if (a.substr(0,1)=="-"){alert("yes");}
     colors=old;
     colors[c]=old[c] + (255-old[c])*a;
      }
      if (operation=="invert"){
      colors=old;
      for(var i in colors){colors[i]=255-old[i];}
      }
      
     if (operation=="darken"){
      var a=arguments[0];
      colors=old;
      //if (a.substr(0,1)=="-"){alert("yes");}
      for(var i in colors){colors[i]=old[i]*a;}
      }
      if (operation=="scale"){}
     // echo(operation + arguments + " ----- " +colors);
     }
      
      colors=colors.slice(0,3);
      for (var i in colors){colors[i]=parseInt(colors[i]);} 
      return this.color(colors);
      */
      }
      
});

function col(r,g,b){
  this.red=r;
  this.green=g;
  this.blue=b;
  this.det=Math.pow(this.red,2)+Math.pow(this.green,2)+Math.pow(this.blue,2);
  this.det2=Math.pow(this.red,2)+Math.pow(this.blue,2);
  this.rg=Math.pow(this.det2,0.5);
  this.theta=Math.atan2(this.green,this.rg);
  this.phi=Math.atan2(this.blue,this.red);
  this.amp=Math.pow(this.det, 0.5);
  this.scale=function(amount){
    var newAmp=this.amp*amount;
    this.red   = newAmp*Math.cos(this.theta)*Math.cos(this.phi);
    this.green = newAmp*Math.sin(this.theta);
    this.blue  = newAmp*Math.cos(this.theta)*Math.sin(this.phi);
  }
  this.rotate=function(phi,theta){
    this.red   = this.amp*Math.cos(theta)*Math.cos(phi);
    this.green = this.amp*Math.sin(theta);
    this.blue  = this.amp*Math.cos(theta)*Math.sin(phi);
  }
  this.toHex=function(){
    var red  =(parseInt(this.red)).toString(16);
    if(red.length==1){red="0"+red;}
    var green =(parseInt(this.green)).toString(16);
    if(green.length==1){green="0"+green;}
    var blue =(parseInt(this.blue)).toString(16);
    if(blue.length==1){blue="0"+blue;}
    return red+green+blue;
  }
  this.toRGB=function(){}
  this.invert=function(){
    this.red=255-this.red;
    this.green=255-this.green;
    this.blue=255-this.blue;
  }
  this.vector=function(){
    var output=new Array();
    output[0]=this.red;
    output[1]=this.green;
    output[2]=this.blue;
    return output;
  }
}
