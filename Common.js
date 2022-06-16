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
		curFieldName = FieldNames[i];
		message(curFieldName);
	}
}
