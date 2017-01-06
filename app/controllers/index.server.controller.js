exports.render = function (req, res) {
    //session에 lastVisit의 값이 존재한다면 실행
    if(req.session.lastVisit){
        //session의 lastVisit를 출력
        console.log(req.session.lastVisit);
    }
    
    //Date 인스턴스 생성
    var time = new Date();
    
    //session에 lastVisit란 이름으로 Date를 이용해 시간 저장
    req.session.lastVisit = time.getFullYear() + "[Year]-" + (time.getMonth()+1) + "[Month]-"
        + time.getDate() + "[Date].." + time.getHours() + "[Hour]-" + time.getMinutes() + "[Minute]- "
        + time.getSeconds() + "[Second]";

    //render로 index에 title 값 전달
    res.render('index', {
        title: '미래의 나에게',
        user : JSON.stringify(req.user)
    });
};