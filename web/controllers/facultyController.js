/**
 * Created by S525796 on 04-01-2017.
 */
// app.controller("facultyController", ['$scope', '$cookies', '$state', '$http', 'url', '$uibModal', function ($scope, $cookies, $state, $http, url, $uibModal) {
// //Get course data from database
//     $scope.courseData = [];
//     $http.post(url + "coursesByFaculty"+ $.cookie('username')).then(function successCallback(response) {
//
//         $.each(response.data.info, function (i, data) {
//             data.i = i;
//             data.original_user_name = data.user_name;
//             $scope.courseData.push(data);
//         });
//         console.log(JSON.stringify($scope.courseData));
//     }, function errorCallback(response) {
//     })
// }]);