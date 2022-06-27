function CreateEntry(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}
function CreateObjType(typeName) {
  var objType = CreateEntry("ObjType");
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
    objType.link("InterfaceTypes", myType);
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
function Create(typeName) {
  var obj = CreateEntry(typeName);
  obj = new Obj(obj);
  obj.Create(typeName);
  return obj;
}
function CheckObjType(typeName) {
  message(libByName("test"));
}

function Obj(e) {
  this.Current = e;
};

Obj.prototype.Create = function(typeName) {
  var obj;
  var iType;
  var iName;
  var interface;
//Run checks
  CheckObjType(typeName);
//Create Obj
  if(typeName == "Obj") {
    obj = this.Current;
  }
  else {
    obj = CreateEntry("Obj");
  }
  var objType = findInLib("ObjType", "Name", typeName);
  var interfaceTypes = objType.field("InterfaceTypes");
  for(var i = 0; i < interfaceTypes.length; i++) {
    iType = interfaceTypes[i];
    iName = iType.field("Name");
    obj.link("isObjType", iType);
    if(iName == typeName) {
      obj.link("BaseObjType", iType);
      interface = this.Current;
    }
    else if(iName == "Obj") {
      interface = obj;
    }
    else {
      interface = CreateEntry(iName);
    }
    if(iName != "Obj") {
      interface.link("Obj", obj);
    }
    obj.link(iName, interface);
  }
};
