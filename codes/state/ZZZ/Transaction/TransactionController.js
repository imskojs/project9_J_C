(function (){
  'use strict';
  angular.module('app')
    .controller('zTransactionController', zTransactionController);

  zTransactionController.$inject = [
    '$window',
    'zTransactionModel'
  ];

  function zTransactionController(
    $window,
    zTransactionModel 
  ){

    var IMP = $window.IMP;
    IMP.init('imp37410820');
    var Transaction = this;

    Transaction.Model = zTransactionModel;
    Transaction.test = test;

    function test (){
      // $window.cordova.InAppBrowser.open('http://192.168.0.10:1337', '_blank', 'location=no');
      return IMP.request_pay({
        pay_method: 'card',
        escrow: false,
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: 14000,
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자이름',
        buyer_tel: '070-8658-8870',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        vbank_due: '20151231',
        app_scheme: 'joodang'
        // m_redirect_url : 'http://192.168.0.10:1337'
      }, function(rsp) {
        var msg;
        if ( rsp.success ) {
          msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
          console.log("msg :::\n", msg);
        } else {
          msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          console.log("msg :::\n", msg);
        }
      });

    }

  } //end
})();


