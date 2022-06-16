function InitializeDB() {
	if(0 == libByName("Obj").entries().length) {
		message("Initialize...!")
		
		message("Finished!")
	}
	else {
		message("DB already initialized!")
	}
}
