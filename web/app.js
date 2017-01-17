var app = angular.module("myApp", ["ui.router","ngCookies",'ui.bootstrap','xeditable']);
app.constant("url","services/index.php");


app.config(function ($stateProvider,$urlRouterProvider, $locationProvider) {
   $urlRouterProvider.otherwise("/login");
    $stateProvider.state("login", {
        url: "/login",
        controller: "LoginController",
        templateUrl: "web/views/login.html"

    });
    $stateProvider.state("adminHome", {
        url: "/adminHome",
        controller: "adminController",
        templateUrl: "web/views/adminHomepage.html"
    });
    $stateProvider.state("viewModifyFaculty", {
        url: "/viewModifyFaculty",
        controller: "adminController",
        templateUrl: "web/views/viewModifyFaculty.html"
    });
    $stateProvider.state("addFaculty", {
        url: "/addFaculty",
        controller: "adminController",
        templateUrl: "web/views/addFaculty.html"
    });
    $stateProvider.state("deleteFaculty", {
        url: "/deleteFaculty",
        controller: "adminController",
        templateUrl: "web/views/deleteFaculty.html"
    });
    $stateProvider.state("facultyHome", {
        url: "/facultyhome",
        controller: "facultyController",
        templateUrl: "web/views/facultyHomepage.html"
    });
    $stateProvider.state("studentHome", {
        url: "/studenthome",
        controller: "studentController",
        templateUrl: "web/views/studentHomepage.html"
    });
    // $locationProvider.html5Mode(true);
});
app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});
//Alert controller
app.controller('modalInstanceController', function ($scope,$rootScope, $uibModalInstance, modalInfo) {

    $scope.modalData = {};
    $scope.modalData.headerText = modalInfo.modalHeader;
    $scope.modalData.bodyText = modalInfo.modalBody;

    $scope.ok = function () {
        $rootScope.$broadcast("DeleteFacultyConfirm", modalInfo);
        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});