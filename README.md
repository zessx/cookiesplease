CookiesPlease
=============

Little script to quickly comply with EU cookie law.  
It'll allow you to add a message asking the user is he accepts or not cookies' storage for your website.

How to use it ?
---------------

You just have to remember two things :
 
 - CookiesPlease needs to be initialized **AFTER the DOM is ready** (you can easily do it with [jQuery](http://jquery.com/) or [domready](https://code.google.com/p/domready/))
 - CookiesPlease needs to be initialized **BEFORE any other javascript** (to avoid cookies to be created)

Here's a common example using jQuery:

    <script src="vendor/jquery/jquery.min.js">
    <script src="vendor/cookiesplease/cookiesplease.min.js">
    <script>
        $(function() {
            cookiesplease.init();
        });
    </script>

This starter script will already display the message to the user.  
You then can check if cookies are allowed :

    if(cookiesplease.wasAccepted()) {
        // Run JS if user has accepted cookies' storage
    } 

Or if they're not :

    if(cookiesplease.wasDeclined()) {
        // Run JS if user has refused cookies' storage
    } 

Options
-------

| Option                  | Default value     | Usage                                                   |
|-------------------------|-------------------|---------------------------------------------------------|
| `buttonAccept`          | true              | Show a button to accept cookies' storage                |
| `buttonDecline`         | false             | Show a button to decline cookies' storage               |
| `clearCookiesOnDecline` | false             | Remove every stored cookie if user refuse their storage |
| `storeChoiceOnDecline`  | true              | Remember user's decline (...storing a cookie!!)         |
| `buttonAcceptText`      | 'Continue'        | Text used for the accept button                         |
| `buttonDeclineText`     | 'Decline'         | Text used for the decline button                        |
| `message`               | 'This website...' | Message displayed                                       |

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
    #cookiesplease-accept {}
    #cookiesplease-decline {}

Legals
------
- Author : [zessx](https://github.com/zessx)
- Licence : [MIT](http://opensource.org/licenses/MIT) 
- Contact : [@zessx](https://twitter.com/zessx)
- Link  : [http://cookiesplease.smarchal.com](http://smarchal.com/cookiesplease)

Donations
---------

[![Buy me a coffee !](http://doc.smarchal.com/bmac)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=KTYWBM9HJMMSE&lc=FR&item_name=Buy%20a%20coffee%20to%20zessx%20%28Samuel%20Marchal%29&currency_code=EUR&bn=PP%2dDonationsBF%3abmac%3aNonHosted)
