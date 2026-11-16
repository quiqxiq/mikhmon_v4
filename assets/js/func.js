localStorage.setItem("?admin_idleto", 15);
var idleto = localStorage.getItem(session + "_idleto");
function idleTimer() {
  if (document.getElementById("timer")) {
    var e = document.getElementById("timer");
    function t() {
      e.innerHTML = idleto + ":00";
    }
    (window.onmousemove = t),
      (window.onmousedown = t),
      (window.onclick = t),
      (window.onscroll = t),
      (window.onkeypress = t);
  }
}
if (document.getElementById("timer")) {
  idleto = localStorage.getItem(session + "_idleto");
  document.getElementById("timer").innerHTML = idleto + ":00";
}
function startTimer() {
  if (document.getElementById("timer")) {
    var e = document.getElementById("timer"),
      t = e.innerHTML.split(/[:]+/),
      a = t[0],
      s = checkSecond(t[1] - 1);
    59 == s && (a -= 1),
      0 == a && 0 == s && ((e.innerHTML = "0:00"), $("#logOut").click()),
      (e.innerHTML = a + ":" + s),
      setTimeout(startTimer, 1e3);
  }
}
function checkSecond(e) {
  return e < 10 && e >= 0 && (e = "0" + e), e < 0 && (e = "59"), e;
}
function countTableRow(e) {
  var t = $("#" + e + " tr").filter(function () {
    return $(this).hasClass("yes");
  });
  $("#total-" + e).html(t.length);
}
function menuNonActive(e) {
  $("#" + e)
    .removeClass("block")
    .addClass("hide"),
    $("#btn-" + e).removeClass("card-tab-active");
}
function menuActive(e) {
  $("#" + e)
    .removeClass("hide")
    .addClass("block"),
    $("#btn-" + e).addClass("card-tab-active");
}
function filterBy(e, t, a) {
  var s = document.getElementById(t);
  $("#" + t).val(a),
    filterTable(e, t),
    "" == s.value
      ? localStorage.setItem(session + "AutoReload", 0)
      : localStorage.setItem(session + "AutoReload", 1),
    s.dispatchEvent(new KeyboardEvent("keyup", { key: "Shift" }));
}
function shPass(e) {
  var t = $("#" + e);
  t.hasClass("key") ? t.removeClass("key") : t.addClass("key");
}
function filterTable(e, t, a) {
  var s = document.getElementById(t);
  $("#" + t).val(a),
    setClassYN(e, t),
    s.dispatchEvent(new KeyboardEvent("keyup", { key: "Shift" }));
}
function countReport(e, t) {
  (getprice = 0),
    $("#" + e + " tr")
      .filter(function () {
        return $(this).hasClass("yes");
      })
      .each(function () {
        getprice += Number($(this).find("span").html());
      }),
    $("#" + t).html(currencyFormat(getprice, currency));
}
function countReportD(e, t) {
  (getprice = 0),
    (d = t.substring(5, 3)),
    (m = t.substring(0, 3)),
    $("#" + e + " tr")
      .filter(function () {
        return $(this).hasClass(t);
      })
      .each(function () {
        getprice += Number($(this).find("span").html());
      });
  var a = "['<b>" + d + " " + m + "</b>'," + getprice + "],";
  localStorage.getItem(session + "_resume_report")
    ? localStorage.setItem(
        session + "_resume_report",
        localStorage.getItem(session + "_resume_report") + a
      )
    : localStorage.setItem(session + "_resume_report", a);
}
function countReportT(e, a) {
  (getprice = 0), (d = a.substring(5, 3)), (m = a.substring(0, 3));
  var s = $("#" + e + " tr").filter(function () {
    return $(this).hasClass(a);
  });
  s.each(function () {
    getprice += Number($(this).find("span").html());
  }),
    (t = a.substring(0, 3) + "/" + a.substring(5, 3) + "/" + a.substring(9, 5)),
    (tm = a.substring(0, 3) + " " + a.substring(9, 5)),
    $("#count-report-t").html(currencyFormat(getprice, currency)),
    $("#count-vcr-t").html(s.length),
    $("#filterby-t").html(t.capitalize()),
    $("#filterby").html(tm.capitalize());
}
function filterTableReport(e, t, a, s) {
  var o = new Date(),
    n = (Number(o.getMonth()), document.getElementById(t));
  $("#" + t).val(a),
    setClassYN(e, t),
    n.dispatchEvent(new KeyboardEvent("keyup", { key: "Shift" })),
    countReport(e, s),
    $("#count-vcr").html($("#total-report").html()),
    (tm =
      $("#filterby-t").html().split("/")[0] +
      " " +
      $("#filterby-t").html().split("/")[2]),
    "" == a
      ? ($("#filterby").html(tm.capitalize()), $("#ld-report").fadeIn(200))
      : ($("#filterby").html(a), $("#ld-report").fadeOut(200));
}
function randomN(e, t) {
  var a = e + Math.random() * (t - e);
  return Math.round(a);
}
function updateTable(e) {
  document
    .getElementById(e)
    .dispatchEvent(new KeyboardEvent("keyup", { key: "Shift" }));
}
function selectFirst(e) {
  var t;
  for (idx = e.split(","), t = 0; t < idx.length; t++)
    $("#" + idx[t]).val($("#" + idx[t] + " option:first").val());
}
function setClassYN(e, t) {
  (filter = new RegExp(String($("#" + t).val()), "i")),
    $("#" + e + " tr").filter(function () {
      $(this).each(function () {
        (found = !1),
          $(this)
            .children()
            .each(function () {
              (content = $(this).html()), content.match(filter) && (found = !0);
            }),
          found
            ? $(this).removeClass("no").addClass("yes")
            : $(this).removeClass("yes").addClass("no");
      });
    }),
    countTableRow(e);
}
function printVcr(e) {
  if (e && ("vc" == e.split("-")[0] || "up" == e.split("-")[0])) {
    $("#printVcr, .printVcr").show();
    $("#printVcrS, .printVcrS").show();
    $("#printVcrT, .printVcrT").show();
    $("#btnRemByComment, .btnRemByComment").show();
    $("#printVcr, .printVcr").attr("onclick", 'pVcr("' + e + '","d")');
    $("#printVcrS, .printVcrS").attr("onclick", 'pVcr("' + e + '","s")');
    $("#printVcrT, .printVcrT").attr("onclick", 'pVcr("' + e + '","t")');
  } else if (e && e !== "") {
    $("#printVcr, .printVcr").hide();
    $("#printVcrS, .printVcrS").hide();
    $("#printVcrT, .printVcrT").hide();
    $("#btnRemByComment, .btnRemByComment").show();
  } else {
    $("#printVcr, .printVcr").hide();
    $("#printVcrS, .printVcrS").hide();
    $("#printVcrT, .printVcrT").hide();
    $("#btnRemByComment, .btnRemByComment").hide();
  }
}
function removeByComment(c) {
  var comm = c || $("#select-comment").val();
  if (!comm || comm === "" || comm === "Comment") {
    alert("Please select a comment first!");
    return;
  }
  if (confirm("Are you sure want to remove all users with comment [" + comm + "] ?")) {
    var s = session;
    $.ajax({
      type: "POST",
      url: "./post/post_hotspot_remove.php",
      data: { sessname: s, where: "user_comment", id: comm },
      dataType: "json",
      success: function (res) {
        if (res && res.message === "success") {
          $("#select-comment").val("");
          printVcr("");
          loadUsersPPF();
        } else {
          location.reload();
        }
      },
      error: function () {
        loadUsersPPF();
      }
    });
  }
}
function removeExpiredUsers() {
  if (confirm("Are you sure want to remove all expired hotspot users?")) {
    var s = session;
    $.ajax({
      type: "POST",
      url: "./post/post_hotspot_remove.php",
      data: { sessname: s, where: "user_expired", id: "expired" },
      dataType: "json",
      success: function (res) {
        if (res && res.message === "success") {
          loadUsersPPF();
        } else {
          location.reload();
        }
      },
      error: function () {
        loadUsersPPF();
      }
    });
  }
}
function toggleUser() {
  var uid = $("#add_usrid").val();
  var uname = $("#add_usrname").val();
  if (!uid || uid === "0") return;
  var isDis = $("#btn-toggle-user").text().indexOf("Enable") >= 0;
  var actionText = isDis ? "enable" : "disable";
  if (confirm("Are you sure want to " + actionText + " user [" + uname + "] ?")) {
    $("#add_usrmsg").html("<span class='text-yellow'><i class='fa fa-circle'></i></span> processing...");
    var s = session;
    $.ajax({
      type: "POST",
      url: "./post/post_hotspot_remove.php",
      data: { sessname: s, where: "user_toggle", id: uid, disabled: isDis ? "no" : "yes" },
      dataType: "json",
      success: function (res) {
        $("#huClose").click();
        loadUsersPPF();
      },
      error: function () {
        $("#huClose").click();
        loadUsersPPF();
      }
    });
  }
}
function printSingleUser(template) {
  var uid = $("#add_usrid").val();
  if (uid && uid !== "0") {
    window.open(session + "/print&" + template + "&uid=" + uid, "_blank");
  }
}
function pVcr(e, t) {
  window.open(session + "/print&" + t + "&c=" + e, "_blank");
}
function setC(e) {
  ("vc" != e.split("-")[0] && "up" != e.split("-")[0]) ||
    ($("#select-comment").val(e),
    filterTable("users", "searchUsers", e),
    printVcr(e));
}
function setTheme(e) {
  var t = localStorage.getItem(session + "_theme");
  e != t &&
    ($.get({ url: session + "/set_theme&theme=" + e })
      .fail(function () {
        setTheme(e);
      })
      .always(function () {
        window.location.href = location.href.replace(/#/gi, "");
      }),
    localStorage.setItem(session + "_theme", e));
}
"disable" === idleto || "" === idleto
  ? document.getElementById("timer") &&
    (document.getElementById("timer").innerHTML = "00:00")
  : (idleTimer(), startTimer()),
  $("#iface-name").change(function () {
    var e = $("#iface-name").val();
    localStorage.setItem(session + "_iface", e),
      clearInterval(window.ifaceI),
      clearInterval(window.ifaceII),
      $.getJSON(session + "/get_traffic/&iface=" + e, function (t) {
        try {
          (txrx =
            '[{"name":"Tx","data":["' +
            t.tx +
            '"]},{"name":"Rx","data":["' +
            t.rx +
            '"]}]'),
            localStorage.setItem(session + "_traffic_data", txrx),
            $("#applog").append(
              "<tr><td>" +
                timeStamp() +
                "</td><td>Loading Traffic " +
                e +
                "</td></tr>"
            ),
            scrollD();
        } catch (e) {
          console.log("get_traffic"),
            $("#applog").append(
              "<tr><td>" +
                timeStamp() +
                '</td><td style="color:#f86c6b;">get_traffic : timeout</td></tr>'
            ),
            scrollD();
        }
      }).always(function () {
        trafficMonitor(localStorage.getItem(session + "_theme"));
      });
  });
var jesD = {
  dec: function (e, t = 25) {
    var a = "";
    e.toString();
    for (var s = 0; s < e.length; s++) {
      var o = e.charCodeAt(s) ^ t;
      a += String.fromCharCode(o);
    }
    return a;
  }
};
function scrollD() {
  var e = $("#applogd");
  $("#applog tr").length > 31 &&
    $("#applog").html(
      "<tr><td>" + timeStamp() + "</td><td>Loading data...</td></tr>"
    );
  var t = e.scrollTop();
  e.scrollTop(t + 100);
}
function timeStamp() {
  var e = "",
    t = new Date(),
    a = t.getHours(),
    s = t.getMinutes(),
    o = t.getSeconds();
  return (
    s < 10 && (s = "0" + s),
    o < 10 && (o = "0" + o),
    (e += a + ":" + s + ":" + o)
  );
}
function makeid(e) {
  for (
    var t = "",
      a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      s = a.length,
      o = 0;
    o < e;
    o++
  )
    t += a.charAt(Math.floor(Math.random() * s));
  return t;
}
function diffct(e) {
  (cct = timeStamp()), Number(e.split(":")[1]), Number(cct.split(":")[1]);
  var t = 60 * +Number(e.split(":")[0]) + +Number(e.split(":")[1]),
    a = 60 * +Number(cct.split(":")[0]) + +Number(cct.split(":")[1]);
  return a - t;
}
function detHA(e) {
  "none" == document.getElementById(e).style.display
    ? ($("#" + e).fadeIn(100),
      $("#t" + e).html('<i  class="fa fa-caret-up"></i> less'))
    : ($("#" + e).fadeOut(100),
      $("#t" + e).html('<i  class="fa fa-caret-down"></i> more'));
}
function connect(e, t) {
  isMobile()
    ? $.notify("Connecting...", "info")
    : $("#" + e).notify("Connecting...", "info"),
    (url = "./?" + t + "/connect"),
    $.get(url, function (a) {
      var s = a.split(",")[0];
      "Connected" === s
        ? (console.log(s), localStorage.setItem(t, s))
        : "Invalid username or password" === s
        ? (isMobile() ? $.notify(s, "error") : $("#" + e).notify(s, "error"),
          localStorage.setItem(t, s),
          console.log(s))
        : "Error" === s &&
          (console.log("Could not connect to MikroTik"),
          localStorage.setItem(t, "Could not connect to MikroTik"));
    }).always(function () {
      var a = localStorage.getItem(t);
      "Connected" === a
        ? (location.href = "./?" + t)
        : "Could not connect to MikroTik" === a
        ? (isMobile() ? $.notify(a, "error") : $("#" + e).notify(a, "error"),
          setsess())
        : setsess(),
        localStorage.setItem(t, "");
    });
}
function setsess() {
  $("#lsession") &&
    setTimeout(function () {
      $("#lsession").val(session.split("?")[1]);
    }, 5e3);
}
function daysInMonth(e, t) {
  return new Date(t, e, 0).getDate();
}
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
var yy = yyyy,
  tmm = mm + 1;
function setYear(e) {
  for (i = yy; i >= 2018; i--)
    $("#" + e).append('<option value="' + i + '">' + i + "</option>");
}
function setMonth(e) {
  var t = [
    "",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
  ];
  for (i = 1; i < 13; i++)
    mm + 1 == i
      ? $("#" + e).append(
          '<option value="' +
            t[i] +
            '" selected>' +
            t[i].capitalize() +
            "</option>"
        )
      : $("#" + e).append(
          '<option value="' + t[i] + '">' + t[i].capitalize() + "</option>"
        );
  $("#btnFilter").attr(
    "title",
    "Filter " + $("#month").val().capitalize() + " " + $("#year").val()
  );
}
function setDay(e, t = tmm, a = yy) {
  var s = daysInMonth(t, a);
  for (
    $("#" + e).append('<option value="day">Day</option>'), i = 1;
    i < s + 1;
    i++
  )
    i < 10 && (i = "0" + i),
      $("#" + e).append('<option value="' + i + '">' + i + "</option>");
}
function filterMonth(e, t, a) {
  var s = $("#" + t).val();
  console.log(s);
  var o = [
      "",
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ].indexOf(s),
    n = $("#" + a).val();
  $("#" + e).html(""),
    setDay(e, o, n),
    filterTableReport("report", "searchReport", "", "count-report"),
    loadSReport(Number(o) + "/" + n);
}
function filterDay(e, t, a) {
  (t = $("#" + t).val()), (a = $("#" + a).val());
  filterTableReport(
    "report",
    "searchReport",
    "day" !== e ? t + "/" + e + "/" + a : "",
    "count-report"
  );
}
function selectFO(e) {
  selectTags = $("#" + e);
  for (var t = 0; t < selectTags.length; t++) selectTags[t].selectedIndex = 0;
}
function setfilterProfile() {
  $(".hotspot-users").fancyTable({
    inputId: "searchUsers",
    sortColumn: 2,
    pagination: !0,
    perPage: 15,
    globalSearch: !0,
    globalSearchExcludeColumns: [2, 3, 8]
  });
}
function downloadCSV(e, t) {
  var a, s;
  (a = new Blob([e], { type: "text/csv" })),
    ((s = document.createElement("a")).download = t),
    (s.href = window.URL.createObjectURL(a)),
    (s.style.display = "none"),
    document.body.appendChild(s),
    s.click();
}
function exportToCSV(e, t) {
  var a = [],
    s = $("#" + t + " tr").filter(function () {
      return $(this).hasClass("yes");
    });
  a.push($("title").html().toUpperCase() + ",,,,,,,,"),
    a.push(e.split(".")[0].replace(/_|\?/gi, " ").toUpperCase() + ",,,,,,,,"),
    a.push(",,,,,,,,"),
    a.push(",,,,,,Qty," + (s.length - 1) + ","),
    a.push(",,,,,,Total,=SUM(I8:I" + (s.length + 6) + "),"),
    a.push(",,,,,,,,");
  for (var o = 0; o < s.length; o++) {
    var n = [],
      i = s[o].querySelectorAll("td, th");
    if (0 == o) var r = "#";
    else r = o;
    for (var l = 0; l < i.length; l++)
      "dataReport" == t && isMobile()
        ? n.push(
            i[l].innerText
              .replace(/Date: | |\n/gi, "")
              .replace(
                /Time:|Username:|IPAddress:|MACAddress:|Profile:|Comment:/gi,
                ","
              )
              .replace(/Address/gi, " Address")
          )
        : n.push(i[l].innerText);
    a.push(r + "," + n.join(","));
  }
  downloadCSV(a.join("\n"), e);
}
function reportFN(e = session) {
  var t =
      $("#filterby-t").html().split("/")[0] +
      "_" +
      $("#filterby-t").html().split("/")[2],
    a = $("#filterby").html().replace(/ /gi, "_");
  return (
    "sales_report" +
    (e = e.replace(/-| /gi, "_")) +
    "_" +
    t +
    (a = t == a ? "" : "_" + a) +
    ".csv"
  );
}
function rFileName(e, t = session) {
  var a =
      $("#filterby-t").html().split("/")[0] +
      "_" +
      $("#filterby-t").html().split("/")[2],
    s = $("#filterby").html().replace(/ /gi, "_");
  return (
    "sales_report" +
    (t = t.replace(/-| /gi, "_")) +
    "_" +
    a +
    (s = a == s ? "" : "_" + s) +
    e
  );
}
function exportToExcel(e, t) {
  var a = "",
    s =
      $("#" + e + " tr")
        .find("td")
        .first()
        .parent()
        .find("td").length + 1,
    o = $("#" + e + " tr").not(".no").length + 6,
    n = "=MAX(A8:A" + o + ")",
    i = "=SUM(I8:I" + o + ")",
    r =
      "<tr><td style='font-weight:bold;text-align:center;' colspan='" +
      s +
      "'>" +
      $("title").html().toUpperCase() +
      "</td></tr>",
    l =
      "<tr><td style='font-weight:bold;text-align:center;' colspan='" +
      s +
      "'>" +
      t.split(".")[0].replace(/_|\?/gi, " ").toUpperCase() +
      "</td></tr>",
    d =
      "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td style='text-align:right;font-weight:bold'>Qty :</td><td style='text-align:right;font-weight:bold'>" +
      n +
      "</td></tr>",
    c =
      "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td style='text-align:right;font-weight:bold'>Amount :</td><td style='text-align:right;font-weight:bold'>" +
      i +
      "</td></tr>";
  $("#" + e + " tr")
    .not(".no")
    .each(function (e, t) {
      (tt = 0 == e ? "<th>#</th>" : "<td>" + e + "</td>"),
        (a += "<tr>" + tt + $(t).html() + "</tr>");
    });
  var m,
    u = {
      worksheet: "Sales Report",
      table: r + l + "<tr><td></td></tr>" + d + c + "<tr><td></td></tr>" + a
    },
    p = document.createElement("a");
  (p.download = t),
    (p.href =
      "data:application/vnd.ms-excel;base64," +
      (function (e) {
        return window.btoa(unescape(encodeURIComponent(e)));
      })(
        ((m = u),
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>{table}</table></body></html>'.replace(
          /{(\w+)}/g,
          function (e, t) {
            return m[t];
          }
        ))
      )),
    p.click();
}
function Theme() {
  $("#Mtheme").hasClass("hide")
    ? ($("#Mtheme").removeClass("hide"), $("#Mtheme").fadeIn("200"))
    : ($("#Mtheme").fadeOut("200"), $("#Mtheme").addClass("hide"));
}
function removeRouter(e) {
  if (confirm("Are you sure want to remove session [" + e + "] ?")) {
    "?admin" == session &&
      "settings" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_a_router.php",
        data: { do: "remove", router_: e },
        dataType: "json",
        success: function (e) {
          "Success" == e.message
            ? (location.href = "./?admin/settings")
            : alert(e.message);
        }
      });
  }
}
function delay(e, t) {
  var a = 0;
  return function () {
    var s = this,
      o = arguments;
    clearTimeout(a),
      (a = setTimeout(function () {
        e.apply(s, o);
      }, t || 0));
  };
}
function saveRouter(e) {
  $("#r-mess").html('<i class="fa fa-cog fa-spin"></i>'),
    $("#r-mess").fadeIn(200),
    localStorage.setItem("?" + e + "_idleto", $("#idleTo").val());
  "?admin" == session &&
    "settings" == path &&
    $.ajax({
      type: "POST",
      url: "./post/post_a_router.php",
      data: {
        do: "save",
        router_: e,
        session: $("#sessName").val().replace("admin", "user01"),
        ipmik: blah($("#ipHost").val()),
        usermik: blah($("#userHost").val()),
        passmik: blah($("#passwdHost").val()),
        hotspotname: $("#hotspotNane").val(),
        dnsname: $("#dnsName").val(),
        currency: $("#currency").val(),
        idleto: $("#idleTo").val(),
        phone: blah($("#phone").val()),
        report: $("#report").val()
      },
      dataType: "json",
      success: function (t) {
        if ("Success" == t.message) {
          $("#r-mess").html("<i class='fa fa-check' aria-hidden='true'></i>");
          var a = setTimeout(function () {
            $("#r-mess").fadeOut(200), $("#r-mess").html(""), clearTimeout(a);
          }, 1500);
          e !== t.sess
            ? (location.href = "./?admin/settings/&r=" + t.sess)
            : $("#sessName").val(e);
        } else
          "__err_" == t.sess
            ? $("#ee-mess").notify(t.message, "error")
            : (alert(t.message),
              (window.location.href = "./?admin/settings/&r=" + t.sess));
      }
    });
}
function genClose() {
  $("#gen_usrqty").val("1"),
    $("#gen_hserver").val($("#gen_hserver  option:first").val()),
    $("#gen_usrmode").val($("#gen_usrmode  option:first").val()),
    $("#gen_namelength").val($("#gen_namelength  option:first").val()),
    $("#gen_usrprefix").val(""),
    $("#gen_char").val($("#gen_char option:first").val()),
    $("#gen_usrprofile").val($("#gen_usrprofile option:first").val()),
    $("#gen_tlimit").val(""),
    $("#gen_dlimit").val(""),
    $("#gen_usrcomm").val(""),
    $("#gen_usrmsg").html(
      '<span class="picon"></span> <span class="pgen"></span> <span class="pprocess"></span>&nbsp;'
    ),
    $("#genact-btn").addClass("hide"),
    $("#btn-genV").css("display", ""),
    $("#btn-genV").attr("onclick", "generateV()");
}
function getAddrPool(e = "true") {
  $("#add_addrpool option").length < 2 &&
    $.getJSON(session + "/get_addr_pool&f=" + e, function (e) {
      $.each(e, function (e, t) {
        $("#add_addrpool").append(
          '<option value="' + t.name + '">' + t.name + "</option>"
        );
      });
    }).always(function () {
      $.getJSON(session + "/get_parent_queue&f=" + e, function (e) {
        $.each(e, function (e, t) {
          $("#add_parentq").append(
            '<option value="' + t.name + '">' + t.name + "</option>"
          );
        });
      });
    });
}
function getHotspotServer() {
  if ($("#gen_hserver option").length < 2) {
    var e = localStorage.getItem(session + "_temp_hotspot_server"),
      t = JSON.parse(e);
    t.length > 0 &&
      $.each(t, function (e, t) {
        $("#gen_hserver").append(
          '<option value="' + t + '" >' + t + "</option>"
        );
      });
  }
}
function getHotspotProfile() {
  if ($("#gen_usrprofile option").length < 2) {
    var e = localStorage.getItem(session + "_temp_user_profiles"),
      t = JSON.parse(e);
    t.length > 0 &&
      $.each(t, function (e, t) {
        $("#gen_usrprofile").append(
          '<option value="' + t + '" >' + t + "</option>"
        );
      });
  }
}
function blah(e) {
  var t = "";
  for (e = btoa(e), e = btoa(e), i = 0; i < e.length; i++) {
    var a = 10 ^ e.charCodeAt(i);
    t += String.fromCharCode(a);
  }
  return (t = btoa(t));
}

