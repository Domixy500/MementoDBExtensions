function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}
function findInLib(libName, fieldName, fieldValue) {
  var allEntries = libByName(libName).entries();
  for(e of allEntries) {
    if(e.field(fieldName) == fieldValue) {
      return e;
      break;
    }
  }
}

function Obj(e) {
  this.Current = e;
  this.Obj();
}

Obj.prototype.Id = function() {
  return this.Obj().field("Id");
};
Obj.prototype.TypeName = function() {
  return lib().title;
};
Obj.prototype.field = function(fieldName) {
  return this.Current.field(fieldName);
};
Obj.prototype.set = function(fieldName, newValue) {
  return this.Current.set(fieldName, newValue);
};
Obj.prototype.ObjType = function() {
  return this.Obj().field("Type")[0];
};
Obj.prototype.CreateInterfaces = function() {
  var Interface;
  var InterfacesToCreate = [];
  try {
    for(Interface of this.ObjType().field("CreateInterfaces")) {
      message(Interface.field("Name"));
    }
  catch(err) {

    }
  }
};
Obj.prototype.Obj = function() {
  var val;
  try {
    val = this.Current.field("Obj");
    if(val.length == 0) {
      //create Obj
      val = Create("Obj");
      this.Current.link("Obj", val);
      message("Obj created with Id: " + this.Id());
      //link with ObjType if exists
      var ObjType = findInLib("ObjType", "Name", this.TypeName());
    }
    else {
      val = val[0];
    }
  }
  catch(err) {
    if(this.TypeName() == "Obj") {
      val = this.Current;
    }
    else {
      val = undefined;
      message(err);
      message("Field 'Obj' is not defined for library " + this.TypeName() + "!")
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
