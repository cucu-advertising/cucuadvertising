# Website enquiry form — server setup

The Contact page posts to `enquiry.php` in this folder. That script emails every
enquiry to **coffee@cucuadvertising.com** (fixed in the script) with the subject
"New Website Enquiry | CUCU Advertising" and the visitor's address as Reply-To.

## One-time setup on the server (Hostinger File Manager)

1. Create a mailbox for the website to send from, for example
   `website@cucuadvertising.com` (Hostinger → Emails). An existing mailbox on the
   domain works too.
2. In `public_html/api/`, copy `enquiry-config.sample.php` to `enquiry-config.php`.
3. Open `enquiry-config.php` and enter that mailbox's address, your provider's
   SMTP server and port, and the mailbox password. Save.
4. Open the Contact page on the live site, send a test enquiry, and confirm it
   arrives at coffee@cucuadvertising.com. Press Reply and check that the reply
   is addressed to the email you typed into the form.

Until step 3 is done the form tells visitors it is not switched on yet and
offers the email address instead. It never shows a success message unless the
mail server has accepted the email.

## What it does

- Validates every field on the server as well as in the browser.
- Spam protection: a hidden trap field, a minimum time to fill in the form, a
  limit on links, and the form can only be posted from this website.
- Rate limit: 5 enquiries an hour per visitor, at least 20 seconds apart.
  Counters are kept in `api/_store/`, which is created automatically and is not
  readable from the web.
- Sends from your own mailbox (never pretending to be the visitor) with
  Reply-To set to the visitor.

## Keeping it safe

- `enquiry-config.php` holds a password. It lives only on the server. Do not
  add it to git or to any zip you share.
- When you upload a new build, do not delete `api/enquiry-config.php`.
