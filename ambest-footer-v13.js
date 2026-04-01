/*
=======================================================================
  AM BEST GLOBAL FOOTER — Kaltura MediaSpace
  File: ambest-footer.js
  Host this file and add its URL in: MediaSpace Admin → Application module
  → "Add JS links to body" field (add alongside ambest-header.js)

  What this file does:
    1. Builds the footer HTML (inlined from AM Best's footer-bsv5.js,
       footer_cpyrghtaddress.js, and social_amb_wh.js)
    2. Dynamically sets the copyright year
    3. Injects the footer just before #footer_container in MediaSpace
    4. Falls back to appending before </body> if not found

  Dependencies:
    - ambest-footer.css rules must be present (append to ambest-header.css
      or upload separately via CustomCSS module)
=======================================================================
*/

(function () {
    'use strict';

    /* ── Footer HTML ─────────────────────────────────────────────── */
    function buildFooterHTML() {
        var year = new Date().getFullYear();

        return [
            '<div class="amb-footer" role="contentinfo">',

            /* ── Main container ── */
            '  <div class="amb-footer__main">',

            /* Logo row — col-5 col-md-3 */
            '    <div class="amb-footer__logo-row">',
            '      <div class="amb-footer__logo-col">',
            '        <a href="https://www.ambest.com" aria-label="AM Best Home">',
            '          <object data="https://www.ambest.com/images/logos/amblogo_since_white.svg"',
            '                  type="image/svg+xml" style="pointer-events:none;" aria-label="AM Best">',
            '            <img src="https://www.ambest.com/images/logos/amblogo_since_white.svg" alt="AM Best" />',
            '          </object>',
            '        </a>',
            '      </div>',
            '    </div>',

            /* Body row */
            '    <div class="amb-footer__body">',

            /* Buttons — col-12 col-md-3 */
            '      <div class="amb-footer__buttons">',
            '        <div class="amb-footer__btn-group">',
            '          <a href="https://web.ambest.com/about/contact-am-best-support-services" class="amb-footer__btn">Contact</a>',
            '          <a href="https://web.ambest.com/about/offices" class="amb-footer__btn">Locations</a>',
            '        </div>',
            '      </div>',

            /* Links — col-12 col-md-9 > justify-content-end > col-lg-10 */
            '      <div class="amb-footer__links-outer">',
            '        <div class="amb-footer__links-inner">',
            '          <div class="amb-footer__links-cols">',

            /* Column 1 */
            '            <div class="amb-footer__links-col">',
            '              <a href="https://web.ambest.com/about/accessibility-statement">Accessibility Statement</a>',
            '              <a href="https://web.ambest.com/about/cookie-notice">Cookie Notice</a>',
            '              <a href="https://web.ambest.com/about/legal-and-licensing">Legal &amp; Licensing</a>',
            '            </div>',

            /* Column 2 */
            '            <div class="amb-footer__links-col">',
            '              <a href="https://web.ambest.com/about/privacy-notice">Privacy Notice</a>',
            '              <a href="https://web.ambest.com/regulatory-information">Regulatory Information</a>',
            '            </div>',

            /* Column 3 */
            '            <div class="amb-footer__links-col">',
            '              <a href="https://web.ambest.com/about/sitemap">Site Map</a>',
            '              <a href="https://web.ambest.com/about/terms-of-use">Terms of Use</a>',
            '            </div>',

            '          </div>',
            '        </div>',
            '      </div>',

            '    </div>', /* /.amb-footer__body */
            '  </div>',  /* /.amb-footer__main */

            /* ── Divider ── */
            '  <hr class="amb-footer__divider" />',

            /* ── Bottom bar ── */
            '  <div class="amb-footer__bottom">',
            '    <div class="amb-footer__bottom-row">',

            /* Copyright */
            '      <div class="amb-footer__copyright">',
            '        <small>Copyright &copy; ' + year + ' A.M. Best Company, Inc. and/or its affiliates. All rights reserved.</small>',
            '      </div>',

            /* Social — right aligned */
            '      <div class="amb-footer__social-col">',
            '        <div class="amb-footer__social">',

            /* LinkedIn dropdown */
            '          <div class="amb-social-drop">',
            '            <a href="#" class="amb-social-drop__toggle" aria-label="AM Best on LinkedIn">',
            '              <img src="https://www.ambest.com/images/logos/linkedIn_lg_wh.png" alt="LinkedIn">',
            '            </a>',
            '            <ul class="amb-social-drop__menu">',
            '              <li><a href="https://www.ambest.com/corplinkedin">',
            '                <img src="https://www.ambest.com/images/icon-linkedin.png" alt=""> AM Best</a></li>',
            '              <li><a href="https://www.ambest.com/ratingslinkedin">',
            '                <img src="https://www.ambest.com/images/icon-linkedin.png" alt=""> AM Best Rating Services</a></li>',
            '              <li><a href="https://www.ambest.com/infoserviceslinkedin">',
            '                <img src="https://www.ambest.com/images/icon-linkedin.png" alt=""> AM Best Information Services</a></li>',
            '            </ul>',
            '          </div>',

            /* X / Twitter dropdown */
            '          <div class="amb-social-drop">',
            '            <a href="#" class="amb-social-drop__toggle" aria-label="AM Best on X">',
            '              <img src="https://www.ambest.com/images/icons/social/X_logo_wh.png" alt="X">',
            '            </a>',
            '            <ul class="amb-social-drop__menu">',
            '              <li><a href="http://www.twitter.com/AmbestCo">',
            '                <img src="https://www.ambest.com/images/icon-x-sm.png" alt=""> @AMBestCo</a></li>',
            '              <li><a href="http://www.twitter.com/AMBestRatings">',
            '                <img src="https://www.ambest.com/images/icon-x-sm.png" alt=""> @AMBestRatings</a></li>',
            '            </ul>',
            '          </div>',

            /* YouTube */
            '          <a href="https://www.ambest.com/AMBestYouTube/" class="amb-social-link" title="AM Best YouTube">',
            '            <img src="https://www.ambest.com/images/logos/youTube_lg_wh.png" alt="YouTube">',
            '          </a>',

            /* Facebook */
            '          <a href="https://www.facebook.com/ambestcompany" class="amb-social-link" title="AM Best Facebook">',
            '            <img src="https://www.ambest.com/images/logos/facebook_lg_wh.png" alt="Facebook">',
            '          </a>',

            /* Instagram — mobile only */
            '          <a href="https://www.instagram.com/ambestcompany/" class="amb-social-link amb-social-instagram" title="AM Best Instagram">',
            '            <img src="https://www.ambest.com/images/logos/instagram_lg_wh.png" alt="Instagram">',
            '          </a>',

            '        </div>',
            '      </div>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('\n');
    }

    /* ── DOM injection ───────────────────────────────────────────── */
    function injectFooter(target) {
        // Don't inject twice
        if (document.querySelector('.amb-footer')) return;

        var footerEl = document.createElement('div');
        footerEl.innerHTML = buildFooterHTML();
        var footer = footerEl.firstElementChild;

        if (target && target.parentNode) {
            // Insert immediately after #outerWrap-ui-kit
            target.parentNode.insertBefore(footer, target.nextSibling);
        } else {
            // Fallback: append to body
            document.body.appendChild(footer);
        }
    }

    /* ── Init — two-phase strategy (same as header) ─────────────── */
    /*
        Phase 1 — Immediate: append footer to bottom of <body> right
        away so the user sees it instantly while React is still mounting.

        Phase 2 — Reposition: MutationObserver watches for
        #footer_container. The instant React renders it, we silently
        move the footer to just before it. Invisible to the user.
    */
    /* ── Init ────────────────────────────────────────────────────── */
    /*
        Insert the footer immediately after #outerWrap-ui-kit —
        the main MediaSpace content wrapper visible in the DOM early.
        MutationObserver fires the instant it appears.
    */
    function init() {
        // Don't inject on admin or edit pages — check body classes
        var bodyClass = document.body.className || '';
        var skipPages = ['action-edit', 'action-add', 'action-delete', 'controller-admin'];
        for (var i = 0; i < skipPages.length; i++) {
            if (bodyClass.indexOf(skipPages[i]) !== -1) {
                return; // Exit silently — not a public-facing page
            }
        }
        var target = document.querySelector('.container-ui-kit');
        if (target) {
            injectFooter(target);
            return;
        }

        var observer = new MutationObserver(function () {
            var t = document.querySelector('.container-ui-kit');
            if (t) {
                observer.disconnect();
                injectFooter(t);
            }
        });

        // Observe the entire document tree — catches deeply nested React renders
        observer.observe(document.documentElement, { childList: true, subtree: true });

        // Safety net after 8s
        setTimeout(function () {
            observer.disconnect();
            injectFooter(null);
        }, 8000);
    }

    if (document.body) {
        setTimeout(init, 500);
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(init, 500);
        });
    }

})();
