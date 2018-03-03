#### Resolvers
A *resolver* is a type of guard that will attempt to retrieve data, usually from the server, and only allow the component to be rendered if the ddata is successfully retrieved. This means that when a fetch for data fails, there wont be the unsightly flash of an empty page.
Angular has this capability out of the box. In React you need to implement it yourself.


