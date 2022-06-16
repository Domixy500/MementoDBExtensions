function CreateObject(ObjTypeName) {
	var ObjTypeLibrary = libByName(ObjTypeName);
	var o = new Object();
	var o = ObjTypeLibrary.create(o);
	return o;
}

function onCreate(ObjTypeName) {
	var ObjTypeLibrary = libByName("ObjType");
	var Type = ObjTypeLibrary.find(ObjTypeName);
	message(Type.field("Name"));
}
