function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}

function Obj(e) {
  this.Current = e;
  message(this.Obj);
  //if(this.Current.field("Obj") === undefined) {
    //message("Obj not defined!");
  //}
  //try {
    //this.Base = this.Current.field("Obj")[0];
  //}
  //catch(err) {
    //this.Base = this.Current;
  //}
}

Obj.prototype.Id = function() {
  return this.Base.field("Id");
};
Obj.prototype.Obj = function() {
  var val;
  try {
    val = this.Current.field("Obj")[0];
  }
  catch(err) {
    val = undefined;
  }
  return val;
};
