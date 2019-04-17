var c = document.getElementById('c');
var cx = c.getContext('2d');

// standard colour scheme
var colours = [
    "#FFE066",
    "#F25F5C",
    "#70C1B3",
];
var col_back = "#444";
var col_fore = "#eee";

// // pinky
// var colours = [
//     "#E5989B",
//     "#FFB4A2",
//     "#FFCDB2",
// ];
// var col_back = "#6D6875";
// var col_fore = "#FFCDB2";

// var colours = [
//     "#EF959D",
//     "#FCDDBC",
//     "#D9DBBC",
// ];
// var col_back = "#6D6875";
// var col_fore = "#D9DBBC";

xvals = [
    0,
    Math.PI/6,
    Math.PI/4,
    Math.PI/3,
    Math.PI/2,
    2*Math.PI/3,
    3*Math.PI/4,
    5*Math.PI/6,
    Math.PI,
    7*Math.PI/6,
    5*Math.PI/4,
    4*Math.PI/3,
    3*Math.PI/2,
    5*Math.PI/3,
    7*Math.PI/4,
    11*Math.PI/6,
    2*Math.PI,
];

labels = [
    "",
    "pi/6",
    "pi/4",
    "pi/3",
    "pi/2",
    "2pi/3",
    "3pi/4",
    "5pi/6",
    "",
    "7pi/6",
    "5pi/4",
    "4pi/3",
    "3pi/2",
    "5pi/3",
    "7pi/4",
    "11pi/6",
    "",
];

xcolours = [
    colours[0],
    colours[0],
    colours[1],
    colours[2],
    colours[2],
    colours[2],
    colours[1],
    colours[0],
    colours[0],
    colours[0],
    colours[1],
    colours[2],
    colours[2],
    colours[2],
    colours[1],
    colours[0],
    colours[0] //? about this one
];

xcoloursa = [
    colours[0],
    colours[0],
    colours[1],
    colours[2],
    colours[2],
    colours[2],
    colours[2],
    colours[1],
    colours[0],
    colours[0],
    colours[1],
    colours[2],
    colours[2],
    colours[2],
    colours[2],
    colours[1],
    colours[0],
    colours[0] //? about this one
];

var ay = c.height/2; // axis y
var sx = (c.width)/(2*Math.PI); // scale x
var sy = c.height/4; // scale y
var s = 0.01* Math.sqrt(sx*sy); // width unit

function curve(x){
    return Math.sin(x);
}

function getx(x){
    return x*sx;
}

function gety(y){
    return c.height-(ay+y*sy);
}

function axisToCurve(xval){
    cx.beginPath();
    cx.moveTo(getx(xval), gety(0));
    cx.lineTo(getx(xval), gety(curve(xval)));
    cx.stroke();
}


window.onload = function(){
    // drawing
    var w = 4*s;

    // background colour
    cx.fillStyle = col_back;
    cx.fillRect(0, 0, c.width, c.height);

    // vertical lines to curve
    cx.lineWidth = w;
    for(var i = 0; i<xvals.length; i++){
        cx.strokeStyle = xcolours[i];
        axisToCurve(xvals[i]);
    }

    // curve
    // cx.strokeStyle = col_fore;
    for(var i = 1; i < xvals.length; i++){
        // interpolation between xvals[i-1] and xvals[i]
        cx.beginPath();
        cx.strokeStyle = xcoloursa[i];
        for(var t = xvals[i-1]; t<xvals[i]; t+=0.0001){
            cx.lineTo(getx(t),gety(curve(t)));
        }
        cx.stroke();
    }

    // axis
    cx.strokeStyle = col_fore;
    cx.beginPath();
    cx.moveTo(getx(0),gety(0));
    cx.lineTo(c.width,gety(0));
    cx.stroke();

    labels
    cx.font = 8.355427582103333*s+'px "Arial"';
    cx.fillStyle = col_fore;
    for(var i = 0; i<xvals.length; i++){
        // cx.fillStyle = xcolours[i];
        if(xvals[i]<Math.PI){
            cx.fillText(labels[i].replace('pi','π'), getx(xvals[i]-0.07),gety(-0.13));
        }else{
            cx.fillText(labels[i].replace('pi','π'), getx(xvals[i]-0.09),gety(0.13)+w);
        }
    }

    // cx.fillStyle = "#555";
    // cx.fillText("PixelZerg", c.width-100,c.height-30);
};