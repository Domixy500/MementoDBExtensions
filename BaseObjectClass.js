function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}

function Obj(e) {
  this.Current = e;
  this.Obj();
}

Obj.prototype.Id = function() {
  return this.Obj().field("Id");
};
Obj.prototype.Obj = function() {
  var val;
  try {
    val = this.Current.field("Obj");
    if(val.length == 0) {
      val = Create("Obj");
      this.Current.link("Obj", val);
      message("Obj created with Id: " + this.Id());
    }
    else {
      val = val[0];
    }
  }
  catch(err) {
    if(lib().title == "Obj") {
      val = this.Current;
    }
    else {
      val = undefined;
      message(err);
      message("Field 'Obj' is not defined for library " + lib().title + "!")
    }
  }
  return val;
};
Obj.prototype.UpdateDisplayName = function() {
  var val = eval(DISPLAY_NAME);
  this.Current.set("DisplayName", val);
  return val;
};
Obj.prototype.Save = function() {
  this.UpdateDisplayName();
};
