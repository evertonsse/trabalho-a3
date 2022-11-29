const { serverHttp } = require("./http"); 
require("./webSocket")
serverHttp.listen(3000, ()=> console.log("Conectado na porta 3000"))