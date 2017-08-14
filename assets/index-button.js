;(function () {

  //scroll to pageYOffset where we was at previous page
  if (location.pathname.slice(-10) !== 'index.html') {
    window.onload = function () {
      window.scrollTo(0, localStorage.getItem('scrollTop'));
    };
  }

  //create hamburger menu button and add to html page
  var indexButton = document.createElement('div');
  indexButton.id = 'indexButton';
  indexButton.innerHTML = '<div class="menuicon">\
                                <span></span>\
                            </div>';
  document.body.appendChild(indexButton);

  //update name of page in localStorage when we navigate through browser back forward arrow
  if (location.pathname.slice(-10) !== 'index.html') {
    var imgName = location.href.slice(location.href.lastIndexOf('/') + 1, -5);
    localStorage.setItem('img', imgName);
  }

  //handle click on hamburger button to switch between opened page and back to preview this page in index.html
  indexButton.onclick = function (e) {
    e.stopPropagation();
    if (!localStorage.img) return;
    var targetPage = localStorage.getItem('img');
    if (location.pathname.slice(-10) === 'index.html') {
      location.href = 'views/' + targetPage + '.html';
    } else {
      location.href = '../index.html' + '#' + targetPage;
      localStorage.removeItem('scrollTop');
    }
  }
})();