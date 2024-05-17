$(document).ready(function () {
    // 初始化页面加载第一页的内容
    loadImages();

    // 监听滚动事件，当滚动到页面底部时加载更多内容
    $(window).scroll(function () {
        // 计算文档高度和窗口高度
        const documentHeight = $(document).height();
        const windowHeight = $(window).height();
        // 计算滚动条位置
        const scrollTop = $(window).scrollTop();

        // 如果滚动条接近底部，加载更多内容
        if (scrollTop + windowHeight >= documentHeight - 100) {
            console.log(isLogin)
            if (!isOk && !isLogin) {
                loadImages();
            }
        }
    });
});

const baseUrl = "http://192.168.45.128:5230/o/r/";
let page = 1; // 记录当前页数
let limit = 10
let isOk = false
let isLogin = false

function loadImages() {
    isLogin = true
    // 这里假设有一个API返回JSON格式的数据，包含图片URL
    // 实际情况中，你需要替换成你自己的API地址
    let s = "http://192.168.45.128:5230/api/v1/memo?creatorId=1&limit=" + limit + "&offset=" + (page - 1) * limit;
    console.log(s)
    $.getJSON(s, function (data) {
        if (data.length === 0) {
            isOk = true
            isLogin = false
            return
        }
        // 遍历JSON数据中的每张图片URL，并将其添加到页面中
        $.each(data, function (index, item) {
            let resourceList = item.resourceList;
            let uid = resourceList[0].uid;
            const imageUrl = baseUrl + uid;
            console.log(imageUrl + " 当前页:" + page);

            // 创建包含 Lightbox2 属性的 HTML
            const imageHtml = `
        <div class="box">
            <a href="${imageUrl}" data-lightbox="gallery" data-title="Image ${index + 1}">
                <img src="${imageUrl}" class="img-fluid card-img room" alt="Image ${index + 1}"/>
            </a>
        </div>`;

            $('#imageContainer').append(imageHtml);
        });
        // 加载完毕后增加页数
        page++;
        isLogin = false
    });
}
