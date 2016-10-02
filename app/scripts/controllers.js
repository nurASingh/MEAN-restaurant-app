'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= menuFactory.getDishes();

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
            $scope.showMenu = true;
            $scope.message = "Loading ...";
            $scope.dishes = menuFactory.getDishes().query();

        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    feedbackFactory.saveFeedBack().save({'feedback':feedback}).$promise.then(function(response){
                        console.log(response);
                    },function(err){
                        console.log(err);
                    });
                    console.log($scope.feedback);

                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = true;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }


            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );


        }])

        .controller('IndexController', ['$scope', '$stateParams', 'menuFactory','corporateFactory', function($scope, $stateParams, menuFactory,corporateFactory) {
                
                $scope.showDish = false;
                $scope.showPromotion = false;
                $scope.showExecutive = false;

                $scope.message="Loading ...";
                menuFactory.getDishes().get({id:0}).$promise.then(
                    function(response){
                    $scope.dish =   response;
                    $scope.showDish =   true;
                    },
                    function(response) {
                    $scope.message =    "Error: "+response.status + "   "   +   response.statusText;
                });

                menuFactory.getPromotion().get({id:0}).$promise.then(
                function(response){
                    $scope.myPromotion =   response;
                    $scope.showPromotion =   true;
                },
                function(response) {
                    $scope.showPromotion =   false;   
                    $scope.message =    "Error: "+response.status + "   "   +   response.statusText;
                });


                corporateFactory.getLeader().get({id:0}).$promise.then(
                function(response){
                    $scope.exeCheff = response;
                    $scope.showExecutive =   true;
                },
                function(response) {
                    $scope.showExecutive =   false;   
                    $scope.message =    "Error: "+response.status + "   "   +   response.statusText;
                });
              

        }])

        .controller('AboutController', ['$scope', '$stateParams', 'menuFactory','corporateFactory', function($scope, $stateParams, menuFactory,corporateFactory) {
                $scope.leader =   true;
                corporateFactory.getLeaders().query().$promise.then(
                function(response){
                    $scope.leaders = response;
                    $scope.leader =   true;
                },
                function(response) {
                   $scope.leader =   false;  
                    $scope.message =    "Error: "+response.status + "   "   +   response.statusText;
                });            
        }]);


