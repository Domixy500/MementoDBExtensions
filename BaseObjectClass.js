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
    message("try");
  }
  catch(err) {
    message("catch");
    this.Base = this.Current;
  }
  message("Base: " + this.Base);
}

Obj.prototype.Id = function() {
  var val = this.Base.field("Id");
  return val;
}
