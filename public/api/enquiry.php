<?php
/**
 * CUCU Advertising — website enquiry endpoint.
 *
 * Receives the Contact page form (JSON, POST) and emails it to the team.
 * Every enquiry goes to the one address below and nowhere else.
 *
 * Mail settings live in enquiry-config.php (next to this file, on the server
 * only). See README.md in this folder for the one-time setup.
 *
 * Replies:  200 {"ok":true}                      the mail server accepted the email
 *           422 {"ok":false,"errors":{...}}      something in the form is wrong
 *           429 {"ok":false,"message":"..."}     too many enquiries from one place
 *           5xx {"ok":false,"message":"..."}     not configured, or the email was not accepted
 */

const ENQUIRY_TO      = 'coffee@cucuadvertising.com';
const ENQUIRY_SUBJECT = 'New Website Enquiry | CUCU Advertising';
const RATE_MAX        = 5;     // enquiries per address ...
const RATE_WINDOW     = 3600;  // ... per hour
const RATE_GAP        = 20;    // seconds between two enquiries

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function clean(string $value, int $max): string {
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    return mb_substr($value, 0, $max);
}

// One line only: nothing a visitor types may add a header to the email.
function oneLine(string $value, int $max): string {
    return clean(preg_replace('/[\r\n]+/', ' ', $value) ?? '', $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'message' => 'This address only accepts the contact form.']);
}

