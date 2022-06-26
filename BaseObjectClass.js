function CreateEntry(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}
function CreateObjType(typeName) {
  var library = libByName("ObjType");
  var objType = new Object();
  objType = library.create(objType);
  objType.set("Name", typeName);
  objType.set("DisplayName", typeName);
  var obj = CreateEntry("Obj");
  obj.link("Obj", obj);
  obj.link("ObjType", objType);
  objType.link("Obj", obj);
  // link Obj as Type
  var myType = findInLib("ObjType", "Name", "Obj");
  if(myType != undefined) {
    obj.link("isObjType", myType);
  }
  // link ObjType as Type
  myType = findInLib("ObjType", "Name", "ObjType");
  if(myType != undefined) {
    obj.link("BaseObjType", myType);
    obj.link("isObjType", myType);
  }
  return objType;
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
  var baseObj = this.Current.field("Obj");
  if(baseObj.length == 0) {
    if(this.LibName() == "Obj") {
      baseObj = this.Current;
    }
    else {
      baseObj = CreateEntry("Obj");
      baseObj.link(this.LibName(), this.Current);
    }
    this.link("Obj", baseObj);
  }
  return baseObj;
}

Obj.prototype.set = function(fieldName, fieldValue) {
  return this.Current.set(fieldName, fieldValue);
};
Obj.prototype.link = function(fieldName, fieldValue) {
  return this.Current.link(fieldName, fieldValue);
};

Obj.prototype.LibName = function() {
  return lib().title;
};