function unblah(encoded) {
  try {
    // Step 1: Decode base64 pertama
    let decoded = atob(encoded);

    // Step 2: XOR setiap karakter dengan 10
    let xorResult = "";
    for (let i = 0; i < decoded.length; i++) {
      xorResult += String.fromCharCode(decoded.charCodeAt(i) ^ 10);
    }

    // Step 3: Decode base64 dua kali
    let original = atob(atob(xorResult));

    return original;
  } catch (e) {
    console.error("Gagal decode:", e);
    return null;
  }
}
function noR(e) {
  localStorage.setItem("noR", e),
    1 == localStorage.getItem("noR")
      ? (window.onbeforeunload = function () {
          return !0;
        })
      : (window.onbeforeunload = function () {});
}
function openUser(e, t) {
  $("#usract-btn").show(),
    (upath = "uname" == t ? "/user&name=" : "/user&id="),
    $.get(session + upath + e, function (e) {
      var t = jesD.dec(e);
      if ("[" == t.substring(0, 1)) e = JSON.parse(t);
      else e = JSON.parse(t.substring(1, t.length));
      if (void 0 !== e[0]) {
        var a = e[0].server,
          s = e[0]["limit-bytes-total"],
          o = e[0]["limit-uptime"];
        a || (a = "all"),
          s || (s = ""),
          "MiB" == formatBytes(s).substr(-3, 3)
            ? (audlimit = s / 1048576 + "M")
            : "GiB" == formatBytes(s).substr(-3, 3)
            ? (audlimit = s / 1073741824 + "G")
            : (audlimit = s),
          (limituptime = o ? timeNice(o) : ""),
          $("#usrtt").html(
            '<i class="fa fa-user"></i>&nbsp; <b>' + e[0].name + "</b> &nbsp;"
          ),
          $("#add_hserver").val(a).change(),
          $("#add_usrid").val(e[0][".id"]),
          $("#add_usrname").val(e[0].name),
          $("#add_usrpass").val(e[0].password),
          $("#add_usrprofile").val(e[0].profile).change(),
          $("#add_usrmac").val(e[0]["mac-address"]),
          $("#add_tlimit").val(e[0]["limit-uptime"]),
          $("#add_dlimit").val(audlimit),
          $("#uuptime").val(timeNice(e[0].uptime)),
          $("#ubytesin").val(formatBytes(e[0]["bytes-in"])),
          $("#ubytesout").val(formatBytes(e[0]["bytes-out"])),
          $("#ulimituptime").val(limituptime),
          $("#ulimitbytestotal").val(formatBytes(s));
        var n = e[0].comment;
        n &&
        "/" == n.substr(3, 1) &&
        "/" == n.substr(6, 1) &&
        ":" == n.substr(14, 1) &&
        ":" == n.substr(17, 1)
          ? ($("#usrexp").val(n.substr(0, 22)),
            $("#add_usrcomm").val(n.substr(22, n.length)))
          : (n && "up-" == n.substr(0, 3) && "-" == n.substr(6, 1)) ||
            (n && "vc-" == n.substr(0, 3) && "-" == n.substr(6, 1))
          ? ($("#ucode").val(n.substr(0, 16)),
            $("#add_usrcomm").val(n.substr(16, n.length)))
          : (n && "up-" == n.substr(0, 3)) || (n && "vc-" == n.substr(0, 3))
          ? ($("#ucode").val(n.substr(0, 3)),
            $("#add_usrcomm").val(n.substr(3, n.length)))
          : $("#add_usrcomm").val(n);
        var isDis = (e[0].disabled === "true" || e[0].disabled === true || e[0].disabled === "yes");
        if (isDis) {
          $("#btn-toggle-user").html('<i class="fa fa-unlock"></i> Enable').removeClass('bg-secondary').addClass('bg-success');
        } else {
          $("#btn-toggle-user").html('<i class="fa fa-lock"></i> Disable').removeClass('bg-success').addClass('bg-secondary');
        }
        $("#addh_user").fadeIn(),
          noR(1);
      }
    });
}
function resetUser() {
  confirm(
    "Are you sure want to reset user [" + $("#add_usrname").val() + "] ?"
  ) && addUser("yes");
}
function addUser(e = "no") {
  if (
    ($("#add_usrmsg").html(
      "<span class='text-yellow'><i class='fa fa-circle'></i></span> processing..."
    ),
    0 == $("#add_usrid").val())
  )
    var t = "./post/post_add_user.php";
  else t = "./post/post_update_user.php";
  var a = session,
    s = $("#add_dlimit").val(),
    o = $("#add_tlimit").val(),
    n = $("#add_usrcomm").val(),
    i = $("#usrexp").val();
  "M" == s.substr(-1, 1)
    ? (adlimit = 1048576 * Number(s.substr(0, s.length - 1)))
    : "G" == s.substr(-1, 1)
    ? (adlimit = 1073741824 * Number(s.substr(0, s.length - 1)))
    : (adlimit = "" == s ? 0 : s);
  var r,
    l = "";
  (l =
    "" == $("#add_usrmac").val()
      ? "00:00:00:00:00:00"
      : $("#add_usrmac").val()),
    (atlimit = "" == o ? 0 : o),
    "yes" == e &&
      ($("#add_tlimit").val(""),
      $("#usrexp").val(""),
      $("#ucode").val(""),
      (atlimit = 0),
      (n =
        $("#add_usrname").val() == $("#add_usrpass").val()
          ? "vc-" + n
          : "up-" + n),
      (i = "")),
    "?admin" !== session &&
      $.ajax({
        type: "POST",
        url: t,
        data: {
          sessname: a,
          uid: $("#add_usrid").val(),
          server: $("#add_hserver").val(),
          name: $("#add_usrname").val(),
          password: $("#add_usrpass").val(),
          profile: $("#add_usrprofile").val(),
          macaddr: l,
          timelimit: atlimit,
          datalimit: adlimit,
          comment: n,
          expdate: i,
          reset: e,
          ucode: $("#ucode").val()
        },
        dataType: "json",
        success: function (e) {
          if ("success" == e.message) {
            $("#usract-btn").show(),
              $("#add_usrmsg").html(
                "<span class='text-green'><i class='fa fa-circle'></i></span> " +
                  e.message
              ),
              $("#add_usrid").val(e.data[".id"]),
              e.data["mac-address"] && (r = e.data["mac-address"]),
              $("#add_usrmac").val(r);
            var t = e.data.comment;
            t &&
            "/" == t.substr(3, 1) &&
            "/" == t.substr(6, 1) &&
            ":" == t.substr(14, 1) &&
            ":" == t.substr(17, 1)
              ? ($("#usrexp").val(t.substr(0, 20)),
                $("#add_usrcomm").val(t.substr(21, t.length)))
              : (t && "up-" == t.substr(0, 3) && "-" == t.substr(6, 1)) ||
                (t && "vc-" == t.substr(0, 3) && "-" == t.substr(6, 1))
              ? ($("#ucode").val(t.substr(0, 16)),
                $("#add_usrcomm").val(t.substr(16, t.length)))
              : (t && "up-" == t.substr(0, 3)) || (t && "vc-" == t.substr(0, 3))
              ? ($("#ucode").val(t.substr(0, 3)),
                $("#add_usrcomm").val(t.substr(3, t.length)))
              : $("#add_usrcomm").val(t),
              $("#uuptime").val(timeNice(e.data.uptime)),
              $("#ubytesin").val(formatBytes(e.data["bytes-in"])),
              $("#ubytesout").val(formatBytes(e.data["bytes-out"]));
            var s = e.data["limit-uptime"];
            s
              ? ((limituptime = timeNice(s)), $("#add_tlimit").val(s))
              : (limituptime = ""),
              $("#ulimituptime").val(limituptime),
              $("#ulimitbytestotal").val(formatBytes(adlimit)),
              $("#usrtt").html(
                '<i class="fa fa-user"></i>&nbsp; <b>' +
                  e.data.name +
                  "</b> &nbsp;"
              ),
              $.get(a + "/users/&prof=" + e.data.profile + "&f=true").always(
                function () {
                  loadUsersPPF();
                }
              ),
              setTimeout(function () {
                $("#add_usrmsg").html("&nbsp;");
              }, 3e3);
          } else
            $("#add_usrmsg").html(
              "<span class='text-red'><i class='fa fa-circle'></i></span> " +
                e.data.error
            ),
              setTimeout(function () {
                $("#add_usrmsg").html("&nbsp;");
              }, 3e3);
        }
      });
}
function remProf() {
  removeProfile($("#add_usrprofid").val(), $("#add_usrprofname").val());
}
function remUser() {
  removeUser(
    $("#add_usrid").val(),
    $("#add_usrname").val(),
    $("#add_usrprofile").val()
  );
}
function removeUser(e, t, a) {
  if (confirm("Are you sure want to remove user [" + t + "] ?")) {
    var s = session;
    "?admin" !== session &&
      "hotspot" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_hotspot_remove.php",
        data: { sessname: s, where: "user_", id: e },
        dataType: "json",
        success: function (e) {
          "success" == e.message
            ? $.get(s + "/users/&prof=" + a + "&f=true").always(function () {
                loadUsersPPF();
              })
            : location.reload();
        }
      }),
      $("#huClose").click();
  }
}
function openUserProfile(e, t) {
  $("#usrprofact-btn").show(),
    (upath = "upname" == t ? "/profile&name=" : "/profile&id="),
    getAddrPool("false"),
    $.getJSON(session + upath + e, function (e) {
      var t = "",
        a = "none",
        s = "none",
        o = "none",
        n = "",
        i = "",
        r = "",
        l = "Disable",
        d = "Disable";
      void 0 !== e[0] &&
        (e[0]["on-login"] &&
          ((o = (t = e[0]["on-login"]).split(",")[1]),
          (n = t.split(",")[3]),
          (i = t.split(",")[2]),
          (r = t.split(",")[4]),
          (l = t.split(",")[6]),
          (d = t.split(",")[7]),
          (none = t.split(",")[5]),
          "noexp" == none && (o = "0"),
          "" == d.split('")')[0] && (d = "Disable")),
        e[0]["address-pool"] && (a = e[0]["address-pool"]),
        e[0]["rate-limit"] && e[0].ratelimit,
        e[0]["rate-limit"] && e[0].ratelimit,
        e[0]["parent-queue"] && (s = e[0]["parent-queue"]),
        $("#usrproftt").html(
          '<i class="fa fa-pie-chart"></i>&nbsp; <b>' +
            e[0].name +
            "</b> &nbsp;"
        ),
        $("#add_usrprofid").val(e[0][".id"]),
        $("#add_usrprofname").val(e[0].name),
        $("#add_addrpool").val(a),
        $("#add_sharedusr").val(e[0]["shared-users"]),
        $("#add_ratelimit").val(e[0]["rate-limit"]),
        $("#add_parentq").val(s),
        $("#add_expmode").val(o),
        $("#add_validity").val(n),
        $("#add_price").val(i),
        $("#add_sellingprice").val(r),
        $("#add_lockuser").val(l),
        $("#add_lockserver").val(d),
        $("#usrprofact-btn").show(),
        $("#addh_userprofile").fadeIn(),
        noR(1));
    });
}
function addUserProfile() {
  if (
    ($("#add_usrprofilemsg").html(
      "<span class='text-yellow'><i class='fa fa-circle'></i></span> processing..."
    ),
    0 == $("#add_usrprofid").val())
  )
    var e = "./post/post_add_userprofile.php";
  else e = "./post/post_update_userprofile.php";
  var t = session;
  "?admin" !== session &&
    $.ajax({
      type: "POST",
      url: e,
      data: {
        sessname: t,
        upid: $("#add_usrprofid").val(),
        name: $("#add_usrprofname").val(),
        addresspool: $("#add_addrpool").val(),
        sharedusers: $("#add_sharedusr").val(),
        ratelimit: $("#add_ratelimit").val(),
        parentqueue: $("#add_parentq").val(),
        expmode: $("#add_expmode").val(),
        validity: $("#add_validity").val(),
        price: $("#add_price").val(),
        sellingprice: $("#add_sellingprice").val(),
        lockuser: $("#add_lockuser").val(),
        lockserver: $("#add_lockserver").val()
      },
      dataType: "json",
      success: function (e) {
        "success" == e.message
          ? ($("#usrprofact-btn").show(),
            $("#add_usrprofilemsg").html(
              "<span class='text-green'><i class='fa fa-circle'></i></span> " +
                e.message
            ),
            $("#add_usrprofid").val(e.data[".id"]),
            $("#usrproftt").html(
              '<i class="fa fa-pie-chart"></i>&nbsp; <b>' +
                e.data.name +
                "</b> &nbsp;"
            ),
            $.get(t + "/profiles&f=true").always(function () {
              loadUserProfiles();
            }),
            setTimeout(function () {
              $("#add_usrprofilemsg").html("&nbsp;");
            }, 3e3))
          : ($("#add_usrprofilemsg").html(
              "<span class='text-red'><i class='fa fa-circle'></i></span> " +
                e.data.error
            ),
            setTimeout(function () {
              $("#add_usrprofilemsg").html("&nbsp;");
            }, 3e3));
      }
    });
}
function removeProfile(e, t) {
  if (confirm("Are you sure want to remove profile [" + t + "] ?")) {
    var a = session;
    "?admin" !== session &&
      "hotspot" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_hotspot_remove.php",
        data: { sessname: a, where: "profile_", id: e },
        dataType: "json",
        success: function (e) {
          "success" == e.message ? loadUserProfiles("true") : location.reload();
        }
      }),
      $("#hupClose").click();
  }
}
function removeActive(e, t) {
  if (confirm("Are you sure want to remove user [" + t + "] ?")) {
    var a = session;
    "?admin" !== session &&
      "hotspot" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_hotspot_remove.php",
        data: { sessname: a, where: "active_", id: e },
        dataType: "json",
        success: function (e) {
          "success" == e.message
            ? (clearInterval(window.auto_hotspot_active), loadHotspotActive())
            : location.reload();
        }
      });
  }
}
function removeHost(e, t) {
  if (confirm("Are you sure want to remove MAC [" + t + "] ?")) {
    var a = session;
    "?admin" !== session &&
      "hotspot" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_hotspot_remove.php",
        data: { sessname: a, where: "host_", id: e },
        dataType: "json",
        success: function (e) {
          "success" == e.message
            ? (clearInterval(window.auto_hotspot_hosts), loadHotspotHosts())
            : location.reload();
        }
      });
  }
}
function setExpMon() {
  var e = session;
  "?admin" !== session &&
    $.ajax({
      type: "POST",
      url: "./post/post_expire_monitor.php",
      data: {
        sessname: e,
        expmon:
          ':local normdate do={:local mnames "janfebmaraprmayjunjulaugsepoctnovdec";:local v $d;:if ([:pick $v 4 5] = "-") do={:local mn [:tonum [:pick $v 5 7]];:local m [:pick $mnames (($mn - 1) * 3) (($mn - 1) * 3 + 3)];:local rest "";:if ([:len $v] > 10) do={:set rest [:pick $v 10 [:len $v]]};:local mm [:pick $v 8 10];:local yy [:pick $v 0 4];:set v "$m/$mm/$yy$rest"};:return $v};:local dateint do={:local mnames "janfebmaraprmayjunjulaugsepoctnovdec";:local days [:pick $d 4 6];:local month [:pick $d 0 3];:local year [:pick $d 7 11];:local monthint ([:find $mnames $month] / 3);:local monthnum ($monthint + 1);:if ([:len $monthnum] = 1) do={:local zero "0";:return [:tonum "$year$zero$monthnum$days"]} else={:return [:tonum "$year$monthnum$days"]}};:local timeint do={:local hours [:pick $t 0 2];:local minutes [:pick $t 3 5];:return ($hours * 60 + $minutes)};:local date [ /system clock get date ];:local time [ /system clock get time ];:local todaydate [$normdate d=$date];:local today [$dateint d=$todaydate];:local curtime [$timeint t=$time];:local tyear [:pick $todaydate 7 11];:local lyear ($tyear - 1);:foreach i in [ /ip hotspot user find where comment~"/$tyear" || comment~"/$lyear" || comment~"^$tyear-" || comment~"^$lyear-" ] do={:local comment [/ip hotspot user get $i comment];:local norm [$normdate d=$comment];:local limit [/ip hotspot user get $i limit-uptime];:local name [/ip hotspot user get $i name];:if ([:pick $norm 3] = "/" and [:pick $norm 6] = "/" and [:len $norm] >= 19) do={:local gettime [:pick $norm 12 20];:local expd [$dateint d=$norm];:local expt [$timeint t=$gettime];:if (($expd < $today or ($expd = $today and $expt < $curtime)) and $limit != "00:00:01") do={:if ([:pick $norm 21] = "N") do={[/ip hotspot user set limit-uptime=1s $i];[/ip hotspot active remove [find where user=$name]]} else={[/ip hotspot user remove $i];[/ip hotspot active remove [find where user=$name]]}}}}'
      },
      dataType: "json",
      success: function (e) {
        "success" == e.message &&
          ($("#exp_mon").html(
            '<i class="fa fa-ci fa-circle text-green" title="Expire users monitor is activated."></i>'
          ),
          $("#btn-exp-mon").fadeOut(200));
      }
    });
}
function setCharacter() {
  "up" == $("#gen_usrmode").val()
    ? ($("#lower").removeClass("hide"),
      $("#upper").removeClass("hide"),
      $("#upplow").removeClass("hide"),
      $("#mix").removeClass("hide"),
      $("#mix1").removeClass("hide"),
      $("#mix2").removeClass("hide"),
      $("#upper1").addClass("hide"),
      $("#lower1").addClass("hide"),
      $("#upplow1").addClass("hide"),
      $("#num").addClass("hide"),
      $("#gen_char").val($("#gen_char option:first").val()),
      $("#gen_namelength").val("4"))
    : "vc" == $("#gen_usrmode").val() &&
      ($("#lower").addClass("hide"),
      $("#upper").addClass("hide"),
      $("#upplow").addClass("hide"),
      $("#mix").removeClass("hide"),
      $("#mix1").removeClass("hide"),
      $("#mix2").removeClass("hide"),
      $("#upper1").removeClass("hide"),
      $("#lower1").removeClass("hide"),
      $("#upplow1").removeClass("hide"),
      $("#num").removeClass("hide"),
      $("#gen_char").val($("#lower1").val()),
      $("#gen_namelength").val("8"));
}
function generateV() {
  $("#btn-genV").attr("onclick", ""),
    localStorage.setItem(session + "_gencode", randomN(101, 999));
  var e = $("#gen_usrqty").val();
  localStorage.setItem(session + "_totgenv", e),
    localStorage.setItem(session + "_genleft", e),
    genVoucher();
}
function genVoucher() {
  $(".picon").html("<i class='fa fa-circle-o-notch fa-spin text-yellow'></i>"),
    $(".pprocess").html("Generating...");
  var e = localStorage.getItem(session + "_genleft");
  qty = e > 50 ? 50 : e;
  var t = session;
  "?admin" !== session &&
    $.ajax({
      type: "POST",
      url: "./post/post_generate_voucher.php",
      data: {
        sessname: t,
        qty: qty,
        server: $("#gen_hserver").val(),
        user: $("#gen_usrmode").val(),
        userl: $("#gen_namelength").val(),
        prefix: $("#gen_usrprefix").val(),
        char: $("#gen_char").val(),
        profile: $("#gen_usrprofile").val(),
        timelimit: $("#gen_tlimit").val(),
        datalimit: $("#gen_dlimit").val(),
        gcomment: $("#gen_usrcomm").val(),
        gencode: localStorage.getItem(session + "_gencode")
      },
      dataType: "json",
      success: function (e) {
        if ("success" == e.message) {
          $(".picon").html(
            "<i class='fa fa-circle-o-notch fa-spin text-green'></i>"
          ),
            $(".pgen").html(e.data.count + " of " + $("#gen_usrqty").val()),
            $(".pprocess").html("");
          var a =
            localStorage.getItem(session + "_totgenv") - Number(e.data.count);
          localStorage.setItem(session + "_genleft", a),
            localStorage.setItem(session + "_gencomment", e.data.comment),
            a > 0
              ? setTimeout(() => {
                  genVoucher();
                }, 1e3)
              : (genCacheVoucher(),
                $("#genact-btn").removeClass("hide"),
                localStorage.setItem(session + "_gencode", ""),
                $("#btn-genV").css("display", "none"),
                $(".picon").html("<i class='fa fa-circle text-green'></i>"),
                $(".pgen").html(e.data.count),
                $(".pprocess").html("Done"),
                cacheUser(t, e.data.profile));
        } else
          $(".picon").html("<i class='fa fa-circle text-red'></i>"),
            $(".pprocess").html(e.data.error),
            setTimeout(function () {
              $("#gen_usrmsg").html(
                '<span class="picon"></span> <span class="pgen"></span> <span class="pprocess"></span>&nbsp;'
              );
            }, 3e3);
      }
    });
}
function cacheUser(e, t) {
  $.get(e + "/users/&prof=" + t + "&f=true").always(function () {
    loadUsersPPF();
  });
}
function genCacheVoucher() {
  var e = session;
  "?admin" !== session &&
    $.ajax({
      type: "POST",
      url: "./post/post_cache_voucher.php",
      data: {
        sessname: e,
        qty: $("#gen_usrqty").val(),
        user: $("#gen_usrmode").val(),
        gcomment: $("#gen_usrcomm").val(),
        gencode: localStorage.getItem(session + "_gencode")
      },
      dataType: "json",
      success: function (e) {
        "success" == e.message
          ? console.log(e.data.count)
          : console.log(e.data.error);
      }
    });
}
function editRouter(e) {
  location.href = "./?admin/settings/&r=" + e;
}
function getInterval() {
  return localStorage.getItem(session + "_auto_traffic");
}
function fileUpChk(e) {
  "png" !== e.files[0].name.split(".").pop()
    ? alert("Please choose .png file type.")
    : e.files[0].size / 1024 / 1024 > 1
    ? alert("File to large [" + formatBytes(e.files[0].size) + "], max 1 MiB.")
    : $("#tempfileup").html(
        e.files[0].name + " [" + formatBytes(e.files[0].size) + "]"
      );
}
$("#month").change(function () {
  $("#btnFilter").attr(
    "title",
    "Filter " + $("#month").val().capitalize() + " " + $("#year").val()
  );
}),
  $("#year").change(function () {
    $("#btnFilter").attr(
      "title",
      "Filter " + $("#month").val().capitalize() + " " + $("#year").val()
    );
  }),
  $("#logOut").click(function () {
    $.ajax({
      type: "POST",
      url: "./post/post_logout.php",
      data: { logout: session },
      success: function (e) {
        session === e &&
          (localStorage.setItem("typeTemplate", ""),
          localStorage.setItem(session + "_cache_user_profiles", ""),
          location.replace("./?login"));
      }
    });
  }),
  $("#btn-add-router").click(function () {
    $("#add-router-message").html("Creating a new config..."),
      $("#add-router-message").fadeIn(200);
    "?admin" == session &&
      "settings" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_a_router.php",
        data: { do: "add", router_: "sess_" },
        dataType: "json",
        success: function (e) {
          "Success" == e.message
            ? (location.href = "./?admin/settings/&r=" + e.sesname)
            : ($("#add-router-message").css({ width: "500px" }),
              $("#add-router-message").html(e.message),
              $("#add-router-message").fadeIn(200),
              setTimeout(function () {
                $("#add-router-message").fadeOut(200);
              }, 5e3));
        }
      });
  }),
  $(".asave").keyup(
    delay(function (e) {
      "" !== $("#sessName").val().trim() && saveRouter($("#sessName").val());
    }, 1e3)
  ),
  $("#idleTo").change(
    delay(function (e) {
      "" !== $("#sessName").val().trim() && saveRouter($("#sessName").val());
    }, 1e3)
  ),
  $("#report").change(
    delay(function (e) {
      "" !== $("#sessName").val().trim() && saveRouter($("#sessName").val());
    }, 1e3)
  ),
  $("#sessName").keyup(
    delay(function (e) {
      "" !== $("#sessName").val().trim() && $("#saveR").click();
    }, 1e3)
  ),
  $(".adm").keyup(
    delay(function (e) {
      $("#btn-asave").click();
    }, 1e3)
  ),
  $("#rConnect").click(function () {
    connect("ee-mess", $("#sessName").val());
  }),
  $("#saveR").click(function () {
    var e = new URL(window.location).searchParams.get("r");
    "" !== $("#sessName").val() ? saveRouter(e) : $("#sessName").focus();
  }),
  $("#btn-asave").click(function () {
    $("#a-mess").html('<i class="fa fa-cog fa-spin"></i>'),
      $("#a-mess").fadeIn(200);
    "?admin" == session &&
      "settings" == path &&
      $.ajax({
        type: "POST",
        url: "./post/post_a_router.php",
        data: {
          do: "saveAdmin",
          router_: session,
          username: blah($("#userAdm").val()),
          password: blah($("#passAdm").val())
        },
        dataType: "json",
        success: function (e) {
          "Success" == e.message
            ? ($("#a-mess").html(
                "<i class='fa fa-check' aria-hidden='true'></i>"
              ),
              setTimeout(function () {
                $("#a-mess").fadeOut(200);
              }, 1e3))
            : ($("#e-mess").html(e.message),
              $("#e-mess").fadeIn(200),
              setTimeout(function () {
                $("#e-mess").fadeOut(200),
                  $("#a-mess").fadeOut(200),
                  $("#e-mess").html("");
              }, 3e3));
        }
      });
  }),
  $("#btn-mm-admin").click(function () {
    menuActive("mm-admin"),
      menuNonActive("router-list"),
      menuNonActive("edit-router"),
      isMobile() && $("#pload").html($("#btn-mm-admin").html());
  }),
  $("#btn-router-list").click(function () {
    menuNonActive("mm-admin"),
      menuNonActive("edit-router"),
      menuActive("router-list"),
      isMobile() && $("#pload").html($("#btn-router-list").html());
  }),
  $("#btn-edit-router").click(function () {
    menuNonActive("mm-admin"),
      menuNonActive("router-list"),
      menuActive("edit-router"),
      isMobile() && $("#pload").html($("#btn-edit-router").html());
  }),
  $("#btn-general").click(function () {
    $("#btn-details").removeClass("card-tab-active"),
      $("#udetails").addClass("hide"),
      $("#btn-general").addClass("card-tab-active"),
      $("#ugeneral").removeClass("hide");
  }),
  $("#btn-details").click(function () {
    $("#btn-details").addClass("card-tab-active"),
      $("#udetails").removeClass("hide"),
      $("#btn-general").removeClass("card-tab-active"),
      $("#ugeneral").addClass("hide");
  }),
  $("#btn-upgeneral").click(function () {
    $("#btn-updetails").removeClass("card-tab-active"),
      $("#updetails").addClass("hide"),
      $("#btn-upgeneral").addClass("card-tab-active"),
      $("#upgeneral").removeClass("hide");
  }),
  $("#btn-updetails").click(function () {
    $("#btn-updetails").addClass("card-tab-active"),
      $("#updetails").removeClass("hide"),
      $("#btn-upgeneral").removeClass("card-tab-active"),
      $("#upgeneral").addClass("hide");
  }),
  $("#btn-gengeneral").click(function () {
    $("#btn-gendetails").removeClass("card-tab-active"),
      $("#gendetails").addClass("hide"),
      $("#btn-gengeneral").addClass("card-tab-active"),
      $("#gengeneral").removeClass("hide");
  }),
  $("#btn-gendetails").click(function () {
    $("#btn-gendetails").addClass("card-tab-active"),
      $("#gendetails").removeClass("hide"),
      $("#btn-gengeneral").removeClass("card-tab-active"),
      $("#gengeneral").addClass("hide");
  }),
  $(".btn-add-hotspot-users").click(function () {
    $("#addh_user").fadeIn(), noR(1);
  }),
  $(".btn-add-user-profiles").click(function () {
    getAddrPool(), $("#addh_userprofile").fadeIn(), noR(1);
  }),
  $(".btn-gen-hotspot-users").click(function () {
    getHotspotServer(),
      getHotspotProfile(),
      $("#gen_user").fadeIn(),
      localStorage.setItem(session + "_gencode", ""),
      noR(1);
  }),
  $("#genClose").click(function () {
    "" !== localStorage.getItem(session + "_gencode")
      ? noR(1)
      : "" == localStorage.getItem(session + "_gencode") &&
        ($("#gen_user").fadeOut(), genClose(), noR(0));
  }),
  $("#huClose").click(function () {
    $("#addh_user").fadeOut(),
      setTimeout(function () {
        $("#btn-general").click(),
          $("#add_hserver").val($("#add_hserver option:first").val()),
          $("#add_usrid").val("0"),
          $("#add_usrname").val(""),
          $("#add_usrpass").val(""),
          $("#add_usrprofile").val($("#add_usrprofile option:first").val()),
          $("#add_usrmac").val(""),
          $("#add_tlimit").val(""),
          $("#add_dlimit").val(""),
          $("#add_usrcomm").val(""),
          $("#uuptime").val(""),
          $("#ubytesin").val(""),
          $("#ubytesout").val(""),
          $("#ulimituptime").val(""),
          $("#ulimitbytestotal").val(""),
          $("#usrexp").val(""),
          $("#ucode").val(""),
          $("#usract-btn").hide(),
          $("#usrtt").html(
            '<i class="fa fa-user-plus"></i>&nbsp; <b>Add User</b> &nbsp;'
          );
      }, 700),
      noR(0);
  }),
  $("#hupClose").click(function () {
    $("#addh_userprofile").fadeOut(),
      setTimeout(function () {
        $("#btn-upgeneral").click(),
          $("#add_usrprofid").val("0"),
          $("#add_usrprofname").val(""),
          $("#add_adrpool").val($("#add_addrpool option:first").val()),
          $("#add_sharedusr").val("1"),
          $("#add_ratelimit").val(""),
          $("#add_expmode").val($("#add_expmode option:first").val()),
          $("#add_validity").val(""),
          $("#add_price").val(""),
          $("#add_sellingprice").val(""),
          $("#add_lockuser").val($("#add_lockuser option:first").val()),
          $("#add_parentqueue").val($("#add_parentqueue option:first").val()),
          $("#usrprofact-btn").hide(),
          $("#usrproftt").html(
            '<i class="fa fa-pie-chart"></i>&nbsp; <b>Add Profile</b> &nbsp;'
          );
      }, 700),
      noR(0);
  }),
  $("#add_usrprofname").keypress(function (e) {
    var t = e.which;
    return (
      32 == t ||
      (48 <= t && t <= 57) ||
      (65 <= t && t <= 90) ||
      (97 <= t && t <= 122)
    );
  }),
  $("#gen_usrcomm").keypress(function (e) {
    var t = e.which;
    return (
      32 == t ||
      (48 <= t && t <= 57) ||
      (65 <= t && t <= 90) ||
      (97 <= t && t <= 122)
    );
  }),
  $("#gen_usrmode").change(function () {
    setCharacter();
  }),
  $(".gen_clear").click(function () {
    genClose();
  }),
  $(".print_v").click(function () {
    pVcr(localStorage.getItem(session + "_gencomment"), "d");
  }),
  $(".print_vs").click(function () {
    pVcr(localStorage.getItem(session + "_gencomment"), "s");
  }),
  $("#browsefile").click(function () {
    $("#fileup").click();
  });
