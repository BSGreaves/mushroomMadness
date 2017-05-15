app.run((FIREBASE_CONFIG) => {
	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("mushroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {

	$scope.mushrooms = [];
	$scope.poisonFilter = "";

	let getFBMushrooms = () => {
		let mushrooms = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then(fbMushrooms => {
				fbMushrooms = fbMushrooms.data;
				Object.keys(fbMushrooms).forEach((key) => {
					fbMushrooms[key].id = key;
					mushrooms.push(fbMushrooms[key]);
				});
				mushrooms.forEach(each => {
					each.name = _.capitalize(each.name);
				});
				resolve(mushrooms);
			})
			.catch(error => {reject(error);});
		});
	};

	getMushrooms = () => {
		getFBMushrooms()
		.then(fbMushrooms => {$scope.mushrooms = fbMushrooms;})
		.catch(error => console.log("error in getMushrooms", error));
	};

	getMushrooms();

});