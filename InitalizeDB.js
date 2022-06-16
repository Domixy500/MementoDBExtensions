function InitializeDB() {
	if(0 == libByName("Obj").entries().length) {
		message("Initialize...!")
	// Obj
		var Obj = CreateObject("Obj");
		Obj.set("Name", "Obj")
	// ObjType
		var ObjType = CreateObject("ObjType");
		ObjType.set("Name", "ObjType")
		message("Finished!")
	}
	else {
		message("DB already initialized!")
	}
}
