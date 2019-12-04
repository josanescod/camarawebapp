
var imagenes = [];
var titulos = [];
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        document.getElementById('hacer_foto').onclick = hacer_foto;
        document.getElementById('borrar_ls').onclick = borrar_ls;
        document.getElementById('info').onclick = info;
        let provisional1 = localStorage.getItem("imagenes");
        if (provisional1 != null && provisional1 != undefined) {
            let provisional2 = localStorage.getItem("titulos");
            imagenes = provisional1.split("***");
            titulos = provisional2.split("***");
            for (let k = 0; k < imagenes.length; k++) {
                /* document.getElementById('fotos').innerHTML+="<div class='foto'><img src='"+imagenes[k]+"'><div class='titulo'>"+titulos[k]+"</div></div><div class='icono_borrar'><img src='img/borrar.png' onclick='borrar(this)'></div></div>";*/
                document.getElementById('fotos').innerHTML +=
                    `<div class='foto'>
                       <img src='${imagenes[k]}'>
                       <div class='titulo'>
                           ${titulos[k]}
                       </div>
                       
                       <div class='icono_borrar'>
                           <img src='img/borrar.png' onclick='borrar(this)'>
                       <div>
               </div>`;

            }

        }
    }


};

function hacer_foto() {

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}
function borrar_ls() {
    navigator.notification.alert('LocalStorage eliminado');
    navigator.notification.beep(1);
    localStorage.removeItem("imagenes");
    localStorage.removeItem("titulos");
    location.reload();
}

function info() {
    navigator.notification.alert('Aplicacion creada por J.L.S con apache cordova y phonegap.');
    navigator.notification.beep(1);

}
function onSuccess(imageURI) {
    im = imageURI;
    navigator.notification.prompt("Escribe el titulo de tu foto:", acabar_foto, "Titulo", ["OK", "Sin titulo"], " ");

}

function acabar_foto(contenido) {
    let botonpulsado = contenido.buttonIndex;
    let textoescrito = contenido.input1;
    if (botonpulsado == 2) {
        textoescrito = "(Sin titulo)";
    }
    imagenes.push(im);
    titulos.push(textoescrito);
    guardar();
    document.getElementById('fotos').innerHTML +=
        `<div class='foto'>
            <img src='${im}'>
            <div class='titulo'>
                ${textoescrito}
            </div>
            
            <div class='icono_borrar'>
                <img id='boton_borrar' src='img/borrar.png' onclick='borrar(this)'>
            <div>
    </div>`;
    


}

function borrar(clicado) {
    navigator.notification.beep(1)
    let abuelo = clicado.parentNode.parentNode;
    let bisabuelo = abuelo.parentNode;
    let index = Array.prototype.indexOf.call(bisabuelo.children, abuelo);
    imagenes.splice(index, 1);
    titulos.splice(index, 1);
    abuelo.style.display = "none";
    if (titulos.length < 1) {
        localStorage.removeItem("imagenes");
        localStorage.removeItem("titulos");
    } else {
        guardar();
    }
}

function guardar() {
    let provisional1 = imagenes.join("***");
    let provisional2 = titulos.join("***");
    localStorage.setItem("imagenes", provisional1);
    localStorage.setItem("titulos", provisional2);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

app.initialize();