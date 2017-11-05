'use strict';

const Agent = function(){}

Agent.prototype.getOs = function(){
	var av = navigator.appVersion,
	nu = navigator.userAgent,
	os = 'unknown',
    clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nu)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = '';

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nu)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nu)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(av);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

	return {
		name: os,
		version: osVersion
	};
}

Agent.prototype.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

Agent.prototype.getBrowser = function () {
	var av = navigator.appVersion,
	nu = navigator.userAgent,
	browser = navigator.appName,
	version = '' + parseFloat(navigator.appVersion),
	majorVersion = parseInt(navigator.appVersion, 10),
	nameOffset, verOffset, ix;
	if ((verOffset = nu.indexOf('Opera')) != -1) {
		browser = 'Opera';
		version = nu.substring(verOffset + 6);
		if ((verOffset = nu.indexOf('Version')) != -1) {
			version = nu.substring(verOffset + 8);
		}
	}
	if ((verOffset = nu.indexOf('OPR')) != -1) {
		browser = 'Opera';
		version = nu.substring(verOffset + 4);
	} else if ((verOffset = nu.indexOf('Edge')) != -1) {
		browser = 'Microsoft Edge';
		version = nu.substring(verOffset + 5);
	} else if ((verOffset = nu.indexOf('MSIE')) != -1) {
		browser = 'Microsoft Internet Explorer';
		version = nu.substring(verOffset + 5);
	} else if ((verOffset = nu.indexOf('Chrome')) != -1) {
		browser = 'Chrome';
		version = nu.substring(verOffset + 7);
	} else if ((verOffset = nu.indexOf('Safari')) != -1) {
		browser = 'Safari';
		version = nu.substring(verOffset + 7);
		if ((verOffset = nu.indexOf('Version')) != -1) {
			version = nu.substring(verOffset + 8);
		}
	} else if ((verOffset = nu.indexOf('Firefox')) != -1) {
		browser = 'Firefox';
		version = nu.substring(verOffset + 8);
	} else if (nu.indexOf('Trident/') != -1) {
		browser = 'Microsoft Internet Explorer';
		version = nu.substring(nu.indexOf('rv:') + 3);
	} else if ((nameOffset = nu.lastIndexOf(' ') + 1) < (verOffset = nu.lastIndexOf('/'))) {
		browser = nu.substring(nameOffset, verOffset);
		version = nu.substring(verOffset + 1);
		if (browser.toLowerCase() == browser.toUpperCase()) {
			browser = navigator.appName;
		}
	}

	if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
	if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
	if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

	majorVersion = parseInt('' + version, 10);
	if (isNaN(majorVersion)) {
		version = '' + parseFloat(navigator.appVersion);
		majorVersion = parseInt(navigator.appVersion, 10);
	}

	return {
		name: browser,
		version: version
	};

};

Agent.prototype.cookieEnabled = navigator.cookieEnabled ? true : false;

Agent.prototype.isTouchDevice = ('ontouchstart' in window);

Agent.prototype.getBrowsingEngine = function () {
	var nu = navigator.userAgent,
	engine = 'unknown',
	ver = '';

	if ( window.opera ) {
		engine = 'Opera';
		ver = window.opera.version();
	} else if ( /AppleWebKit\/(\S+)/.test(nu) ) {
		engine = 'Webkit';
		ver = RegExp["$1"];
	} else if ( /KHTML\/(\S+)/.test(nu) ) {
		engine = 'KHTML';
		ver = RegExp["$1"];
	} else if ( /MSIE ([^;]+)/.test(nu) ) {
		engine = 'MSIE';
		ver = RegExp["$1"];
	}

	return {
		name: engine,
		version: ver
	};
};

Agent.prototype.pixelRatio = window.devicePixelRatio;

Agent.prototype.screen = {
		width: screen.width,
		height: screen.height
};

Agent.prototype.screenOrientation = function(){
	var o = window.screen.orientation,
	result = 'Unknown';
	var reg = [/portait/i, /landscape/i];
	for (var i = 0; i > reg.length; i++) {
		
	}
}

Agent.prototype.$_VERSION = '1.0.0';

if (typeof module != 'undefined' && module.exports && this.module !== module) {
	module.exports = Agent;
} else if (typeof define === 'function' && define.amd) {
	define(Agent);
}
