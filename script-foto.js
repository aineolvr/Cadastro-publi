window.onload = function() {
    var containerConteudo = document.getElementById("container-conteudo");
    var containerCamera = document.getElementById("container-camera");
    var btnEnviar = document.getElementById("btn-enviar");
    var camera = document.getElementById("camera");
    var capturarBtn = document.getElementById("capturarBtn");
    var repetirBtn = document.getElementById("repetirBtn");
    var fotoPreview = document.getElementById("fotoPreview");
    var fotoData = null;

    var loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";

    capturarBtn.style.display = "none";
    repetirBtn.style.display = "none";
    fotoPreview.style.display = "none";
    btnEnviar.style.display = "none";

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
            .then(function(stream) {
                camera.srcObject = stream;
                camera.play();
                capturarBtn.style.display = "block";
                loadingIndicator.style.display = "none";
            })
            .catch(function(error) {
                console.log("Erro ao acessar a câmera: " + error);
            });
    }

    capturarBtn.addEventListener("click", function() {
        capturarBtn.style.display = "none";
        repetirBtn.style.display = "block";
        btnEnviar.style.display = "block";

        camera.pause();

        var canvas = document.createElement("canvas");
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;

        var context = canvas.getContext("2d");
        context.drawImage(camera, 0, 0, canvas.width, canvas.height);

        fotoData = canvas.toDataURL();

        fotoPreview.src = fotoData;
        fotoPreview.style.display = "block";
    });

    repetirBtn.addEventListener("click", function() {
        repetirBtn.style.display = "none";
        capturarBtn.style.display = "block";
        btnEnviar.style.display = "none";

        camera.play();

        fotoData = null;
        fotoPreview.style.display = "none";
        fotoPreview.src = "";
    });
};
