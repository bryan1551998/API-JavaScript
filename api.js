document.querySelector("#botonApi").addEventListener("click", function () {
  obtenerDatos();
});

function obtenerDatos() {
  document.querySelector("#listaArtistas").innerHTML = " ";

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      i = 1;
      let artistas = JSON.parse(this.responseText);

      $("#listaArtistas").append('<br><a id="artistas">Artistas</a><br><br>');
      for (item of artistas) {
        n = i++;

        $("#listaArtistas").append(
          `<a  id="artista${n}"class="p-1 aFocus"  onclick="discos(this)">${item}</a><br>`
        );
      }
      $("#listaArtistas").append("<br>");

      document.querySelector("#listaSong").innerHTML = " ";
      document.querySelector("#listaAlbunes").innerHTML = " ";
    }
  });

  xhr.open("GET", "http://localhost/APIsJavaScript/musicdb.php");

  xhr.send();
}

function discos(item) {
  artista = item.text;

  //document.querySelector('#' + item.id).style['color'] = "red"
  $(".aFocus").css("color", "black");
  $("#" + item.id).css("color", "#007bffba");

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    document.querySelector("#listaAlbunes").innerHTML = " ";

    if (this.readyState === 4) {
      i = 1;
      let albunes = JSON.parse(this.responseText);

      $("#listaAlbunes").append('<br><a id="albunes">Álbunes</a> <br><br>');

      for (items of albunes) {
        n = i++;
        $("#listaAlbunes").append(
          `<a id="albunes${n}"  onclick="albunes(artista,this)" class="p-1 aFocus2">${items}</a><br>`
        );
      }

      document.querySelector("#listaSong").innerHTML = " ";
    }
  });

  xhr.open(
    "GET",
    "http://localhost/APIsJavaScript/musicdb.php?artist=" + artista
  );

  xhr.send();
}

function albunes(artista, item) {
  album = String(item.text);

  $(".aFocus2").css("color", "black");
  $("#" + item.id).css("color", "#007bffba");

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    document.querySelector("#listaSong").innerHTML = " ";

    $("#listaSong").append('<br><a id="canciones">Canciones</a><br><br>');
    if (this.readyState === 4) {
      let albunes = JSON.parse(this.responseText);

      for (items of albunes["song"]) {
        $("#listaSong").append(
          `<a  class="p-1 aFocus3">Songname: ${items["songname"]} - Duraction: ${items["duration"]} minutes</a><br>`
        );
      }
    }
  });

  xhr.open(
    "GET",
    "http://localhost/APIsJavaScript/musicdb.php?artist=" +
      artista +
      "&album=" +
      album
  );

  xhr.send();
}

function apiTiempo() {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      tiempo = JSON.parse(this.responseText);
      console.log(tiempo);
      console.log(tiempo["current"]["temp_c"]);
      console.log(tiempo["location"]["localtime"]);

      document.querySelector("#tempsApi").innerHTML =
        "Tiempo en Barcelona es de " +
        tiempo["current"]["temp_c"] +
        " grados, la última actualización es hace: " +
        tiempo["location"]["localtime"];
    }
  });

  xhr.open(
    "GET",
    "https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona"
  );
  xhr.setRequestHeader("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");
  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "5d309c6929mshf18adee8bccca35p19c097jsn96d0b6eb3e24"
  );

  xhr.send();
}

setInterval(apiTiempo, 300000);
