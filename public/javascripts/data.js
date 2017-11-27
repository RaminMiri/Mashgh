

//$(document).ready( function sendParam() {
//    var arrond = $("#arrond").val();
//    alert('Add it!');
//    getArrond(arrond); 
//});

function sendParam() {
    var arrondi = $("#arrond").val();
    getArrond(arrondi);  
}

function getArrond(arrond) {
    
    if (window.XMLHttpRequest) { 
       
    http = new XMLHttpRequest();
    } else {if (window.ActiveXObject) { // IE
    http = new ActiveXObject("Microsoft.XMLHTTP");
    } else{
        return false;
}
    }
    
    http.onreadystatechange = function() {
         if (http.readyState === 4) {
            if (http.status === 200) {
                document.body.className = 'ok';
                var list = JSON.parse(http.responseText);
                renderInstal(list);

        }else {
            document.body.className = 'error';
        }
         }
    };
    http.open("GET", "/installations?arrondissement=" + arrond , true);
    http.send(null);
}

function renderInstal(list) {
    if(list.length > 0) {
        $("#ctable").html(function() {
            var render = "<table><thead><tr><th>Instalation</th><th>Arrondissement</th><th>Adresse</th><th>Ouvert</th><th>Condition</th><th>LONG</th><th>LAT</th></tr></thead><tbody>";
            for (var i = 0; i < list.length; i++) {
                render += "<tr><td>" + list[i].nom+ "</td><td>" 
                + list[i].arrondissement[0].nom_arr +list[i].ARRONDISSE +"</td><td>" + list[i].ADRESSE + "</td><td>"
                + list[i].ouvert + "</td><td>" 
                + list[i].condition + "</td><td>" 
                + list[i].LONG + "</td><td>"
                + list[i].LAT + "</td><td>";
            }
            render += "</tbody></table>";
            return render;
        });
    } else {
        $("#ctable").html("<p>Aucun Instalation trouvé</p>");
    }
}

function sendArrond() {
    var Arond = $("#ddetb").val();
    getArrond(Arond);
}

function getInstallation(inst) {
    var http = new XMLHttpRequest();
    http.open("GET", "/installations?installation=" + inst , true);
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            var list = JSON.parse(http.responseText);
            renderCV(list);
        }
    };
    http.send();
}
