'use strict';
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

    if (element[0].addEventListener)
      element[0].addEventListener = wrapper;
    else if (element[0].attachEvent)
      element[0].attachEvent = wrapper;

    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
      var place = scope.gPlace.getPlace();
      if (place && place.address_components) {
        if (angular.isFunction(scope.ngSelect))
          scope.ngSelect({place : place});

        scope.$apply(function() {
          ctrl.$setViewValue(element.val());
        });
      }
    });

    ctrl.$render = function () {
      element.val(ctrl.$viewValue);
    };

    element.on("$destroy", function() {
      var obj = scope.gPlace.gm_accessors_.place;

      $.each(Object.keys(obj), function(i, key) {
        if(typeof(obj[key]) == "object" && obj[key].hasOwnProperty("gm_accessors_")) {
          obj = obj[key].gm_accessors_.input[key];
          return;
        }
      });

      $.each(Object.keys(obj), function(i, key) {
        if (typeof(obj[key]) == "object") {
          if ($(obj[key]).hasClass("pac-container")) {
            obj = obj[key];
            $(obj).remove();
            return;
          }
        }
      });
    });

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
      ngSelect: '&'
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