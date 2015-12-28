/*global
chrome
*/
function save_options() {
	var affiliate = document.getElementById('affiliate').value;
	chrome.storage.sync.set({
		"affiliate": affiliate
	}, function() {
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
