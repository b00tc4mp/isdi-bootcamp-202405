function generateId() {
  var id10 = Math.random().toString().slice(2) + Date.now().toString();

  var id36 = Math.round(+id10 / 1000000000000).toString(36);

  return id36;
}
