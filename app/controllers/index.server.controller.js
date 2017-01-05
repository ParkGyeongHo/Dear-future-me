exports. render = function (req, res) {
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }

    var time = new Date();
    req.session.lastVisit = time.getFullYear() + "[Year]-" + (time.getMonth()+1) + "[Month]-"
        + time.getDate() + "[Date].." + time.getHours() + "[Hour]-" + time.getMinutes() + "[Minute]- "
        + time.getSeconds() + "[Second]";

    res.render('index', {title: '미래의 나에게'});
};