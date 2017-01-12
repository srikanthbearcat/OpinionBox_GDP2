/**
 * Created by S525796 on 04-01-2017.
 */
app.controller("adminController", ['$scope', '$cookies', '$state', '$http', 'url', function ($scope, $cookies, $state, $http, url) {
    $scope.addFacultyForm = {};
    $scope.addedFacultySuccess = false;
    $scope.addedFacultyFailed = false;
    $scope.addFacultyExist = false;
    $scope.addNewFaculty = function () {
        if ($scope.addFacultyForm.$invalid) {
            console.log("add faculty form not valid");
        }else {
            console.log("add faculty form  valid");
            // var config = {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            //     }
            // };

            var data = {
                first_name: $scope.addFaculty.firstName,
                last_name: $scope.addFaculty.lastName,
                email_address: $scope.addFaculty.emailAddress,
                user_name: $scope.addFaculty.username,
                password: $scope.addFaculty.password
            };
            if ($cookies.get('user_type') == "admin") {
                console.log("entered cookies");

                $http.post(url + "/admin/addFaculty", data).then(function successCallback(response) {
                    console.log(response.data.success + " add faculty request success");
                    if (response.data.success) {
                        $scope.addedFacultySuccess = true;
                        $scope.addedFacultyFailed = false;
                    } else {
                        $scope.addedFacultySuccess = false;
                        $scope.addedFacultyFailed = true;
                    }
                }, function errorCallback(response) {
                    if(!response.data.success && response.data.info.reason == "Username already Exists"){
                        $scope.addFacultyExist = true;
                        console.log("Faculty already exists");
                    }
                    console.log(response.status + "add faculty request failed");
                    console.log(JSON.stringify(response) + "add faculty request failed");

                    // $scope.alert('md');
                });
            }
        }
    }
}]);