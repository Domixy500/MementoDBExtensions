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
  if(libByName(typeName) == null) {
    message("Library '" + typeName + "' is  not defined!");
    exit();
  }
  var objType = findInLib("ObjType", "Name", typeName);
  if(objType == null) {
    message("ObjType '" + typeName + "' is  not registered!");
    exit();
  }
  if(objType.field("InterfaceTypes").length == 0) {
    message("ObjType '" + typeName + "' has no InterfaceTypes!");
    exit();
  }
  try {
    var test = libByName("Obj").entries()[0].field(typeName);
  }
  catch(err) {
    message("Interface '" + typeName + "' is not defined for Obj!");
    exit();
  }
}

function Obj(e) {
  this.Current = e;
};

Obj.prototype.SyncProperties = function() {
	var propName;
	var propValue;
	var iFace;
	var propertiesToSync = this.BaseType().field("PropertiesToSync");
	for(var i = 0; i < propertiesToSync.length; i++) {
		propName = propertiesToSync[i];
		propValue = this.field(propName);
		for(var j = 0; j < this.Types().length; j++) {
			iFace = this.Obj().field(this.Types()[j].field("Name"))[0];
			if(iFace.id != this.Current.id) {
				try {
					if(typeof propValue == "object") {
						// link or multichoice field
						if(propValue.length > 0) {
							// at least 1 value
							if(typeof propValue[0] == "string") {
								// first element of multichoice is always of type "string"
								iFace.set(propName, propValue);
							}
							else {
								// linked field with entries
								// remove all links in interface
								iFace.set(propName, "");
								// loop through each linked entry and add again to interface
								for(var k = 0; k < propValue.length; k++) {
									iFace.link(propName, propValue[k]);
								}
							}
						}
						else {
							// no value selected
							iFace.set(propName, propValue);
						}
					}
					else {
						// all other fields
						iFace.set(propName, propValue);
					}
				}
				catch(err) {
					log(this.Types()[j].field("Name") + " " + propName + ": " + err);
				}
			}
		}
	}
};

Obj.prototype.DisplayName = function() {
  var baseType = this.Obj().field("BaseObjType")[0];
  var displayNameStructure = baseType.field("DisplayNameStructure") + " + ' [' + this.Id() + ']'";
  this.set("DisplayName", eval(displayNameStructure));
};

Obj.prototype.Save = function() {
  this.DisplayName();
  this.SyncProperties();
};

Obj.prototype.Obj = function() {
  return this.field("Obj")[0];
};

Obj.prototype.Id = function() {
  return this.Obj().field("Id");
};

Obj.prototype.Base = function() {
  return this.Obj().field(this.BaseTypeName())[0];
};

Obj.prototype.BaseTypeName = function() {
  return this.BaseType().field("Name");
};

Obj.prototype.BaseType = function() {
  return this.Obj().field("BaseObjType")[0];
};

Obj.prototype.Types = function() {
  return this.Obj().field("isObjType");
};

Obj.prototype.field = function(fieldName) {
  var fieldValue;
  try {
    fieldValue = this.Current.field(fieldName);
  }
  catch(err) {
    fieldValue = this.Base().field(fieldName);
  }
  return fieldValue;
};

Obj.prototype.set = function(fieldName, fieldValue) {
  this.Current.set(fieldName, fieldValue);
};

Obj.prototype.Create = function(typeName) {
  var obj;
  var iType;
  var iName;
  var interface;
//Run checks => exits if not succesfull
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
  this.Save();
};
