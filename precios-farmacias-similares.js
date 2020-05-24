var fs = require("fs");
const request = require("request");

let data = fs.readFileSync("products.json");

let medicines = [];
// let obj = {
//   d:
//     '[{"id":1,"IdProducto":"1","idSeccion":3,"NombreSeccion":"MEDICAMENTOS","NombreProducto":"ACIDO NALIDIXICO / FENAZOPIRIDINA TABLETAS","PrecioVenta":49.00,"Presentacion":"20 TABLETAS","Concentracion":"500MG/50MG","Calificacion":5,"esNuevo":false,"FechaInclusion":"\\/Date(1074578400000)\\/","urlImagen":["https://fsappmovilstorage.blob.core.windows.net/imagenes/M_1.jpg"],"Oferta":[],"Ingredientes":[{"Nombre":"CLORHIDRATO DE FENAZOPIRIDINA","Cantidad":50.0000,"UnidadMedida":"MG "},{"Nombre":"NALIDIXICO ACIDO","Cantidad":500.0000,"UnidadMedida":"MG "}],"ProductoUnidadRegionalizada":null,"AparicionesEnBusqueda":null},{"id":2,"IdProducto":"10","idSeccion":3,"NombreSeccion":"MEDICAMENTOS","NombreProducto":"ACIDO RETINOICO CREMA","PrecioVenta":36.00,"Presentacion":"CREMA 30GR","Concentracion":"0.05GR (0.05%)","Calificacion":5,"esNuevo":false,"FechaInclusion":"\\/Date(1074751200000)\\/","urlImagen":["https://fsappmovilstorage.blob.core.windows.net/imagenes/M_10.jpg"],"Oferta":[],"Ingredientes":[{"Nombre":"ACIDO RETINOICO","Cantidad":0.0500,"UnidadMedida":"G"}],"ProductoUnidadRegionalizada":null,"AparicionesEnBusqueda":null},{"id":3,"IdProducto":"100","idSeccion":3,"NombreSeccion":"MEDICAMENTOS","NombreProducto":"FENAZOPIRIDINA TABLETAS","PrecioVenta":24.00,"Presentacion":"20 TABLETAS","Concentracion":"100MG","Calificacion":5,"esNuevo":false,"FechaInclusion":"\\/Date(1072764000000)\\/","urlImagen":["https://fsappmovilstorage.blob.core.windows.net/imagenes/M_100_1.jpg","https://fsappmovilstorage.blob.core.windows.net/imagenes/M_100_2.jpg"],"Oferta":[],"Ingredientes":[{"Nombre":"FENAZOPIRIDINA","Cantidad":100.0000,"UnidadMedida":"MG "}],"ProductoUnidadRegionalizada":null,"AparicionesEnBusqueda":null},{"id":4,"IdProducto":"101","idSeccion":3,"NombreSeccion":"MEDICAMENTOS","NombreProducto":"NAFAZOLINA / FENIRAMINA SOLUCION OFTALMICA","PrecioVenta":15.00,"Presentacion":"SOLUCION OFTALMICA 15ML","Concentracion":"0.16MG/3.00MG","Calificacion":5,"esNuevo":false,"FechaInclusion":"\\/Date(1072764000000)\\/","urlImagen":["https://fsappmovilstorage.blob.core.windows.net/imagenes/M_101.jpg"],"Oferta":[],"Ingredientes":[{"Nombre":"CLORHIDRATO DE NAFAZOLINA","Cantidad":0.1600,"UnidadMedida":"MG "},{"Nombre":"MALEATO DE FENIRAMINA","Cantidad":3.0000,"UnidadMedida":"MG "}],"ProductoUnidadRegionalizada":null,"AparicionesEnBusqueda":null}]'
// };
let json = JSON.parse(data);
json = JSON.parse(json.d);

for (let i = 0; i < json.length; i++) {
  //nombre
  let item = {
    name: json[i].NombreProducto,
    //precio
    price: json[i].PrecioVenta,
    //concentracion
    concentracion: json[i].Concentracion,
    //presentacion
    presentacion: json[i].Presentacion
  };
  medicines.push(item);
}

console.log(medicines);
console.log("total products: " + medicines.length);
console.log(json);

fs.writeFile(
  "farmacia-similares-precios-full.txt",
  JSON.stringify(json),
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);
// console.log(arr);
// console.log(arr);
//products.push(JSON.parse(data));

// for (let i = 0; i < 500; i++) {
//   console.log(obj.d[i] + i);
// }
// products.d.forEach(item => console.log("hi"));
// let data = require("./products.json");

//let raw_d = JSON.parse(data);
// let products = [];
// products.push(raw_d);
//const products = Array.from(data);

// console.log(products);
// console.dir(raw_d.d[3]);
// console.log(raw_d.d[4]);
// console.log("length: " + products.length);
