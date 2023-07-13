window.onload = function() {
    // Verificar se é um dispositivo móvel
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
        var constraints = { video: true };

        // Definir a restrição da câmera frontal em dispositivos móveis
        if (isMobile) {
            constraints.video = {
                facingMode: { exact: "user" }
            };
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                if (isMobile) {
                    // Remover elemento de vídeo no mobile
                    camera.remove();
                } else {
                    camera.srcObject = stream;
                    camera.play();
                    camera.controls = false;
                }

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

        if (isMobile) {
            // Capturar frame do canvas no mobile
            var context = camera.getContext("2d");
            context.drawImage(video, 0, 0, camera.width, camera.height);
            fotoData = camera.toDataURL();
        } else {
            // Capturar frame do vídeo em outros dispositivos
            camera.pause();

            var canvas = document.createElement("canvas");
            canvas.width = camera.videoWidth;
            canvas.height = camera.videoHeight;

            var context = canvas.getContext("2d");
            context.drawImage(camera, 0, 0, canvas.width, canvas.height);

            fotoData = canvas.toDataURL();
        }

        fotoPreview.src = fotoData;
        fotoPreview.style.display = "block";
    });

    repetirBtn.addEventListener("click", function() {
        repetirBtn.style.display = "none";
        capturarBtn.style.display = "block";
        btnEnviar.style.display = "none";

        if (isMobile) {
            // Reiniciar câmera no mobile
            camera.play();
        } else {
            // Reiniciar câmera em outros dispositivos
            camera.play();
        }

        fotoData = null;
        fotoPreview.style.display = "none";
        fotoPreview.src = "";
    });
};
