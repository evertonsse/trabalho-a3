const socket = io();
function submitForm() {
  var obj = {
    vendedor: document.getElementById("nomeVendedor").value,
    codigoLoja: document.getElementById("codigoLoja").value,
    data: document.getElementById("dataVenda").value,
    valor: document.getElementById("valorVenda").value,
  };
  socket.emit("1", obj);
  socket.on("1", (mensagem) => {
    alert(mensagem.mensagem);
    const vendedor = document.getElementById("nomeVendedor");
    const codigoLoja = document.getElementById("codigoLoja");
    const data = document.getElementById("dataVenda");
    const valor = document.getElementById("valorVenda");
    vendedor.value = ""
    codigoLoja.value =""
    data.Value = ""
    valor.value = ""
    
  });
}
