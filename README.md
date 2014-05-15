#ngGplaces

An [Angularjs](http://angularjs.org/) module that is place box of google map.

##Dependency

* angularjs
* google map
* jquery

##Install

```
bower install ngGplaces
```

##Usage

```html
<input type="gplaces" placeholder="My Placeholder" ng-model="test" ng-select="placeChanged(place)" ng-options="opts" />
```

```js
$scope.opts = {
  types: ['(cities)']
};

$scope.placeChanged = function(place) {
  console.log('GOOGLE PLACE OBJECT:', place);
};
```

## Author

**Leonardo Bispo de Oliveira** (http://github.com/leobispo)

## Credits

google places autocomplete https://developers.google.com/maps/documentation/javascript/places

## Copyright and license

    The MIT License

  Copyright (c) 2014 Leonardo Bispo de Oliveira

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
