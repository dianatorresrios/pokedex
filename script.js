const listaPokemon = document.querySelector("#listaPokemon");
const botonesheader = document.querySelectorAll (".btn-header")


let URL="https://pokeapi.co/api/v2/pokemon/"

for (let i=1; i<=151;i++ ) {
    fetch(URL+i)
    .then((response) => response.json())
    .then(data=>mostrarPokemon(data))
}

function mostrarPokemon (poke) {
    let tipos=poke.types.map((type)=>`<p class="${type.type.name}tipo">${type.type.name}</p>`);
    tipos=tipos.join('');

    let poKeid= poke.id.tostring();
    if (poKeid.length === 1) {
      poKeid= "00"+poKeid;

    }  else if ( poKeid.length === 2 ){
       poKeid="0"+poKeid;

    } 
      
     
    const div=document.createElement("div");
    div.classList.add("pokemon")
    div.innerHTML=`<div class="pokemon">
    <p class="pokemon-id-back">#${poke.id}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other ["official-artwork" ].front_default}" alt="${poke.name}>
    </div>
       <div class="pokemon-info">
          <div class="nombre-contenedor">
            <p class="pokemon-id">#${poke.id}</p>                        
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
          <div class="pokemon-tipos">
         ${tipos}
          </div> 
          <div class="pokemon-stats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}kg</p>
          </div> `;
}

listaPokemon.append(div);

botonesheader.forEach(boton =>boton.addEventListener ("click",(event) => {
  const botonid =event.currentTarget.id;
  
  listaPokemon.innerHTML="",

  for (let i=1; i<=151;i++ ) {
    fetch(URL+i)
    .then((response) => response.json())
    .then(data=>{

      if(botonid==="ver-todos"){
        mostrarPokemon(data);
      } else{
        const tipos=data.types.map(type=>type.type.name);
      if(tipos.some(tipo=>tipo.includes(botonid))){
        mostrarPokemon(data)
      } 

            } 
    } )
  }     

} ))
