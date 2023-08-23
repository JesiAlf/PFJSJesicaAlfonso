console.table(artesanias);
let contenedorArtesanias = document.getElementById('misArtesanias');
let tablaBody = document.getElementById('tablabody');
let listaProds=[];
const carrito=[];

renderizarArtesanias(artesanias);


//Funcion para ordenar de A a Z
function ordenarDeAaZ(){
    //Limpio 
contenedorArtesanias.innerHTML=""
artesanias.sort(function(a,b){
    if(a.nombre<b.nombre){return -1;}
    if(a.nombre>b.nombre){return 1;}
    return 0;
//con sort lo estoy filtrando
})

}

function ordenarDePrecioMasBajo(){
contenedorArtesanias.innerHTML=""
artesanias.sort(function(a,b){
if(a.precio<b.precio){return -1;}
if (a.precio>b.precio){return 1;}
return 0;
})
renderizarArtesanias(artesanias);
}

function ordenarDePrecioMasAlto(){
contenedorArtesanias.innerHTML=""
artesanias.sort(function(a,b){
if(a.precio>a.precio){return -1;}
if (a.precio<b.precio){return 1;}
return 0;

})
renderizarArtesanias(artesanias);
}


//LocalStorage

localStorage.setItem('usuarioActivo','Jesica');
localStorage.setItem('cantregistros',6);
localStorage.setItem('comprarArtesanias',true);

