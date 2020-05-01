let curPage = document.URL;
console.log(curPage);
document.querySelectorAll(".nav-link").forEach(function (e) {
    if (e.href == curPage) {
        e.classList.add("current");
    }
});