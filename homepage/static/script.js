function settings() {
    var xmlhttp, myObj;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://192.168.1.110:5000/getConfigs", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            document.getElementById("text_ssid").value = myObj.ssid;
            document.getElementById("text_pass").value = myObj.passphrase;
        }
    };
};

function update() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://192.168.1.110:5000/updateConfigs", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    if (document.getElementById("new_ssid").value == "") {
        document.getElementById("new_ssid").value = document.getElementById("text_ssid").value;
    }
    if (document.getElementById("new_pass").value == "") {
        document.getElementById("new_pass").value = document.getElementById("text_pass").value;
    }
    if (document.getElementById("repeat_pass").value == "") {
        document.getElementById("repeat_pass").value = document.getElementById("new_pass").value;
    }

    if (document.getElementById("new_pass").value == document.getElementById("repeat_pass").value) {
        var data = JSON.stringify({ "ssid": document.getElementById("new_ssid").value, "passphrase": document.getElementById("new_pass").value });
        xmlhttp.send(data);
        document.getElementById("new_ssid").value = "";
        document.getElementById("new_pass").value = "";
        document.getElementById("repeat_pass").value = "";
        location.reload();
    } else {
        M.toast({ html: 'Password do not match' });
    }
};

function status() {
    var xmlhttp, myObj;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://192.168.1.110:5000/getStatus", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            if (myObj.status == "active") {
                document.getElementById("status").value = "Tor mode";
                document.getElementById("status").style.color = "#4527a0";
                document.getElementById("status").style.fontSize = "24px";
                document.getElementById("status").style.textAlign = "center";
            } else {
                document.getElementById("status").value = "Regular mode";
                document.getElementById("status").style.color = "#ff8f00";
                document.getElementById("status").style.fontSize = "24px";
                document.getElementById("status").style.textAlign = "center";
            }
        }
    }
};