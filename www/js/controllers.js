angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$ionicPopup,$timeout, $state) {
  $scope.playlists = [
    { title: 'Classic',   price:10 , about:'Mild'  ,   id: 1 },
    { title: 'Marlboro',    price:20 , about: 'Old',  id: 2 },
    { title: 'Dunhill',  price:30 , about: 'Switch' , id: 3 },
    { title: 'Camel',    price:40 , about: 'International',  id: 4 },
    { title: 'GudamGaram' ,  price:50 , about: 'Clove',  id: 5 },
    { title: 'Parliament' ,  price:60 , about:  'Light' , id: 6 }
  ];

  $scope.paymentData = {};


  


  $scope.cart = [];
 

  $scope.addtocart = function(playlist){


    var productInCart = false;
      $scope.cart.forEach(function(prod, index, prods){
        if (prod.id === playlist.id) {
         productInCart = prod;
          return;
        }
      });

      if (productInCart) {
        $scope.addedtocart();
      } else {
        $scope.cart.push(playlist);
        $scope.updateTotal();

      }
      console.log('product added to cart');
    };

 
$scope.removefromcart = function(playlist){

  $scope.cart.forEach(function(prod, i, prods){
        if (playlist.id === prod.id) {
          $scope.cart.splice(i, 1);
          $scope.updateTotal();
          
        }
      });

};


$scope.cartTotal = function(total) {
     var total = 0;
      $scope.cart.forEach(function(prod, index, prods){
        total += (parseInt(prod.price)*parseInt(prod.amount));
      });
         return total;
    };


   

$scope.updateTotal = function(){
     $scope.total = $scope.cartTotal();
    };


$scope.zeroitems = function(){
      if($scope.total>0 ){
        $state.go('app.payment');
      }
      else{
        //alerts the user that cart is empty.
        var alertPopup = $ionicPopup.alert({
          title: 'No item in your Cart',
          template: 'Please add Some Items!'
        });
        alertPopup.then(function(res) {
       console.log('no items in cart');
     });

      }

    };



$scope.success = function() {


      var alertPopup = $ionicPopup.alert({
       title: 'Successful',
       template: 'Payment has been successful'
     });
     alertPopup.then(function(res) {
       console.log('payment completed' , $scope.paymentData);
     });

   


};

 

$scope.addedtocart = function() {


      var alertPopup = $ionicPopup.alert({
       title: 'Already in Cart',
       template: 'Item has been added already'
     });
     alertPopup.then(function(res) {
       console.log('already added');
     });

   


};
 


});
