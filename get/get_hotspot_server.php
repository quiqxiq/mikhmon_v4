<?php

session_start();
// hide all error
error_reporting(0);
// protect .php
$get_self = explode("/",$_SERVER['PHP_SELF']);
$self[] = $get_self[count($get_self)-1];

if ($self[0] !== "index.php" && $self[0] !== "") {
    include_once("../core/route.php");
} else {
    $force = isset($_GET['f']) ? $_GET['f'] : "true";

    if ($force == "false" && isset($_SESSION["$m_user.'hotspot-server'"])) {
        echo $_SESSION["$m_user.'hotspot-server'"];
    } else {
        include_once("config/connection.php");

        $get_hotspot_server = $API->comm("/ip/hotspot/print");
        if (!is_array($get_hotspot_server)) {
            $get_hotspot_server = array();
        }

        $json_data = json_encode($get_hotspot_server);
        $d = new jsEncode();
        $json_enc = $d->encodeString($json_data, 25);
        echo $json_enc;

        $_SESSION["$m_user.'hotspot-server'"] = $json_enc;
    }
}