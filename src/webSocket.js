const vendaDB = require("./model/Venda");
const { io } = require("./http.js");
const { QueryTypes, AsyncQueueError } = require("sequelize");
const sequelize = require("../db");

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("1", async (venda) => {
    console.log(venda);
    if (await vendaDB.create(venda)) {
      socket.emit("1", { mensagem: "Venda cadastrada com sucesso!" });
    } else {
      socket.emit("1", { mensagem: "Erro ao cadastrar venda!" });
    }
  });
  socket.on("2", async (vendedor) => {
    const totalVendas = await sequelize.query(
      `select sum(vendas.valor) as total from vendas where vendas.vendedor ='${vendedor}'`,
      { type: QueryTypes.SELECT }
    );
    if (totalVendas) {
      socket.emit("2", totalVendas[0].total);
    }
  }); 

  socket.on('3', async (loja)=> {
    console.log(loja)
    const totalVendas = await sequelize.query(
      `select sum(vendas.valor) as total from vendas where vendas.codigoLoja ='${loja}'`,
      { type: QueryTypes.SELECT }
    ); 
    if (totalVendas) {
      socket.emit("3", totalVendas[0].total);
    }
  }) 

  socket.on('4', async(periodo) => {
     console.log(periodo)
     const totalVendas = await sequelize.query(
      `select sum(vendas.valor) as total from vendas where vendas.data between  '${periodo.inicio}' and '${periodo.fim}'`,
      { type: QueryTypes.SELECT }
    ); 
    if (totalVendas) {
      console.log(totalVendas)
      socket.emit("4", totalVendas[0].total);
    }
  })

  socket.on("5", async()=> {
   
     const totalVendas = await sequelize.query(
      `select sum(vendas.valor) as total, vendas.vendedor from vendas group by vendas.vendedor order by total desc`,
      { type: QueryTypes.SELECT }
    ); 
    if (totalVendas) {
      console.log(totalVendas[0])
      const nome = totalVendas[0].vendedor
      const valor = totalVendas[0].total
      socket.emit("5", {nome, valor})
    }

  })

  socket.on("6", async()=> {
   
    const totalVendas = await sequelize.query(
     `select sum(vendas.valor) as total, vendas.codigoLoja from vendas group by vendas.codigoLoja order by total desc`,
     { type: QueryTypes.SELECT }
   ); 
   if (totalVendas) {
     console.log(totalVendas[0])
     const nome = totalVendas[0].codigoLoja
     const valor = totalVendas[0].total
     socket.emit("6", {nome, valor})
   }

 })
});
