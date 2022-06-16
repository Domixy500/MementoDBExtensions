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
	try {
		// find ObjType
		for (var i = 0; i < ObjTypes.length; i++) {
			if (ObjTypeName == ObjTypes[i].field("Name")) {
				ObjType = ObjTypes[i];
				break;
			}
		}
		// create Obj
		var obj = CreateObject("Obj");
		// create Instances
		var TypeInstances = ObjType.field("CreateInstances");
		for (var i = 0; i < TypeInstances.length; i++) {
			CreateInstance(TypeInstances[i].field("Name"), obj);
		}
	}
	catch (err) {
		message(err.message);
	}
}

function CreateInstance(ObjTypeName, obj) {
	var Id = obj.field("Id");
	var Instance = CreateObject(ObjTypeName);
	Instance.set("Obj.Id", Id);
	obj.link(ObjTypeName, Instance);
}
