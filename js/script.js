var _catalog = new Object;

$(document).ready(function(){
	init();
	$(window).bind('hashchange', onHashChange);
});

function init() {
	restExplorer.getCatalog(function(res){
		fillMenuElements(res.dataClasses);
	});
}

function fillMenuElements(catalog) {
	for (var i=0; i<catalog.length;i++) {
		_catalog[catalog[i].name] = {
			dataUri	: catalog[i].dataURI.substring(6),
			catalogUri	: catalog[i].uri.substring(6)
		}
		$('#menu').append(createMenuElement(catalog[i]));
	}
	onHashChange();
}

function createMenuElement(c) {
	var element = $('<li></li>');
	var elementLink = $('<a></a>');
	elementLink.attr('href', '#'+c.name);
	elementLink.text(c.name);
	element.append(elementLink);
	
	return element;
}

function onHashChange() {
	hashString = $(location).attr('hash').substring(1);
	fillStructure(_catalog[hashString]);
	fillCollectionData(_catalog[hashString]);
}

function fillStructure(ressource) {
	console.log(ressource);
	restExplorer.get(ressource.catalogUri, function(res){
		structure = res.dataClasses[0];
		console.log(structure);
		$('#structureTitle').text(structure.name);
		fillStructureAttributes(structure.attributes);
	});
}

function fillStructureAttributes(attributes) {
	$('#structureBody').empty();
	for (var i=0; i<attributes.length; i++) {
		$('#structureBody').append(createStructureAttribute(attributes[i]));
	}
}

function createStructureAttribute(a) {
	var line = $('<tr></tr>');
	var attributesName = $('<td></td>');
	var attributeType = $('<td></td>');
	if (a.indexed) {
		line.addClass('indexed');
	}
	attributesName.text(a.name);
	attributeType.text(a.type);
	line.append(attributesName);
	line.append(attributeType);
	
	return line;
}

function fillCollectionData(ressource) {
	restExplorer.get(ressource.dataUri, function(res){
		fillTablesDatas(res.__ENTITIES);
	});
}

function fillTablesDatas(data) {
	$('#dataHeader').empty();
	$('#dataBody').empty();
	$('#dataHeader').append(createHeaderData(data[0]));
	for (var i=0; i<data.length;i++) {
		$('#dataBody').append(createBodyData(data[i]));
	}
}

function createBodyData(d) {
	var line = $('<tr></tr>');
	for (a in d) {
		if (typeof(d[a]) !== "object" && a !== "__KEY" && a !== "__STAMP" && a !== "creationTimestamp" && a !== "modificationTimestamp") {
			var attr = $('<td></td>');
			attr.text(d[a]);
			line.append(attr);
		}
	}
	
	return line;
}

function createHeaderData(d) {
	var line = $('<tr></tr>');
	for (a in d) {
		if (typeof(d[a]) !== "object" && a !== "__KEY" && a !== "__STAMP" && a !== "creationTimestamp" && a !== "modificationTimestamp") {
			var attr = $('<th></th>');
			attr.text(a);
			line.append(attr);
		}
	}
	
	return line;
}