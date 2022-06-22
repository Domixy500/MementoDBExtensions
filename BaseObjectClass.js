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
Obj.prototype.CreateInterfaces = function(ObjType) {
  var Interface;
  var InterfaceName;
  var InterfacesToCreate = ObjType.field("CreateInterfaces");
  try {
    for(i in InterfacesToCreate){
      InterfaceName = InterfacesToCreate[i].field("Name");
      Interface = Create(InterfaceName);
      this.Obj().link(InterfaceName, Interface);
      Interface.link("Obj", this.Obj());
    }
  }
  catch(err) {
    message(err);
  }
};
Obj.prototype.Obj = function() {
  var baseObj;
  try {
    baseObj = this.Current.field("Obj");
    if(baseObj.length == 0) {
      //create Obj
      baseObj = Create("Obj");
      this.Current.link("Obj", baseObj);
      //link primary Interface
      baseObj.link(this.TypeName(), this.Current);
      message("Obj created with Id: " + this.Id());
      //link with ObjType if exists
      var ObjType = findInLib("ObjType", "Name", this.TypeName());
      try {
        this.Obj().link("isObjType", ObjType);
        this.CreateInterfaces(ObjType);
      }
      catch(err) {
        message(this.TypeName() + " is not registered!");
      }
    }
    else {
      baseObj = baseObj[0];
    }
  }
  catch(err) {
    if(this.TypeName() == "Obj") {
      baseObj = this.Current;
    }
    else {
      baseObj = undefined;
      message(err);
      message("Field 'Obj' is not defined for library " + this.TypeName() + "!")
    }
  }
  return baseObj;
};
Obj.prototype.UpdateDisplayName = function() {
  var val = eval(DISPLAY_NAME);
  this.Current.set("DisplayName", val);
  return val;
};
Obj.prototype.Save = function() {
  this.UpdateDisplayName();
};
