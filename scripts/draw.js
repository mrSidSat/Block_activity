const canvas = document.getElementById("canvas");
const pen = document.getElementsByClassName("pointer")[0];
const context = canvas.getContext("2d");

//The Draw class:methods for drawing
class Draw {
  constructor() {
    context.beginPath();
    context.moveTo(250, 250);
    this.cur = [250, 250];
    this.mult = [0, 1];
    this.currangle = 90;
  }
  drawline() {
    this.cur[0] += 50 * this.mult[0];
    this.cur[1] -= 50 * this.mult[1];
    context.lineTo(this.cur[0], this.cur[1]);
    context.stroke();
    
    pen.style.transform =
      "translate(" +
      (this.cur[0] - 250) +
      "px," +
      (this.cur[1] - 250) +
      "px) rotate(" +
      (90 - this.currangle) +
      "deg) ";
  }
  rotate(x) {
    this.currangle += x;
    this.mult[0] = Math.cos((this.currangle * Math.PI) / 180).toFixed(1);
    this.mult[1] = Math.sin((this.currangle * Math.PI) / 180).toFixed(1);
    pen.style.transform += "rotate(" + -x + "deg)";
  }
  clearcanvas(){
    this.cur = [250, 250];
    this.mult = [0, 1];
    this.currangle = 90;
    pen.style.transform="";
    context.clearRect(0,0,canvas.width,canvas.height);
  }
}