var sq = location.hostname.split(".");
if ("?admin" == session && "template_editor" == path) {
  var editor = CodeMirror.fromTextArea(
    document.getElementById("editorMikhmon"),
    {
      lineNumbers: !0,
      matchBrackets: !0,
      mode: "application/x-httpd-php",
      indentUnit: 4,
      indentWithTabs: !0,
      lineWrapping: !0,
      viewportMargin: 1 / 0,
      matchTags: { bothTags: !0 },
      autoCloseBrackets: !0,
      autoCloseTags: !0,
      keyMap: "sublime",
      extraKeys: { "Ctrl-J": "toMatchingTag" }
    }
  );
  editor.setOption("theme", "material"), editor.refresh();
}
function loadTemplate(e) {
  $(
    "#select-template option[value=" +
      localStorage.getItem("nameTemplate") +
      "]"
  ).attr("selected", "selected"),
    localStorage.setItem("typeTemplate", e),
    localStorage.setItem("nameTemplate", $("#select-template").val());
  var t = localStorage.getItem("typeTemplate"),
    a = localStorage.getItem("nameTemplate");
  localStorage.setItem("tmplPath", t + "." + a + ".txt"),
    $.get(
      "./template/" + t + "." + a + ".txt?" + new Date().getTime(),
      function (e) {
        editor.setValue(e), editor.refresh();
      }
    ).always(function () {
      "header" == e
        ? $("#active-edit").html("/template/" + a + "." + t + ".txt")
        : "row" == e
        ? $("#active-edit").html("/template/" + a + "." + t + ".txt")
        : "footer" == e &&
          $("#active-edit").html("/template/" + a + "." + t + ".txt"),
        $("#select-template").addClass("btn-group-active");
    });
}
function mNav() {
  var e = document.getElementById("mnav");
  "navbar" === e.className
    ? ((e.className += " nav_responsive"),
      $("#mactive").hide(),
      $("#Mtheme").removeClass("hide"))
    : ((e.className = "navbar"),
      $("#mactive").show(),
      $("#Mtheme").addClass("hide"));
}
function hidemNav() {
  (document.getElementById("mnav").className = "navbar"),
    $("#mactive").show(),
    $("#Mtheme").addClass("hide");
}
function dropD() {
  $("#mDropdown").hasClass("show")
    ? $("#mDropdown").removeClass("show")
    : $("#mDropdown").addClass("show");
}
$("#btn-tsave").click(function () {
  $("#loading").html('<i class="fa fa-cog fa-spin"></i>'),
    $("#loading").fadeIn(200);
  var e = localStorage.getItem("tmplPath");
  "?admin" == session &&
    "template_editor" == path &&
    $.ajax({
      type: "POST",
      url: "./post/post_template.php",
      data: {
        do: "saveTemplate",
        router_: session,
        file_: e,
        _template: editor.getValue()
      },
      dataType: "json",
      success: function (e) {
        "Saved" == e.message
          ? ($("#loading").html(
              " <i class='fa fa-check' aria-hidden='true'></i>"
            ),
            setTimeout(function () {
              $("#loading").fadeOut(200), $("#loading").html("&nbsp;");
            }, 1e3))
          : $("#t_err").notify(e.message, "error");
      }
    });
}),
  $("#select-template").change(function () {
    loadTemplate("row", this.value);
  }),
  isMobile() &&
    $(document).click() &&
    $("#mDropdown a").click(function () {
      $("#mDropdown").removeClass("show");
    }),
  $("#sessionslk").click(function (e) {
    e.stopPropagation();
  }),
  $("#lsession").click(function (e) {
    e.stopPropagation();
  }),
  isMobile() &&
    $(document).click(function () {
      hidemNav(), $("#mDropdown").removeClass("show");
    }),
  $(".mNavBtn").click(function (e) {
    e.stopPropagation(), mNav(), $("#mDropdown").removeClass("show");
  }),
  $(".dropbtn").click(function (e) {
    e.stopPropagation(), dropD(), hidemNav();
  }),
  $("#add_expmode").change(function () {
    0 == $("#add_expmode").val()
      ? $("#trvalidity").addClass("hide")
      : ($("#trvalidity").removeClass("hide"), $("#add_validity").focus());
  }),
  $("#hTimeLimit").click(function () {
    $("#hTimeLimit").notify(
      "format: d,h,m or s\nexample:\n1d (1 day)\n1h (2 hour)\n10m (10 minutes)\n30s (30 seconds)",
      "info"
    );
  }),
  $("#hDataLimit").click(function () {
    $("#hDataLimit").notify(
      "format: M or G\nexample:\n5G (5 GiB) \n1500M (1500 MiB)\n 1MiB = 1024KiB",
      "info"
    );
  }),
  $("#ghTimeLimit").click(function () {
    $("#ghTimeLimit").notify(
      "format: d,h,m or s\nexample:\n1d (1 day)\n1h (2 hour)\n10m (10 minutes)\n30s (30 seconds)",
      "info"
    );
  }),
  $("#ghDataLimit").click(function () {
    $("#ghDataLimit").notify(
      "format: M or G\nexample:\n5G (5 GiB) \n1500M (1500 MiB)\n 1MiB = 1024KiB",
      "info"
    );
  }),
  $("#hRateLimit").click(function () {
    $("#trratelimit").notify("example: 512k/1M", "info");
  }),
  $("#hExpMode").click(function () {
    $("#trexpmode").notify(
      "None: User without expiry time.\nRemove: User will be deleted after expiry time.\nNotice: user can't login after time expired\nand get notification after trying to login again.\nRecord: Record user data after login.",
      { className: "info", autoHide: !1 }
    );
  }),
  $("#hValidity").click(function () {
    $("#trvalidity").notify(
      "format: d or w\nexample:\n1d (1 day), 30d (30 days)\n1w (7 days)",
      "info"
    );
  }),
  $("#hLockUser").click(function () {
    $("#trlockuser").notify(
      "Lock the MAC Address of user after login.",
      "info"
    );
  }),
  $("#hLockServer").click(function () {
    $("#trlockuser").notify(
      "Lock the Server Hotspot of user after login.",
      "info"
    );
  }),
  $(".editor_help").click(function () {
    window.open("https://laksa19.github.io/?mikhmon/v4/voucher");
  });

