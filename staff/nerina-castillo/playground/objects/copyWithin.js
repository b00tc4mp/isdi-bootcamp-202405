//TODO implement case for copyWithin

console.log("CASE copyWithin");
const friends = { 0: "Gonzalo", 1: "Julen", 3: "Lu", 4: "Ro", length: 4 };

friends.copyWithin = function (target, start, end = 0) {
  var item = target;

  if (end === undefined) end = this.length;
  else if (end < 0) end = this.length + end;

  if (start === undefined) start = 0;
  else if (start < 0) start = this.length + start;

  if (end <= start) return this;

  if (target === undefined) target = 0;
  else if (target < 0) target = this.length + target;
  else if (target > start) return this;
  for (var i = start; i < end; i++) {
    this[item] = this[i];
    item++;
  }
  return this;
};

var myFriends = friends.copyWithin(0, 3, 4);

console.log(myFriends);
console.log(friends);
