

function sendParam() {
    var arrond = $("#arrond").val();
    console.log(arrond);
    getArrond(arrond); 
}


function getArrond(arrond) {
    var http = new XMLHttpRequest();
    http.open("GET", "/installations?arrondissement=" + arrond , true);
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            var list = JSON.parse(http.responseText);
            renderInstal(list);
            http.send();
        }
    };
    console.log("arrond");
}

function renderInstal(list) {
    if(list.length > 0) {
        $("#ctable").html(function() {
            var render = "<table><thead><tr><th>Instalation</th><th>Arrondissement</th><th>Adresse</th><th>Ouvert</th><th>Condition</th><th>LONG</th><th>LAT</th></tr></thead><tbody>";
            for (var i = 0; i < list.length; i++) {
                render += "<tr><td>" + list[i].nom+ "</td><td>" 
                + list[i].arrondissement.nom_arr  + "</td><td>" + list[i].ADRESSE + "</td><td>"
                + list[i].ouvert + "</td><td>" 
                + list[i].condition + "</td><td>" 
                + list[i].LONG + "</button></td>"
                + list[i].LAT + "</button></td>";
            }
            render += "</tbody></table>";
            return render;
        });
    } else {
        $("#ctable").html("<p>Aucun Instalation trouvé</p>");
    }
}