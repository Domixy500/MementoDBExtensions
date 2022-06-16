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

function CreateInstance(ObjTypeName, obj) {
	var Instance = CreateObject(ObjTypeName);
	LinkInstance(Instance, obj, ObjTypeName)
}

function LinkInstance(BaseEntry, obj, ObjTypeName) {
	var Id = obj.field("Id");
	BaseEntry.set("Obj.Id", Id);
	obj.link(ObjTypeName, BaseEntry);
}

function UpdateFields(FieldNames, ObjTypeName, e) {
	// find BaseObject
	var ObjLibrary = libByName("Obj");
	var AllObjs = ObjLibrary.entries();
	var Obj;
	for (var i = 0; i < AllObjs.length; i++) {
		if (e.field("Obj.Id") == AllObjs[i].field("Id")) {
			Obj = AllObjs[i];
			break;
		}
	}
	// find all interfaces
	var InterfaceName;
	var InterfaceNames = [];
	var Interfaces = [];
	var ObjTypeLibrary = libByName("ObjType");
	var ObjTypes = ObjTypeLibrary.entries();
	for (var i = 0; i < ObjTypes.length; i++) {
		InterfaceName = ObjTypes[i].field("Name");
		if (InterfaceName == "") {}
		else if (InterfaceName == "Obj") {
			InterfaceNames.push(InterfaceName);
			Interfaces.push(Obj);
		}
		else {
			try {
				if (Obj.field(InterfaceName).length > 0) {
					InterfaceNames.push(InterfaceName);
					Interfaces.push(Obj.field(InterfaceName)[0]);
				}
			}
			catch (err) {}
		}
	}
	// loop through FieldNames to be updated
	var fieldName;
	var localName;
	var storageName;
	var fieldValue;
	var Interface;
	for (var i = 0; i < FieldNames.length; i++) {
		fieldName = FieldNames[i];
		fieldValue = e.field(FieldNames[i]);
		if (fieldName.indexOf(".") != -1) {
			storageName = fieldName.split(".")[0];
			localName = fieldName.split(".")[1];
		}
		else {
			storageName = ObjTypeName;
			localName = fieldName;
		}
		for (var j = 0; j < Interfaces.length; j++) {
			Interface = Interfaces[j];
			InterfaceName = InterfaceNames[j];
			if (InterfaceName == ObjTypeName) {}
			else if (InterfaceName == storageName) {
				if (typeof fieldValue == "object") {
					for (var k = 0; k < fieldValue.length; k++) {
						message(fieldValue[k].name);
						Interface.link(localName, fieldValue[k]);
					}
				}
				else {
					Interface.set(localName, fieldValue);
				}
			}
			else {
				try {
					Interface.set(storageName + "." + localName, fieldValue);
				}
				catch (err) {}
			}
		}
	}
}
