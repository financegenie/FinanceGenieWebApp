angular.module('MyApp', [
    'angular-plaid-link'
])

// .config([
//  'plaidLinkProvider',
//     function(plaidLinkProvider) {
//         plaidLinkProvider.init({
            
//         });
//     }
// ])

.controller('mainCtrl', [
    '$scope',
    'plaidLink',

    function($scope, plaidLink) {
      console.log('hi');
      $scope.token = '';
      $scope.plaidIsLoaded = plaidLink.isLoaded;

      plaidLink.create({
          clientName: 'Finance Genie',
          env: 'development',
          key: '29ab42e089ce5a09922590efbf7899',
          product: 'auth',
          onSuccess: function(public_token, metadata) {
              // $scope.token = token;
              // console.log($scope.token);

              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open( "POST", "https://finance-genie.herokuapp.com/account/get_access_token/", true ); // false for synchronous request
              xmlHttp.setRequestHeader("Content-type", "applicatibon/x-www-form-urlencoded");
              xmlHttp.send("public_token=" + public_token);
              let result = JSON.parse( xmlHttp.responseText)
              if (result["error"] != null){
                console.log(result["Error Message"])
              } else {
                console.log(result["Access Token"])
              }
          },
          onExit: function(err, metadata) {
              if(err != null){
                console.log(err)
              }
          }
      })



      $scope.openPlaid = function(bankType) {
          plaidLink.open(bankType);
          console.log($scope.token);

      };
  },
    
    /* function(plaidLink) {
        plaidLink.create(
        // configurations here will override matching plaidLinkProvider.init configurations
        {
            clientName: 'Dominic Chow',
            env: 'sandbox',
            key: 'c76d1d85d9215b24f16700ca89bffa',
            product: 'trans'
        },
        
        // success callback
        function(token) {
            console.log('token: ', token);
            // pass the token to your sever to retrieve an `access_token`
            // see https://github.com/plaid/link#step-3-write-server-side-handler
        });

        
    } */
]);