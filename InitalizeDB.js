function InitializeDB() {
	if(0 == libByName("Obj").entries().length) {
		message("Initialize...!")
	// Obj
		var Obj_Obj = CreateObject("Obj");
		var Obj_ObjType = CreateObject("ObjType");
		Obj_ObjType.set("Name", "Obj")
	// ObjType
		
		message("Finished!")
	}
	else {
		message("DB already initialized!")
	}
}