// ==========================================
// Mikhmon v4 - Ported v3 Features & Actions
// ==========================================

function safeJesDec(data) {
  if (!data) return [];
  if (typeof data === "object") return data;
  if (typeof data !== "string") return [];

  var trimmed = data.trim();
  if (!trimmed) return [];

  // 1. Try if data is already raw JSON (endpoints echoing json_encode directly)
  if (trimmed.charAt(0) === '[' || trimmed.charAt(0) === '{') {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      // not direct JSON, proceed to jesD decryption
    }
  }

  // 2. Decrypt with jesD (XOR 25)
  try {
    var dec = jesD.dec(trimmed);
    if (!dec) return [];

    // Find JSON boundaries (either array [ ... ] or object { ... })
    var firstArray = dec.indexOf('[');
    var firstObj = dec.indexOf('{');

    if (firstArray !== -1 && (firstObj === -1 || firstArray < firstObj)) {
      var lastArray = dec.lastIndexOf(']');
      if (lastArray !== -1 && lastArray >= firstArray) {
        return JSON.parse(dec.substring(firstArray, lastArray + 1));
      }
    } else if (firstObj !== -1 && (firstArray === -1 || firstObj < firstArray)) {
      var lastObj = dec.lastIndexOf('}');
      if (lastObj !== -1 && lastObj >= firstObj) {
        return JSON.parse(dec.substring(firstObj, lastObj + 1));
      }
    }

    return JSON.parse(dec);
  } catch (err) {
    return [];
  }
}

