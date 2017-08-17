#!/bin/bash

echo -n "Enter your oracle username: "
read username

echo -n "Enter your oracle password: "
read password

echo -n "Username: $username  Password: $password"

echo -n "Loading data into MAJESTIC table....."
echo "Time taken to load data into MAJESTIC table: "

time /opt/oracle/app/csoracle/product/12.1.0/dbhome_1/bin/sqlldr userid=$username/$password control=majestic_ldr.ctl

echo -n "Pausing for 20 seconds before loading data into next table......"
sleep 20

echo -n "Loading data into MAJESTIC_INDEX1 table....."
echo "Time taken to load data into MAJESTIC_INDEX1 table: "

time /opt/oracle/app/csoracle/product/12.1.0/dbhome_1/bin/sqlldr userid=$username/$password control=majestic_index1_ldr.ctl

echo -n "Pausing for 20 seconds before loading data into next table......"
sleep 20

echo -n "Loading data into MAJESTIC_INDEX2 table....."
echo "Time taken to load data into MAJESTIC_INDEX2 table: "

time /opt/oracle/app/csoracle/product/12.1.0/dbhome_1/bin/sqlldr userid=$username/$password control=majestic_index2_ldr.ctl

echo -n "Pausing for 20 seconds before loading data into next table......"
sleep 20

echo -n "Loading data into MAJESTIC_INDEX3 table....."
echo -n "Time taken to load data into MAJESTIC_INDEX3 table: "

time /opt/oracle/app/csoracle/product/12.1.0/dbhome_1/bin/sqlldr userid=$username/$password control=majestic_index3_ldr.ctl
