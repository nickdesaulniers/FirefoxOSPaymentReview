(function () {
  'use strict';

  var eachBook = function eachBook (book) {
    var $ = document.createElement.bind(document),
        _ = document.createTextNode.bind(document),
        div = $('div'),
        button = $('button'),
        span = $('span'),
        img = new Image();

    button.appendChild(_('Buy'));
    span.appendChild(_(book.title + ' by ' + book.author));

    div.classList.add('title');
    div.appendChild(span);
    div.appendChild(button);
    div.appendChild(img);

    img.src = book.cover;

    document.getElementById('title_list').appendChild(div);
    console.log(book);
  },
  buildBookList = function buildBookList (err, books) {
    if (err) return Util.logError(err);
    books.forEach(eachBook);
  },
  loaded = function loaded () {
    Util.ajaxGetJSON('/titles', buildBookList);
  };

  window.addEventListener('DOMContentLoaded', loaded);
})();
