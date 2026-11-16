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

    if ($force == "false" && isset($_SESSION["$m_user.'profiles'"])) {
        echo $_SESSION["$m_user.'profiles'"];
    } else {
        include_once("config/connection.php");

        $get_user_profiles = $API->comm("/ip/hotspot/user/profile/print");
        if (!is_array($get_user_profiles)) {
            $get_user_profiles = array();
        }

        $json_data = json_encode($get_user_profiles);
        $d = new jsEncode();
        $json_enc = $d->encodeString($json_data, 25);
        echo $json_enc;

        $_SESSION["$m_user.'profiles'"] = $json_enc;
    }
}