// ------------------------------------------
// 1. IP Binding
// ------------------------------------------
function loadIPBinding(force) {
  menuActive("hotspot-binding");
  menuNonActive("hotspot-users");
  menuNonActive("user-profiles");
  menuNonActive("hotspot-active");
  menuNonActive("hotspot-hosts");
  menuNonActive("hotspot-cookies");
  if (isMobile()) {
    $("#pload").html($("#btn-hotspot-binding").html());
  }
  getIPBinding(force);
}

function getIPBinding(force) {
  $("#binding").fadeOut(200).html("");
  $("#loading").html("Loading IP Binding...");
  $.get(session + "/get_ip_binding", function (data) {
    var list = safeJesDec(data);
    var count = 0;
    $("#binding").html("");
    if (Array.isArray(list)) {
      count = list.length;
      $.each(list, function (idx, b) {
        var id = b[".id"] || "";
        var mac = b["mac-address"] || "";
        var addr = b.address || "";
        var toAddr = b["to-address"] || "";
        var server = b.server || "all";
        var type = b.type || "regular";
        var comment = b.comment || "";
        var disabled = b.disabled === "true";

        var typeBadge = '<span class="badge" style="background:#607d8b;color:#fff;padding:2px 6px;border-radius:3px;">' + type + '</span>';
        if (type === "bypassed") {
          typeBadge = '<span class="badge" style="background:#4caf50;color:#fff;padding:2px 6px;border-radius:3px;">Bypassed</span>';
        } else if (type === "blocked") {
          typeBadge = '<span class="badge" style="background:#f44336;color:#fff;padding:2px 6px;border-radius:3px;">Blocked</span>';
        }

        var toggleBtn = disabled
          ? '<span class="text-warning pointer" title="Enable Binding" onclick="toggleIPBinding(\'' + id + '\',\'true\')"><i class="fa fa-lock"></i></span>'
          : '<span class="text-green pointer" title="Disable Binding" onclick="toggleIPBinding(\'' + id + '\',\'false\')"><i class="fa fa-unlock"></i></span>';

        var removeBtn = '<span class="text-danger pointer" title="Remove Binding" onclick="removeIPBinding(\'' + id + '\',\'' + mac + '\')"><i class="fa fa-minus-square"></i></span>';

        if (isMobile()) {
          var mobHtml = '<tr class="yes"><td><div class="box-mobile">'
            + '<b>Status:</b> ' + (disabled ? '<span class="text-danger">Disabled</span>' : '<span class="text-success">Enabled</span>') + '<br>'
            + '<b>Type:</b> ' + typeBadge + '<br>'
            + '<b>MAC:</b> ' + mac + '<br>'
            + '<b>Address:</b> ' + addr + '<br>'
            + '<b>To Address:</b> ' + toAddr + '<br>'
            + '<b>Server:</b> ' + server + '<br>'
            + '<b>Comment:</b> ' + comment + '<br>'
            + '<div class="mr-t-5">' + removeBtn + '&nbsp;&nbsp;' + toggleBtn + '</div>'
            + '</div></td></tr>';
          $("#binding").append(mobHtml);
        } else {
          var row = '<tr class="yes">'
            + '<td style="text-align:center;">' + removeBtn + '&nbsp;&nbsp;' + toggleBtn + '</td>'
            + '<td>' + mac + '</td>'
            + '<td>' + addr + '</td>'
            + '<td>' + toAddr + '</td>'
            + '<td>' + server + '</td>'
            + '<td>' + typeBadge + '</td>'
            + '<td>' + comment + '</td>'
            + '</tr>';
          $("#binding").append(row);
        }
      });
    }
    $("#binding").fadeIn(200);
    $("#total-binding").html(count + " Item" + (count > 1 ? "s" : ""));
    $("#loading").html("");
    $(".hotspot-binding").fancyTable({
      inputId: "searchBinding",
      sortColumn: 1,
      pagination: true,
      perPage: 15,
      globalSearch: true
    });
  });
}

function openAddBindingModal(mac, ip) {
  $("#binding_mac").val(mac || "");
  $("#binding_addr").val(ip || "");
  $("#binding_toaddr").val("");
  $("#binding_type").val("bypassed");
  $("#binding_comment").val("");
  if ($("#binding_server option").length <= 1) {
    $.get(session + "/get_hotspot_server", function (data) {
      var srvs = safeJesDec(data);
      if (Array.isArray(srvs)) {
        $("#binding_server").html('<option value="all">all</option>');
        $.each(srvs, function (i, s) {
          $("#binding_server").append('<option value="' + s.name + '">' + s.name + '</option>');
        });
      }
    });
  }
  $("#modal_add_binding").show();
}

function saveIPBinding() {
  var mac = $("#binding_mac").val().trim();
  var addr = $("#binding_addr").val().trim();
  var toAddr = $("#binding_toaddr").val().trim();
  var srv = $("#binding_server").val();
  var type = $("#binding_type").val();
  var comm = $("#binding_comment").val().trim();

  if (!mac && !addr) {
    alert("Please enter at least MAC Address or IP Address!");
    return;
  }

  $.ajax({
    type: "POST",
    url: "./post/post_ip_binding.php",
    data: {
      sessname: session,
      action: "add",
      mac: mac,
      address: addr,
      to_address: toAddr,
      server: srv,
      type: type,
      comment: comm
    },
    dataType: "json",
    success: function (res) {
      if (res.message === "success") {
        $("#modal_add_binding").hide();
        loadIPBinding();
      } else {
        alert("Failed to add IP Binding: " + (res.message || "Unknown error"));
      }
    }
  });
}

function toggleIPBinding(id, disabled) {
  var nextState = disabled === "true" ? "no" : "yes";
  $.ajax({
    type: "POST",
    url: "./post/post_ip_binding.php",
    data: {
      sessname: session,
      action: "toggle",
      id: id,
      disabled: nextState
    },
    dataType: "json",
    success: function (res) {
      if (res.message === "success") {
        loadIPBinding();
      } else {
        alert("Failed to update IP Binding");
      }
    }
  });
}

function removeIPBinding(id, mac) {
  if (confirm("Are you sure you want to remove IP Binding (" + (mac || id) + ")?")) {
    $.ajax({
      type: "POST",
      url: "./post/post_hotspot_remove.php",
      data: {
        sessname: session,
        where: "binding_",
        id: id
      },
      dataType: "json",
      success: function (res) {
        if (res.message === "success") {
          loadIPBinding();
        } else {
          location.reload();
        }
      }
    });
  }
}

// ------------------------------------------
// 2. Hotspot Cookies
// ------------------------------------------
function loadHotspotCookies() {
  menuActive("hotspot-cookies");
  menuNonActive("hotspot-users");
  menuNonActive("user-profiles");
  menuNonActive("hotspot-active");
  menuNonActive("hotspot-hosts");
  menuNonActive("hotspot-binding");
  if (isMobile()) {
    $("#pload").html($("#btn-hotspot-cookies").html());
  }
  getHotspotCookies();
}

function getHotspotCookies() {
  $("#cookies").fadeOut(200).html("");
  $("#loading").html("Loading Cookies...");
  $.get(session + "/get_cookies", function (data) {
    var list = safeJesDec(data);
    var count = 0;
    $("#cookies").html("");
    if (Array.isArray(list)) {
      count = list.length;
      $.each(list, function (idx, c) {
        var id = c[".id"] || "";
        var user = c.user || "";
        var mac = c["mac-address"] || "";
        var domain = c.domain || "";
        var exp = c["expires-in"] ? timeNice(c["expires-in"]) : "";
        var removeBtn = '<span class="text-danger pointer" title="Remove Cookie" onclick="removeCookie(\'' + id + '\',\'' + user + '\')"><i class="fa fa-minus-square"></i></span>';

        if (isMobile()) {
          var mobHtml = '<tr class="yes"><td><div class="box-mobile">'
            + '<b>User:</b> ' + user + '<br>'
            + '<b>MAC:</b> ' + mac + '<br>'
            + '<b>Domain:</b> ' + domain + '<br>'
            + '<b>Expires In:</b> ' + exp + '<br>'
            + '<div class="mr-t-5">' + removeBtn + '</div>'
            + '</div></td></tr>';
          $("#cookies").append(mobHtml);
        } else {
          var row = '<tr class="yes">'
            + '<td style="text-align:center;">' + removeBtn + '</td>'
            + '<td>' + user + '</td>'
            + '<td>' + mac + '</td>'
            + '<td>' + domain + '</td>'
            + '<td>' + exp + '</td>'
            + '</tr>';
          $("#cookies").append(row);
        }
      });
    }
    $("#cookies").fadeIn(200);
    $("#total-cookies").html(count + " Item" + (count > 1 ? "s" : ""));
    $("#loading").html("");
    $(".hotspot-cookies").fancyTable({
      inputId: "searchCookies",
      sortColumn: 1,
      pagination: true,
      perPage: 15,
      globalSearch: true
    });
  });
}

function removeCookie(id, user) {
  if (confirm("Are you sure you want to remove cookie for user [" + user + "]?")) {
    $.ajax({
      type: "POST",
      url: "./post/post_hotspot_remove.php",
      data: {
        sessname: session,
        where: "cookie_",
        id: id
      },
      dataType: "json",
      success: function (res) {
        if (res.message === "success") {
          loadHotspotCookies();
        } else {
          location.reload();
        }
      }
    });
  }
}

function clearAllCookies() {
  if (confirm("Are you sure you want to clear ALL hotspot cookies?")) {
    $.ajax({
      type: "POST",
      url: "./post/post_hotspot_remove.php",
      data: {
        sessname: session,
        where: "cookie_all",
        id: "all"
      },
      dataType: "json",
      success: function (res) {
        if (res.message === "success") {
          loadHotspotCookies();
        } else {
          location.reload();
        }
      }
    });
  }
}

// ------------------------------------------
// 3. DHCP Leases
// ------------------------------------------
function loadDHCPLeases() {
  $("#dhcpleases").fadeOut(200).html("");
  $("#loading").html("Loading DHCP Leases...");
  $.get(session + "/get_dhcp_leases", function (data) {
    var list = safeJesDec(data);
    var count = 0;
    $("#dhcpleases").html("");
    if (Array.isArray(list)) {
      count = list.length;
      $.each(list, function (idx, l) {
        var id = l[".id"] || "";
        var addr = l.address || "";
        var mac = l["mac-address"] || "";
        var server = l.server || "";
        var activeAddr = l["active-address"] || addr;
        var activeMac = l["active-mac-address"] || mac;
        var hostName = l["host-name"] || "";
        var status = l.status || "";
        var expires = l["expires-after"] || "";
        var isDynamic = l.dynamic === "true";

        var typeBadge = isDynamic
          ? '<b class="text-primary" title="Dynamic">D</b>'
          : '<b class="text-success" title="Static">S</b>';

        var makeStaticBtn = isDynamic
          ? '<button class="bg-btn-group pointer" title="Make Static" onclick="makeDHCPStatic(\'' + id + '\',\'' + addr + '\')"><i class="fa fa-thumb-tack"></i></button>'
          : '';

        var removeBtn = '<button class="bg-btn-group pointer text-danger" title="Remove Lease" onclick="removeDHCPLease(\'' + id + '\',\'' + addr + '\')"><i class="fa fa-minus-square"></i></button>';

        if (isMobile()) {
          var mobHtml = '<tr class="yes"><td><div class="box-mobile">'
            + '<b>Type:</b> ' + typeBadge + ' (' + (isDynamic ? 'Dynamic' : 'Static') + ')<br>'
            + '<b>Address:</b> ' + addr + '<br>'
            + '<b>MAC:</b> ' + mac + '<br>'
            + '<b>Server:</b> ' + server + '<br>'
            + '<b>Host Name:</b> ' + hostName + '<br>'
            + '<b>Status:</b> ' + status + '<br>'
            + '<b>Expires After:</b> ' + expires + '<br>'
            + '<div class="mr-t-5">' + makeStaticBtn + '&nbsp;' + removeBtn + '</div>'
            + '</div></td></tr>';
          $("#dhcpleases").append(mobHtml);
        } else {
          var row = '<tr class="yes">'
            + '<td style="text-align:center;">' + makeStaticBtn + '&nbsp;' + removeBtn + '</td>'
            + '<td style="text-align:center;">' + typeBadge + '</td>'
            + '<td>' + addr + '</td>'
            + '<td>' + mac + '</td>'
            + '<td>' + server + '</td>'
            + '<td>' + activeAddr + '</td>'
            + '<td>' + activeMac + '</td>'
            + '<td>' + hostName + '</td>'
            + '<td>' + status + '</td>'
            + '<td>' + expires + '</td>'
            + '</tr>';
          $("#dhcpleases").append(row);
        }
      });
    }
    $("#dhcpleases").fadeIn(200);
    $("#total-dhcpleases").html(count + " Item" + (count > 1 ? "s" : ""));
    $("#loading").html("");
    $(".dhcp-leases").fancyTable({
      inputId: "searchDHCPLeases",
      sortColumn: 2,
      pagination: true,
      perPage: 15,
      globalSearch: true
    });
  });
}

function makeDHCPStatic(id, ip) {
  if (confirm("Make DHCP lease static for IP [" + ip + "]?")) {
    $.ajax({
      type: "POST",
      url: "./post/post_dhcp_lease.php",
      data: {
        sessname: session,
        action: "make_static",
        id: id
      },
      dataType: "json",
      success: function (res) {
        if (res.message === "success") {
          loadDHCPLeases();
        } else {
          alert("Failed to make static: " + (res.message || "Error"));
        }
      }
    });
  }
}

