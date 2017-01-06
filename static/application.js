//메인 애플리케이션 이름
var mainApplicationModuleName = 'mean';

//메인 애플리케이션 모듈 생성
var mainApplicationModule = angular.module(mainApplicationModuleName, []);

//document.ready이벤트에 함수 결합
angular.element(document).ready(function () {
    //새로운 angular.js 애플리케이션 시작
    angular.bootstrap(document, [mainApplicationModuleName]);
});