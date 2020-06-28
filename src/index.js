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
  var size = 150;
  const triangleX = canvas.width / 2;
  var triangleY = canvas.height / 2 - size / 2;

  grd = context.createLinearGradient(
    canvas.width / 5,
    triangleY,
    canvas.width / 5,
    triangleY + size
  );
  grd.addColorStop(0, "#8ED6FF"); // light blue
  grd.addColorStop(1, "#004CB3"); // dark blue

  let items = [[triangleX, triangleY, size]];
  setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.translate(canvas.width / 4, canvas.height / 4);
    // context.scale(0.5, 0.5);
    console.log("redraw");
    const iter = [...items];
    console.log("iter:", iter);
    let newItems = [];
    for (item of iter) {
      drawTriangle(context, item[0], item[1], item[2], item[2], grd);
      newItems.push([item[0], item[1] - size / 4, item[2] / 2]);
      newItems.push([item[0] - size / 4, item[1] + size / 4, item[2] / 2]);
      newItems.push([item[0] + size / 4, item[1] + size / 4, item[2] / 2]);
    }
    items = newItems;
  }, 5000);
};

(function() {
  window.addEventListener("resize", resizeCanvas, false);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
})();
