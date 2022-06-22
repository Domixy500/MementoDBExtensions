function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}
function findInLib(libName, fieldName, fieldValue) {
  var val;
  var allEntries = libByName(libName).entries();
  for(var i = 0; i < allEntries.length; i++) {
    if(allEntries[i].field(fieldName) == fieldValue) {
      val = allEntries[i];
      break;
    }
  }
  return val;
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
Obj.prototype.isObjType = function() {
  return this.Obj().field("isObjType");
};
Obj.prototype.CreateInterfaces = function() {
  var Interface;
  var InterfacesToCreate = [];
  try {
    for(Interface of this.ObjType().field("CreateInterfaces")) {
      message(Interface.field("Name"));
    }
  }
  catch(err) {
    message("test");
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
      try {
        this.Obj().link("isObjType", ObjType);
        this.CreateInterfaces();
      }
      catch(err) {
        message(this.TypeName() + " is not registered!");
      }
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
