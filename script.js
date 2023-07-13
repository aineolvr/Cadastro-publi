
document.addEventListener("DOMContentLoaded", function(event) { 
	const params = new Proxy(new URLSearchParams(window.location.search), {
  	get: (searchParams, prop) => searchParams.get(prop),
	});
   
	var code = params.code;
	console.log(code);
   
	buscarCPF(code);

    function buscarCPF(code){
        
        fetch(`https://api.credenciamentospr.com/api/users/${code}/info`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const cpf = data.document;
            const input = document.getElementById('inputcpf');
            input.value = cpf;
        })
        
        .catch(error => {
            console.log('erro encontrado', error);
        })
       
    }
   
});

var botao = document.getElementById('btn');
botao.addEventListener("click", function(){
    window.location.href = "index2.html";
})