function removeDHCPLease(id, ip) {
  if (confirm("Are you sure you want to remove DHCP lease [" + ip + "]?")) {
    $.ajax({
      type: "POST",
      url: "./post/post_dhcp_lease.php",
      data: {
        sessname: session,
        action: "remove",
        id: id
      },
      dataType: "json",
      success: function (res) {
        if (res.message === "success") {
          loadDHCPLeases();
        } else {
          alert("Failed to remove lease");
        }
      }
    });
  }
}

// ==========================================
// 4. Quick Print & Package Management
// ==========================================
var cachedPresets = [];
var qpColors = [
  'bg-blue', 'bg-indigo', 'bg-purple', 'bg-teal',
  'bg-green', 'bg-pink', 'bg-cyan', 'bg-yellow'
];

function formatBps(bits) {
  bits = Number(bits) || 0;
  if (bits <= 0) return "0 bps";
  var sizes = ["bps", "kbps", "Mbps", "Gbps", "Tbps"];
  var i = parseInt(Math.floor(Math.log(bits) / Math.log(1024)));
  if (i < 0) i = 0;
  if (i >= sizes.length) i = sizes.length - 1;
  return parseFloat((bits / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

function formatSchedulerInterval(str) {
  if (!str) return "-";
  return String(str)
    .replace(/w/g, "w ")
    .replace(/d/g, "d ")
    .replace(/h/g, "h ")
    .replace(/m/g, "m ")
    .replace(/s/g, "s")
    .trim();
}

function switchQpTab(tab) {
  if (tab === "grid") {
    $("#panel-qp-grid").removeClass("hide").show();
    $("#panel-qp-list").hide();
    $("#btn-tab-quick-grid, #btn-m-qp-grid").addClass("card-tab-active bg-primary").removeClass("bg-btn-group");
    $("#btn-tab-quick-list, #btn-m-qp-list").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
  } else {
    $("#panel-qp-grid").hide();
    $("#panel-qp-list").removeClass("hide").show();
    $("#btn-tab-quick-list, #btn-m-qp-list").addClass("card-tab-active bg-primary").removeClass("bg-btn-group");
    $("#btn-tab-quick-grid, #btn-m-qp-grid").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
    loadQpDropdowns();
  }
}

function loadQpDropdowns(cb) {
  var srvDone = false;
  var profDone = false;

  if ($("#qp_server option").length <= 1) {
    $.get(session + "/get_hotspot_server&f=true", function (data) {
      var srvs = safeJesDec(data);
      if (Array.isArray(srvs)) {
        $("#qp_server").html('<option value="all">all</option>');
        $.each(srvs, function (i, s) {
          if (s && s.name) {
            $("#qp_server").append('<option value="' + s.name + '">' + s.name + '</option>');
          }
        });
      }
      srvDone = true;
      if (srvDone && profDone && typeof cb === "function") cb();
    });
  } else {
    srvDone = true;
  }

  if ($("#qp_profile option").length <= 1) {
    $.get(session + "/profiles&f=true", function (data) {
      var profs = safeJesDec(data);
      if (Array.isArray(profs)) {
        $("#qp_profile, #m_qp_profile").html('<option value="">-- Select Profile --</option>');
        $.each(profs, function (i, pr) {
          if (pr && pr.name) {
            $("#qp_profile, #m_qp_profile").append('<option value="' + pr.name + '">' + pr.name + '</option>');
          }
        });
      }
      profDone = true;
      if (srvDone && profDone && typeof cb === "function") cb();
    });
  } else {
    profDone = true;
  }

  if (srvDone && profDone && typeof cb === "function") cb();
}

function onQpProfileChange(profName, isMob) {
  if (!profName) {
    $("#qp_profile_sync_info").hide();
    return;
  }
  $("#loading").html("Fetching profile details...");
  $.get(session + "/profile&name=" + encodeURIComponent(profName), function (data) {
    $("#loading").html("");
    var prof = safeJesDec(data);
    if (Array.isArray(prof) && prof[0]) {
      var onLogin = prof[0]["on-login"] || "";
      var parts = onLogin.split(",");
      var price = parts[2] ? parts[2].trim() : "0";
      var validity = parts[3] ? parts[3].trim() : "";
      var sprice = parts[4] ? parts[4].trim() : price;

      if (!isMob) {
        if (validity) $("#qp_validity").val(validity);
        if (price) $("#qp_price").val(price);
        if (sprice) $("#qp_sprice").val(sprice);
        $("#qp_profile_sync_text").html("<b>" + profName + "</b> sync &rarr; Validity: <b>" + (validity || '-') + "</b>, Price: <b>" + price + "</b>, Selling: <b>" + sprice + "</b>");
        $("#qp_profile_sync_info").fadeIn(150);
      } else {
        if (validity) $("#m_qp_validity").val(validity);
        if (price) $("#m_qp_price").val(price);
        if (sprice) $("#m_qp_sprice").val(sprice);
      }
    }
  });
}

function defQpUserl() {
  var mode = $("#qp_usrmode").val();
  if (mode === "vc") {
    $("#qp_userlength").val("4");
  } else {
    $("#qp_userlength").val("4");
  }
}

function openAddQpPreset() {
  resetQpForm();
  switchQpTab("list");
  $("#qp_package").focus();
}

function resetQpForm() {
  $("#qp_id").val("");
  $("#qp_form_title").text("Add Quick Print Package");
  $("#qp_package").val("");
  $("#qp_prefix").val("");
  $("#qp_char").val("mix");
  $("#qp_timelimit").val("");
  $("#qp_datalimit_num").val("");
  $("#qp_datalimit_unit").val("MB");
  $("#qp_validity").val("");
  $("#qp_price").val("0");
  $("#qp_sprice").val("0");
  $("#qp_comment").val("");
  $("#qp_usrmode").val("vc");
  $("#qp_userlength").val("4");
  $("#qp_profile_sync_info").hide();
}

function toggleMobileQpForm() {
  var $w = $("#m_qp_form_wrapper");
  if ($w.is(":visible")) {
    $w.slideUp(200);
    $("#m_qp_toggle_txt").text("Add New Package");
  } else {
    $w.slideDown(200);
    $("#m_qp_toggle_txt").text("Hide Package Form");
    loadQpDropdowns();
  }
}

function loadQuickPrint(force) {
  $("#quick-print-container").html("<div class='col-12 text-center pd-20'><i class='fa fa-circle-o-notch fa-spin'></i> Loading Quick Print Presets...</div>");
  $("#qp_table_body").html("<tr><td colspan='13' class='text-center'><i class='fa fa-circle-o-notch fa-spin'></i> Loading packages...</td></tr>");
  $("#loading").html("Loading Quick Print...");

  loadQpDropdowns();

  $.get(session + "/get_quick_print", function (data) {
    var presets = safeJesDec(data);
    cachedPresets = presets;
    $("#quick-print-container").html("");
    $("#qp_table_body").html("");

    var count = Array.isArray(presets) ? presets.length : 0;
    $("#total-quickprint-grid").html(count + " Package" + (count > 1 ? "s" : ""));
    $("#total-quickprint-table").html(count + " Package" + (count > 1 ? "s" : ""));

    if (!Array.isArray(presets) || presets.length === 0) {
      $("#quick-print-container").html(
        '<div class="col-12 text-center mr-t-20 pd-20">'
        + '<div style="font-size: 48px; color: #ccc; margin-bottom: 10px;"><i class="fa fa-ticket"></i></div>'
        + '<h3 style="color:#666;">Belum Ada Paket Quick Print</h3>'
        + '<p class="text-muted">Buat paket preset voucher untuk proses cetak 1-klik yang cepat dan praktis.</p>'
        + '<button class="btn bg-primary" onclick="openAddQpPreset()"><i class="fa fa-plus"></i> Tambah Paket Sekarang</button>'
        + '</div>'
      );
      $("#qp_table_body").html("<tr><td colspan='13' class='text-center text-muted'>Belum ada paket yang tersimpan.</td></tr>");
      $("#loading").html("");
      return;
    }

    $.each(presets, function (idx, p) {
      var colorClass = qpColors[idx % qpColors.length];
      var prText = (currency || "Rp") + " " + Number(p.price || 0).toLocaleString();
      var sprText = (currency || "Rp") + " " + Number(p.sprice || p.price || 0).toLocaleString();

      var dataLimitDisplay = "-";
      if (p.datalimit && p.datalimit !== "0" && p.datalimit !== "") {
        var numDl = Number(p.datalimit);
        if (!isNaN(numDl) && numDl > 0) {
          if (numDl >= 1073741824) {
            dataLimitDisplay = (numDl / 1073741824).toFixed(0) + " GB";
          } else if (numDl >= 1048576) {
            dataLimitDisplay = (numDl / 1048576).toFixed(0) + " MB";
          } else {
            dataLimitDisplay = numDl + " B";
          }
        } else {
          dataLimitDisplay = p.datalimit;
        }
      }

      // 1. Grid Card View
      var cardHtml = '<div class="col-4 mr-b-15">'
        + '<div class="box bmh-75 box-bordered ' + colorClass + '" style="border-radius:6px;position:relative;cursor:pointer;transition:transform 0.15s ease;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'none\'">'
        + '<div style="position:absolute;top:8px;right:8px;z-index:10;">'
        + '<span class="pointer text-white" title="Edit Package" onclick="event.stopPropagation();editQuickPreset(\'' + p.id + '\')"><i class="fa fa-edit"></i></span>&nbsp;&nbsp;'
        + '<span class="pointer text-white" title="Delete Package" onclick="event.stopPropagation();deleteQuickPreset(\'' + p.id + '\',\'' + p.package + '\')"><i class="fa fa-trash"></i></span>'
        + '</div>'
        + '<div class="box-group" onclick="executeQuickPrint(\'' + p.id + '\')">'
        + '<div class="box-group-icon"><i class="fa fa-print"></i></div>'
        + '<div class="box-group-area">'
        + '<h3 style="margin-top:0;font-size:16px;">Package : <b>' + p.package + '</b></h3>'
        + '<span style="font-size:12px;line-height:1.5;">'
        + 'Time Limit : <b>' + (p.timelimit || '-') + '</b> | Data Limit : <b>' + dataLimitDisplay + '</b><br>'
        + 'Validity : <b>' + (p.validity || '-') + '</b> | Price : <b>' + prText + '</b> | Selling : <b>' + sprText + '</b>'
        + '</span>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
      $("#quick-print-container").append(cardHtml);

      // 2. Table Row View
      var actionBtns = '<span class="text-primary pointer" title="Edit ' + p.package + '" onclick="editQuickPreset(\'' + p.id + '\')"><i class="fa fa-edit"></i></span>&nbsp;&nbsp;'
        + '<span class="text-danger pointer" title="Remove ' + p.package + '" onclick="deleteQuickPreset(\'' + p.id + '\',\'' + p.package + '\')"><i class="fa fa-minus-square"></i></span>';

      var tableRow = '<tr class="yes">'
        + '<td style="text-align:center;">' + actionBtns + '</td>'
        + '<td><b>' + p.package + '</b></td>'
        + '<td>' + (p.server || 'all') + '</td>'
        + '<td>' + (p.usermode === 'up' ? 'User & Pass' : 'User = Pass') + '</td>'
        + '<td>' + (p.userlength || '4') + '</td>'
        + '<td>' + (p.prefix || '-') + '</td>'
        + '<td><span class="badge bg-btn-group">' + (p.profile || 'default') + '</span></td>'
        + '<td>' + (p.timelimit || '-') + '</td>'
        + '<td>' + dataLimitDisplay + '</td>'
        + '<td>' + (p.validity || '-') + '</td>'
        + '<td>' + prText + '</td>'
        + '<td>' + sprText + '</td>'
        + '<td>' + (p.comment || '-') + '</td>'
        + '</tr>';
      $("#qp_table_body").append(tableRow);
    });

    $("#loading").html("");
    $(".quickprint-table").fancyTable({
      inputId: "searchQp",
      sortColumn: 1,
      pagination: true,
      perPage: 15,
      globalSearch: true
    });
  });
}

function editQuickPreset(id) {
  var p = cachedPresets.find(function (item) { return item.id === id; });
  if (!p) return;

  switchQpTab("list");
  $("#qp_id").val(p.id);
  $("#qp_form_title").text("Edit Quick Print Package (" + p.package + ")");
  $("#qp_package").val(p.package);
  $("#qp_server").val(p.server || "all");
  $("#qp_usrmode").val(p.usermode || "vc");
  $("#qp_userlength").val(p.userlength || "4");
  $("#qp_prefix").val(p.prefix || "");
  $("#qp_char").val(p.char || "mix");
  $("#qp_profile").val(p.profile || "default");
  $("#qp_timelimit").val(p.timelimit || "");

  var dl = p.datalimit || "";
  if (dl !== "" && dl !== "0") {
    var numDl = Number(dl);
    if (!isNaN(numDl) && numDl > 0) {
      if (numDl % 1073741824 === 0) {
        $("#qp_datalimit_num").val(numDl / 1073741824);
        $("#qp_datalimit_unit").val("GB");
      } else {
        $("#qp_datalimit_num").val((numDl / 1048576).toFixed(0));
        $("#qp_datalimit_unit").val("MB");
      }
    } else {
      $("#qp_datalimit_num").val(dl.replace(/[^0-9]/g, ""));
      $("#qp_datalimit_unit").val(dl.toUpperCase().indexOf("G") >= 0 ? "GB" : "MB");
    }
  } else {
    $("#qp_datalimit_num").val("");
  }

  $("#qp_validity").val(p.validity || "");
  $("#qp_price").val(p.price || "0");
  $("#qp_sprice").val(p.sprice || p.price || "0");
  $("#qp_comment").val(p.comment || "");

  $("#qp_profile_sync_text").html("Editing <b>" + p.package + "</b> &rarr; Profile: <b>" + p.profile + "</b>");
  $("#qp_profile_sync_info").show();
}

function saveQuickPreset() {
  var id = $("#qp_id").val();
  var pkg = $("#qp_package").val() ? $("#qp_package").val().trim() : "";
  if (!pkg && $("#m_qp_package").length) {
    pkg = $("#m_qp_package").val().trim();
  }
  if (!pkg) {
    alert("Please enter package name!");
    return;
  }

  var srv = $("#qp_server").val() || "all";
  var prof = $("#qp_profile").val() || $("#m_qp_profile").val() || "default";
  var usrmode = $("#qp_usrmode").val() || $("#m_qp_usrmode").val() || "vc";
  var userl = $("#qp_userlength").val() || "4";
  var pfx = $("#qp_prefix").val() ? $("#qp_prefix").val().trim() : "";
  var char = $("#qp_char").val() || "mix";
  var timelimit = $("#qp_timelimit").val() ? $("#qp_timelimit").val().trim() : ($("#m_qp_timelimit").val() || "");

  var datalimit = "";
  var dlNum = $("#qp_datalimit_num").val() || $("#m_qp_datalimit_num").val() || "";
  var dlUnit = $("#qp_datalimit_unit").val() || "MB";
  if (dlNum !== "" && Number(dlNum) > 0) {
    var multiplier = dlUnit === "GB" ? 1073741824 : 1048576;
    datalimit = String(Number(dlNum) * multiplier);
  }

  var validity = $("#qp_validity").val() ? $("#qp_validity").val().trim() : ($("#m_qp_validity").val() || "");
  var price = $("#qp_price").val() ? $("#qp_price").val().trim() : ($("#m_qp_price").val() || "0");
  var sprice = $("#qp_sprice").val() ? $("#qp_sprice").val().trim() : ($("#m_qp_sprice").val() || price);
  var comm = $("#qp_comment").val() ? $("#qp_comment").val().trim() : "";

  $("#loading").html("Saving package preset...");
  $.ajax({
    type: "POST",
    url: "./post/post_quick_print.php",
    data: {
      sessname: session,
      action: "save_preset",
      id: id,
      package: pkg,
      server: srv,
      profile: prof,
      usermode: usrmode,
      userlength: userl,
      prefix: pfx,
      char: char,
      timelimit: timelimit,
      datalimit: datalimit,
      validity: validity,
      price: price,
      sprice: sprice,
      comment: comm,
      userlock: "Disable"
    },
    dataType: "json",
    success: function (res) {
      $("#loading").html("");
      if (res.message === "success") {
        resetQpForm();
        switchQpTab("grid");
        loadQuickPrint();
      } else {
        alert("Failed to save preset: " + (res.message || "Error"));
      }
    },
    error: function () {
      $("#loading").html("");
      alert("Error contacting server while saving preset.");
    }
  });
}

function deleteQuickPreset(id, name) {
  if (confirm("Are you sure you want to delete preset [" + name + "]?")) {
    $("#loading").html("Deleting preset...");
    $.ajax({
      type: "POST",
      url: "./post/post_quick_print.php",
      data: {
        sessname: session,
        action: "delete_preset",
        id: id
      },
      dataType: "json",
      success: function (res) {
        $("#loading").html("");
        if (res.message === "success") {
          loadQuickPrint();
        } else {
          alert("Failed to delete preset: " + (res.message || "Error"));
        }
      },
      error: function () {
        $("#loading").html("");
        alert("Error contacting server while deleting preset.");
      }
    });
  }
}

function executeQuickPrint(id) {
  var p = cachedPresets.find(function (item) { return item.id === id; });
  if (!p) return;
  if (!confirm("Print 1 voucher for package [" + p.package + "]?")) return;

  var gencode = makeid(4);
  $("#loading").html("Generating quick voucher for " + p.package + "...");

  $.ajax({
    type: "POST",
    url: "./post/post_generate_voucher.php",
    data: {
      sessname: session,
      qty: 1,
      server: p.server || "all",
      user: p.usermode || "vc",
      userl: p.userlength || "4",
      prefix: p.prefix || "",
      char: p.char || "mix",
      profile: p.profile || "default",
      timelimit: p.timelimit || "",
      datalimit: p.datalimit || "",
      gcomment: p.comment || "",
      gencode: gencode
    },
    dataType: "json",
    success: function (res) {
      $("#loading").html("");
      if (res.message === "success") {
        var comm = p.usermode + "-" + gencode + "-" + res.data.date + "-" + (p.comment || "");
        var printUrl = session + "/print&c=" + encodeURIComponent(comm) + "&s";
        window.open(printUrl, "_blank");
      } else {
        alert("Failed to generate voucher: " + (res.data ? res.data.error : res.message));
      }
    },
    error: function () {
      $("#loading").html("");
      alert("Error contacting server while generating voucher.");
    }
  });
}

// ------------------------------------------
// 5. Vouchers (User by Profile)
// ------------------------------------------
function loadVouchersGrid() {
  $("#vouchers-container").html("<div class='col-12 text-center'><i class='fa fa-circle-o-notch fa-spin'></i> Loading Vouchers by Profile...</div>");
  $("#loading").html("Loading Vouchers...");

  $.when(
    $.get(session + "/profiles"),
    $.get(session + "/users")
  ).done(function (pData, uData) {
    var profs = safeJesDec(pData[0]);
    var users = safeJesDec(uData[0]);
    $("#vouchers-container").html("");

    var totalUsers = Array.isArray(users) ? users.length : 0;
    var profileCounts = {};
    if (Array.isArray(users)) {
      $.each(users, function (i, u) {
        var pr = u.profile || "default";
        profileCounts[pr] = (profileCounts[pr] || 0) + 1;
      });
    }

    // Card 1: All Vouchers
    var allCard = '<div class="col-4 mr-b-15">'
      + '<div class="box bmh-75 box-bordered bg-blue" style="border-radius:6px;">'
      + '<div class="box-group">'
      + '<div class="box-group-icon"><i class="fa fa-ticket"></i></div>'
      + '<div class="box-group-area">'
      + '<h3 style="margin-top:0;">Profile: All</h3>'
      + '<span>Total: <b>' + totalUsers + '</b> User' + (totalUsers > 1 ? 's' : '') + '</span><br>'
      + '<div class="mr-t-10">'
      + '<a href="' + session + '/hotspot" class="btn bg-btn-group" style="padding:4px 8px;font-size:12px;"><i class="fa fa-external-link"></i> View All</a>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>';
    $("#vouchers-container").append(allCard);

    // Profile cards
    if (Array.isArray(profs)) {
      $.each(profs, function (idx, pr) {
        var pName = pr.name;
        var pCount = profileCounts[pName] || 0;
        var colorClass = qpColors[(idx + 1) % qpColors.length];
        var sUser = pr["shared-users"] || "1";
        var rLimit = pr["rate-limit"] || "unlimited";

        var card = '<div class="col-4 mr-b-15">'
          + '<div class="box bmh-75 box-bordered ' + colorClass + '" style="border-radius:6px;">'
          + '<div class="box-group">'
          + '<div class="box-group-icon"><i class="fa fa-ticket"></i></div>'
          + '<div class="box-group-area">'
          + '<h3 style="margin-top:0;">Profile: ' + pName + '</h3>'
          + '<span>Users: <b>' + pCount + '</b> | Shared: ' + sUser + '<br>'
          + 'Rate: ' + rLimit + '</span><br>'
          + '<div class="mr-t-10">'
          + '<a href="' + session + '/hotspot" onclick="localStorage.setItem(\'' + session + '_view_prof\',\'' + pName + '\')" class="btn bg-btn-group" style="padding:4px 8px;font-size:12px;"><i class="fa fa-users"></i> View Users</a>&nbsp;'
          + '<button onclick="openGenerateForProfile(\'' + pName + '\')" class="btn bg-btn-group" style="padding:4px 8px;font-size:12px;"><i class="fa fa-ticket"></i> Generate</button>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>';
        $("#vouchers-container").append(card);
      });
    }
    $("#loading").html("");
  }).fail(function () {
    $("#loading").html("");
    $("#vouchers-container").html("<div class='col-12 text-center text-danger'>Failed to load profiles and users.</div>");
  });
}

function openGenerateForProfile(profName) {
  localStorage.setItem(session + "_gen_prof", profName || "");
  window.location.href = session + "/hotspot";
}

// ------------------------------------------
// 6. Traffic Monitor (Real-time with Highcharts)
// ------------------------------------------
var fullTrafficChart = null;
var fullTrafficTimer = null;

function initTrafficPage(force) {
  $("#loading").html("Loading interfaces...");

  $.get(session + "/get_interface", function (data) {
    var ifaces = safeJesDec(data);
    $("#traffic_iface_select").html('<option value="">-- Select Interface --</option>');

    var storedIface = localStorage.getItem(session + "_traffic_iface");
    var ifaceExists = false;

    if (Array.isArray(ifaces) && ifaces.length > 0) {
      $.each(ifaces, function (i, ifc) {
        var nm = ifc.name;
        var type = ifc.type || 'ether';
        var isSelected = (storedIface && storedIface === nm);
        if (isSelected) ifaceExists = true;
        $("#traffic_iface_select").append(
          '<option value="' + nm + '"' + (isSelected ? ' selected' : '') + '>[' + (i + 1) + '] ' + nm + ' (' + type + ')</option>'
        );
      });

      var activeIface = ifaceExists ? storedIface : ifaces[0].name;
      $("#traffic_iface_select").val(activeIface);
      localStorage.setItem(session + "_traffic_iface", activeIface);
      startTrafficMonitor(activeIface);
    } else {
      $("#traffic_iface_select").html('<option value="">No interfaces found</option>');
    }
    $("#loading").html("");
  });

  $("#traffic_iface_select").off("change").on("change", function () {
    var val = $(this).val();
    if (val) {
      localStorage.setItem(session + "_traffic_iface", val);
      startTrafficMonitor(val);
    } else {
      if (fullTrafficTimer) clearInterval(fullTrafficTimer);
    }
  });
}

function startTrafficMonitor(iface) {
  if (fullTrafficTimer) clearInterval(fullTrafficTimer);

  var activeTheme = localStorage.getItem(session + "_theme") || "light";
  if (typeof Highcharts !== "undefined") {
    if (activeTheme === "light" && typeof light !== "undefined") Highcharts.setOptions(light);
    else if (activeTheme === "dark" && typeof dark !== "undefined") Highcharts.setOptions(dark);
    else if (activeTheme === "blue" && typeof blue !== "undefined") Highcharts.setOptions(blue);
    else if (activeTheme === "green" && typeof green !== "undefined") Highcharts.setOptions(green);
    else if (activeTheme === "pink" && typeof pink !== "undefined") Highcharts.setOptions(pink);

    Highcharts.setOptions({
      global: { useUTC: false }
    });

    Highcharts.addEvent(Highcharts.Series, "afterInit", function () {
      this.symbolUnicode = {
        circle: "●",
        diamond: "♦",
        square: "■",
        triangle: "▲",
        "triangle-down": "▼"
      }[this.symbol] || "●";
    });
  }

  fullTrafficChart = new Highcharts.Chart({
    chart: {
      renderTo: "fullTrafficChart",
      animation: Highcharts.svg,
      type: "areaspline",
      events: {
        load: function () {}
      }
    },
    title: {
      text: "Interface: " + iface,
      style: { fontWeight: "bold" }
    },
    xAxis: {
      type: "datetime",
      tickPixelInterval: 150,
      maxZoom: 20 * 1000
    },
    yAxis: {
      minPadding: 0.2,
      maxPadding: 0.2,
      title: { text: null },
      labels: {
        formatter: function () {
          var bytes = this.value;
          if (bytes === 0) return "0 bps";
          var sizes = ["bps", "kbps", "Mbps", "Gbps", "Tbps"];
          var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
          if (i < 0) i = 0;
          if (i >= sizes.length) i = sizes.length - 1;
          return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
        }
      }
    },
    series: [
      { name: "Tx", data: [], marker: { symbol: "circle" } },
      { name: "Rx", data: [], marker: { symbol: "circle" } }
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        var s = [];
        $.each(this.points, function (i, point) {
          var y = point.y;
          var valFormatted = "0 bps";
          if (y > 0) {
            var sizes = ["bps", "kbps", "Mbps", "Gbps", "Tbps"];
            var idx = parseInt(Math.floor(Math.log(y) / Math.log(1024)));
            if (idx >= sizes.length) idx = sizes.length - 1;
            valFormatted = parseFloat((y / Math.pow(1024, idx)).toFixed(2)) + " " + sizes[idx];
          }
          s.push('<span style="color:' + point.series.color + '; font-size: 1.3em;">' + (point.series.symbolUnicode || '●') + '</span> <b>' + point.series.name + ':</b> ' + valFormatted);
        });
        return "<b>Mikhmon Traffic Monitor</b><br/><b>Time: </b>"
          + Highcharts.dateFormat("%H:%M:%S", new Date(this.x))
          + "<br/>" + s.join("<br/>");
      }
    }
  });

  function poll() {
    $.ajax({
      url: session + "/get_traffic&iface=" + encodeURIComponent(iface),
      dataType: "json",
      success: function (data) {
        if (data && fullTrafficChart && fullTrafficChart.series && fullTrafficChart.series.length >= 2) {
          var tx = 0, rx = 0;
          if (Array.isArray(data)) {
            tx = parseInt(data[0] && data[0].data ? data[0].data[0] : 0) || 0;
            rx = parseInt(data[1] && data[1].data ? data[1].data[0] : 0) || 0;
          } else if (typeof data === "object") {
            tx = parseInt(data.tx) || 0;
            rx = parseInt(data.rx) || 0;
          }

          var x = new Date().getTime();
          var shift = fullTrafficChart.series[0].data.length > 25;

          fullTrafficChart.series[0].addPoint([x, tx], true, shift);
          fullTrafficChart.series[1].addPoint([x, rx], true, shift);
        }
      }
    });
  }

  poll();
  fullTrafficTimer = setInterval(poll, 2000);
}

// ------------------------------------------
// 7. System Tools (Scheduler, Reboot, Shutdown, Resource)
// ------------------------------------------
function switchSystemTab(tab) {
  if (tab === "schedulers") {
    $("#panel-schedulers").removeClass("hide").show();
    $("#panel-power").hide();
    $("#panel-sysinfo").hide();
    $("#btn-tab-schedulers, #btn-m-tab-schedulers").addClass("card-tab-active bg-primary").removeClass("bg-btn-group");
    $("#btn-tab-power, #btn-m-tab-power").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
    $("#btn-tab-sysinfo, #btn-m-tab-sysinfo").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
  } else if (tab === "power") {
    $("#panel-schedulers").hide();
    $("#panel-power").removeClass("hide").show();
    $("#panel-sysinfo").hide();
    $("#btn-tab-power, #btn-m-tab-power").addClass("card-tab-active bg-primary").removeClass("bg-btn-group");
    $("#btn-tab-schedulers, #btn-m-tab-schedulers").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
    $("#btn-tab-sysinfo, #btn-m-tab-sysinfo").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
  } else if (tab === "sysinfo") {
    $("#panel-schedulers").hide();
    $("#panel-power").hide();
    $("#panel-sysinfo").removeClass("hide").show();
    $("#btn-tab-sysinfo, #btn-m-tab-sysinfo").addClass("card-tab-active bg-primary").removeClass("bg-btn-group");
    $("#btn-tab-schedulers, #btn-m-tab-schedulers").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
    $("#btn-tab-power, #btn-m-tab-power").removeClass("card-tab-active bg-primary").addClass("bg-btn-group");
    loadSystemResource();
  }
}

function loadSchedulers(force) {
  $("#schedulers").fadeOut(150).html("");
  $("#loading").html("Loading Schedulers...");
  $("#fr-schedulers").addClass("fa-spin");

  $.get(session + "/get_schedulers", function (data) {
    $("#fr-schedulers").removeClass("fa-spin");
    var list = safeJesDec(data);
    var count = 0;
    $("#schedulers").html("");

    if (Array.isArray(list)) {
      count = list.length;
      $.each(list, function (idx, s) {
        var id = s[".id"] || "";
        var name = s.name || "";
        var startD = s["start-date"] || "";
        var startT = s["start-time"] || "";
        var interval = formatSchedulerInterval(s.interval || "");
        var nextRun = s["next-run"] || "";
        var runCount = s["run-count"] || "0";
        var comment = s.comment || "";
        var disabled = s.disabled === "true";

        var toggleBtn = disabled
          ? '<span class="text-warning pointer" title="Enable Scheduler ' + name + '" onclick="toggleScheduler(\'' + id + '\',\'true\')"><i class="fa fa-lock" style="font-size:16px;"></i></span>'
          : '<span class="text-green pointer" title="Disable Scheduler ' + name + '" onclick="toggleScheduler(\'' + id + '\',\'false\')"><i class="fa fa-unlock" style="font-size:16px;"></i></span>';

        var removeBtn = '<span class="text-danger pointer" title="Remove ' + name + '" onclick="removeScheduler(\'' + id + '\',\'' + name + '\')"><i class="fa fa-minus-square" style="font-size:16px;"></i></span>';

        if (isMobile()) {
          var mobHtml = '<tr class="yes"><td><div class="box-mobile" style="margin-bottom:8px;">'
            + '<div style="float:right;">' + removeBtn + '&nbsp;&nbsp;' + toggleBtn + '</div>'
            + '<b>' + name + '</b><br>'
            + '<small>Status: ' + (disabled ? '<span class="text-danger font-bold">Disabled</span>' : '<span class="text-green font-bold">Active</span>') + '</small><br>'
            + '<small>Interval: <b>' + interval + '</b> | Next: ' + nextRun + '</small><br>'
            + '<small>Runs: ' + runCount + ' | Comment: ' + (comment || '-') + '</small>'
            + '</div></td></tr>';
          $("#schedulers").append(mobHtml);
        } else {
          var row = '<tr class="yes">'
            + '<td style="text-align:center;">' + removeBtn + '&nbsp;&nbsp;&nbsp;' + toggleBtn + '</td>'
            + '<td><b>' + name + '</b></td>'
            + '<td>' + startD + '</td>'
            + '<td>' + startT + '</td>'
            + '<td>' + interval + '</td>'
            + '<td>' + nextRun + '</td>'
            + '<td>' + runCount + '</td>'
            + '<td>' + (comment || '-') + '</td>'
            + '</tr>';
          $("#schedulers").append(row);
        }
      });
    }

    $("#schedulers").fadeIn(150);
    $("#total-schedulers").html(count + " Item" + (count > 1 ? "s" : ""));
    $("#loading").html("");

    $(".system-schedulers").fancyTable({
      inputId: "searchSchedulers",
      sortColumn: 1,
      pagination: true,
      perPage: 15,
      globalSearch: true
    });
  });
}

function toggleScheduler(id, disabled) {
  var nextState = disabled === "true" ? "no" : "yes";
  $("#loading").html("Updating scheduler...");
  $.ajax({
    type: "POST",
    url: "./post/post_scheduler.php",
    data: {
      sessname: session,
      action: "toggle",
      id: id,
      disabled: nextState
    },
    dataType: "json",
    success: function (res) {
      $("#loading").html("");
      if (res.message === "success") {
        loadSchedulers();
      } else {
        alert("Failed to toggle scheduler: " + (res.message || "Error"));
      }
    },
    error: function () {
      $("#loading").html("");
      alert("Error contacting server while toggling scheduler.");
    }
  });
}

function removeScheduler(id, name) {
  if (confirm("Are you sure you want to remove scheduler [" + name + "]?")) {
    $("#loading").html("Removing scheduler...");
    $.ajax({
      type: "POST",
      url: "./post/post_scheduler.php",
      data: {
        sessname: session,
        action: "remove",
        id: id
      },
      dataType: "json",
      success: function (res) {
        $("#loading").html("");
        if (res.message === "success") {
          loadSchedulers();
        } else {
          alert("Failed to remove scheduler: " + (res.message || "Error"));
        }
      },
      error: function () {
        $("#loading").html("");
        alert("Error contacting server while removing scheduler.");
      }
    });
  }
}

function loadSystemResource() {
  $("#sysinfo_container").html("<div class='col-12 text-center pd-20'><i class='fa fa-circle-o-notch fa-spin'></i> Loading System Resources...</div>");
  $("#loading").html("Loading system resources...");

  $.get(session + "/get_sys_resource", function (data) {
    $("#loading").html("");
    var res = safeJesDec(data);
    var r = null;
    if (res && typeof res === "object") {
      if (res.resource && typeof res.resource === "object") {
        r = res.resource;
      } else if (Array.isArray(res) && res.length > 0) {
        r = res[0];
      } else if (!Array.isArray(res)) {
        r = res;
      }
    }

    if (!r || typeof r !== "object") {
      $("#sysinfo_container").html("<div class='col-12 text-center text-danger pd-20'><i class='fa fa-exclamation-triangle'></i> Failed to load system resources.</div>");
      return;
    }

    var uptime = r["uptime"] || "-";
    var version = r["version"] || "-";
    var platform = r["platform"] || "MikroTik";
    var boardName = (res && res.model) || r["board-name"] || "-";
    var identity = (res && res.identity) ? " (" + res.identity + ")" : "";
    var arch = r["architecture-name"] || "-";
    var cpu = r["cpu"] || "-";
    var cpuCount = r["cpu-count"] || "1";
    var cpuFreq = r["cpu-frequency"] ? r["cpu-frequency"] + " MHz" : "-";
    var cpuLoad = parseInt(r["cpu-load"]) || 0;

    var totalMem = parseInt(r["total-memory"]) || 0;
    var freeMem = parseInt(r["free-memory"]) || 0;
    var usedMem = Math.max(0, totalMem - freeMem);
    var memPct = totalMem > 0 ? Math.round((usedMem / totalMem) * 100) : 0;

    var totalHdd = parseInt(r["total-hdd-space"]) || 0;
    var freeHdd = parseInt(r["free-hdd-space"]) || 0;
    var usedHdd = Math.max(0, totalHdd - freeHdd);
    var hddPct = totalHdd > 0 ? Math.round((usedHdd / totalHdd) * 100) : 0;
    var badBlocks = r["bad-blocks"] || "0%";

    var html = '<div class="col-6 col-m-12 mr-b-15">'
      + '<div class="card box-bordered pd-15">'
      + '<h4 style="margin:0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom:5px;"><i class="fa fa-server text-primary"></i> Router Board &amp; OS</h4>'
      + '<table class="table" style="font-size:13px; margin:0;">'
      + '<tr><td style="width:40%;"><b>Board / Identity:</b></td><td><b>' + boardName + '</b>' + identity + '</td></tr>'
      + '<tr><td><b>Architecture:</b></td><td>' + arch + ' (' + platform + ')</td></tr>'
      + '<tr><td><b>RouterOS Version:</b></td><td><span class="badge bg-primary">' + version + '</span></td></tr>'
      + '<tr><td><b>Uptime:</b></td><td><b>' + uptime + '</b></td></tr>'
      + '</table>'
      + '</div>'
      + '</div>'

      + '<div class="col-6 col-m-12 mr-b-15">'
      + '<div class="card box-bordered pd-15">'
      + '<h4 style="margin:0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom:5px;"><i class="fa fa-microchip text-warning"></i> CPU Resource</h4>'
      + '<table class="table" style="font-size:13px; margin:0;">'
      + '<tr><td style="width:40%;"><b>CPU Model:</b></td><td>' + cpu + ' (' + cpuCount + ' core' + (cpuCount > 1 ? 's' : '') + ')</td></tr>'
      + '<tr><td><b>Frequency:</b></td><td>' + cpuFreq + '</td></tr>'
      + '<tr><td><b>CPU Load:</b></td><td>'
      + '<b>' + cpuLoad + '%</b>'
      + '<div style="background:#e0e0e0; border-radius:3px; height:8px; overflow:hidden; margin-top:4px;">'
      + '<div style="background:' + (cpuLoad > 80 ? '#f44336' : (cpuLoad > 50 ? '#ff9800' : '#4caf50')) + '; width:' + cpuLoad + '%; height:100%;"></div>'
      + '</div>'
      + '</td></tr>'
      + '</table>'
      + '</div>'
      + '</div>'

      + '<div class="col-6 col-m-12 mr-b-15">'
      + '<div class="card box-bordered pd-15">'
      + '<h4 style="margin:0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom:5px;"><i class="fa fa-tasks text-teal"></i> Memory (RAM)</h4>'
      + '<table class="table" style="font-size:13px; margin:0;">'
      + '<tr><td style="width:40%;"><b>Usage:</b></td><td><b>' + formatBytes(usedMem) + ' / ' + formatBytes(totalMem) + ' (' + memPct + '%)</b></td></tr>'
      + '<tr><td><b>Free Memory:</b></td><td>' + formatBytes(freeMem) + '</td></tr>'
      + '<tr><td colspan=\"2\">'
      + '<div style="background:#e0e0e0; border-radius:3px; height:10px; overflow:hidden;">'
      + '<div style="background:' + (memPct > 85 ? '#f44336' : '#009688') + '; width:' + memPct + '%; height:100%;"></div>'
      + '</div>'
      + '</td></tr>'
      + '</table>'
      + '</div>'
      + '</div>'

      + '<div class="col-6 col-m-12 mr-b-15">'
      + '<div class="card box-bordered pd-15">'
      + '<h4 style="margin:0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom:5px;"><i class="fa fa-hdd-o text-indigo"></i> Storage (HDD / NAND)</h4>'
      + '<table class="table" style="font-size:13px; margin:0;">'
      + '<tr><td style="width:40%;"><b>Usage:</b></td><td><b>' + formatBytes(usedHdd) + ' / ' + formatBytes(totalHdd) + ' (' + hddPct + '%)</b></td></tr>'
      + '<tr><td><b>Free HDD:</b></td><td>' + formatBytes(freeHdd) + ' | Bad Blocks: ' + badBlocks + '</td></tr>'
      + '<tr><td colspan=\"2\">'
      + '<div style="background:#e0e0e0; border-radius:3px; height:10px; overflow:hidden;">'
      + '<div style="background:' + (hddPct > 85 ? '#f44336' : '#3f51b5') + '; width:' + hddPct + '%; height:100%;"></div>'
      + '</div>'
      + '</td></tr>'
      + '</table>'
      + '</div>'
      + '</div>';

    $("#sysinfo_container").html(html);
  });
}

function confirmRouterPower(action) {
  var actTitle = action === "reboot" ? "REBOOT" : "SHUTDOWN";
  var promptMsg = "PERINGATAN: Apakah Anda yakin ingin melakukan " + actTitle + " pada router MikroTik?";
  if (confirm(promptMsg)) {
    if (confirm("Konfirmasi Terakhir: Router akan segera di-" + action + ". Semua koneksi aktif akan terputus. Lanjutkan?")) {
      $("#loading").html("Executing " + action + "...");
      $.ajax({
        type: "POST",
        url: "./post/post_router_power.php",
        data: {
          sessname: session,
          action: action
        },
        dataType: "json",
        success: function (res) {
          alert("Perintah " + actTitle + " berhasil dikirimkan ke router.");
          window.location.href = session;
        },
        error: function () {
          alert("Perintah " + actTitle + " telah dikirim. Router sedang memulai proses.");
          window.location.href = session;
        }
      });
    }
  }
}

// ------------------------------------------
// 8. Export Users to RouterOS RSC Script & CSV
// ------------------------------------------
function exportUsersRSC() {
  var prof = $("#select-profile").val() || "";
  var comm = $("#select-comment").val() || "";
  var url = session + "/export_users&export=rsc&prof=" + encodeURIComponent(prof) + "&comm=" + encodeURIComponent(comm);
  window.open(url, "_blank");
}
function exportUsersCSV() {
  var prof = $("#select-profile").val() || "";
  var comm = $("#select-comment").val() || "";
  var url = session + "/export_users&export=csv&prof=" + encodeURIComponent(prof) + "&comm=" + encodeURIComponent(comm);
  window.open(url, "_blank");
}

// ------------------------------------------
// 9. Resume Sales Report & Chart
// ------------------------------------------
function showReportTab() {
  $("#selling-report").removeClass("hide").show();
  $("#report-resume, #report-resume-m").addClass("hide").hide();
  $("#btn-selling-report, #btn-selling-report-m").addClass("active");
  $("#btn-report-resume, #btn-report-resume-m").removeClass("active");
}

function loadReportResume() {
  $("#selling-report").addClass("hide").hide();
  $("#report-resume, #report-resume-m").removeClass("hide").show();
  $("#btn-selling-report, #btn-selling-report-m").removeClass("active");
  $("#btn-report-resume, #btn-report-resume-m").addClass("active");
  renderReportResumeChart();
}

function renderReportResumeChart() {
  var rows = $("#report tr.yes");
  var monthName = ($("#month").val() || "").capitalize();
  var year = $("#year").val() || (new Date()).getFullYear();
  var curr = (typeof currency !== "undefined" && currency) ? currency : (localStorage.getItem(session + "_curr") || "");

  var salesByDay = {};
  var vcrByDay = {};
  var totalSales = 0;
  var totalVcr = 0;

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var priceText = $(row).find("td.text-right span").text();
    var price = parseFloat(priceText.replace(/[^0-9.-]+/g, "")) || 0;
    
    var className = row.className || "";
    var m = className.match(/[a-z]{3}(\d{2})\d{4}/i);
    var dayStr = "";
    if (m && m[1]) {
      dayStr = m[1];
    } else {
      var text = $(row).text();
      var m2 = text.match(/[a-z]{3}\/(\d{2})\/\d{4}/i);
      if (m2 && m2[1]) {
        dayStr = m2[1];
      }
    }

    if (dayStr) {
      salesByDay[dayStr] = (salesByDay[dayStr] || 0) + price;
      vcrByDay[dayStr] = (vcrByDay[dayStr] || 0) + 1;
    }
    totalSales += price;
    totalVcr += 1;
  }

  var activeDays = Object.keys(salesByDay).length;
  var avgSales = activeDays > 0 ? Math.round(totalSales / activeDays) : 0;

  var fmtTotal = typeof priceFormat === "function" ? curr + " " + priceFormat(totalSales) : curr + " " + totalSales;
  var fmtAvg = typeof priceFormat === "function" ? curr + " " + priceFormat(avgSales) : curr + " " + avgSales;

  $("#resume-total-sales, #resume-total-sales-m").text(fmtTotal);
  $("#resume-total-vcr, #resume-total-vcr-m").text(totalVcr + " Vouchers");
  $("#resume-avg-sales, #resume-avg-sales-m").text(fmtAvg);

  var mIndex = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"].indexOf(($("#month").val() || "").toLowerCase());
  var daysCount = 31;
  if (mIndex >= 0) {
    daysCount = new Date(Number(year), mIndex + 1, 0).getDate();
  }

  var chartCategories = [];
  var chartSeriesData = [];

  for (var d = 1; d <= daysCount; d++) {
    var dStr = d < 10 ? "0" + d : "" + d;
    var daySales = salesByDay[dStr] || 0;
    var dayVcr = vcrByDay[dStr] || 0;
    chartCategories.push(dStr);
    chartSeriesData.push({
      y: daySales,
      vcr: dayVcr,
      name: dStr + " " + monthName
    });
  }

  var containerId = isMobile() ? "container-m" : "container";
  if (!document.getElementById(containerId)) {
    containerId = document.getElementById("container") ? "container" : "container-m";
  }

  if (typeof Highcharts !== "undefined" && document.getElementById(containerId)) {
    Highcharts.chart(containerId, {
      chart: {
        height: isMobile() ? 350 : 450,
        type: "area"
      },
      title: {
        text: "Selling Report " + monthName + " " + year
      },
      subtitle: {
        text: "Total Sales: " + fmtTotal + " (" + totalVcr + " Vouchers)"
      },
      xAxis: {
        categories: chartCategories,
        tickInterval: 1
      },
      yAxis: {
        title: {
          text: "Total Sales (" + curr + ")"
        },
        min: 0
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          color: "#20a8d8",
          fillOpacity: 0.3
        }
      },
      series: [{
        name: "Sales",
        data: chartSeriesData
      }],
      tooltip: {
        formatter: function () {
          var vCount = this.point.vcr || 0;
          var val = typeof priceFormat === "function" ? curr + " " + priceFormat(this.y) : curr + " " + this.y;
          return "<b>" + this.x + " " + monthName + " " + year + "</b><br/>" +
                 "Sales: <b>" + val + "</b><br/>" +
                 "Vouchers: <b>" + vCount + "</b>";
        }
      }
    });
  }
}

