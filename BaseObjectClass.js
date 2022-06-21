function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}

function Obj(e) {
  this.Current = e;
  this.Obj = this.getObj();
}

Obj.prototype.Id = function() {
  return this.Obj.field("Id");
};
Obj.prototype.getObj = function() {
  var val;
  try {
    val = this.Current.field("Obj");
    message(val.length);
    if(val.length == 0) {
      message("e1");
      val = Create("Obj");
message("e2");
      this.Current.link("Obj", val);
message("e3");
      message("Obj created with Id: " + val.field("Id"));
message("e4");
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
