function InitializeDB() {
	if(0 == libByName("Obj").entries().length) {
		message("Initialize...!")
	// Obj
		var Obj_Obj = CreateObject("Obj");
		var Obj_ObjType = CreateObject("ObjType");
		Obj_Obj.link("ObjType", Obj_ObjType);
		Obj_ObjType.set("Obj.Id", Obj_Obj.field("Id"));
		Obj_ObjType.set("Name", "Obj");
		Obj_ObjType.link("CreateInstances", Obj_ObjType);
	// ObjType
		var ObjType_Obj = CreateObject("Obj");
		var ObjType_ObjType = CreateObject("ObjType");
		ObjType_Obj.link("ObjType", ObjType_ObjType);
		ObjType_ObjType.set("Obj.Id", ObjType_Obj.field("Id"));
		ObjType_ObjType.set("Name", "ObjType");
		ObjType_ObjType.link("CreateInstances", Obj_ObjType);
		ObjType_ObjType.link("CreateInstances", ObjType_ObjType);
		
		
		message("Finished!")
	}
	else {
		message("DB already initialized!")
	}
}
