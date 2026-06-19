<?php
require 'qrlib/qrlib.php';

$data = $_GET['data'] ?? 'nullweb';
$size = intval($_GET['size'] ?? 6);
$margin = intval($_GET['margin'] ?? 2);
$ec = $_GET['ec'] ?? 'M'; // L, M, Q, H

header('Content-Type: image/png');
QRcode::png($data, null, $ec, $size, $margin);
