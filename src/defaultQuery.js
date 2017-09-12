export const defaultQuery = `MATCH (n)-[r:LINKS_TO]-(f)
WHERE f.gistId = "8a173cfcb9171627c7f1"
MATCH (n)-[:LINKS_TO]-()-[:LINKS_TO]-(fof)
RETURN n, fof, f`;

// "MATCH(n)-[:LINKS_TO]-(m) WHERE n.user =~ '.*enjalot.*'RETURN n, m"