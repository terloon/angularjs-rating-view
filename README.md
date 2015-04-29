# angularjs-rating-view
Rating icon widget using Font Awesome.

This will display rating icons according to the rating value using a font
awesome icon. Ergo, font awesome is required for this to work.

```
<div rating="1" max="4" step="0.1"></div>
```

* **rating** - The rating value to represent.

* **max** - The max rating possible.

* **step** - The minimum step increment that will be represented. For example, if this is set to 0.25 and the rating value is 0.45, it will round to 0.5.

An example can be seen at:
http://gamecodemonkey.com/angular/rating-view/