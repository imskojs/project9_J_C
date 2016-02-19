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

    .state('Main.GoogleMap', {
      url: '/GoogleMap',
      views: {
        Main: {
          templateUrl: 'state/GoogleMap/GoogleMap.html',
          controller: 'GoogleMapController as GoogleMap'
        }
      }
    })

    .state('Main.ReviewCreate', {
      url: '/ReviewCreate',
      views: {
        Main: {
          templateUrl: 'state/ReviewCreate/ReviewCreate.html',
          controller: 'ReviewCreateController as ReviewCreate'
        }
      }
    })

    .state('Main.CommentCreate', {
      url: '/CommentCreate',
      views: {
        Main: {
          templateUrl: 'state/CommentCreate/CommentCreate.html',
          controller: 'CommentCreateController as CommentCreate'
        }
      }
    })

    .state('Main.MessageCreate', {
      url: '/MessageCreate',
      views: {
        Main: {
          templateUrl: 'state/MessageCreate/MessageCreate.html',
          controller: 'MessageCreateController as MessageCreate'
        }
      }
    })

    .state('Main.MenuList', {
      url: '/MenuList',
      views: {
        Main: {
          templateUrl: 'state/MenuList/MenuList.html',
          controller: 'MenuListController as MenuList'
        }
      }
    })

    .state('Main.Footer.EventTab', {
      //위에 선언된 state의 Main을 체크하고, Footer를 체크한뒤, 그에대한 체인으로 EventTab를 선언함.
      url: '/EventTab',
      views: {
        Footer: {  //<ion-nav-view name="Footer"> 태그를 상위객체 Footer에서 찾지만, 만약 없다해도 EventTab의 내용이 렌더링되지 않을 뿐이며 에러는 발생되지 않는것으로 확인.
          templateUrl: 'state/EventTab/EventTab.html',
          controller: 'EventTabController as EventTab'
        }
      }
    })

    .state('Main.Footer.EventTab.JoodangEventList', {
      url: '/JoodangEventList',
      views: {
        JoodangEventTab: {
          templateUrl: 'state/JoodangEventList/JoodangEventList.html',
          controller: 'JoodangEventListController as JoodangEventList'
        }
      }
    })

    .state('Main.Footer.EventTab.BarEventList', {
      url: '/BarEventList',
      views: {
        BarEventTab: {
          templateUrl: 'state/BarEventList/BarEventList.html',
          controller: 'BarEventListController as BarEventList'
        }
      }
    })

    .state('Main.JoodangEventDetail', {
      url: '/JoodangEventDetail',
      views: {
        Main: {
          templateUrl: 'state/JoodangEventDetail/JoodangEventDetail.html',
          controller: 'JoodangEventDetailController as JoodangEventDetail'
        }
      }
    })

    .state('Main.BarEventDetail', {
      url: '/BarEventDetail',
      views: {
        Main: {
          templateUrl: 'state/BarEventDetail/BarEventDetail.html',
          controller: 'BarEventDetailController as BarEventDetail'
        }
      }
    })

    .state('Main.Footer.SearchTab', {
      url: '/SearchTab',
      views: {
        Footer: {
          templateUrl: 'state/SearchTab/SearchTab.html',
          controller: 'SearchTabController as SearchTab'
        }
      }
    })

    .state('Main.Footer.SearchTab.ThemeList', {
      url: '/ThemeList',
      views: {
        ThemeSearchTab: {
          templateUrl: 'state/ThemeList/ThemeList.html',
          controller: 'ThemeListController as ThemeList'
        }
      }
    })

    .state('Main.Footer.SearchTab.KeywordList', {
      url: '/KeywordList',
      views: {
        KeywordSearchTab: {
          templateUrl: 'state/KeywordList/KeywordList.html',
          controller: 'KeywordListController as KeywordList'
        }
      }
    })

    .state('Main.Footer.SearchTab.ProvinceList', {
      url: '/ProvinceList',
      views: {
        ProvinceSearchTab: {
          templateUrl: 'state/ProvinceList/ProvinceList.html',
          controller: 'ProvinceListController as ProvinceList'
        }
      }
    })

    .state('Main.ProvinceSearchList', {
      url: '/ProvinceSearchList',
      views: {
        Main: {
          templateUrl: 'state/ProvinceSearchList/ProvinceSearchList.html',
          controller: 'ProvinceSearchListController as ProvinceSearchList'
        }
      }
    })

    .state('Main.ThemeSearchList', {
      url: '/ThemeSearchList',
      views: {
        Main: {
          templateUrl: 'state/ThemeSearchList/ThemeSearchList.html',
          controller: 'ThemeSearchListController as ThemeSearchList'
        }
      }
    })

    .state('Main.KeywordSearchList', {
      url: '/KeywordSearchList',
      views: {
        Main: {
          templateUrl: 'state/KeywordSearchList/KeywordSearchList.html',
          controller: 'KeywordSearchListController as KeywordSearchList'
        }
      }
    })

    .state('Main.Footer.TalkList', {
      url: '/TalkList',
      views: {
        Footer: {
          templateUrl: 'state/TalkList/TalkList.html',
          controller: 'TalkListController as TalkList'
        }
      }
    })

    .state('Main.Footer.MyTalkList', {
      url: '/MyTalkList',
      views: {
        Footer: {
          templateUrl: 'state/MyTalkList/MyTalkList.html',
          controller: 'MyTalkListController as MyTalkList'
        }
      }
    })

    .state('Main.Footer.TalkDetail', {
      url: '/TalkDetail',
      views: {
        Footer: {
          templateUrl: 'state/TalkDetail/TalkDetail.html',
          controller: 'TalkDetailController as TalkDetail'
        }
      }
    })

    .state('Main.Footer.TalkCreate', {
      url: '/TalkCreate',
      views: {
        Footer: {
          templateUrl: 'state/TalkCreate/TalkCreate.html',
          controller: 'TalkCreateController as TalkCreate'
        }
      }
    })

    .state('Main.Footer.TalkUpdate', {
      url: '/TalkUpdate',
      views: {
        Footer: {
          templateUrl: 'state/TalkUpdate/TalkUpdate.html',
          controller: 'TalkUpdateController as TalkUpdate'
        }
      }
    })

    .state('Main.Footer.SettingList', {
      url: '/SettingList',
      views: {
        Footer: {
          templateUrl: 'state/SettingList/SettingList.html',
          controller: 'SettingListController as SettingList'
        }
      }
    })

    .state('Login', {
      url: '/Login',
      templateUrl: 'state/Login/Login.html',
      controller: 'LoginController as Login'
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
