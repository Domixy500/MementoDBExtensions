function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}

function Obj(e) {
  this.Current = e;
  try {
    this.Base = this.Current.field("Obj")[0];
  }
  catch(err) {
    this.Base = this.Current;
  }
}
