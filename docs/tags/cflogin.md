# cflogin


A container for user login and authentication code.
		Railo runs the code in this tag if a user is not already logged in.
		You put code in the tag that authenticates the user and identifies the user with a set of roles. Used with cfloginuser tag.

---
## Body
required

## Example
```
<cflogin
 [applicationtoken="string"]
 [cookiedomain="string"]
 [idletimeout="number"]
> 
 </cflogin>
```
## Attributes
