<?php
require 'qrlib/qrlib.php';

$data = $_GET['data'] ?? 'nullweb';
$size = min(20, max(1, intval($_GET['size'] ?? 8)));
$margin = min(10, max(0, intval($_GET['margin'] ?? 2)));
$ec = $_GET['ec'] ?? 'M'; // L, M, Q, H
if (!in_array($ec, ['L', 'M', 'Q', 'H'], true)) $ec = 'M';

header('Content-Type: image/png');
QRcode::png($data, null, $ec, $size, $margin);
