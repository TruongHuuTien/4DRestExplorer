var restExplorer = (function(){
	var _rootUrl = "http://192.168.0.126/wak/";
	function request(method, url, callback) {
		$.ajax({
			type	: method,
			url		: _rootUrl + url,
			success	: callback
		});
	}
	var RestExplorer = function() {
		
	}
	RestExplorer.getCatalog = function(callback) {
		request("GET", "$catalog", callback);
	}
	RestExplorer.get = function(url, callback) {
		request("GET", url, callback);
	}
	return RestExplorer;
})();