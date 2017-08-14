;(function () {
    //manage highlighting images store in localStore name of images and coordinates

    var mainPage = document.getElementById('mainPage'),
    savedImgName = localStorage.getItem('img');

    //save NAME of IMG of page that was clicked on - in local storage
    //we opening different html pages and can share information between them only through local storage
    mainPage.onclick = function (e) {
        if (e.target.tagName !== 'IMG') return;
        var targetImageSrc = e.target.getAttribute('src'),
        imageName = targetImageSrc.slice(targetImageSrc.indexOf('/')+1, -4);
        window.localStorage.setItem('img', imageName);
    };

    //highlight image in index.html - if we have saved in local storage name of img and if there is element with id
    if (savedImgName){
        var activePagePreview = document.getElementById(savedImgName);
        if (activePagePreview){
            var activePagePreviewImg = activePagePreview.querySelector('img');
            //highlight active preview page, that was visited
            activePagePreviewImg.classList.add('main_page__item-target-highlight');
        } else {
            window.location.hash = '';
            return;
        }
    }

    //remove highlight of last page that was visited by clicking anywhere outside
    document.body.onclick = function (e) {
        if (e.target.tagName !== 'IMG' && e.target.id !== 'indexButton' && activePagePreview){
            activePagePreviewImg.classList.remove('main_page__item-target-highlight');
            window.localStorage.removeItem('img');
            window.location.hash = '';
        }
    };

})();

