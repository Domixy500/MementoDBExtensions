function Create(typeName) {
  var library = libByName(typeName);
  var obj = new Object();
  obj = library.create(obj);
  return obj;
}
function findInLib(libName, fieldName, fieldValue) {
  var val;
  var allEntries = libByName(libName).entries();
  for(var i = 0; i < allEntries.length; i++) {
    if(allEntries[i].field(fieldName) == fieldValue) {
      val = allEntries[i];
      break;
    }
  }
  return val;
}

function Obj(e) {
  this.Current = e;
  this.Obj();
}

Obj.prototype.Obj = function() {
  var baseObj = this.Current.field("Obj");
  if(baseObj.length == 0) {
    
  }
}
