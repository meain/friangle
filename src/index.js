var canvas = document.querySelector("#master");
var context = canvas.getContext("2d");

function drawTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + triangleWidth / 2, y + triangleHeight);
  context.lineTo(x - triangleWidth / 2, y + triangleHeight);
  context.closePath();
  context.fillStyle = fillStyle;
  context.fill();
}

window.onload = function() {
  var grd;
  var size = Math.min(canvas.height, canvas.width);
  const triangleX = canvas.width / 2;
  var triangleY = canvas.height / 2 - size / 2;

  grd = context.createLinearGradient(
    canvas.width / 5,
    triangleY,
    canvas.width / 5,
    triangleY + size
  );
  grd.addColorStop(0, "#8ED6FF");
  grd.addColorStop(1, "#004CB3");

  let items = [[triangleX, triangleY, size]];
  setInterval(() => {
    if (items.length > 100000) items = [[triangleX, triangleY, size]]; // otherwise it will blow up
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("redraw");
    const iter = [...items];
    console.log("iter:", iter);
    let newItems = [];
    for (item of iter) {
      drawTriangle(context, item[0], item[1], item[2], item[2], grd);
      newItems.push([item[0], item[1], item[2] / 2]);
      newItems.push([
        item[0] - item[2] / 4,
        item[1] + item[2] / 2,
        item[2] / 2
      ]);
      newItems.push([
        item[0] + item[2] / 4,
        item[1] + item[2] / 2,
        item[2] / 2
      ]);
    }
    items = newItems;
  }, 1000);
};

(function() {
  window.addEventListener("resize", resizeCanvas, false);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
})();
