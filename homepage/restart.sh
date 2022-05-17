#!/bin/bash

#Stop hostapd
sudo service hostapd stop

#Stop udhcpd
sudo service udhcpd stop

#Start hostapd
sudo service hostapd start

#Start udhcpd
sudo service udhcpd start
