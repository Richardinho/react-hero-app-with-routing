
##### Configuring routes
Broadly speaking, React and Angulars routing system behave in similar ways.
That is, it is largely possible to imitate the behaviour of an Angular app using React.
The way they are implemented is however significantly different.
Angular employs what is sometimes called 'static routing'. 
This means that the routes are defined in a configuration file that runs at start up time. 
React, on the other hand, uses 'dynamic routing'. 
   
//  todo: show examples

In dynamic routing, there is no config file: Routes are React components with a some special functionality - i.e. 
the ability to respond to URL state changes. 
Because they are React components, they can be configured dynamically at runtime. 
This provides some flexibility not granted by Angular's router, but it also, as we will see, presents some difficulties of its own.

Conceptually, dynamic routing would seem preferable to static routing. With it you can define routes in response to the runtime environments and events that occur within it. 

Conceptually, dynamic routing would seem preferable to static routing so that an application is able to respond to changes in its environment.
For example, dynamic routing can be used in conjunction with media queries to allow components be mounted in response to viewport size changes.

On the other hand, Angular's routing system is more powerful than React's in some significant ways (as we shall see), but whether this is down to some fundamental difference between the two systems or a deficiency in React's implementation is open to question. As React's router evolves over time, we will find out the answer to this question.
It does seem to me that in static routing, where routing information is centralised, gives the app more control when making routing decisions than in dynamic routing where routing information is encapsulated within components.


#### Forms



### Parameters
Parameters are the means of encapsulating data within the URL. When the URL is navigated to, this data can be passed to the component or components associated with that route. Since static data is not so useful, there are various ways of making the data variable.
Route parameters are where the data is part of the path itself. A part of parts of the route are defined to be parameters which can take any input and the route will still match.

### Redirects


#### Animations

### Styling active links  

### Handling dead links

#### Preloading
Lazy loading and preloading are not integrated into React's router but they can be implemented when using React in conjunction with the code splitting features of Webpack.The React router documentation gives a good example of lazy loading and preloading using the bundle-loader Webpack loader.



