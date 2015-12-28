function onIconClick(info, tab) {
	if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
	} else {
		window.open(chrome.runtime.getURL('options.html'));
	}
}

chrome.browserAction.onClicked.addListener(function(tab) { onIconClick(); });
