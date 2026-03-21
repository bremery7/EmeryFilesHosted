/*
=======================================================================
  AM BEST GLOBAL HEADER — Kaltura MediaSpace
  File: ambest-header.js
  Host this file and link it in: MediaSpace Admin → Application module
  → "Add JS links to body" field

  What this file does:
    1. Waits for the MediaSpace DOM to be ready
    2. Finds #outerWrap (the top-level MediaSpace content wrapper)
    3. Inserts the AM Best header HTML immediately before it
    4. Wires up mobile toggle + mobile dropdown click behavior

  The AM Best header stacks ABOVE the native MediaSpace header.
  MediaSpace's own header (#js-react-header) is left untouched.

  Dependencies:
    - ambest-header.css must be loaded via the CustomCSS module
=======================================================================
*/

(function () {
    'use strict';

    /* ── Header HTML ─────────────────────────────────────────────── */
    var HEADER_HTML = [
        '<div class="amb-header" role="banner">',
        '  <div class="amb-header__inner">',

        /* Logo */
        '    <div class="amb-header__logo">',
        '      <a href="https://www.ambest.com" aria-label="AM Best Home">',
        '        <object data="https://www.ambest.com/images/logos/amblogo_since_white.svg"',
        '                type="image/svg+xml" style="pointer-events:none;" aria-label="AM Best">',
        '          <img src="https://www.ambest.com/images/logos/amblogo_since_white.svg" alt="AM Best" />',
        '        </object>',
        '      </a>',
        '    </div>',

        /* Mobile toggle */
        '    <button class="amb-header__toggle" aria-label="Open navigation"',
        '            aria-expanded="false" aria-controls="amb-nav">&#9776;</button>',

        /* Nav */
        '    <div class="amb-header__nav" id="amb-nav">',
        '      <ul class="amb-header__menu" role="menubar">',

        /* ── Rating Services ── */
        '        <li role="none">',
        '          <a href="#" role="menuitem" aria-haspopup="true">Rating Services</a>',
        '          <ul class="amb-dropdown" role="menu">',
        '            <li><a href="#" class="amb-chevron">Credit Ratings</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/ratings-services/bests-credit-ratings">Credit Ratings Home</a></li>',
        '                <li><a href="https://ratingservices.ambest.com/recentratingactivity">Recent Rating Activity</a></li>',
        '                <li><a href="https://ratingservices.ambest.com/">Search for a Rating</a></li>',
        '                <li><a href="#" class="amb-chevron">About Best&#8217;s Credit Ratings</a>',
        '                  <ul class="amb-submenu">',
        '                    <li><a href="https://web.ambest.com/ratings-services/information-about-bests-credit-ratings">Information About Best&#8217;s Credit Ratings</a></li>',
        '                    <li><a href="https://web.ambest.com/ratings-services/information-about-bests-credit-ratings/other-rating-related-services">Other Rating-Related Services and Information</a></li>',
        '                  </ul>',
        '                </li>',
        '                <li><a href="https://web.ambest.com/ratings-services/rating-methodologies">Rating Methodologies</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/get-a-bests-credit-rating">Get a Best&#8217;s Credit Rating</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/bestmark-for-rated-insurers/">BestMark for Rated Insurers</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="#" class="amb-chevron">Performance Assessments</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/ratings-services/assessment-services/bests-performance-assessment-for-delegated-underwriting-authority-enterprises">Performance Assessments Home</a></li>',
        '                <li><a href="https://ratingservices.ambest.com/recentassessmentactivity">Recent Assessment Activity</a></li>',
        '                <li><a href="https://www3.ambest.com/ambv/ratingmethodology/OpenPDF.aspx?rc=316128" target="_blank">Guide to Best&#8217;s Performance Assessments</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/assessment-services/bests-performance-assessment-for-delegated-underwriting-authority-enterprises/methodology">Performance Assessment Methodology</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/assessment-services/bests-performance-assessment-for-delegated-underwriting-authority-enterprises/get-an-assessment">Get a Best&#8217;s Performance Assessment</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/assessment-services/bestmark-for-performance-assessments">BestMark for Delegated Underwriting Authority Enterprises</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="#" class="amb-chevron">Regions</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="#" class="amb-chevron">Americas</a>',
        '                  <ul class="amb-submenu">',
        '                    <li><a href="https://web.ambest.com/ratings-services/regions/americas">Americas Home</a></li>',
        '                    <li><a href="https://web.ambest.com/ratings-services/regions/americas/centro-regional-para-america-latina">LATAM - Espa&ntilde;ol</a></li>',
        '                    <li><a href="https://web.ambest.com/ratings-services/regions/americas/centro-regional-para-a-america-latina">LATAM - Portugu&ecirc;s</a></li>',
        '                  </ul>',
        '                </li>',
        '                <li><a href="https://web.ambest.com/ratings-services/regions/asia-pacific">Asia-Pacific</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/regions/europe-middle-east-africa">Europe, Middle East &amp; Africa</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="https://www3.ambest.com/ratings/cr/crisk.aspx">Country Risk Information</a></li>',
        '            <li><a href="https://web.ambest.com/ratings-services/bests-market-segment-outlooks">Market Segment Outlooks</a></li>',
        '            <li><a href="https://www3.ambest.com/industryresearch/Default.aspx?topic=all">Industry Research</a></li>',
        '            <li><a href="#" class="amb-chevron">Industry Centers</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/captive-insurance-information">Captive</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/health-insurance-information">Health</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/life-annuity-insurance-information">Life/Annuity</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/lloyds">Lloyd&#8217;s</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/property-casualty-insurance-information">Property/Casualty</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/reinsurance-information">Reinsurance</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/industry-centers/title-mortgage-guaranty-information">Title &amp; Mortgage Guaranty</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="#" class="amb-chevron">Data Submission</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/ratings-services/data-submission">Home</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/data-submission/data-submission-information">Information</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/data-submission/register-for-data-submission">Register</a></li>',
        '                <li><a href="https://portal.ambest.com">Login</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/data-submission/quarterly-filings-and-investments-forms">Quarterly Investments Forms</a></li>',
        '              </ul>',
        '            </li>',
        '          </ul>',
        '        </li>',

        /* ── Information Services ── */
        '        <li role="none">',
        '          <a href="#" role="menuitem" aria-haspopup="true">Information Services</a>',
        '          <ul class="amb-dropdown" role="menu">',
        '            <li><a href="#" class="amb-chevron">Access Products &amp; Services</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://support.ambest.com/ambv/espsupport/default.aspx">BestESP</a></li>',
        '                <li><a href="https://bestlink.ambest.com">BestLink</a></li>',
        '                <li><a href="https://www3.ambest.com/aggavg/toc/archive.aspx">Best&#8217;s Aggregates &amp; Averages</a></li>',
        '                <li><a href="https://claimsresource.ambest.com/Search/DirectoryCenter.aspx">Best&#8217;s Insurance Professional Resources</a></li>',
        '                <li><a href="https://www3.ambest.com/AMBV/BSRFAllFilingsWebApp/home.aspx">Best&#8217;s State Rate Filings</a></li>',
        '                <li><a href="https://www3.ambest.com/BUGLCM/default.aspx">Underwriting &amp; Loss Control Resources</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="#" class="amb-chevron">Access News, Research &amp; Media</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/information-services/am-best-audio">AM Best Audio</a></li>',
        '                <li><a href="https://bestsreview.ambest.com/bookstore/index.html">AM Best&#8217;s Bookstore</a></li>',
        '                <li><a href="https://www3.ambest.com/ambv/displaycontent/MediaArchive.aspx">AM Best TV</a></li>',
        '                <li><a href="https://news.ambest.com/Default.aspx">Best&#8217;s News</a></li>',
        '                <li><a href="https://news.ambest.com/research/default.aspx">Best&#8217;s Research</a></li>',
        '                <li><a href="https://bestsreview.ambest.com/default.aspx">Best&#8217;s Review</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="https://support.ambest.com/ambv/trainingregistration/">Product Training Services</a></li>',
        '            <li><a href="#" class="amb-chevron">Solutions</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/information-services/products-and-services-directory">Products &amp; Services Directory</a></li>',
        '                <li><a href="https://web.ambest.com/information-services/sales-information/insurance-news-research/am-best-advertising">Advertising Services</a></li>',
        '                <li><a href="https://web.ambest.com/information-services/sales-information/bests-insurance-professional-resources">Professional Resource Services</a></li>',
        '                <li><a href="https://web.ambest.com/information-services/sales-information/ratings-news-data-analytic-services/">Ratings, News &amp; Data Analytic Services</a></li>',
        '                <li><a href="https://web.ambest.com/information-services/sales-information/redistribution">Redistribution Services</a></li>',
        '                <li><a href="#" class="amb-chevron">Regulator Services</a>',
        '                  <ul class="amb-submenu">',
        '                    <li><a href="https://web.ambest.com/information-services/bests-regulatory-center">Best&#8217;s Regulatory Center - US/CN</a></li>',
        '                    <li><a href="https://web.ambest.com/information-services/bests-regulatory-center-global">Best&#8217;s Regulatory Center - Global</a></li>',
        '                  </ul>',
        '                </li>',
        '                <li><a href="https://web.ambest.com/information-services/sales-information/bestesp">Regulatory Filing Application Services</a></li>',
        '                <li><a href="https://web.ambest.com/information-services/tools-to-leverage-your-bests-credit-rating">Tools to Leverage Your Best&#8217;s Credit Rating</a></li>',
        '                <li><a href="https://web.ambest.com/information-services/sales-information/add-am-best-content-to-your-site">Add AM Best Content to Your Site</a></li>',
        '              </ul>',
        '            </li>',
        '          </ul>',
        '        </li>',

        /* ── Events ── */
        '        <li role="none">',
        '          <a href="#" role="menuitem" aria-haspopup="true">Events</a>',
        '          <ul class="amb-dropdown" role="menu">',
        '            <li><a href="https://web.ambest.com/about/events">Events Home</a></li>',
        '            <li><a href="https://web.ambest.com/about/events/am-best-hosted-events">AM Best Hosted Events</a></li>',
        '            <li><a href="https://www3.ambest.com/conferences/webinars/webinars.aspx">Briefings and Webinars</a></li>',
        '            <li><a href="https://bestsreview.ambest.com/calendar.html">Best&#8217;s Calendar</a></li>',
        '          </ul>',
        '        </li>',

        /* ── About Us ── */
        '        <li role="none">',
        '          <a href="#" role="menuitem" aria-haspopup="true">About Us</a>',
        '          <ul class="amb-dropdown" role="menu">',
        '            <li><a href="#" class="amb-chevron">General Information</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/about/">About AM Best</a></li>',
        '                <li><a href="https://web.ambest.com/ratings-services/awards-and-recognitions">Awards &amp; Recognitions</a></li>',
        '                <li><a href="https://web.ambest.com/about/corporate-responsibility">Sustainability</a></li>',
        '                <li><a href="#" class="amb-chevron">Press Releases</a>',
        '                  <ul class="amb-submenu">',
        '                    <li><a href="https://news.ambest.com/pr/default.aspx">All Press Releases</a></li>',
        '                    <li><a href="https://web.ambest.com/ratings-services/bestmark-for-am-best-press-release">BestMark for AM Best Press Release</a></li>',
        '                  </ul>',
        '                </li>',
        '                <li><a href="https://web.ambest.com/about/social-media">Social Media</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="https://web.ambest.com/about/careers/careers-home">Careers</a></li>',
        '            <li><a href="#" class="amb-chevron">Locations</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/about/offices">Locations Home</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/oldwick-office">World Headquarters</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/amsterdam-office">Amsterdam</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/dubai-office">Dubai</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/hong-kong-office">Hong Kong</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/london-office">London</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/mexico-office">Mexico City</a></li>',
        '                <li><a href="https://web.ambest.com/about/offices/singapore-office">Singapore</a></li>',
        '              </ul>',
        '            </li>',
        '            <li><a href="https://web.ambest.com/about/media-relations">Media Relations</a></li>',
        '            <li><a href="#" class="amb-chevron">Contact</a>',
        '              <ul class="amb-submenu">',
        '                <li><a href="https://web.ambest.com/about/contact-technical-support-business-information-services">Business Information Services</a></li>',
        '                <li><a href="https://web.ambest.com/about/contact-compliance-support-services">Compliance Support Services</a></li>',
        '                <li><a href="https://web.ambest.com/about/contact-customer-support-services">Customer Support Services</a></li>',
        '                <li><a href="https://web.ambest.com/about/contact-product-training-services">Product Training Services</a></li>',
        '                <li><a href="https://web.ambest.com/about/contact-technical-support-business-information-services">Technical Support Services</a></li>',
        '              </ul>',
        '            </li>',
        '          </ul>',
        '        </li>',

        '      </ul>', /* /.amb-header__menu */

        /* Right side: Account + Search */
        '      <div class="amb-header__right">',
        '        <div class="amb-header__account" id="amb-account-status">',
        '          <span class="welcome">My Account: </span>',
        '          <a href="https://member.ambest.com/membercenter/MyMCAccount.aspx" class="footer">Log In</a>',
        '          <span> | </span>',
        '          <a href="https://member.ambest.com/membercenter/MyMCAccount.aspx" class="footer">Sign Up</a>',
        '        </div>',
        '        <form class="amb-header__search" method="get"',
        '              action="https://search.ambest.com/texis/search/" role="search">',
        '          <input type="hidden" name="pr" value="BINA">',
        '          <input type="hidden" name="src" value="(12)">',
        '          <input type="text" name="query" maxlength="255"',
        '                 placeholder="Search AM Best" aria-label="Search AM Best">',
        '          <button type="submit" aria-label="Submit search">&#128269;</button>',
        '        </form>',
        '      </div>',

        '    </div>', /* /#amb-nav */
        '  </div>',  /* /.amb-header__inner */
        '</div>'     /* /.amb-header */
    ].join('\n');

    /* ── DOM injection ───────────────────────────────────────────── */
    function injectHeader() {
        // Don't inject twice
        if (document.querySelector('.amb-header')) return;

        var outerWrap = document.getElementById('outerWrap');
        if (!outerWrap) {
            // Fallback: try inserting at the top of body
            outerWrap = document.body;
        }

        var wrapper = document.createElement('div');
        wrapper.innerHTML = HEADER_HTML;
        var headerEl = wrapper.firstElementChild;

        outerWrap.parentNode.insertBefore(headerEl, outerWrap);
        wireInteractivity(headerEl);

        // Load the AM Best account status script after injection
        loadAccountStatus();
    }

    /* ── Account status (live AM Best auth) ─────────────────────── */
    function loadAccountStatus() {
        var container = document.getElementById('amb-account-status');
        if (!container) return;

        var script = document.createElement('script');
        script.src = 'https://www3.ambest.com/ambv/memberstatus/displaystatus.aspx?layout=AC&ovl=white';
        script.type = 'text/javascript';
        // If it loads and writes content, it may replace our default text
        // If it fails, the default "Log In | Sign Up" links remain
        script.onerror = function () {
            console.warn('AM Best account status script failed to load.');
        };
        container.appendChild(script);
    }

    /* ── Mobile interactivity ────────────────────────────────────── */
    function wireInteractivity(header) {
        var toggle = header.querySelector('.amb-header__toggle');
        var nav    = header.querySelector('.amb-header__nav');

        /* Mobile nav open/close */
        if (toggle && nav) {
            toggle.addEventListener('click', function () {
                var open = nav.classList.toggle('is-open');
                toggle.setAttribute('aria-expanded', String(open));
                toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
            });
        }

        var isMobile = function () { return window.innerWidth < 992; };

        /* Top-level mobile dropdowns */
        header.querySelectorAll('.amb-header__menu > li > a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (!isMobile()) return;
                var parent   = this.parentElement;
                var dropdown = parent.querySelector('.amb-dropdown');
                if (dropdown) {
                    e.preventDefault();
                    // Close siblings
                    parent.parentElement.querySelectorAll('li.is-open').forEach(function (el) {
                        if (el !== parent) el.classList.remove('is-open');
                    });
                    parent.classList.toggle('is-open');
                }
            });
        });

        /* Second-level mobile submenus */
        header.querySelectorAll('.amb-dropdown > li > a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (!isMobile()) return;
                var parent  = this.parentElement;
                var submenu = parent.querySelector('.amb-submenu');
                if (submenu) {
                    e.preventDefault();
                    parent.classList.toggle('is-open');
                }
            });
        });

        /* Third-level mobile submenus */
        header.querySelectorAll('.amb-submenu > li > a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (!isMobile()) return;
                var parent  = this.parentElement;
                var submenu = parent.querySelector('.amb-submenu');
                if (submenu) {
                    e.preventDefault();
                    parent.classList.toggle('is-open');
                }
            });
        });

        /* Close everything when clicking outside the header */
        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                if (nav) nav.classList.remove('is-open');
                header.querySelectorAll('.is-open').forEach(function (el) {
                    el.classList.remove('is-open');
                });
            }
        });

        /* Close on Escape key */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (nav) nav.classList.remove('is-open');
                header.querySelectorAll('.is-open').forEach(function (el) {
                    el.classList.remove('is-open');
                });
            }
        });
    }

    /* ── Init ────────────────────────────────────────────────────── */
    /*
        STRATEGY: Two-phase injection for zero perceived delay.

        Phase 1 — Immediate: inject the header at the top of <body>
        the moment this script runs. The user sees the dark blue bar
        instantly while MediaSpace's React app is still mounting.

        Phase 2 — Reposition: use a MutationObserver to watch for
        #outerWrap to appear in the DOM. The instant React renders it,
        we silently move the header to its correct position (before
        #outerWrap). This is invisible to the user — the header was
        already visible, it just moves to the right place in the DOM.

        This eliminates the 2-3s delay entirely. MutationObserver fires
        synchronously on DOM changes — far faster than polling.
    */

    function injectImmediate() {
        // Don't inject twice
        if (document.querySelector('.amb-header')) return;

        var wrapper = document.createElement('div');
        wrapper.innerHTML = HEADER_HTML;
        var headerEl = wrapper.firstElementChild;

        // Phase 1: prepend to body immediately so it's visible right away
        document.body.insertBefore(headerEl, document.body.firstChild);
        wireInteractivity(headerEl);
        loadAccountStatus();

        // Phase 2: watch for #outerWrap and reposition once it appears
        var observer = new MutationObserver(function () {
            var outerWrap = document.getElementById('outerWrap');
            if (outerWrap) {
                observer.disconnect();
                var existingHeader = document.querySelector('.amb-header');
                if (existingHeader && existingHeader !== outerWrap.previousElementSibling) {
                    // Move header to just before #outerWrap (its correct position)
                    outerWrap.parentNode.insertBefore(existingHeader, outerWrap);
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Safety net: stop observing after 5s regardless
        setTimeout(function () { observer.disconnect(); }, 5000);
    }

    // Run as soon as <body> exists — don't wait for DOMContentLoaded
    if (document.body) {
        injectImmediate();
    } else {
        document.addEventListener('DOMContentLoaded', injectImmediate);
    }

})();
