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
        // abstract: true,
        url: '/Footer',
        views: {
          Main: {
            templateUrl: 'state/1Footer/Footer.html',
            controller: 'FooterController as Footer'
          }
        }
      })

    .state('Main.WalkThrough', {
      url: '/WalkThrough',
      views: {
        Main: {
          templateUrl: 'state/WalkThrough/WalkThrough.html',
          controller: 'WalkThroughController as vm'
        }
      }
    })

    .state('Main.Footer.Home', {
      url: '/Home',
      views: {
        Footer: {
          templateUrl: 'state/Home/Home.html',
          controller: 'HomeController as vm'
        }
      }
    })

    .state('Main.Search', {
      url: '/Search',
      views: {
        Main: {
          templateUrl: 'state/Search/Search.html',
          controller: 'SearchController as vm'
        }
      }
    })

    .state('Main.PlaceList', {
      url: '/PlaceList',
      views: {
        Main: {
          templateUrl: 'state/PlaceList/PlaceList.html',
          controller: 'PlaceListController as vm'
        }
      }
    })

    .state('Main.PlaceDetail', {
      params: {
        placeId: ''
      },
      url: '/PlaceDetail',
      views: {
        Main: {
          templateUrl: 'state/PlaceDetail/PlaceDetail.html',
          controller: 'PlaceDetailController as vm'
        }
      }
    })

    .state('Main.RequestUpdate', { //상태의 이름
      params: {
        placeId: '',
        placeName: ''
      },
      url: '/RequestUpdate', //접속할 angular의 url
      views: { //ion-nav-view의 name속성의 값을 참조함.
        Main: { //<ion-nav-view name="Main"> 태그에 렌더링할 대상을 설정
          templateUrl: 'state/RequestUpdate/RequestUpdate.html', //렌더링 할 html파일
          controller: 'RequestUpdateController as vm' //html파일에서 사용할 Angular의 컨트롤러
        }
      }
    })

    .state('Main.GoogleMap', {
      params: {
        placeAddress: '',
        placeId: '',
        place: {}
      },
      url: '/GoogleMap',
      views: {
        Main: {
          templateUrl: 'state/GoogleMap/GoogleMap.html',
          controller: 'GoogleMapController as vm'
        }
      }
    })

    .state('Main.ReviewCreate', {
      params: {
        placeId: '',
        placeName: '',
      },
      url: '/ReviewCreate',
      views: {
        Main: {
          templateUrl: 'state/ReviewCreate/ReviewCreate.html',
          controller: 'ReviewCreateController as vm'
        }
      }
    })

    .state('Main.CommentCreate', {
      params: {
        reviewId: '',
        reviewOwner: ''
      },
      url: '/CommentCreate',
      views: {
        Main: {
          templateUrl: 'state/CommentCreate/CommentCreate.html',
          controller: 'CommentCreateController as vm'
        }
      }
    })

    .state('Main.MessageCreate', {
      params: {
        placeName: ''
      },
      url: '/MessageCreate/:ownerId',
      views: {
        Main: {
          templateUrl: 'state/MessageCreate/MessageCreate.html',
          controller: 'MessageCreateController as vm'
        }
      }
    })

    .state('Main.MenuList', {
      params: {
        placeId: ''
      },
      url: '/MenuList',
      views: {
        Main: {
          templateUrl: 'state/MenuList/MenuList.html',
          controller: 'MenuListController as vm'
        }
      }
    })

    .state('Main.Footer.EventTab', {
      //위에 선언된 state의 Main을 체크하고, Footer를 체크한뒤, 그에대한 체인으로 EventTab를 선언함.
      url: '/EventTab',
      views: {
        Footer: { //<ion-nav-view name="Footer"> 태그를 상위객체 Footer에서 찾지만, 만약 없다해도 EventTab의 내용이 렌더링되지 않을 뿐이며 에러는 발생되지 않는것으로 확인.
          templateUrl: 'state/EventTab/EventTab.html',
          controller: 'EventTabController as vm'
        }
      }
    })

    .state('Main.Footer.EventTab.JoodangEventList', {
      url: '/JoodangEventList',
      views: {
        EventTab: {
          templateUrl: 'state/JoodangEventList/JoodangEventList.html',
          controller: 'JoodangEventListController as vm'
        }
      }
    })

    .state('Main.Footer.EventTab.BarEventList', {
      url: '/BarEventList',
      views: {
        EventTab: {
          templateUrl: 'state/BarEventList/BarEventList.html',
          controller: 'BarEventListController as vm'
        }
      }
    })

    .state('Main.JoodangEventDetail', {
      params: {
        eventId: ''
      },
      url: '/JoodangEventDetail',
      views: {
        Main: {
          templateUrl: 'state/JoodangEventDetail/JoodangEventDetail.html',
          controller: 'JoodangEventDetailController as vm'
        }
      }
    })

    .state('Main.BarEventDetail', {
      params: {
        eventId: ''
      },
      url: '/BarEventDetail',
      views: {
        Main: {
          templateUrl: 'state/BarEventDetail/BarEventDetail.html',
          controller: 'BarEventDetailController as vm'
        }
      }
    })

    .state('Main.Footer.SearchTab', {
      url: '/SearchTab',
      views: {
        Footer: {
          templateUrl: 'state/SearchTab/SearchTab.html',
          controller: 'SearchTabController as vm'
        }
      }
    })

    .state('Main.Footer.SearchTab.ThemeList', {
      url: '/ThemeList',
      views: {
        SearchTab: {
          templateUrl: 'state/ThemeList/ThemeList.html',
          controller: 'ThemeListController as vm'
        }
      }
    })

    .state('Main.Footer.SearchTab.KeywordList', {
      url: '/KeywordList',
      views: {
        SearchTab: {
          templateUrl: 'state/KeywordList/KeywordList.html',
          controller: 'KeywordListController as vm'
        }
      }
    })

    .state('Main.Footer.SearchTab.ProvinceList', {
      url: '/ProvinceList',
      views: {
        SearchTab: {
          templateUrl: 'state/ProvinceList/ProvinceList.html',
          controller: 'ProvinceListController as vm'
        }
      }
    })

    .state('Main.ProvinceSearchList', {
      params: {
        province: '',
      },
      url: '/ProvinceSearchList',
      views: {
        Main: {
          templateUrl: 'state/ProvinceSearchList/ProvinceSearchList.html',
          controller: 'ProvinceSearchListController as vm'
        }
      }
    })

    .state('Main.ThemeSearchList', {
      params: {
        themeTitle: '',
      },
      url: '/ThemeSearchList',
      views: {
        Main: {
          templateUrl: 'state/ThemeSearchList/ThemeSearchList.html',
          controller: 'ThemeSearchListController as vm'
        }
      }
    })

    .state('Main.KeywordSearchList', {
      params: {
        keywords: '',
        keywordString: ''
      },
      url: '/KeywordSearchList',
      views: {
        Main: {
          templateUrl: 'state/KeywordSearchList/KeywordSearchList.html',
          controller: 'KeywordSearchListController as vm'
        }
      }
    })

    .state('Main.Footer.TalkList', {
      url: '/TalkList',
      views: {
        Footer: {
          templateUrl: 'state/TalkList/TalkList.html',
          controller: 'TalkListController as vm'
        }
      }
    })

    .state('Main.Footer.MyTalkList', {
      url: '/MyTalkList',
      views: {
        Footer: {
          templateUrl: 'state/MyTalkList/MyTalkList.html',
          controller: 'MyTalkListController as vm'
        }
      }
    })

    .state('Main.Footer.TalkDetail', {
      params: {
        postId: ''
      },
      url: '/TalkDetail',
      views: {
        Footer: {
          templateUrl: 'state/TalkDetail/TalkDetail.html',
          controller: 'TalkDetailController as vm'
        }
      }
    })

    .state('Main.Footer.TalkCreate', {
      url: '/TalkCreate',
      views: {
        Footer: {
          templateUrl: 'state/TalkCreate/TalkCreate.html',
          controller: 'TalkCreateController as vm'
        }
      }
    })

    .state('Main.Footer.TalkUpdate', {
      params: {
        postId: ''
      },
      url: '/TalkUpdate',
      views: {
        Footer: {
          templateUrl: 'state/TalkUpdate/TalkUpdate.html',
          controller: 'TalkUpdateController as vm'
        }
      }
    })

    .state('Main.Footer.SettingList', {
      url: '/SettingList',
      views: {
        Footer: {
          templateUrl: 'state/SettingList/SettingList.html',
          controller: 'SettingListController as vm'
        }
      }
    })

    .state('Login', {
      url: '/Login',
      templateUrl: 'state/Login/Login.html',
      controller: 'LoginController as vm'
    })

    .state('Main.Footer.Profile', {
      url: '/Profile',
      views: {
        Footer: {
          templateUrl: 'state/Profile/Profile.html',
          controller: 'ProfileController as vm'
        }
      }
    })

    .state('Main.FavoriteList', {
      url: '/FavoriteList',
      views: {
        Main: {
          templateUrl: 'state/FavoriteList/FavoriteList.html',
          controller: 'FavoriteListController as vm'
        }
      }
    })

    .state('Main.MyMessageList', {
      url: '/MyMessageList',
      views: {
        Main: {
          templateUrl: 'state/MyMessageList/MyMessageList.html',
          controller: 'MyMessageListController as vm'
        }
      }
    })

    .state('Main.NoticeList', {
      url: '/NoticeList',
      views: {
        Main: {
          templateUrl: 'state/NoticeList/NoticeList.html',
          controller: 'NoticeListController as vm'
        }
      }
    })

    .state('Main.NoticeDetail', {
      params: {
        postId: ''
      },
      url: '/NoticeDetail',
      views: {
        Main: {
          templateUrl: 'state/NoticeDetail/NoticeDetail.html',
          controller: 'NoticeDetailController as vm'
        }
      }
    })

    .state('Main.TermList', {
      url: '/TermList',
      views: {
        Main: {
          templateUrl: 'state/TermList/TermList.html',
          controller: 'TermListController as vm'
        }
      }
    })

    .state('Main.TermDetail', {
      params: {
        term: {}
      },
      url: '/TermDetail',
      views: {
        Main: {
          templateUrl: 'state/TermDetail/TermDetail.html',
          controller: 'TermDetailController as vm'
        }
      }
    })

    .state('Main.CustomerList', {
      url: '/CustomerList',
      views: {
        Main: {
          templateUrl: 'state/CustomerList/CustomerList.html',
          controller: 'CustomerListController as CustomerList'
        }
      }
    })

    .state('Main.FaqList', {
      url: '/FaqList',
      views: {
        Main: {
          templateUrl: 'state/FaqList/FaqList.html',
          controller: 'FaqListController as vm'
        }
      }
    })

    .state('Main.ContactCreate', {
      url: '/ContactCreate',
      views: {
        Main: {
          templateUrl: 'state/ContactCreate/ContactCreate.html',
          controller: 'ContactCreateController as vm'
        }
      }
    })

    .state('Main.CompanyCreate', {
      url: '/CompanyCreate',
      views: {
        Main: {
          templateUrl: 'state/CompanyCreate/CompanyCreate.html',
          controller: 'CompanyCreateController as vm'
        }
      }
    })

    .state('Main.RequestCreate', {
      url: '/RequestCreate',
      views: {
        Main: {
          templateUrl: 'state/RequestCreate/RequestCreate.html',
          controller: 'RequestCreateController as vm'
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
      views: {
        Main: {
          templateUrl: 'state/ZZZ/Signup/Signup.html',
          controller: 'zSignupController as Signup'
        }
      }
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
