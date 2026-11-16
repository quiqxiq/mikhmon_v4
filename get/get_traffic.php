<?php

session_start();
// hide all error
error_reporting(0);
// protect .php
$get_self = explode("/", $_SERVER['PHP_SELF']);
$self[] = $get_self[count($get_self) - 1];

if ($self[0] !== "index.php" && $self[0] !== "") {
    include_once("../core/route.php");
} else {
    $iface = $_GET['iface'];

    include_once("config/connection.php");

    $get_interfacetraffic = $API->comm("/interface/monitor-traffic", array(
        "interface" => "$iface",
        "once" => "",
    ));

    $ftx = isset($get_interfacetraffic[0]['tx-bits-per-second']) ? (int)$get_interfacetraffic[0]['tx-bits-per-second'] : 0;
    $frx = isset($get_interfacetraffic[0]['rx-bits-per-second']) ? (int)$get_interfacetraffic[0]['rx-bits-per-second'] : 0;

    $rows = array('name' => 'Tx', 'data' => array($ftx));
    $rows2 = array('name' => 'Rx', 'data' => array($frx));

    $result = array(
        "tx" => $ftx,
        "rx" => $frx,
        0 => $rows,
        1 => $rows2
    );

    echo json_encode($result);
}
?>
