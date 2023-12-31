function pageScroll3() {
    window.scrollTo(0, 0);
}
// 对汉堡式导航栏进行处理,当滑动或者按下按钮后,将会自动收回
$(window).scroll(function () {
    // 获取当前滚动的距离
    var scrollDistance = $(window).scrollTop();
    if (scrollDistance > 50) {
        $('#navmenu').collapse('hide');
    }
});
$('#navmenu .nav-item').click(function () {
    // 隐藏汉堡式按钮
    $('#navmenu').collapse('hide');
});





