/*!
 The MIT License

 Copyright (c) 2014 Leonardo Bispo de Oliveira

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 https://github.com/leobispo/angular-gplaces
 */

angular.module( 'ngGplaces', []).directive('input', function() {
    var link = function(scope, element, attr, ctrl) {
        var addListener = element[0].addEventListener || element[0].attachEvent;
        var wrapper = function(type, listener) {
            if (type === 'keydown') {
                var orig = listener;
                listener = function (event) {
                    if ($('.pac-item-selected').length <= 0)
                        if (event.which === 13 || event.which === 9)
                            orig.apply(element[0], [$.Event('keydown', { keyCode : 40, which : 40 })]);

                    orig.apply(element[0], [event]);
                };
            }
            addListener.apply(element[0], [type, listener]);
        };

        if (element[0].addEventListener)  {
            element[0].addEventListener = wrapper;
        }
        else if (element[0].attachEvent) {
            element[0].attachEvent = wrapper;
        }

        scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
            var place = scope.gPlace.getPlace();
            if (place && place.address_components) {
                if (angular.isFunction(scope.ngPlaceSelected)) {
                    place.displayAddress = element.val();
                    scope.ngPlaceSelected({place : place});
                }
                scope.$apply(function() {
                    ctrl.$setViewValue(element.val());
                });
            } else {
                if (angular.isFunction(scope.ngPlaceError)) {
                    scope.ngPlaceError({place : null});
                }
            }
        });

        ctrl.$render = function () {
            element.val(ctrl.$viewValue);
        };

        scope.$watchCollection('ngOptions', function () {
            var opts = scope.ngOptions;
            if (opts) {
                scope.gPlace.setTypes(opts.types || []);
                scope.gPlace.setBounds(opts.bounds || null);
                scope.gPlace.setComponentRestrictions(opts.restrictions || null);
            }
        });
    };

    return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
            ngModel: '=',
            ngOptions: '=',
            ngPlaceSelected: '&',
            ngPlaceError: '&'
        },
        compile: function(element, attr) {
            if (angular.lowercase(attr.type) === 'gplaces') {
                attr.type = 'text';
                return function(scope, element, attr, ctrl) {
                    if (ctrl)
                        link(scope, element, attr, ctrl);
                };
            }
        }
    };
});
