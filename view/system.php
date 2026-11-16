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
        $system_ma = "sidenav_active";
        include_once("view/header_html.php");
        include_once("view/menu.php");
?>
        <div class="main">
            <div class="row">
                <div class="col-12">
                    <div class="card card-shadow">
                        <div class="card-header unselect">
                            <span><i class="fa fa-server"></i>&nbsp; <b>System Tools</b> &nbsp; </span>
                            <span class="card-tab card-tab-active" id="btn-tab-schedulers" onclick="switchSystemTab('schedulers')"><i class="fa fa-clock-o"></i> Scheduler</span>
                            <span class="card-tab" id="btn-tab-power" onclick="switchSystemTab('power')"><i class="fa fa-power-off"></i> Power Control</span>
                            <span class="card-tab" id="btn-tab-sysinfo" onclick="switchSystemTab('sysinfo')"><i class="fa fa-info-circle"></i> System Resource</span>
                        </div>
                        <div class="card-body">
                            <!-- Tab 1: Schedulers -->
                            <div id="panel-schedulers">
                                <div class="btn-group btn-container mr-b-10">
                                    <button class="bg-btn-group table-total" id="total-schedulers">&nbsp;</button>
                                    <button class="bg-btn-group" onclick="loadSchedulers('true')" title="Force reload"><i class="fa fa-refresh" id="fr-schedulers"></i></button>
                                    <input type="text" autocomplete="off" id="filter-schedulers" onkeyup="filterTable('schedulers','searchSchedulers',this.value)" placeholder="Filter schedulers..." />
                                    <button class="bg-btn-group" onclick="filterTable('schedulers','filter-schedulers','')" title="Clear filter"><i class="fa fa-filter"></i></button>
                                </div>
                                <div class="card-fixed mr-t-10" style="max-height: 75vh; overflow-y: auto;">
                                    <table class="table table-bordered table-hover system-schedulers">
                                        <thead>
                                            <tr>
                                                <th style="width: 70px; text-align:center;">Action</th>
                                                <th>Name</th>
                                                <th>Start Date</th>
                                                <th>Start Time</th>
                                                <th>Interval</th>
                                                <th>Next Run</th>
                                                <th>Run Count</th>
                                                <th>Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody id="schedulers" class="text-nowrap">
                                            <tr>
                                                <td colspan="8" class="text-center">Loading Schedulers...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Tab 2: Power Control -->
                            <div id="panel-power" class="hide">
                                <div class="row mr-t-10">
                                    <div class="col-6">
                                        <div class="card box-bordered pd-20" style="border-left: 5px solid #ff9800; border-radius: 6px;">
                                            <div style="display:flex; align-items:center; margin-bottom:15px;">
                                                <div style="width:50px; height:50px; border-radius:50%; background:rgba(255,152,0,0.15); display:flex; align-items:center; justify-content:center; margin-right:15px;">
                                                    <i class="fa fa-refresh text-warning" style="font-size:26px;"></i>
                                                </div>
                                                <div>
                                                    <h3 style="margin:0; font-size:18px;">Reboot Router</h3>
                                                    <small class="text-muted">Soft restart router MikroTik</small>
                                                </div>
                                            </div>
                                            <p style="font-size:13px; line-height:1.6; color:#555;">
                                                Restart router MikroTik secara halus. Semua sesi hotspot aktif dan antrean traffic akan terputus sementara hingga router selesai melakukan booting ulang (biasanya 30-60 detik).
                                            </p>
                                            <div class="mr-t-20 text-right">
                                                <button class="btn bg-warning" style="font-weight:bold; padding: 8px 16px;" onclick="confirmRouterPower('reboot')">
                                                    <i class="fa fa-refresh"></i> Reboot Router Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="card box-bordered pd-20" style="border-left: 5px solid #f44336; border-radius: 6px;">
                                            <div style="display:flex; align-items:center; margin-bottom:15px;">
                                                <div style="width:50px; height:50px; border-radius:50%; background:rgba(244,67,54,0.15); display:flex; align-items:center; justify-content:center; margin-right:15px;">
                                                    <i class="fa fa-power-off text-danger" style="font-size:26px;"></i>
                                                </div>
                                                <div>
                                                    <h3 style="margin:0; font-size:18px;">Shutdown Router</h3>
                                                    <small class="text-muted">Safely power off router</small>
                                                </div>
                                            </div>
                                            <p style="font-size:13px; line-height:1.6; color:#555;">
                                                Mematikan router MikroTik secara aman untuk mencegah kerusakan storage NAND/disk. Pada RouterBOARD fisik, Anda harus menyalakan saklar atau adaptor daya kembali secara manual.
                                            </p>
                                            <div class="mr-t-20 text-right">
                                                <button class="btn bg-danger" style="font-weight:bold; padding: 8px 16px;" onclick="confirmRouterPower('shutdown')">
                                                    <i class="fa fa-power-off"></i> Shutdown Router Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab 3: System Resource / Info -->
                            <div id="panel-sysinfo" class="hide">
                                <div class="row mr-t-10" id="sysinfo_container">
                                    <div class="col-12 text-center pd-20">
                                        <i class="fa fa-circle-o-notch fa-spin"></i> Loading System Resources...
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer"><span id="loading"></span></div>
                    </div>
                </div>
            </div>
        </div>

    <?php
    } else if (isMobile()) {
        $system_ma = "nav_active";
        $navicon = '<i class="fa fa-server"></i>';
        include_once("view/header_html.php");
        include_once("view/menu.php");
    ?>
        <div class="main-mobile">
            <div class="row">
                <div style="margin-top:50px;margin-bottom:20px;">
                    <div class="group-icon-mobile" style="margin: auto; width:100%">
                        <i class="fa fa-server" style="font-size:50px"></i>
                        <h3>System Tools</h3>
                    </div>
                </div>
                <div class="col-12" style="margin-bottom:100px;">
                    <div class="mobile-card">
                        <div class="col-12 mr-b-10">
                            <button class="btn-mobile bg-primary" id="btn-m-tab-schedulers" onclick="switchSystemTab('schedulers')"><i class="fa fa-clock-o"></i> Scheduler</button>
                            <button class="btn-mobile bg-btn-group" id="btn-m-tab-power" onclick="switchSystemTab('power')"><i class="fa fa-power-off"></i> Power</button>
                            <button class="btn-mobile bg-btn-group" id="btn-m-tab-sysinfo" onclick="switchSystemTab('sysinfo')"><i class="fa fa-info-circle"></i> Info</button>
                        </div>
                        <div id="panel-schedulers">
                            <div class="btn-group mr-b-10">
                                <button class="btn-mobile bg-btn-group table-total" id="total-schedulers">&nbsp;</button>
                                <button class="btn-mobile bg-btn-group" onclick="loadSchedulers('true')" title="Force reload"><i class="fa fa-refresh" id="fr-schedulers"></i></button>
                                <input type="text" autocomplete="off" id="filter-schedulers" onkeyup="filterTable('schedulers','searchSchedulers',this.value)" placeholder="Filter..." />
                                <button class="btn-mobile bg-btn-group" onclick="filterTable('schedulers','filter-schedulers','')" title="Clear filter"><i class="fa fa-filter"></i></button>
                            </div>
                            <div class="card-fixed mr-t-10">
                                <table class="table-p0 system-schedulers">
                                    <tbody id="schedulers" class="text-nowrap">
                                        <tr><td>Loading...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="panel-power" class="hide mr-t-10">
                            <div class="card mr-b-10 pd-15" style="border-left: 4px solid #ff9800;">
                                <h4><i class="fa fa-refresh text-warning"></i> Reboot Router</h4>
                                <p style="font-size: 13px;">Restart router MikroTik secara halus.</p>
                                <button class="btn-mobile bg-warning" onclick="confirmRouterPower('reboot')"><i class="fa fa-refresh"></i> Reboot Router</button>
                            </div>
                            <div class="card pd-15" style="border-left: 4px solid #f44336;">
                                <h4><i class="fa fa-power-off text-danger"></i> Shutdown Router</h4>
                                <p style="font-size: 13px;">Mematikan router MikroTik secara aman.</p>
                                <button class="btn-mobile bg-danger" onclick="confirmRouterPower('shutdown')"><i class="fa fa-power-off"></i> Shutdown Router</button>
                            </div>
                        </div>
                        <div id="panel-sysinfo" class="hide mr-t-10">
                            <div id="sysinfo_container">
                                <!-- Mobile sysinfo populated by JS -->
                            </div>
                        </div>
                        <div class="card-footer"><span id="loading"></span></div>
                    </div>
                </div>
            </div>
        </div>
    <?php } ?>

    <script>
        $(document).ready(function() {
            setTimeout(function() {
                loadSchedulers();
            }, 100);

            $(".system-schedulers").fancyTable({
                inputId: "searchSchedulers",
                sortColumn: 1,
                pagination: true,
                perPage: 15,
                globalSearch: true,
            });
        });
    </script>
<?php
    include_once("view/footer_html.php");
}
?>
