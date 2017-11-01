'use strict';

var Agent = function(){}

Agent.prototype.getOs = function(e){
	var nu = navigator.userAgent,
	osList = [/linux/i, /windows/i, /macos/i, /android/i, /iphone/i];
	for (var i = 0; i < osList.length; i++) {
		if (osList[i].test(nu)) {
			if (!e) {
				return osList[i].toString().replace('/', '').replace('/i', '');
			} else {
				return osList[i].toString().replace('/', '').replace('/i', '').toUpperCase() == e.toUpperCase();
			}
		}
	}
}

Agent.prototype.isMobile = function() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
};

if (typeof module != 'undefined' && module.exports && this.module !== module) {
	module.exports = Agent;
} else if (typeof define === 'function' && define.amd) {
	define(Agent);
}
