(function() {
    angular.module('raing-widget', [])
        .directive('rating', function($window, $interval) {
            return {
                restrict: 'A',
                scope: {
                    rating: '=',
                    step: '=',
                    max: '=?',
                    icon: '=?'
                },
                link: function(scope, element, attrs) {

                    scope.max = scope.max || 4;
                    scope.icon = scope.icon || 'star';

                    // Create the icon template.
                    var icon = '<i class="fa fa-' + scope.icon + '"></i>';

                    // Set the needed css styles.
                    var e = angular.element(element);
                    e.css({
                        'display': 'inline-block',
                        'position': 'relative'
                    });

                    // Local variable for element height that will be used by
                    // other functions.
                    var h = 0;

                    // Initializer to generate the number of icons needed to
                    // represent this rating.
                    var initialize = function() {

                        // Clear the current children first.
                        e.children().remove();

                        // Generate the number of icons needed.
                        var temp = '';
                        for (var n = 0; n < scope.max; n++) {
                            temp += icon;
                        }
                        e.append(temp);

                        // Generate the containing div.
                        var div = angular.element('<div class="foreground"></div>');

                        // Append the rating icons.
                        div.append(temp);

                        // Set the height after having set the icons so that we
                        // get the actual height.
                        h = element[0].clientHeight;

                        // Set the initial css for the div that will display the
                        // rating icons according to the rating.
                        div.css({
                            'position': 'absolute',
                            'width': 0 + 'px',
                            'height': h + 'px',
                            'top': 0,
                            'overflow': 'hidden',
                            'white-space': 'nowrap'
                        });
                        e.append(div);
                    };

                    initialize();

                    // Update the icons according to ther ating.
                    var update = function() {

                        // This needs to be done in an interval so that the
                        // DOM elements have time to be set properly.
                        $interval(function() {
                            // Calculate the rating value according to the step.
                            var rating = Math.round(scope.rating / scope.step) * scope.step;

                            // Calculate the rating width the icons will
                            // represent.
                            var w = element[0].clientWidth;
                            var ow = (parseFloat(rating) / scope.max) * w;

                            // Set the width for foreground icons.
                            angular.element(element).find('div').css({
                                'width': ow + 'px'
                            });
                        }, 100, 1);
                    };

                    // Set watches for max, rating, and step values.
                    scope.$watch(function(scope) {
                        return scope.max;
                    }, function() {
                        initialize();
                        update();
                    });
                    scope.$watch(function(scope) {
                        return scope.rating;
                    }, function() {
                        update();
                    });
                    scope.$watch(function(scope) {
                        return scope.step;
                    }, function() {
                        update();
                    });
                }
            }
        });
}());