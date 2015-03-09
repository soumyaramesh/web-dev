function OrderFormController($scope) {

    $scope.services = [
		{
		    name: 'Olives',
		    price: 2,
		    active: true
		}, {
		    name: 'Onions',
		    price: 1,
		    active: false
		}, {
		    name: 'Tomatoes',
		    price: 1.5,
		    active: false
		}, {
		    name: 'Peppers',
		    price: 3,
		    active: false
		}
    ];

    $scope.toggleActive = function (s) {
        s.active = !s.active;
    };

    // Helper method for calculating the total price

    $scope.total = function () {

        var total = 0;

        // Use the angular forEach helper method to
        // loop through the services array:

        angular.forEach($scope.services, function (s) {
            if (s.active) {
                total += s.price;
            }
        });

        return total;
    };
}