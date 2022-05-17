#!/bin/bash

#Stop OpenVPN
echo "Stopping OpenVPN"
sudo service openvpn stop

#Stop Tor
echo "Stopping Tor"
sudo service tor stop

#Flush iptables
echo "Flushing iptables"
iptables -F
iptables -t nat -F
echo "Restoring iptables.ipv4.nat"
iptables-restore /etc/iptables.ipv4.nat
sudo netfilter-persistent save
