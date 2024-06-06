var actor1 = {},
  actor2 = {};

actor1.container = document.getElementById("box-1");
actor2.container = document.getElementById("box-2");

actor1.container.style.backgroundColor = "pink";
actor2.container.style.backgroundColor = "skyblue";

actor1.x = 100;
(actor1.h = 100), (actor1.y = 100), (actor1.w = 50), (actor2.x = 100);
(actor2.h = 100),
  (actor2.y = 100),
  (actor2.w = 50),
  (actor1.container.style.left = x1 + "px");
actor1.container.style.top = y1 + "px";
actor1.container.style.width = w1 + "px";
actor1.container.style.height = h1 + "px";

actor2.container.style.left = x2 + "px";
actor2.container.style.top = y2 + "px";
actor2.container.style.width = w2 + "px";
actor2.container.style.height = h2 + "px";

document.onkeydown = function (event) {
  if (event.key === "ArrowRight") actor1 += STEP;
  else if (event.key === "ArrowLeft") actor1 -= STEP;
  else if (event.key === "ArrowDown") actor1 += STEP;
  else if (event.key === "ArrowUp") actor1 -= STEP;

  actor1.container.style.left = x1 + "px";
  actor1.container.style.top = y1 + "px";

  if (event.key === "d") actor2 += STEP;
  else if (event.key === "a") actor2 -= STEP;
  else if (event.key === "s") actor2 += STEP;
  else if (event.key === "w") actor2 -= STEP;

  actor2.container.style.top = y2 + "px";
  actor2.container.style.left = x2 + "px";

  actor1.xmin = actor1.x;
  actor1.xmax = actor1.x + actor1.w;
  actor1.ymin = actor1.y;
  actor1.ymax = actor1.y + actor1.h;

  actor2.xmin = actor2.x;
  actor2.xmax = actor2.x + actor1.w;
  actor2.ymin = actor2.y;
  actor2.ymax = actor2.y + actor2.h;

  if (
    actor1.xmin <= actor2.xmax &&
    actor1.ymin <= actor2.ymax &&
    actor1.xmax >= actor2.xmin &&
    actor1.ymax >= actor2.ymin
  )
    console.count("intersecting");
};
