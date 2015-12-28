/*global
chrome
*/
function save_options() {
	var affiliate = document.getElementById('affiliate').value;
	chrome.storage.sync.set({
		"affiliate": affiliate
	}, function() {
        chrome.tabs.query({
			"active": true,
			"currentWindow": true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				"functiontoInvoke": "updateOptions",
			});
		});
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		affiliate: 'tomablog-20'
	}, function(items) {
		document.getElementById('affiliate').value = items.affiliate;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
