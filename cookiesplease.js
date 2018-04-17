var cookiesplease = cookiesplease || {

    cookieName: 'cookiesplease_status',
    initialized: false,
    statusAccepted: 'accepted',
    statusDeclined: 'declined',
    options: {
        buttonAccept: true,
        buttonDecline: false,
        clearCookiesOnDecline: false,
        storeChoiceOnDecline: true,
        prependToBody: false,
        buttonAcceptText: 'Continue',
        buttonDeclineText: 'Decline'
    },
    domElement: null,
    domStyle: null,

    init: function(options)
    {
        if (this.initialized === true) {
            return;
        }
        this.initialized === true;

        if(navigator.language !== undefined){
            switch (navigator.language) {
                case "fr-FR":
                case "fr-BE":
                case "fr":
                    this.options.message = 'Ce site utilise des cookies pour vous fournir la meilleure expérience possible.<br>En poursuivant votre navigation sur notre site, vous acceptez l\'utilisation de cookies sur votre ordinateur'
                    break;
                case "de-DE":
                case "de":
                    this.options.message = 'Diese Seite verwendet Cookies, um Ihnen den bestmöglichen Service zu gewährleisten.<br>Wenn Sie auf der Seite weitersurfen stimmen Sie der Cookie-Nutzung zu. '
                    break;
            
                default:
                    this.options.message = 'This website uses cookies so that we can provide you the best user experience possible.<br>By continuing to browse the site you are agreeing to our use of cookies.'
                    break;
            }
        }

        if (typeof options != 'undefined') {
            for (var option in options) {
                if (this.options.hasOwnProperty(option)) {
                    this.options[option] = options[option];
                }
            }
        }

        if (!(this.wasAccepted() || this.wasDeclined())) {

            this.domStyle = document.createElement('style');
            this.domStyle.rel = 'stylesheet';
            var cssRules = '.cookiesplease { position: fixed; left: 0; right: 0; top: 0; color: white; font-size: 14px; background-color: #222; z-index: 9999; text-align: center; line-height: 20px; transform-origin: 0 0; -webkit-transform-origin: 0 0; -ms-transform-origin: 0 0; transition: transform .2s; }';
            cssRules += '.cookiesplease p { display: inline-block; vertical-align: middle; text-align: right; font-size: 14px; margin: 10px; max-width: 80%; }';
            cssRules += '.cookiesplease a { text-decoration: underline; }';
            cssRules += '.cookiesplease button { display: inline-block; cursor: pointer; vertical-align: middle; border: none; outline: none; padding: 0 15px; margin: 10px 5px; line-height: 40px; transition: background-color .2s; }';
            cssRules += '.cookiesplease-accept { background-color: #9fb35a }';
            cssRules += '.cookiesplease-decline { background-color: #f17166 }';
            cssRules += '.cookiesplease-accept:hover, .cookiesplease-accept:focus { background-color: #8ca047 }';
            cssRules += '.cookiesplease-decline:hover, .cookiesplease-decline:focus { background-color: #e06156 }';
            cssRules += '.cookiesplease.cookiesplease-hidden { transform: translate(0, -100%); -webkit-transform: translate(0, -100%); -ms-transform: translate(0, -100%); }';
            if (typeof this.domStyle.styleSheet !== 'undefined') {
                this.domStyle.styleSheet.cssText = cssRules;
            } else {
                this.domStyle.innerHTML = cssRules;
            }

            this.domElement = document.createElement('div');
            this.domElement.id = 'cookiesplease';
            this.domElement.className = 'cookiesplease';
            this.domElement.innerHTML = '<p>' + this.options.message + '</p>';
            if (this.options.buttonAccept) {
                this.domElement.innerHTML += '<button class="cookiesplease-accept" onclick="cookiesplease.accept();">' + this.options.buttonAcceptText + '</button>';
            }
            if (this.options.buttonDecline) {
                this.domElement.innerHTML += '<button class="cookiesplease-decline" onclick="cookiesplease.decline();">' + this.options.buttonDeclineText + '</button>';
            }

            if (document.readyState != 'loading'){
                this.show();
            } else {
                document.addEventListener('DOMContentLoaded', this.show);
            }

        }
    },

    accept: function()
    {
        this.set(this.cookieName, this.statusAccepted, 365);
        this.hide();
        var event = new Event('CookiesPleaseAccepted');
        document.dispatchEvent(event);
    },

    decline: function()
    {
        if (this.options.clearCookiesOnDecline) {
            this.clear();
        }
        if (this.options.storeChoiceOnDecline) {
            this.set(this.cookieName, this.statusDeclined, 365);
        }
        this.hide();
        var event = new Event('CookiesPleaseDeclined');
        document.dispatchEvent(event);
    },

    show: function()
    {
        var instance = window.cookiesplease;
        if (!(instance.wasAccepted() || instance.wasDeclined())) {
            document.getElementsByTagName('head')[0].appendChild(instance.domStyle);
            if (instance.options.prependToBody) {
                document.body.innerHTML = instance.domElement.outerHTML + document.body.innerHTML;
            } else {
                document.body.appendChild(instance.domElement);
            }
            document.body.className += ' cookiesplease-shown';
        }
    },

    hide: function()
    {
        document.getElementById('cookiesplease').className += ' cookiesplease-hidden';
        document.body.className = document.body.className.replace(/\bcookiesplease-shown\b/, '');
    },

    wasAccepted: function()
    {
        return this.get(this.cookieName) == this.statusAccepted;
    },

    wasDeclined: function()
    {
        return this.get(this.cookieName) == this.statusDeclined;
    },

    clear: function()
    {
        var cookies = document.cookie.split(';');
        for (var i = 0, n = cookies.length; i < n; i++) {
            var cookie = cookies[i],
                eqPos = cookie.indexOf('='),
                name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.set(name, '', -1);
        }
    },

    set: function(name, value, days)
    {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();
        } else {
            var expires = '';
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    },

    get: function(name)
    {
        name += "=";
        var cookies = document.cookie.split(';');
        for (var i = 0, n = cookies.length; i < n; i++) {
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
window.cookiesplease.init(window.cookiespleaseOptions);