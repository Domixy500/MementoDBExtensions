function CreateObject(ObjTypeName) {
	var ObjTypeLibrary = libByName(ObjTypeName);
	var o = new Object();
	var o = ObjTypeLibrary.create(o);
	return o;
}

function onCreate(ObjTypeName) {
	var ObjTypeLibrary = libByName("ObjType");
	var ObjTypes = ObjTypeLibrary.entries();
	var ObjType;
	var InstanceTypeName;
	try {
		// find ObjType
		for (var i = 0; i < ObjTypes.length; i++) {
			if (ObjTypeName == ObjTypes[i].field("Name")) {
				ObjType = ObjTypes[i];
				break;
			}
		}
		// create and link Obj
		var obj = CreateObject("Obj");
		LinkInstance(entry(), obj, ObjTypeName);
		// create Instances
		var TypeInstances = ObjType.field("CreateInstances");
		for (var i = 0; i < TypeInstances.length; i++) {
			InstanceTypeName = TypeInstances[i].field("Name");
			if (ObjTypeName != InstanceTypeName) {
				CreateInstance(InstanceTypeName, obj);
			}
		}
	}
	catch (err) {
		message(err.message);
	}
}

function CreateInstance(ObjTypeName, obj) {
	var Instance = CreateObject(ObjTypeName);
	LinkInstance(Instance, obj, ObjTypeName)
}

function LinkInstance(BaseEntry, obj, ObjTypeName) {
	var Id = obj.field("Id");
	BaseEntry.set("Obj.Id", Id);
	obj.link(ObjTypeName, BaseEntry);
}

function UpdateFields(FieldNames, ObjType, e) {
	var ObjLibrary = libByName("Obj");
	var Objs = ObjLibrary.entries();
	var Obj;
	var curFieldName;
	var curValue;
	var curBase;
	var curTypeName;
	// find Obj
	for (var i = 0; i < Objs.length; i++) {
		if (e.field("Obj.Id") == Objs[i].field("Id")) {
			Obj = Objs[i];
			break;
		}
	}
	// get all ObjTypes
	var ObjTypeLibrary = libByName("ObjType");
	var ObjTypes = ObjTypeLibrary.entries();
	// loop through FieldNames to be updated
	for (var i = 0; i < FieldNames.length; i++) {
		// read current information
		curFieldName = FieldNames[i];
		curValue = e.field(curFieldName);
		if (curFieldName.indexOf(".") != -1) {
			curBase = curFieldName.split(".")[0];
			curFieldName = curFieldName.split(".")[1];
		}
		else {
			curBase = ObjType;
		}
		// write values to all interfaces
		if (curBase == "Obj") {
			Obj.set(curFieldName, curValue);
		}
		// loop through all ObjTypes
		for (var j = 0; j < ObjTypes.length; j++) {
			curTypeName = ObjTypes[j].field("Name");
			if (curTypeName != "Obj" && curTypeName != ObjType) { 
				try {
					if (curTypeName == curBase) {
						Obj.field(curTypeName)[0].set(curFieldName, curValue);
					}
					else {
						Obj.field(curTypeName)[0].set(FieldNames[i], curValue);
					}
				}
				catch (err) {
					message(FieldNames[i] + " not found");
				}
			}
		}
		// curFieldName = FieldNames[i];
		// curValue = e.field(curFieldName);
		// update Obj
		// if (curFieldName.indexOf("Obj.") != -1) {
			// Obj.set(curFieldName.split(".")[1], curValue);
		// }
	}
}
