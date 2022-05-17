from flask import Flask, render_template, request, redirect, jsonify
import os
import subprocess

app = Flask(__name__)


commands = {"switch_to_tor": "sh /usr/local/scripts/switch_tor.sh", "switch_to_regular": "sh /usr/local/scripts/switch_regular.sh", "restart_services": "sh restart.sh", "reboot_pi": "reboot"}

CONFIG_FILE_NAME = "/etc/hostapd/hostapd.conf"

def get_config_entries():
	entries = {}
	lines = open(CONFIG_FILE_NAME, "r").readlines()
	for line in lines:
		segments = line.split("=")
		entries[segments[0]] = segments[1].strip()
	return entries

@app.route("/")
#@basic_auth.required
def index():
	return render_template("index.html")

@app.route("/guide")
def guide():
	return render_template("guide.html")

@app.route("/getStatus")
def status():
	result = subprocess.run(["sudo", "systemctl", "is-active", "tor"], stdout=subprocess.PIPE)
	stat = result.stdout[:-1]
	return jsonify({"status": stat})

@app.route("/cmd/<string:cmd>")
def launch_command(cmd):
	os.system("sudo {}".format(commands[cmd]))
	return redirect("/")

@app.route("/getConfigs")
def getConfigs():
	entries = get_config_entries()
	return jsonify({"ssid": entries["ssid"], "passphrase": entries["wpa_passphrase"]})

@app.route("/updateConfigs", methods=["POST"])
def updateConfigs():
	params = request.get_json()
	print(params)
	entries = get_config_entries()
	entries["ssid"] = params["ssid"]
	entries["wpa_passphrase"] = params["passphrase"]
	open(CONFIG_FILE_NAME, "w").writelines(["{}={}\n".format(k, v) for k, v in entries.items()])
	return "ok"


if __name__ == "__main__":
	app.run(threaded=True, host="0.0.0.0")