// Only the website's own pages may post here.
$host   = strtolower($_SERVER['HTTP_HOST'] ?? '');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== preg_replace('/:\d+$/', '', $host)) {
    reply(403, ['ok' => false, 'message' => 'This form can only be sent from our website.']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$in  = json_decode($raw ?: '', true);
if (!is_array($in)) {
    $in = $_POST;
}

$name    = oneLine((string) ($in['name'] ?? ''), 80);
$email   = oneLine((string) ($in['email'] ?? ''), 120);
$company = oneLine((string) ($in['company'] ?? ''), 100);
$service = oneLine((string) ($in['service'] ?? ''), 60);
$budget  = oneLine((string) ($in['budget'] ?? ''), 60);
$message = clean((string) ($in['message'] ?? ''), 4000);
$trap    = (string) ($in['website'] ?? '');
$elapsed = (int) ($in['elapsed'] ?? 0);

// Spam: a hidden field people never see, and forms "filled in" within two seconds.
// Bots are told it worked, so they have nothing to learn from.
if ($trap !== '' || $elapsed < 2000) {
    reply(200, ['ok' => true]);
}

$services = ['Branding', 'Social Media', 'Performance Marketing', 'SEO', 'Content', 'Ad Films', 'Website or App', 'Not sure yet'];
$errors = [];
if (mb_strlen($name) < 2)                              $errors['name']    = 'Please tell us your name.';
if (mb_strlen($company) < 2)                           $errors['company'] = 'Please add your company or brand.';
if (!in_array($service, $services, true))              $errors['service'] = 'Please choose what you’d like to talk about.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))        $errors['email']   = 'That email address doesn’t look right.';
if (mb_strlen($message) < 10)                          $errors['message'] = 'Please tell us a little about the project.';
if (preg_match_all('~https?://~i', $message) > 4)      $errors['message'] = 'Please remove some of the links from your message.';
if ($errors) {
    reply(422, ['ok' => false, 'message' => 'Please check the highlighted answers.', 'errors' => $errors]);
}

// ---- Rate limit (per visitor address, kept in a private folder) ------------
$ip    = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$store = __DIR__ . '/_store';
if (!is_dir($store)) {
    @mkdir($store, 0700, true);
    @file_put_contents($store . '/.htaccess', "Require all denied\n");
    @file_put_contents($store . '/index.html', '');
}
$file = $store . '/' . hash('sha256', $ip) . '.json';
$now  = time();
$hits = [];
if (is_file($file)) {
    $hits = array_values(array_filter((array) json_decode((string) @file_get_contents($file), true), fn($t) => is_int($t) && $t > $now - RATE_WINDOW));
}
if (count($hits) >= RATE_MAX || ($hits && $now - max($hits) < RATE_GAP)) {
    header('Retry-After: 60');
    reply(429, ['ok' => false, 'message' => 'You’ve sent a few enquiries already. Please wait a little and try again, or email us directly.']);
}

// ---- Settings ---------------------------------------------------------------
$configFile = __DIR__ . '/enquiry-config.php';
$config = is_file($configFile) ? (array) require $configFile : [];
$fromEmail = (string) ($config['from_email'] ?? '');
$fromName  = (string) ($config['from_name'] ?? 'CUCU Website');
if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    error_log('CUCU enquiry: enquiry-config.php is missing or has no from_email.');
    reply(503, ['ok' => false, 'message' => 'Our enquiry form isn’t switched on yet. Please email us directly.']);
}

// ---- The email --------------------------------------------------------------
$e = fn(string $v) => htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$rows = [
    'Name'    => $name,
    'Email'   => $email,
    'Company' => $company,
    'Service' => $service,
    'Budget'  => $budget !== '' ? $budget : 'Not provided',
];
$when = gmdate('j M Y, H:i') . ' UTC';

$text = "New enquiry from the CUCU Advertising website\n\n";
foreach ($rows as $label => $value) {
    $text .= str_pad($label . ':', 10) . $value . "\n";
}
$text .= "\nProject\n-------\n" . $message . "\n\n--\nReply to this email to answer {$name} directly.\nSent {$when} from cucuadvertising.com/contact\n";

$html  = '<!doctype html><html><body style="margin:0;padding:24px;background:#f3f5f1;font-family:Arial,Helvetica,sans-serif;color:#151715;">';
$html .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">';
$html .= '<tr><td style="background:#0b1510;padding:26px 30px;color:#cfe68e;font-size:13px;letter-spacing:.04em;">CUCU ADVERTISING</td></tr>';
$html .= '<tr><td style="padding:30px 30px 8px;"><h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:600;">New website enquiry</h1>';
$html .= '<p style="margin:8px 0 0;font-size:14px;color:#626762;">From ' . $e($name) . ' at ' . $e($company) . '</p></td></tr>';
$html .= '<tr><td style="padding:16px 30px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dcded9;">';
foreach ($rows as $label => $value) {
    $shown = $label === 'Email' ? '<a href="mailto:' . $e($value) . '" style="color:#096037;">' . $e($value) . '</a>' : $e($value);
    $html .= '<tr><td style="padding:12px 0;border-bottom:1px solid #dcded9;width:120px;font-size:13px;color:#626762;vertical-align:top;">' . $label . '</td>';
    $html .= '<td style="padding:12px 0;border-bottom:1px solid #dcded9;font-size:15px;vertical-align:top;">' . $shown . '</td></tr>';
}
$html .= '</table></td></tr>';
$html .= '<tr><td style="padding:24px 30px 6px;font-size:13px;color:#626762;">About the project</td></tr>';
$html .= '<tr><td style="padding:0 30px 28px;font-size:16px;line-height:1.6;">' . nl2br($e($message)) . '</td></tr>';
$html .= '<tr><td style="padding:18px 30px;background:#edf2e9;font-size:13px;color:#44523c;">Reply to this email to answer ' . $e($name) . ' directly. Sent ' . $when . ' from cucuadvertising.com/contact</td></tr>';
$html .= '</table></body></html>';

$boundary = 'cucu-' . bin2hex(random_bytes(12));
$encName  = fn(string $v) => '=?UTF-8?B?' . base64_encode($v) . '?=';
$headers  = [
    'From: ' . $encName($fromName) . ' <' . $fromEmail . '>',   // our own verified sender, never the visitor
    'Reply-To: ' . $encName($name) . ' <' . $email . '>',       // so "Reply" goes to the visitor
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'X-Mailer: CUCU-Website',
];
$body  = "--{$boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text)) . "\r\n";
$body .= "--{$boundary}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html)) . "\r\n";
$body .= "--{$boundary}--\r\n";

/** Sends through an SMTP server. Returns true only when the server accepts the message. */
function smtpSend(array $c, string $from, string $to, string $subject, array $headers, string $body): bool {
    $port   = (int) ($c['smtp_port'] ?? 465);
    $secure = $port === 465 ? 'ssl://' : '';
    $fp = @stream_socket_client($secure . $c['smtp_host'] . ':' . $port, $errno, $errstr, 15);
    if (!$fp) {
        error_log("CUCU enquiry: SMTP connection failed: {$errstr}");
        return false;
    }
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 600)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $out;
    };
    $say = function (string $cmd, string $expect) use ($fp, $read): bool {
        fwrite($fp, $cmd . "\r\n");
        $answer = $read();
        if (strncmp($answer, $expect, strlen($expect)) !== 0) {
            error_log('CUCU enquiry: SMTP said ' . trim($answer));
            return false;
        }
        return true;
    };
    $me = preg_replace('/[^a-z0-9.\-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost') ?: 'localhost';
    $ok = strncmp($read(), '220', 3) === 0 && $say('EHLO ' . $me, '250');
    if ($ok && $port !== 465) {
        $ok = $say('STARTTLS', '220')
            && stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && $say('EHLO ' . $me, '250');
    }
    $ok = $ok
        && $say('AUTH LOGIN', '334')
        && $say(base64_encode((string) $c['smtp_user']), '334')
        && $say(base64_encode((string) $c['smtp_pass']), '235')
        && $say('MAIL FROM:<' . $from . '>', '250')
        && $say('RCPT TO:<' . $to . '>', '25')
        && $say('DATA', '354');
    if ($ok) {
        $data  = 'Date: ' . date('r') . "\r\n" . 'To: <' . $to . ">\r\n" . 'Subject: ' . $subject . "\r\n";
        $data .= 'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr($from, '@'), 1) . ">\r\n";
        $data .= implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $data  = preg_replace('/^\./m', '..', $data);   // dot-stuffing
        $ok    = $say($data . "\r\n.", '250');          // 250 = accepted for delivery
    }
    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}

$accepted = !empty($config['smtp_host'])
    ? smtpSend($config, $fromEmail, ENQUIRY_TO, ENQUIRY_SUBJECT, $headers, $body)
    : @mail(ENQUIRY_TO, ENQUIRY_SUBJECT, $body, implode("\r\n", $headers), '-f' . $fromEmail);

if (!$accepted) {
    reply(502, ['ok' => false, 'message' => 'Our mail server didn’t accept your enquiry just now.']);
}

// Count it only once it has really been sent.
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

reply(200, ['ok' => true]);
