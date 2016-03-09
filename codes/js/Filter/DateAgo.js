//<p>{{input | AppText}}</p>
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('DateAgo', DateAgo);

  DateAgo.$inject = [];

  function DateAgo() {
    return function(input) {
      var today = moment().startOf('day'); // 2016/03/08 00:00:00
      var at = new Date(input);
      if(at > today){
        return "test";
      }else{
        return moment(at).format('yyyy.MM.dd HH.mm.ss');
      }
    };
  }
})(angular);
