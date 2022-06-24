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
}
