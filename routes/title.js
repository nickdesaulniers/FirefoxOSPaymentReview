var Book = function Book (title, author, cover) {
      this.title = title;
      this.author = author;
      this.cover = cover;
    },
    me = "Nick Desaulniers",
    titles = [
      new Book("Basic JIT", me, "images/dragon.jpg"),
      new Book("C Function Pointers Alternate Syntax", me, "images/sicp.jpg"),
      new Book("Commandments of a Mobile Web", me, "images/dinosaur.jpg")
    ],
    list = function list (req, res) {
      console.log(req.body);
      res.send(titles);
    };

exports.list = list;
