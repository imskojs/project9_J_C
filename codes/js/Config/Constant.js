// App constants
(function(angular) {
  'use strict';

  angular.module('app')
    // Social login with Kakao
    .constant("KAKAO_KEY", "abcdefghijklmnopqrstu0123456789")
    // Social login with Facebook
    .constant("FACEBOOK_KEY", "1234567890123456")
    // Social login with twitter
    .constant("TWITTER_CONSUMER_KEY", "abCde1GHiJklmn2PqRSTuVWXY")
    .constant("TWITTER_CONSUMER_SECRET", "a1CDefGhIjK2MNopQRst3VwXY4zabC5Ef6HIJK6MNOpQrsTUVw")
    // social login with google+
    .constant("GOOGLE_OAUTH_CLIENT_ID", "12345678901-abcde2gh3j4lmn5p6rs7uvw8x90y1234.apps.googleusercontent.com")
    // Used for sending push notification
    .constant("GOOGLE_PROJECT_NUMBER", "12345678901")
    // Development mode
    .constant("DEV_MODE", true)
    // Server
    .constant("SERVER_URL", "YOUR_SERVER_URL")
    .constant("OAUTH_CALLBACK_URL", "http://localhost/callback")
    .constant("APP_NAME", "YOUR_APP_NAME")
    .constant("APP_NAME_KOREAN", "사람들이 볼만한 앱 이름")
    .constant("APP_ID", 9999999999);
})(angular);
