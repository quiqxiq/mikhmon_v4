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
        $quickprint_ma = "sidenav_active";
        include_once("view/header_html.php");
        include_once("view/menu.php");
?>
        <div class="main">
            <div class="row">
                <div class="col-12">
                    <div class="card card-shadow">
                        <div class="card-header unselect">
                            <span><i class="fa fa-print"></i>&nbsp; <b>Quick Print</b> &nbsp; </span>
                            <span class="card-tab card-tab-active" id="btn-tab-quick-grid" onclick="switchQpTab('grid')"><i class="fa fa-th-large"></i> Quick Print</span>
                            <span class="card-tab" id="btn-tab-quick-list" onclick="switchQpTab('list')"><i class="fa fa-list"></i> List Packages</span>
                        </div>
                        <div class="card-body">
                            <!-- Tab 1: Quick Print Grid View -->
                            <div id="panel-qp-grid">
                                <div class="row mr-b-10">
                                    <div class="col-12">
                                        <div class="btn-group btn-container">
                                            <button class="bg-btn-group table-total" id="total-quickprint-grid">&nbsp;</button>
                                            <button class="bg-btn-group" onclick="loadQuickPrint('true')" title="Force reload"><i class="fa fa-refresh" id="fr-quickprint"></i></button>
                                            <button class="btn bg-primary" onclick="openAddQpPreset()"><i class="fa fa-plus"></i> Add Package</button>
                                            <button class="btn bg-btn-group" onclick="switchQpTab('list')"><i class="fa fa-sliders"></i> Manage Packages</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="quick-print-container">
                                    <!-- Preset cards populated by JS -->
                                </div>
                            </div>

                            <!-- Tab 2: Package List & Form Management -->
                            <div id="panel-qp-list" class="hide">
                                <div class="row">
                                    <!-- Left Column: Add / Edit Form -->
                                    <div class="col-4">
                                        <div class="card box-bordered pd-10">
                                            <div class="card-header unselect" style="padding: 5px 0 10px 0; margin-bottom: 10px; border-bottom: 1px solid #e0e0e0;">
                                                <i class="fa fa-ticket text-primary"></i>&nbsp; <b id="qp_form_title">Add Quick Print Package</b>
                                            </div>
                                            <form id="form_quick_preset" autocomplete="off" onsubmit="event.preventDefault(); saveQuickPreset();">
                                                <input type="hidden" id="qp_id" value="" />
                                                <table class="table" style="font-size: 13px;">
                                                    <tr>
                                                        <td class="align-middle" style="width: 35%;"><b>Package Name</b></td>
                                                        <td><input id="qp_package" placeholder="e.g. 1 Jam / 1 Hari" class="form-control" type="text" required /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Server</b></td>
                                                        <td>
                                                            <select class="form-control" id="qp_server">
                                                                <option value="all">all</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>User Mode</b></td>
                                                        <td>
                                                            <select class="form-control" id="qp_usrmode" onchange="defQpUserl()">
                                                                <option value="vc" selected>Username = Password</option>
                                                                <option value="up">Username &amp; Password</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>User Length</b></td>
                                                        <td>
                                                            <select class="form-control" id="qp_userlength">
                                                                <option value="3">3</option>
                                                                <option value="4" selected>4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Prefix</b></td>
                                                        <td><input id="qp_prefix" placeholder="Optional" maxlength="4" class="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Characters</b></td>
                                                        <td>
                                                            <select class="form-control" id="qp_char">
                                                                <option value="mix" selected>Random (5ab2c34d)</option>
                                                                <option value="lower">Random (abcd)</option>
                                                                <option value="upper">Random (ABCD)</option>
                                                                <option value="upplow">Random (aBcD)</option>
                                                                <option value="mix1">Random (5AB2C34D)</option>
                                                                <option value="mix2">Random (5aB2c34D)</option>
                                                                <option value="num">Random Numbers (1234)</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Profile</b></td>
                                                        <td>
                                                            <select class="form-control" id="qp_profile" onchange="onQpProfileChange(this.value)" required>
                                                                <option value="">Loading profiles...</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Time Limit</b></td>
                                                        <td><input id="qp_timelimit" placeholder="e.g. 1h / 1d" class="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Data Limit</b></td>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-8 col-box-8" style="padding-right:4px;">
                                                                    <input id="qp_datalimit_num" min="0" placeholder="0" class="form-control" type="number" />
                                                                </div>
                                                                <div class="input-group-4 col-box-4">
                                                                    <select class="form-control" id="qp_datalimit_unit">
                                                                        <option value="MB" selected>MB</option>
                                                                        <option value="GB">GB</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Validity</b></td>
                                                        <td><input id="qp_validity" placeholder="e.g. 1d / 30d" class="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Price</b></td>
                                                        <td><input id="qp_price" placeholder="0" class="form-control" type="number" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Selling Price</b></td>
                                                        <td><input id="qp_sprice" placeholder="0" class="form-control" type="number" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="align-middle"><b>Comment</b></td>
                                                        <td><input id="qp_comment" placeholder="Optional" class="form-control" type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            <div id="qp_profile_sync_info" style="display:none; padding:6px 10px; background: rgba(32,168,216,0.1); border-left: 3px solid #20a8d8; border-radius: 3px; font-size: 11px;">
                                                                <i class="fa fa-info-circle text-primary"></i> <span id="qp_profile_sync_text">Autofilled from profile</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <div class="mr-t-10 text-right">
                                                    <button type="button" class="btn bg-btn-group" onclick="resetQpForm()"><i class="fa fa-times"></i> Cancel</button>
                                                    <button type="submit" class="btn bg-primary"><i class="fa fa-save"></i> Save Preset</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <!-- Right Column: Package List Table -->
                                    <div class="col-8">
                                        <div class="card box-bordered pd-10">
                                            <div class="card-header unselect" style="padding: 5px 0 10px 0; margin-bottom: 10px; border-bottom: 1px solid #e0e0e0;">
                                                <i class="fa fa-list text-primary"></i>&nbsp; <b>Configured Packages</b>
                                            </div>
                                            <div class="btn-group btn-container mr-b-10">
                                                <button class="bg-btn-group table-total" id="total-quickprint-table">&nbsp;</button>
                                                <button class="bg-btn-group" onclick="loadQuickPrint('true')" title="Force reload"><i class="fa fa-refresh" id="fr-quickprint-list"></i></button>
                                                <input type="text" autocomplete="off" id="filter-quickprint" onkeyup="filterTable('quickprint','searchQp',this.value)" placeholder="Filter packages..." />
                                                <button class="bg-btn-group" onclick="filterTable('quickprint','filter-quickprint','')" title="Clear filter"><i class="fa fa-filter"></i></button>
                                            </div>
                                            <div class="card-fixed mr-t-10" style="max-height: 70vh; overflow-y: auto;">
                                                <table class="table table-bordered table-hover quickprint-table">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 50px; text-align:center;">Action</th>
                                                            <th>Package</th>
                                                            <th>Server</th>
                                                            <th>Mode</th>
                                                            <th>Length</th>
                                                            <th>Prefix</th>
                                                            <th>Profile</th>
                                                            <th>Time Limit</th>
                                                            <th>Data Limit</th>
                                                            <th>Validity</th>
                                                            <th>Price</th>
                                                            <th>Selling Price</th>
                                                            <th>Comment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="qp_table_body" class="text-nowrap">
                                                        <tr>
                                                            <td colspan="13" class="text-center">Loading packages...</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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
        $quickprint_ma = "nav_active";
        $navicon = '<i class="fa fa-print"></i>';
        include_once("view/header_html.php");
        include_once("view/menu.php");
    ?>
        <div class="main-mobile">
            <div class="row">
                <div style="margin-top:50px;margin-bottom:20px;">
                    <div class="group-icon-mobile" style="margin: auto; width:100%">
                        <i class="fa fa-print" style="font-size:50px"></i>
                        <h3>Quick Print</h3>
                    </div>
                </div>
                <div class="col-12" style="margin-bottom:100px;">
                    <div class="mobile-card">
                        <div class="col-12 mr-b-10">
                            <button class="btn-mobile bg-primary" id="btn-m-qp-grid" onclick="switchQpTab('grid')"><i class="fa fa-th-large"></i> Print Cards</button>
                            <button class="btn-mobile bg-btn-group" id="btn-m-qp-list" onclick="switchQpTab('list')"><i class="fa fa-list"></i> Manage Packages</button>
                            <button class="btn-mobile bg-btn-group" onclick="loadQuickPrint('true')"><i class="fa fa-refresh"></i> Refresh</button>
                        </div>

                        <!-- Mobile Tab 1: Grid Cards -->
                        <div id="panel-qp-grid">
                            <div class="row" id="quick-print-container">
                                <!-- Cards populated by JS -->
                            </div>
                        </div>

                        <!-- Mobile Tab 2: List / Manage -->
                        <div id="panel-qp-list" class="hide">
                            <div class="card mr-b-10" style="padding: 10px;">
                                <button class="btn-mobile bg-primary mr-b-10" onclick="toggleMobileQpForm()"><i class="fa fa-plus"></i> <span id="m_qp_toggle_txt">Add New Package</span></button>
                                
                                <div id="m_qp_form_wrapper" style="display:none;">
                                    <form autocomplete="off" onsubmit="event.preventDefault(); saveQuickPreset();">
                                        <table class="table" style="font-size: 13px;">
                                            <tr><td><b>Package Name</b></td><td><input id="m_qp_package" placeholder="e.g. 1 Jam" class="form-control" type="text" required /></td></tr>
                                            <tr><td><b>Profile</b></td><td><select class="form-control" id="m_qp_profile" onchange="onQpProfileChange(this.value, true)" required></select></td></tr>
                                            <tr><td><b>User Mode</b></td><td><select class="form-control" id="m_qp_usrmode"><option value="vc">User = Pass</option><option value="up">User &amp; Pass</option></select></td></tr>
                                            <tr><td><b>Time Limit</b></td><td><input id="m_qp_timelimit" placeholder="e.g. 1h" class="form-control" type="text" /></td></tr>
                                            <tr><td><b>Data Limit</b></td><td><input id="m_qp_datalimit_num" placeholder="e.g. 500" class="form-control" type="number" /></td></tr>
                                            <tr><td><b>Validity</b></td><td><input id="m_qp_validity" placeholder="e.g. 1d" class="form-control" type="text" /></td></tr>
                                            <tr><td><b>Price</b></td><td><input id="m_qp_price" placeholder="0" class="form-control" type="number" /></td></tr>
                                            <tr><td><b>Selling Price</b></td><td><input id="m_qp_sprice" placeholder="0" class="form-control" type="number" /></td></tr>
                                        </table>
                                        <button type="submit" class="btn-mobile bg-primary"><i class="fa fa-save"></i> Save Package</button>
                                    </form>
                                    <hr>
                                </div>
                            </div>
                            <div class="card-fixed mr-t-10">
                                <table class="table-p0 quickprint-table">
                                    <tbody id="qp_table_body" class="text-nowrap">
                                        <tr><td>Loading packages...</td></tr>
                                    </tbody>
                                </table>
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
                loadQuickPrint();
            }, 100);
        });
    </script>
<?php
    include_once("view/footer_html.php");
}
?>
