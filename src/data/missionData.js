export const mission = {
  name: "Artemis II",
  launchDate: "Septiembre 2025",
  duration: "10 días",
  objective: "Validar las capacidades de exploración humana de la nave Orion y el cohete SLS mediante un sobrevuelo lunar tripulado."
};

export const crew = [
  {
    id: 1,
    name: "Reid Wiseman",
    role: "Comandante",
    bio: "Veterano de la Estación Espacial Internacional y líder de la primera misión tripulada del programa Artemis.",
    image: "https://placehold.co/300x400/0b0d17/00d4ff?text=Reid+Wiseman"
  },
  {
    id: 2,
    name: "Victor Glover",
    role: "Piloto",
    bio: "Piloto de la misión Crew-1 de SpaceX, se convertirá en el primer hombre de color en viajar a la Luna.",
    image: "https://placehold.co/300x400/0b0d17/00d4ff?text=Victor+Glover"
  },
  {
    id: 3,
    name: "Christina Koch",
    role: "Especialista de Misión",
    bio: "Posee el récord del vuelo espacial más largo realizado por una mujer; será la primera mujer en viajar a la Luna.",
    image: "https://placehold.co/300x400/0b0d17/00d4ff?text=Christina+Koch"
  },
  {
    id: 4,
    name: "Jeremy Hansen",
    role: "Especialista de Misión",
    bio: "Representante de la Agencia Espacial Canadiense (CSA) y el primer canadiense en aventurarse a las cercanías lunares.",
    image: "https://placehold.co/300x400/0b0d17/00d4ff?text=Jeremy+Hansen"
  }
];

export const phases = [
  {
    id: "p1",
    title: "Lanzamiento y Ascenso",
    description: "Despegue desde el Centro Espacial Kennedy usando el cohete SLS (Space Launch System) más potente del mundo."
  },
  {
    id: "p2",
    title: "Órbita Terrestre y TLI",
    description: "Maniobras en órbita terrestre seguidas por la Inyección Trans-Lunar para dirigirse hacia nuestro satélite."
  },
  {
    id: "p3",
    title: "Sobrevuelo Lunar",
    description: "La cápsula Orion orbitará la Luna a una distancia de aproximadamente 10,000 km antes de iniciar el regreso."
  },
  {
    id: "p4",
    title: "Regreso y Amerizaje",
    description: "Reentrada atmosférica a alta velocidad y amerizaje seguro en el Océano Pacífico asistido por paracaídas."
  }
];

export const spacecraftSpecs = [
  {
    id: "s1",
    name: "Cápsula Orion",
    details: [
      { label: "Altura", value: "3.3 m" },
      { label: "Diámetro", value: "5.0 m" },
      { label: "Volumen Habitable", value: "9 m³" },
      { label: "Escudo Térmico", value: "Fenólico" }
    ]
  },
  {
    id: "s2",
    name: "Cohete SLS",
    details: [
      { label: "Altura Total", value: "98 m" },
      { label: "Empuje", value: "8.8 millones lbs" },
      { label: "Configuración", value: "Block 1" },
      { label: "Peso Lanzamiento", value: "2,600 t" }
    ]
  }
];
