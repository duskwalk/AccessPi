#!/bin/bash

#Stop OpenVPN
echo "Stopping OpenVPN"
sudo service openvpn stop

#Flush iptables
echo "Flushing iptables"
iptables -F
iptables -t nat -F
echo "Restoring iptables.ipv4.tor.nat"
iptables-restore /etc/iptables.ipv4.tor.nat
sudo service netfilter-persistent save

#Start Tor
echo "Starting the Tor service"
sudo service tor restart
