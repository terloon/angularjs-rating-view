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

                    if (!angular.isDefined(scope.max)) {
                        scope.max = 4;
                    }

                    scope.icon = scope.icon || 'star';
                    var scope.icon = 'star';
                    if (angular.isDefined(attrs.icon)) {
                        scope.icon = attrs.icon;
                    }

                    var icon = '<i class="fa fa-' + scope.icon + '"></i>';

                    var e = angular.element(element);
                    e.addClass('background');
                    e.css({
                        'display': 'inline-block',
                        'position': 'relative'
                    });
                    var h = 0;

                    var initialize = function() {
                        e.children().remove();
                        var temp = '';
                        for (var n = 0; n < scope.max; n++) {
                            temp += icon;
                        }
                        e.append(temp);
                        var div = angular.element('<div class="foreground"></div>');
                        div.append(temp);
                        h = element[0].clientHeight;
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

                    var update = function() {
                        $interval(function() {
                            var rating = Math.round(scope.rating / scope.step) * scope.step;
                            console.log('rating = ' + rating);

                            var w = element[0].clientWidth;
                            console.log('w = ' + w);
                            var ow = (parseFloat(rating) / scope.max) * w;
                            console.log('ow = ' + ow);

                            angular.element(element).find('div').css({
                                'width': ow + 'px'
                            });
                        }, 100, 1);
                    };

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