/*global
chrome
*/
(function(){

	var affilimateOptions = {
		"affiliate": "tomablog-20"
	};

	function setAffilimateOptions ( myOptions ) {
		chrome.storage.sync.clear(function () {
			chrome.storage.sync.set(affilimateOptions, function() {});
		});
	}

	function getAffilimateOptions ( text ) {
		chrome.storage.sync.get(null, function ( myOptions ) {
			affilimateOptions = myOptions || affilimateOptions;
			processURL();
		});
	}

	function processURL () {

		var tag = affilimateOptions.affiliate,
		urlParams,
		match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);

		urlParams = {};
		while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);

		if ( !(urlParams["tag"]) || (urlParams["tag"] !== tag) ) {
			urlParams["tag"] = tag;
			var tags = "?";
			for (var s in urlParams) {
				tags += s + "=" + urlParams[s] + "&";
			}
			tags = tags.substring(0, tags.length - 1);
			var o = document.location.origin;
			var p = document.location.pathname;
			var newURL = o + ((p)?p:"") + tags;
			document.location = newURL
		}
	}

	getAffilimateOptions();

})();
