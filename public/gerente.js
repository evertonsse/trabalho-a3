const socket = io();
function submitForm() {
  const select = document.getElementById("Operacao");
  const operacao = select.options[select.selectedIndex].value;

  switch (operacao) {
    case "2":
      const vendedor = document.getElementById("nomeVendedor");
      if (vendedor.value == "") {
        alert("Informe um vendedor.");
        vendedor.focus();
      } else {
        socket.emit(operacao, vendedor.value);
        socket.on(operacao, (totalVendas) => {
          const resultado = document.getElementById("ResultadoContent");
          const valor = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalVendas);
          resultado.innerHTML = `O valor total de vendas de ${vendedor.value} é igual a: ${valor}`;
        });
        break; 
      }
    case "3": {
      const loja = document.getElementById("vendasLojas");
      if ((loja.value == "")) {
        alert("Informe um loja.");
        loja.focus();
      } else { 
        socket.emit(operacao, loja.value); 
        socket.on(operacao, (totalVendas)=> {
            const resultado = document.getElementById("ResultadoContent"); 
            const valor = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalVendas);
              resultado.innerHTML = `O valor total de vendas da loja ${loja.value} é igual a: ${valor}`;
        } )
      }
      break; 
    }

    case "4": { 
        const inicioEle = document.getElementById("incio");
        const fimEle = document.getElementById("fim")

        if (inicioEle.value =='' || fimEle.value =='') { 
            alert("Infome data de início e de fim da consulta")
            inicio.focus()
        } else { 
            const inicio = inicioEle.value
            const fim = fimEle.value
            socket.emit(operacao, {inicio, fim})
            socket.on(operacao, (totalVendas)=> {
                const resultado = document.getElementById("ResultadoContent"); 
                const valor = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalVendas);
                  resultado.innerHTML = `O valor total de vendas entre ${inicio} e ${fim} é igual a: ${valor}`;
            } )
        }

        break; 
    }
    case "5" : { 
        socket.emit(operacao) 
        socket.on(operacao, (melhorVendedor) => { 
            const resultado = document.getElementById("ResultadoContent"); 
                const valor = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(melhorVendedor.valor);
                  resultado.innerHTML = `O melhor vendedor é: ${melhorVendedor.nome} com ${valor} em vendas.`;
        })
        break; 
    }

    case "6" : { 
        socket.emit(operacao) 
        socket.on(operacao, (melhorLoja) => { 
            const resultado = document.getElementById("ResultadoContent"); 
                const valor = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(melhorLoja.valor);
                  resultado.innerHTML = `A melhor loja é a: loja ${melhorLoja.nome} com ${valor} em vendas.`;
        })
    }
    break; 
  }
}