//recupero datos
console.log(localStorage.getItem('UsuarioActivo'));
console.log(localStorage.getItem('cantregistros'));
console.log(localStorage.getItem('comprarArtesanias'));
const usuario=localStorage.getItem('usuarioActivo');
if(usuario !=null){
    //alert(`Bienvenida ${usuario}`);
    Swal.fire({
        title: 'Que bueno tenerte en nuestra casa!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}else{
    const usuarioNuevo='jesica';
    localStorage.setItem('usuarioActivo',usuarioNuevo);
}


//Filtrar por precio

function filtrarporPrecio(precioMax){
    const filtros=artesanias.filter((producto)=>producto.precio<=precioMax);
    return filtros;
}

function renderizarArtesanias(Artesanias){
    contenedorArtesanias.innerHTML = '';
    for(const prod of Artesanias){
        contenedorArtesanias.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=${prod.foto} alt="Card image cap">
        <div class="card-body">
        <h6 class="card-title">${prod.nombre}</h6>
        <p class="card-text"> $ ${prod.precio}</p>
        <button id =${prod.id} class="btn btn-primary compra">Compra</button>
        </div>
    </div>
        `;
    }
    let buttons=document.getElementsByClassName('compra');
    for (const boton of buttons){
    boton.addEventListener('click',()=>{
    console.log('Hiciste click en el boton id: '+boton.id);
    const prodCarrito=artesanias.find((miArtesania)=>miArtesania.id==boton.id);
    console.log(prodCarrito);
    agregarACarrito(prodCarrito);
    })
    
    boton.onmouseover=()=>boton.classList.replace('btn-primary', 'btn-warning');
    boton.onmouseout=()=>boton.classList.replace('btn-warning', 'btn-primary');
    }
}
    renderizarArtesanias(artesanias);


//Funcion para agregar Carito
function agregarACarrito(miArtesania){
    carrito.push(miArtesania);
    cantidad.innerText=`${carrito.length}`;
console.table(carrito);


//sweet alert 2
Swal.fire({
    title: 'Excelente elección!',
    text: `Acabas de agregar ${miArtesania.nombre} al carrito`,
    //imageUrl: miArtesania.foto,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: miArtesania.nombre,
  })
document.getElementById('tablabody').innerHTML+=`
    <tr style="color:rgb(204, 54, 74)">
    <td>${miArtesania.id}</td>
    <td>${miArtesania.nombre}</td>
    <td>${miArtesania.precio}</td>
</tr>`;    
  
let totalCarro= carrito.reduce((acumulador,miArtesania)=>acumulador+miArtesania.precio,0);
document.getElementById('total').innerText= 'total a pagar $: '+ totalCarro;

} 

function vaciarCarro(){
    carro.length=0;
    tablaBody.innerHTML='';
    document.getElementById('total').innerText='total a pagar $: ';
}


//localstorage
let carro = JSON.parse(localStorage.getItem('carrito')) || [];
let cantidad=document.getElementById('cantidad');
let listaArtesanias = JSON.parse(localStorage.getItem('listaArtesanias')) || [];


//Evento
listaArtesanias.forEach((miArtesania) => {
    document.getElementById(`btn ${miArtesania.id}`).addEventListener('click',()=>{
    agregarCarrito(miArtesania);
    });
});


 //incrementar precio

if(listaArtesanias.length!=0){
    for(const prod of listaArtesanias){
        document.getElementById('tablabody').innerHTML+=`
        <tr style="color:rgb(204, 54, 74)">
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td><button class='btn btn-light'>❌<button></td>
            </tr>`;       
    }
}

// Precio maximo

let precioMaxUsu= parseFloat(prompt('Ingrese el precio máximo que desea abonar(0-salir)'));
while(precioMaxUsu!==0){
    if(isNaN(precioMaxUsu)||precioMaxUsu<0){
        alert('Error, ingrese un precio válido🤷‍♀️');  
    }else{
        const artesFiltrados = filtrarporPrecio(precioMaxUsu);
        console.table(artesFiltrados);
    }
    precioMaxUsu=parseFloat(prompt('Ingrese el precio máximo que desea abonar(0-salir)'));
} 

//Agrega producto con push segun lo aprendido en primeras clases
class Artesanias{
    arteNew(id,foto,nombre,precio){
        this.id=id;
        this.foto=foto;
        this.nombre=nombre;
        this.precio=precio;
    }
    mostrarArtesania(){
        alert(this.id+'9'+this.foto+`"./assets/img/1.jpg"`+this.nombre+'Cuadro tridimensional'+this.precio+'5000');
    }
}
const artesania1=new Artesanias(9,`"./assets/img/1.jpg"`, "Cuadro tridimensional", 5000);

artesania1.mostrarArtesania();


//no queda guardado si cierro
sessionStorage.setItem('Descuento','Jesica');
sessionStorage.setItem('cantidades',[7,8,5,1,4]);
const AccedeAdescuentos=sessionStorage.getItem('cantidades').split(',').map((codigo)=>parseInt(codigo));
console.log(AccedeAdescuentos);

//Luxon date time

const DateTime=luxon.DateTime;
const inicio=DateTime.now();
console.log(inicio.toLocaleString());
console.log(inicio.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS));


//Boton finalizar con Sweetalert2

document.addEventListener("DOMContentLoaded", function () {

    let finalizarButton = document.getElementById('finalizar');
    finalizarButton.addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro que deseas finalizar la compra?',
            text: "¡No podrás agregar más productos al carrito!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, finalizar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Compra finalizada!',
                    'Tu compra ha sido completada.',
                    'success'
                );

//para limpiar el carro de la tabla de productos
    setTimeout(()=>{
    vaciarCarro();

    }, 2000);
        }
        });
    });
});


//listaArtesanias=[];
document.getElementById('tablabody').innerHTML+=''
cantidad.innerText=`${listaArtesanias.length}`;
document.getElementById('total').innerText = 'Total a pagar $';
localStorage.removeItem('listaArtesanias');
const fin=DateTime.now();



//get a json local

function JsonLocal() {
    const URLJSON = '/.vscode/users.json';

    fetch(URLJSON)
    .then(respuesta => respuesta.json()) 
    .then((data) => 
        console.log(data.Arte));
    
        data.Arte.forEach(Arte => {
            document.getElementById('Arte').innerHTML += `
            <tr>
            <p>${Arte.nombre}</p>
            <img src=${Arte.foto}>
            </tr>
            `;
        })

    .catch((error) => console.log(error));
    
    }
    JsonLocal();


function renderizarjsonArte(Arte){
    contenedorArtesanias.innerHTML = '';
    for(const prod of Arte){
        contenedorArte.innerHTML += `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <h6 class="card-title">${prod.nombre}</h6>
        <p class="card-text"> $ ${prod.stock}</p>
        <button id =${prod.id} class="btn btn-primary compra">Compra</button>
        </div>
    </div>
        `;
    }
}