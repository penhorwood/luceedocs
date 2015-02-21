# cfindex


Populates collections with indexed data. The cfindex and cfsearch tags encapsulate the
  indexing and searching utilities. Collections can be populated from text files in a directory
  you specify, or from a query generated by a query. Before you can populate a collection,
  you must create the collection using either the cfcollection tag or the Railo Administrator. Use
  cfsearch to search collections you populate with cfindex.

---
## Body
prohibited

## Example
```
<cfindex
 action="delete|list|purge|refresh|update"
 [body="string"]
 [category="string"]
 [categorytree="string"]
 collection="string"
 [custom1="string"]
 [custom2="string"]
 [custom3="string"]
 [custom4="string"]
 [extensions="string"]
 [external="boolean"]
 [key="string"]
 [language="string"]
 [name="string"]
 [prefix="string"]
 [query="string"]
 [recurse="boolean"]
 [status="string"]
 [throwontimeout="boolean"]
 [timeout="number"]
 [title="string"]
 [type="string"]
 [urlpath="string"]
>
```
## Attributes