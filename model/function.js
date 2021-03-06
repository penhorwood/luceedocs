var fs = require('fs');


var cachedFuncs = {};

function list (version){

	var funcList = fs.readFileSync("./export/" + version + "/json/functions.json", "utf8");
	return JSON.parse(funcList);
}
exports.list =list;

function get(func, version){

	if(!cachedFuncs[version]){
		cachedFuncs[version] = {};
	}
	if(cachedFuncs[version][func]){

		return cachedFuncs[version][func];
	}

	var path = "./export/" + version + "/json/functions/" + func + ".json";

	if (!fs.existsSync(path)) {
		return undefined;
	}

	var tagData = fs.readFileSync(path, "utf8");
	var fun =  JSON.parse(tagData);
	cachedFuncs[version][func] = fun;
	return cachedFuncs[version][func];

}
exports.get = get;

exports.toTagCode = function(fun){

	var tagcode = " ";

		tagcode+= fun.name + "(";
	var optCount =  0;
	var first = true;

		for(var a in fun.arguments ){
			var arg = fun.arguments[a];
			if(arg.status == 'hidden'){
				continue;
			}
			if(!first){
				tagcode+=",";
			}
			if(!arg.required){
				optCount++;
				tagcode+="[";
			}
			tagcode+=arg.type + " ";
			tagcode+=arg.name;
			first = false;

		}

		for(var i=1;i<=optCount;i++){
			tagcode+="]";
		}
		tagcode+= "):" + fun.returnType;

	return tagcode ;
}

exports.toObjectCode = function(fun){
	var tagcode = " ";

	tagcode+= fun.name + "(";
	var optCount =  0;
	var first = true;
	var seccond = false;
	var counter = 1;

	for(var a in fun.arguments ){
		var arg = fun.arguments[a];
		if(arg.status == 'hidden'){
			continue;
		}

		if(counter == 1){
			first=false;
			seccond=true;
			counter++;
			continue;
		}

		if(counter != 1 && counter !=2){
			tagcode+=",";
		}

		if(!arg.required){
			optCount++;
			tagcode+="[";
		}
		tagcode+=arg.type + " ";
		tagcode+=arg.name;
		first = false;
		counter ++;
	}

	for(var i=1;i<=optCount;i++){
		tagcode+="]";
	}
	tagcode+= "):" + fun.returnType;

	return tagcode ;
}

 function toArgumentString(fun) {

	var scriptcode = "";
	var optCount = 0;
	var first = true;

	for (var a in fun.arguments) {
		var arg = fun.arguments[a];
		if (arg.status == 'hidden') {
			continue;
		}
		if (!first) {
			scriptcode += ",";
		}
		if (!arg.required) {
			optCount++;
			scriptcode += "[";
		}
		scriptcode += arg.type + " ";
		scriptcode += arg.name;
		first = false;

	}

	for (var i = 1; i <= optCount; i++) {
		scriptcode += "]";
	}
	return scriptcode;
}
exports.toArgumentString = toArgumentString;



exports.argumentTitles = function(fun){
	var doc= {};

		doc.type={};

		doc.name = "Name";
		doc.minmax = "It must have at least {min} arguments but a maximum of {max}.";
		doc.min = "It must have at least {min} arguments.";
		doc._type = "Type";
		doc.required = "Required";
		doc.zero = "This function has no arguments";

		doc.type.fixed = "The arguments for this function are set. You can not use other arguments except the following ones.";
		doc.type.dynamic = "There is no restriction for this function regarding its arguments.";
		doc.max = "Only the number of arguments is restricted to {max}.";
		doc.description = "Description";


	return  doc;
}



function listMemeberFunctions() {

	 var result = {};
 		var data = list();

 	for ( local.obj in data.keyArray().sort( 'textnocase' ) ) {

 	for ( local.method in data[ obj ].keyArray() ) {

 		result[ ucFirst( obj ) & '.' & method ] = data[ obj ][ method ];
 	}
 }

 return result;
 }

//exports.listMemberFunctions = listMemeberFunctions;

function listObjects(version){

	var funcs = list(version);
	var objects = {};


	for(var f in funcs){
		var fun = funcs[f];
		var func = get(fun, version);

		if(func.member && func.member.name){
			if(!objects[func.member.type]){
				objects[func.member.type] = {};
			}
			objects[func.member.type][func.member.name] = func;
		}
	}
	return objects;
}
exports.listObjects = listObjects;


function getByTypeAndFunction(type,func,version){

		var objects = listObjects(version);
		var funcs = objects[type.toLowerCase()];
		var funcr = funcs[func];
		return funcr;

}

exports.getByTypeAndFunction = getByTypeAndFunction;
 /**
 * returns a struct of structs where the keys at the top level represent Object names,
 * the keys at 2nd level represent member method name, and their value shows the corresponding
 * BIF name.
 *
 * result is cached in the this scope for faster execution in subsequent calls
 */
/*
function getMemberFunctionList() {

	var result = {};
	var funcList = getFunctionList();

	if ( !isDefined( "this.data.MemberFunctionList" ) ) {

		loop collection="#funcList#" index="local.key" {

			local.data = getFunctionData( key );

			if ( isDefined( "data.member.name" ) )
				result[ data.member.type ][ data.member.name ] = key;
		}

		this.data.MemberFunctionList = result;
	}

	return this.data.MemberFunctionList;
}
 */