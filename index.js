const express = require("express");
const fetch = require("node-fetch");
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file
const API_KEY = "a7e00fb04d6aee85906efd13422fc24a";
let API_URL = `https://bazon.cc/api/json?token=${API_KEY}&type=film&page=2&cat=аниме`;

    const fetchData = fetch(API_URL).then((response) => {
      return response.json();
    });


 const showMovies = async () => {
   try {
    const commits = await fetchData;
      let items = commits.results.map((element) => 
      `<div class='movieitem'>
        <img src='${element.info.poster}' alt='imglogo' />
        <h3>${element.info.rus}</h3>
        <p>${element.info.year}</p>
      </div>`
    );
      return items;
   } catch (error) {
     console.error(error);
   }
 };

 async function getMovies() {
   try {
     const movies = await showMovies();
     
     // используем movies в шаблонной строке:
     const message = `<div nv-scope="movies" nv-scope-current="true" class="header">
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
    ${movies}
    </div>
`;

     app.get("/Anime", (req, res) => {
       res.send(message); // Отправка ответа в виде HTML
     });
   } catch (error) {
     console.error(error);
   }
 }

 getMovies();

app.use(express.static('public'));

const path = require("path");

app.get("/public/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/public/views/Anime", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/views/Anime.html"));
});

app.listen(8080);
console.log("Server is listening on port 8080");

module.exports = app;
