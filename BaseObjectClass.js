function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}

function Obj(e) {
  message("e: " + e);
  this.Current = e;
  message("Current: " + this.Current);
  try {
    this.Base = this.Current.field("Obj")[0];
  }
  catch(err) {
    this.Base = this.Current;
  }
  message("Base: " + this.Base);
}

Obj.prototype.Id = function() {
  return this.Base.field("Id");
}
