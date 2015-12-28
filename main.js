(function(){

	var affilimateOptions = {
		"affiliate": "tomablog-20"
	};

	chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
		switch (request.functiontoInvoke) {
			case "readSelectedText":
				getAffilimateOptions ( request.selectedText );
				break;
			case "readFullPage":
				var getArticle = $.get( '//read.tomasino.org/read.py?url=' + document.URL );

				getArticle.success(function( result ) {
					if (result.error) {
						getAffilimateOptions( result.messages );
					} else {
						var title = result.title;
						var content = result.content;
						var text = $(content).text();
						getAffilimateOptions( title + "\n\n" + text );
					}
				}).error(function( jqXHR, textStatus, errorThrown ) {
					getAffilimateOptions ( document.body.innerText || document.body.textContent );
				});
				break;
			default:
				break;
		}
	});

	$(document).on( 'blur', '.__read .__read_long_word_delay', function () {
		var val = String(this.value) || "tomablog-20";
		setAffilimateOptions( {"affiliate": val} );
	});

	function setAffilimateOptions ( myOptions ) {
		affilimateOptions = $.extend( {}, affilimateOptions, myOptions );
		chrome.storage.sync.clear(function () {
			chrome.storage.sync.set(affilimateOptions, function() {
				//console.log('[Affilimate] set:', affilimateOptions);
			});
		});
	}

	function getAffilimateOptions ( text ) {
		chrome.storage.sync.get(null, function ( myOptions ) {
			affilimateOptions = $.extend( {}, affilimateOptions, myOptions );
			//console.log('[Affilimate] get:', affilimateOptions);
			//var r = new Read ( text, affilimateOptions );
			//r.play();
		});
	}
})();
