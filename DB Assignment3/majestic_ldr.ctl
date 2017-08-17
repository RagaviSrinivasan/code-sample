OPTIONS (SKIP=1)
LOAD DATA
INFILE './majestic_million.csv'
TRUNCATE INTO TABLE MAJESTIC
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
TRAILING NULLCOLS
( GlobalRank, TldRank, Domain, TLD, RefSubNets, RefIPs, IDN_Domain, IDN_TLD, PrevGlobalRank, PrevTldRank, PrevRefSubNets, PrevRefIPs)