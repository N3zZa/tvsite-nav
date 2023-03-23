const express = require("express");
const fetch = require("node-fetch");
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file
const API_KEY = "a7e00fb04d6aee85906efd13422fc24a";
const API_URL = `https://bazon.cc/api/json?token=${API_KEY}&type=film&page=2&cat=аниме`;

  const response = new Promise(function (resolve, reject) {
    fetch(API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  function showMovies(response) {
    const movieEl = document.createElement("div");
    let i = 0;
    while (i < arr.results.length) {
      movieEl.innerHTML = `
      <div>
        <img src='${response.results}' alt='imglogo' />
        <h3>${response.results}</h3>
        <p>${response.results}</p>
      </div>
      `;
      i++;
    }
  }

  app.get("/anime", (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>tv</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="../main.css">
</head>

<body>
    <div class="app">
        <div nv-scope="movies" nv-scope-current="true" class="header">
            <img id="arrowback" nv-el onclick="window.history.go(-1)" width="50" src="../../images/arrowBack.svg"
                alt="arrowback">
            <a id="imglogo" nv-el href="/">
                <img width="75" src="../../images/UconCinemaLogo.png" alt="logoimg">
            </a>
            <div id="categories" nv-el class="categories">
                <h1>Категории</h1>
                <ul id="categorylist" class="category-list">
                    <a href="../pages/Films.html">
                        <li nv-el>Фильмы</li>
                    </a>
                    <a href="../pages/Serials.html">
                        <li nv-el>Сериалы</li>
                    </a>
                    <a href="../pages/Cartoons.html">
                        <li nv-el>Мультфильмы</li>
                    </a>
                    <a href="../pages/Premieres.html">
                        <li nv-el>Премьеры</li>
                    </a>
                    <a href="../pages/Compilations.html">
                        <li nv-el>Подборки</li>
                    </a>
                </ul>
            </div>
            <h2>Аниме</h2>
        </div>
        <div id="movies" class="movies" nv-scope="movies">
            ${showMovies(response)}
        </div>
    </div>
    <script type="text/javascript">
        function showMovies(arr) {
            const moviesEl = document.getElementById("movies")
            const movieEl = document.createElement("div");
            let i = 0;
            while (i < arr.results.length) {
                const movieEl = document.createElement("div");
                movieEl.className = ("nv-el", 'movieitem');
                movieEl.setAttribute("nv-el", "");
                const img = document.createElement("img");
                img.setAttribute("src", arr.results[i].info.poster);
                img.setAttribute("alt", "img");

                const filmTitle = document.createElement("div");
                filmTitle.className = "film-title";

                const h2 = document.createElement("h2");
                h2.appendChild(document.createTextNode(arr.results[i].info.rus));

                const p = document.createElement("p");
                p.appendChild(
                    document.createTextNode(arr.results[i].info.rating.rating_imdb)
                );

                filmTitle.appendChild(h2);
                filmTitle.appendChild(p);

                const year = document.createElement("p");
                year.appendChild(document.createTextNode(arr.results[i].info.year));

                movieEl.appendChild(img);
                movieEl.appendChild(filmTitle);
                movieEl.appendChild(year);

                moviesEl.appendChild(movieEl);

                i++
            }
            moviesEl.firstElementChild.setAttribute("nv-el-current", "true");
        }


        let arrowBack = document.getElementById('arrowback');
        let imglogo = document.getElementById('imglogo');
        let categories = document.getElementById('categorylist')
        let categorybtn = document.getElementById('categories')

        arrowBack.addEventListener('nv-enter', function (event) {
            window.history.back()
        });
        imglogo.addEventListener('nv-enter', function (event) {
            window.location = '/'
        });
        categorybtn.addEventListener('nv-enter', function (event) {
            console.log(categories.style)
            if (categories.style.display !== 'flex') {
                categories.style.display = 'flex'
            } else categories.style.display = 'none'
        });

    </script>
    <script type="text/javascript" src="../navigation/navigation.js"></script>
    <script type="text/javascript" src="../navigation/navigation.min.js"></script>
</body>

</html>
  `;

    res.send(htmlResponse); // Отправка ответа в виде HTML
  });
app.use(express.static(__dirname));


app.listen(8080);
console.log("Server is listening on port 8080");
