window.onload = function () {
  let input_cep = document.getElementById("cep");
  let input_cidade = document.getElementById("cidade");
  let input_bairro = document.getElementById("bairro");
  let input_rua = document.getElementById("rua");
 

 //Chamando a function press OK no input
 input_cep.addEventListener("keyup", function(event) {
   if (event.keyCode === 13){
     event.preventDefault();
      goSearch();
   }
 });

 //Chamando a function saindo do input
 input_cep.onblur = function(){
  goSearch();
 }

    function goSearch() {
    let cep = document.getElementById("cep").value;
    let url = "https://viacep.com.br/ws/" + cep + "/json";

    fetch(url)
      .then((data_cep) => data_cep.json())
      .then((data_cep) => {
        let cidade = JSON.stringify(data_cep.localidade).replace(/['"]+/g, "");
        let rua = JSON.stringify(data_cep.logradouro).replace(/['"]+/g, "");
        let bairro = JSON.stringify(data_cep.bairro).replace(/['"]+/g, "");

        document.getElementById("cidade").value = cidade;
        document.getElementById("rua").value = rua;
        document.getElementById("bairro").value = bairro;
      })
      .catch(
        (err = function () {
          alert("CEP inválido. Tente novamente.");
          input_cep.value = "";
          input_cidade.value = "";
          input_bairro.value = "";
          input_rua.value = "";
          input_cep.focus();
        })
      );
  };
};
