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

    if (!isMobile()) {
        $traffic_ma = "sidenav_active";
        include_once("view/header_html.php");
        include_once("view/menu.php");
?>
        <div class="main">
            <div class="row">
                <div class="col-12">
                    <div class="card card-shadow">
                        <div class="card-header unselect" style="display: flex; justify-content: space-between; align-items: center; padding: 7px 12px;">
                            <span><i class="fa fa-area-chart"></i>&nbsp; <b>Traffic Monitor</b></span>
                            <div>
                                <select id="traffic_iface_select" class="form-control pointer" style="min-width: 180px; height: 32px; padding: 2px 8px; font-weight: bold; font-size: 13px;">
                                    <option value="">Loading interfaces...</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body" style="padding: 10px;">
                            <div id="fullTrafficChart" style="height: 500px; width: 100%;"></div>
                        </div>
                        <div class="card-footer"><span id="loading"></span></div>
                    </div>
                </div>
            </div>
        </div>

    <?php
    } else if (isMobile()) {
        $traffic_ma = "nav_active";
        $navicon = '<i class="fa fa-area-chart"></i>';
        include_once("view/header_html.php");
        include_once("view/menu.php");
    ?>
        <div class="main-mobile">
            <div class="row">
                <div style="margin-top:50px;margin-bottom:20px;">
                    <div class="group-icon-mobile" style="margin: auto; width:100%">
                        <i class="fa fa-area-chart" style="font-size:50px"></i>
                        <h3>Traffic Monitor</h3>
                    </div>
                </div>
                <div class="col-12" style="margin-bottom:100px;">
                    <div class="mobile-card">
                        <div class="card-header unselect" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px;">
                            <span><i class="fa fa-area-chart"></i>&nbsp; <b>Traffic</b></span>
                            <div>
                                <select id="traffic_iface_select" class="form-control pointer" style="min-width: 140px; height: 32px; padding: 2px 6px; font-weight: bold; font-size: 12px;">
                                    <option value="">Loading...</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body" style="padding: 10px 4px;">
                            <div id="fullTrafficChart" style="height: 380px; width: 100%;"></div>
                        </div>
                        <div class="card-footer"><span id="loading"></span></div>
                    </div>
                </div>
            </div>
        </div>
    <?php } ?>

    <script src="assets/js/highcharts/highcharts.js"></script>
    <script src="assets/js/highcharts/highcharts.theme.js"></script>
    <script>
        $(document).ready(function() {
            setTimeout(function() {
                initTrafficPage();
            }, 100);
        });
    </script>
<?php
    include_once("view/footer_html.php");
}
?>
