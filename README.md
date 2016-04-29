![cookiesplease](https://raw.githubusercontent.com/zessx/cookiesplease/master/cookiesplease.png)

CookiesPlease
=============

Little script to quickly comply with EU cookie law.  
It'll allow you to add a message asking the user is he accepts or not cookies' storage for your website.

Installation
------------

CookiesPlease is available on bower:

    $ bower install cookiesplease

If you're not using bower you still can install it manually, cloning this repository.

Usage
-----

Simply include CookiesPlease as **the very first JavaScript** in your `<head>` tag.  
As it is now self-initialized, you no longer have to call `cookiesplease.init()`.

CookiesPlease offers you two functions to check if cookies were accepted, or not:

    if(cookiesplease.wasAccepted()) {
        // Run JS if user has accepted cookies' storage
    } 
    if(cookiesplease.wasDeclined()) {
        // Run JS if user has refused cookies' storage
    } 

Furthermore, it'll dispatch an event when user accept/decline cookies. This event allows you to load others scripts without refreshing the page:

    document.addEventListener('CookiesPleaseAccepted', function() {});
    document.addEventListener('CookiesPleaseDeclined', function() {});

Here's a common example, defering Google Analytics' loading while user hasn't accepted cookies:

    <head>
        <script src="vendor/cookiesplease/cookiesplease.min.js">
        <script>
            function loadGoogleAnalytics() {
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-XXXXXXXX-X', 'auto');
                ga('send', 'pageview');
            }
            if(cookiesplease.wasAccepted()) {
                loadGoogleAnalytics();
            }
            document.addEventListener('CookiesPleaseAccepted', loadGoogleAnalytics);
        </script>
    </head>

Options
-------

| Option                  | Default value     | Usage                                                     |
|-------------------------|-------------------|-----------------------------------------------------------|
| `buttonAccept`          | true              | Show a button to accept cookies' storage                  |
| `buttonDecline`         | false             | Show a button to decline cookies' storage                 |
| `clearCookiesOnDecline` | false             | Remove every stored cookie if user refuse their storage   |
| `storeChoiceOnDecline`  | true              | Remember user's decline (...storing a cookie!!)           |
| `prependToBody`         | false             | If you prefer to add the div at the beginning of `<body>` |
| `buttonAcceptText`      | 'Continue'        | Text used for the accept button                           |
| `buttonDeclineText`     | 'Decline'         | Text used for the decline button                          |
| `message`               | 'This website...' | Message displayed                                         |

What about the CSS ?
--------------------

CookiesPlease has it's own default CSS, but you can easily customize it. Everything is wrapped in the following element :

    <div id="cookiesplease" class="cookiesplease">
        ...
    </div>

CookiesPlease's default CSS use the `.cookiesplease` class, to allow you to use `#cookiesplease` id (then avoiding any conflict) :

<!-- language: lang-css -->

    #cookiesplease {
        background-color: #eee;
        border-top: 1px solid #222;
        color: #222;
    }
    #cookiesplease p {}
    #cookiesplease a {}
    #cookiesplease button {}
    #cookiesplease .cookiesplease-accept {}
    #cookiesplease .cookiesplease-decline {}
    #cookiesplease.cookiesplease-hidden {}
    body.cookiesplease-shown {}

Please note that the `.cookiesplease-shown` is added to the `<body>` element, until the user click on any button. This allows you to customize external elements, for pushing down the body for example.

Legals
------
- Author : [zessx](https://github.com/zessx)
- Licence : [MIT](http://opensource.org/licenses/MIT) 
- Contact : [@zessx](https://twitter.com/zessx)
- Link  : [http://smarchal.com/cookiesplease](http://smarchal.com/cookiesplease)

Donations
---------

[![Buy me a coffee !](http://doc.smarchal.com/bmac)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=KTYWBM9HJMMSE&lc=FR&item_name=Buy%20a%20coffee%20to%20zessx%20%28Samuel%20Marchal%29&currency_code=EUR&bn=PP%2dDonationsBF%3abmac%3aNonHosted)
