var cookiesplease = cookiesplease || {

    cookieName: 'cookiesplease_status',
    statusAccepted: 'accepted',
    statusDeclined: 'declined',
    options: {
        buttonAccept: true,
        buttonDecline: false,
        clearCookiesOnDecline: false,
        storeChoiceOnDecline: true,
        prependToBody: false,
        buttonAcceptText: 'Continue',
        buttonDeclineText: 'Decline',
        message: 'This website uses cookies so that we can provide you the best user experience possible.<br>By continuing to browse the site you are agreeing to our use of cookies.',
    },

    init: function(options) {
        if(typeof options != 'undefined') {
            for(var option in options) {
                if(this.options.hasOwnProperty(option)) {
                    this.options[option] = options[option];
                }
            }
        }

        if(!(this.wasAccepted() || this.wasDeclined())) {

            var css = document.createElement('style');
            css.rel = 'stylesheet';
            css.innerHTML = '.cookiesplease { position: fixed; left: 0; right: 0; top: 0; color: white; font-size: 14px; background-color: #222; z-index: 9999; text-align: center; line-height: 20px; transform-origin: 0 0; -webkit-transform-origin: 0 0; -ms-transform-origin: 0 0; transition: transform .2s; }';
            css.innerHTML += '.cookiesplease p { display: inline-block; vertical-align: middle; text-align: right; font-size: 14px; margin: 10px; max-width: 80%; }';
            css.innerHTML += '.cookiesplease a { text-decoration: underline; }';
            css.innerHTML += '.cookiesplease button { display: inline-block; vertical-align: middle; border: none; padding: 0 15px; margin: 10px 5px; line-height: 40px; transition: background-color .2s; }';
            css.innerHTML += '.cookiesplease-accept { background-color: #9fb35a }';
            css.innerHTML += '.cookiesplease-decline { background-color: #f17166 }';
            css.innerHTML += '.cookiesplease-accept:hover, .cookiesplease-accept:focus { background-color: #8ca047 }';
            css.innerHTML += '.cookiesplease-decline:hover, .cookiesplease-decline:focus { background-color: #e06156 }';
            css.innerHTML += '.cookiesplease.cookiesplease-hidden { transform: translate(0, -100%); -webkit-transform: translate(0, -100%); -ms-transform: translate(0, -100%); }';
            document.getElementsByTagName('head')[0].appendChild(css);

            var notice = document.createElement('div');
            notice.id = 'cookiesplease';
            notice.className = 'cookiesplease';
            notice.innerHTML = '<p>' + this.options.message + '</p>';
            if(this.options.buttonAccept) {
                notice.innerHTML += '<button class="cookiesplease-accept" onclick="cookiesplease.accept();">' + this.options.buttonAcceptText + '</button>';
            }
            if(this.options.buttonDecline) {
                notice.innerHTML += '<button class="cookiesplease-decline" onclick="cookiesplease.decline();">' + this.options.buttonDeclineText + '</button>';
            }
            if(this.options.prependToBody) {
                document.body.innerHTML = notice.outerHTML + document.body.innerHTML;
            } else {
                document.body.appendChild(notice);
            }

            document.body.className += ' cookiesplease-shown';
        }
    },

    accept: function() {
        this.set(this.cookieName, this.statusAccepted, 365);
        this.hide();
    },

    decline: function() {
        if(this.options.clearCookiesOnDecline) {
            this.clear();
        }
        if(this.options.storeChoiceOnDecline) {
            this.set(this.cookieName, this.statusDeclined, 365);
        }
        this.hide();
    },

    hide: function() {
        document.getElementById('cookiesplease').className += ' cookiesplease-hidden';
        document.body.className = document.body.className.replace(/\bcookiesplease-shown\b/, '');
    },

    wasAccepted: function() {
        return this.get(this.cookieName) == this.statusAccepted;
    },

    wasDeclined: function() {
        return this.get(this.cookieName) == this.statusDeclined;
    },

    clear: function() {
        var cookies = document.cookie.split(';');
        for(var i = 0, n = cookies.length; i < n; i++) {
            var cookie = cookies[i],
                eqPos = cookie.indexOf('='),
                name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.set(name, '', -1);
        }
    },

    set: function(name, value, days) {
        if(days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();
        } else {
            var expires = '';
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    },

    get: function(name) {
        name += "=";
        var cookies = document.cookie.split(';');
        for(var i = 0, n = cookies.length; i < n; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }

};

window.cookiesplease = cookiesplease;