SET TIMING ON;

SELECT Domain, GlobalRank, TldRank, PrevGlobalRank, PrevTldRank
FROM MAJESTIC
WHERE Domain='wikipedia.org';

SELECT Domain, GlobalRank, TldRank, PrevGlobalRank, PrevTldRank
FROM MAJESTIC_INDEX1
WHERE Domain='wikipedia.org';

SELECT Domain, GlobalRank, TldRank, PrevGlobalRank, PrevTldRank
FROM MAJESTIC_INDEX2
WHERE Domain='wikipedia.org';

SELECT Domain, GlobalRank, TldRank, PrevGlobalRank, PrevTldRank
FROM MAJESTIC_INDEX3
WHERE Domain='wikipedia.org';

SET TIMING OFF;