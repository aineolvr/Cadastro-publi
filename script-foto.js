  window.onload = function() {
            var containerConteudo = document.getElementById("container-conteudo");
            var containerCamera = document.getElementById("container-camera");
            var abrirCameraBtn = document.getElementById("abrirCameraBtn");
            var capturarBtn = document.getElementById("capturarBtn");
            var repetirBtn = document.getElementById("repetirBtn");
            var btnEnviar = document.getElementById("btn-enviar");
            var videoPreview = document.getElementById("videoPreview");
            var fotoPreview = document.getElementById("fotoPreview");
            var fotoData = null;
        
            var loadingIndicator = document.getElementById("loadingIndicator");
            loadingIndicator.style.display = "none";
        
            abrirCameraBtn.addEventListener("click", function() {
                abrirCameraBtn.style.display = "none";
                btnEnviar.style.display = "none";
                fotoPreview.style.display = "none";
        
                var constraints = { video: { facingMode: { exact: "user" } } };
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function(stream) {
                        containerCamera.style.display = "block";
                        videoPreview.srcObject = stream;
                        capturarBtn.style.display = "block";
                    })
                    .catch(function() {
                        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
                            .then(function(stream) {
                                containerCamera.style.display = "block";
                                videoPreview.srcObject = stream;
                                capturarBtn.style.display = "block";
                            })
                            .catch(function(error) {
                                console.log("Erro ao acessar a câmera: " + error);
                            });
                    });
            });
        
            capturarBtn.addEventListener("click", function() {
                capturarBtn.style.display = "none";
                repetirBtn.style.display = "block";
                fotoPreview.style.display = "block";
                btnEnviar.style.display = "block";
        
                var canvas = document.createElement("canvas");
                canvas.width = videoPreview.videoWidth;
                canvas.height = videoPreview.videoHeight;
        
                var context = canvas.getContext("2d");
                context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);
        
                fotoData = canvas.toDataURL();
        
                fotoPreview.src = fotoData;
            });
        
            repetirBtn.addEventListener("click", function() {
                repetirBtn.style.display = "none";
                capturarBtn.style.display = "block";
                fotoPreview.style.display = "none";
                btnEnviar.style.display = "none";
        
                videoPreview.play();
        
                fotoData = null;
                fotoPreview.src = "";
            });
        };
