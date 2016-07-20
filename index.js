const hyperquest = require('hyperquest')
const fs = require('fs')
const gm = require('gm').subClass({imageMagick: true})

/**
 * Source from http://www.pokemon.com/us/pokedex/
 */
const pokemons = [
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    "name": "Bulbasaur"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    "name": "Ivysaur"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
    "name": "Venusaur"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    "name": "Charmander"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
    "name": "Charmeleon"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
    "name": "Charizard"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    "name": "Squirtle"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/008.png",
    "name": "Wartortle"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",
    "name": "Blastoise"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png",
    "name": "Caterpie"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/011.png",
    "name": "Metapod"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png",
    "name": "Butterfree"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
    "name": "Weedle"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/014.png",
    "name": "Kakuna"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png",
    "name": "Beedrill"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
    "name": "Pidgey"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png",
    "name": "Pidgeotto"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/018.png",
    "name": "Pidgeot"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
    "name": "Rattata"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/020.png",
    "name": "Raticate"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
    "name": "Spearow"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/022.png",
    "name": "Fearow"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
    "name": "Ekans"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/024.png",
    "name": "Arbok"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
    "name": "Pikachu"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/026.png",
    "name": "Raichu"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
    "name": "Sandshrew"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/028.png",
    "name": "Sandslash"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/029.png",
    "name": "Nidoran♀"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/030.png",
    "name": "Nidorina"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/031.png",
    "name": "Nidoqueen"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/032.png",
    "name": "Nidoran♂"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/033.png",
    "name": "Nidorino"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/034.png",
    "name": "Nidoking"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
    "name": "Clefairy"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/036.png",
    "name": "Clefable"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
    "name": "Vulpix"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/038.png",
    "name": "Ninetales"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/039.png",
    "name": "Jigglypuff"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/040.png",
    "name": "Wigglytuff"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/041.png",
    "name": "Zubat"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/042.png",
    "name": "Golbat"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/043.png",
    "name": "Oddish"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/044.png",
    "name": "Gloom"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/045.png",
    "name": "Vileplume"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/046.png",
    "name": "Paras"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/047.png",
    "name": "Parasect"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/048.png",
    "name": "Venonat"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/049.png",
    "name": "Venomoth"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/050.png",
    "name": "Diglett"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/051.png",
    "name": "Dugtrio"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/052.png",
    "name": "Meowth"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/053.png",
    "name": "Persian"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/054.png",
    "name": "Psyduck"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/055.png",
    "name": "Golduck"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/056.png",
    "name": "Mankey"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/057.png",
    "name": "Primeape"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/058.png",
    "name": "Growlithe"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/059.png",
    "name": "Arcanine"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/060.png",
    "name": "Poliwag"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/061.png",
    "name": "Poliwhirl"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/062.png",
    "name": "Poliwrath"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/063.png",
    "name": "Abra"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/064.png",
    "name": "Kadabra"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
    "name": "Alakazam"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/066.png",
    "name": "Machop"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/067.png",
    "name": "Machoke"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/068.png",
    "name": "Machamp"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/069.png",
    "name": "Bellsprout"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/070.png",
    "name": "Weepinbell"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/071.png",
    "name": "Victreebel"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/072.png",
    "name": "Tentacool"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/073.png",
    "name": "Tentacruel"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/074.png",
    "name": "Geodude"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/075.png",
    "name": "Graveler"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/076.png",
    "name": "Golem"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/077.png",
    "name": "Ponyta"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/078.png",
    "name": "Rapidash"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/079.png",
    "name": "Slowpoke"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/080.png",
    "name": "Slowbro"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/081.png",
    "name": "Magnemite"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/082.png",
    "name": "Magneton"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/083.png",
    "name": "Farfetch'd"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/084.png",
    "name": "Doduo"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/085.png",
    "name": "Dodrio"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/086.png",
    "name": "Seel"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/087.png",
    "name": "Dewgong"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/088.png",
    "name": "Grimer"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/089.png",
    "name": "Muk"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/090.png",
    "name": "Shellder"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/091.png",
    "name": "Cloyster"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/092.png",
    "name": "Gastly"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/093.png",
    "name": "Haunter"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/094.png",
    "name": "Gengar"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/095.png",
    "name": "Onix"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/096.png",
    "name": "Drowzee"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/097.png",
    "name": "Hypno"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/098.png",
    "name": "Krabby"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/099.png",
    "name": "Kingler"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/100.png",
    "name": "Voltorb"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/101.png",
    "name": "Electrode"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/102.png",
    "name": "Exeggcute"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/103.png",
    "name": "Exeggutor"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/104.png",
    "name": "Cubone"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/105.png",
    "name": "Marowak"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/106.png",
    "name": "Hitmonlee"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/107.png",
    "name": "Hitmonchan"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/108.png",
    "name": "Lickitung"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/109.png",
    "name": "Koffing"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/110.png",
    "name": "Weezing"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/111.png",
    "name": "Rhyhorn"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/112.png",
    "name": "Rhydon"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/113.png",
    "name": "Chansey"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/114.png",
    "name": "Tangela"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/115.png",
    "name": "Kangaskhan"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/116.png",
    "name": "Horsea"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/117.png",
    "name": "Seadra"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/118.png",
    "name": "Goldeen"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/119.png",
    "name": "Seaking"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/120.png",
    "name": "Staryu"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/121.png",
    "name": "Starmie"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/122.png",
    "name": "Mr. Mime"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/123.png",
    "name": "Scyther"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/124.png",
    "name": "Jynx"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/125.png",
    "name": "Electabuzz"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/126.png",
    "name": "Magmar"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/127.png",
    "name": "Pinsir"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/128.png",
    "name": "Tauros"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/129.png",
    "name": "Magikarp"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/130.png",
    "name": "Gyarados"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/131.png",
    "name": "Lapras"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/132.png",
    "name": "Ditto"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/133.png",
    "name": "Eevee"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/134.png",
    "name": "Vaporeon"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/135.png",
    "name": "Jolteon"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/136.png",
    "name": "Flareon"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/137.png",
    "name": "Porygon"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/138.png",
    "name": "Omanyte"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/139.png",
    "name": "Omastar"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/140.png",
    "name": "Kabuto"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/141.png",
    "name": "Kabutops"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/142.png",
    "name": "Aerodactyl"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/143.png",
    "name": "Snorlax"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/144.png",
    "name": "Articuno"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/145.png",
    "name": "Zapdos"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/146.png",
    "name": "Moltres"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/147.png",
    "name": "Dratini"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/148.png",
    "name": "Dragonair"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/149.png",
    "name": "Dragonite"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/150.png",
    "name": "Mewtwo"
  },
  {
    "imgSrc": "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/151.png",
    "name": "Mew"
  }
]

pokemons.forEach(function (pokemon) {
  var readStream = hyperquest.get(pokemon.imgSrc)
  gm(readStream)
    .resize('128', '128')
    .stream()
    .pipe(fs.createWriteStream(`./images/${pokemon.name.toLowerCase()}.png`))
})
