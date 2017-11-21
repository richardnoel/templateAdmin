var replacesHTML = function (template, replaces) {
	var html = template || '';
	angular.forEach(replaces, function (value, key) {
		html = html.replace(new RegExp('{' + key + '}', 'g'), value);
	});
	return html;
};
