function CreateObject(ObjTypeName) {
	var ObjTypeLibrary = libByName(ObjTypeName);
	var o = new Object();
	var o = ObjTypeLibrary.create(o);
	return o;
}
