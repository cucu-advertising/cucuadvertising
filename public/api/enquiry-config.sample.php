<?php
/**
 * Mail settings for the website enquiry form.
 *
 * ON THE SERVER: copy this file to  enquiry-config.php  (same folder) and fill
 * it in there. Never put the real password in the website's source code or in
 * git — enquiry-config.php exists only on the server.
 *
 * Enquiries are always delivered to coffee@cucuadvertising.com. That address is
 * fixed in enquiry.php and is not a setting.
 */
return [
    // The mailbox the website sends FROM. It must be a real mailbox on your
    // own domain that your email provider lets you send from.
    'from_email' => 'website@cucuadvertising.com',
    'from_name'  => 'CUCU Website',

    // Your email provider's outgoing (SMTP) server and the login for the
    // mailbox above. Hostinger Email: smtp.hostinger.com, port 465.
    // Google Workspace: smtp.gmail.com, port 465, with an "app password".
    'smtp_host'  => 'smtp.hostinger.com',
    'smtp_port'  => 465,
    'smtp_user'  => 'website@cucuadvertising.com',
    'smtp_pass'  => 'PUT-THE-MAILBOX-PASSWORD-HERE',

    // To use the server's built-in mail instead of SMTP, delete the four
    // smtp_ lines above. SMTP is the more reliable choice.
];
