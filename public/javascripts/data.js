
function sendParam() {
    var arrondi = $("#arrond").val();
    getArrond(arrondi);  
}

function getArrond(arrond) {
    var http;
    if (window.XMLHttpRequest) { 
       
    http = new XMLHttpRequest();
    } else {if (window.ActiveXObject) { // IE
    http = new ActiveXObject("Microsoft.XMLHTTP");
    } else{
        return false;
}
    }
    http.open("GET", "/installations?arrondissement=" + arrond , true);
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
    http.send(null);
}

function renderInstal(list) {
    if(list.length > 0) {
        $("#ctable").html(function() {
            var render = "<table><thead><tr><th>Instalation</th><th>Arrondissement</th><th>Adresse</th><th>Ouvert</th><th>Condition</th><th>LONG</th><th>LAT</th><th>Update</th><th>Enlever</th></tr></thead><tbody>";
            for (var i = 0; i < list.length; i++) {
                render += "<form><tr><td>" + list[i].nom + "</td><td>" 
                + list[i].ARRONDISSE +"</td><td>" + list[i].ADRESSE + "</td><td>"
                + list[i].ouvert + "</td><td>" 
                + list[i].condition + "</td><td>" 
                + list[i].LONG + "</td><td>"
                + list[i].LAT + "</td><td><input type='button' class='Modif' id='"
                + list[i]._id + "'onclick='openModif(this)' value='Modifier'/></td>"
                + "<td><input  type='button' value='Supprimer' class='Modif' id='" + list[i]._id + "'onclick='deleteInstal(this)'/></td></tr></form>"
               ;
            }
            render += "</tbody></table>";
            return render;
        });
    } else {
        $("#ctable").html("<p>Aucun Instalation trouvé</p>");
    }
}

function sendInstal() {
    var inst =$("#listder option:selected").text();
    getInstallation(inst);
}

function getInstallation(inst) {
    var http;
    if (window.XMLHttpRequest) { 
       
    http = new XMLHttpRequest();
    } else {if (window.ActiveXObject) { // IE
    http = new ActiveXObject("Microsoft.XMLHTTP");
    } else{
        return false;
    }
            }   
    http.open("GET", "/nominstallations?installation=" + inst , true);
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
    http.send(null);
    
}



function openModif(e) {
  
   var http = new XMLHttpRequest();
    http.open("GET", "/switch?id=" + e.id, true);
            $("#modif").html(http.responseText);

    http.send();
}

function deleteInstal(e) {
    var http = new XMLHttpRequest();
    
    http.open("DELETE", "/installations" + e.id , true);
    $("#ctable").html("<tr><td>" + e.id +  " est supprimé</td></tr>");
}