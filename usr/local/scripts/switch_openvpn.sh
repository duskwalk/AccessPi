#!/bin/bash

#URL from bash arguments
url=$1
echo "URL: $url"

#Stop Tor
echo "Stopping Tor"
sudo service tor stop

#Flush iptables
iptables -F
iptables -t nat -F
echo "Restoring iptables.ipv4.vpn.nat"
iptables-restore /etc/iptables.ipv4.vpn.nat
sudo netfilter-persistent save

#Start OpenVPN
echo "Starting the OpenVPN service"
sudo service openvpn restart
