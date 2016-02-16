(function(angular) {
  'use strict';
  angular.module('app')
    .config(route);
  route.$inject = ['$stateProvider', '$httpProvider', '$ionicConfigProvider'];

  function route($stateProvider, $httpProvider, $ionicConfigProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);
    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('Main', {
        // abstract: true,
        url: '/Main',
        templateUrl: 'state/0Main/Main.html',
        controller: 'MainController as Main'
      })
      .state('Main.Footer', {
        //abstract: true,
        url: '/Footer',
        views: {
          Main: {
            templateUrl: 'state/1Footer/Footer.html',
            controller: 'FooterController as Footer'
          }
        }
      })

    .state('Main.Footer.Home', {
      url: '/Home',
      views: {
        Footer: {
          templateUrl: 'state/Home/Home.html',
          controller: 'HomeController as Home'
        }
      }
    })

    .state('Main.Search', {
      url: '/Search',
      views: {
        Main: {
          templateUrl: 'state/Search/Search.html',
          controller: 'SearchController as Search'
        }
      }
    })

    .state('Main.PlaceList', {
      url: '/PlaceList',
      views: {
        Main: {
          templateUrl: 'state/PlaceList/PlaceList.html',
          controller: 'PlaceListController as PlaceList'
        }
      }
    })

    .state('Main.PlaceDetail', {
      url: '/PlaceDetail',
      views: {
        Main: {
          templateUrl: 'state/PlaceDetail/PlaceDetail.html',
          controller: 'PlaceDetailController as PlaceDetail'
        }
      }
    })

    .state('Main.RequestUpdate', {  //상태의 이름
      url: '/RequestUpdate',        //접속할 angular의 url
      views: {                      //ion-nav-view의 name속성의 값을 참조함.
        Main: {                     //<ion-nav-view name="Main"> 태그에 렌더링할 대상을 설정
          templateUrl: 'state/RequestUpdate/RequestUpdate.html',  //렌더링 할 html파일
          controller: 'RequestUpdateController as RequestUpdate'  //html파일에서 사용할 Angular의 컨트롤러
        }
      }
    })





    //====================================================
    //  ZZZ Samples
    //====================================================
    .state('zLogin', {
      url: '/zLogin',
      templateUrl: 'state/ZZZ/Login/Login.html',
      controller: 'zLoginController as Login'
    })

    .state('Main.zSignup', {
      url: '/zSignup',
      templateUrl: 'state/ZZZ/Signup/Signup.html',
      controller: 'zSignupController as Signup'
    })

    .state('Main.zTerms', {
      url: '/zTerms',
      templateUrl: 'state/ZZZ/Terms/Terms.html',
      controller: 'zTermsController as Terms'
    })


    .state('Main.zPostList', {
      url: '/zPostList',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostList/PostList.html',
          controller: 'zPostListController as PostList'
        }
      }
    })

    .state('Main.zPostDetail', {
      url: '/zPostDetail/:id',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostDetail/PostDetail.html',
          controller: 'zPostDetailController as PostDetail'
        }
      }
    })

    .state('Main.zPostUpdate', {
      url: '/zPostUpdate/:id',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostUpdate/PostUpdate.html',
          controller: 'zPostUpdateController as PostUpdate'
        }
      }
    })

    .state('Main.zPostCreate', {
      url: '/zPostCreate',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostCreate/PostCreate.html',
          controller: 'zPostCreateController as PostCreate'
        }
      }
    })

    .state('Main.zCouponList', {
      url: '/zCouponList',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/CouponList/CouponList.html',
          controller: 'zCouponListController as CouponList'
        }
      }
    })

    .state('Main.zCouponDetail', {
      url: '/zCouponDetail',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/CouponDetail/CouponDetail.html',
          controller: 'zCouponDetailController as CouponDetail'
        }
      }
    })

    .state('Main.zProfile', {
      url: '/zProfile',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/Profile/Profile.html',
          controller: 'zProfileController as Profile'
        }
      }
    })

    .state('Main.zPassword', {
      url: '/zPassword',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/Password/Password.html',
          controller: 'zPasswordController as Password'
        }
      }
    })

    .state('Main.zTransaction', {
      url: '/zTransaction',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/Transaction/Transaction.html',
          controller: 'zTransactionController as Transaction'
        }
      }
    });



  } //route end
})(angular);
