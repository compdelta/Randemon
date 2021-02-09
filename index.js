$(window).load(function () {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");
});

const customOptions = {
  protocol: "https",
  cache: true,
  cacheImages: true,
};
const P = new Pokedex.Pokedex(customOptions);
const Button = document.getElementById("button");
const Habitat = document.getElementById("habitat");
const Number = document.getElementById("number");
const Name = document.getElementById("name");
const Genus = document.getElementById("genus");
const Height = document.getElementById("height");
const Weight = document.getElementById("weight");
const Image = document.getElementById("image");
const Flavor = document.getElementById("flavor");
let randomNumber = 0;

Button.addEventListener("click", (doThis) => {
  Button.classList.remove("animation");
  void Button.offsetWidth;
  Button.classList.add("animation");

  let randomNumber = Math.floor(Math.random() * 200 + 1);

  P.getPokemonSpeciesByName(randomNumber)
    .then((res) => {
      Habitat.innerHTML = res.habitat.name + " POKéMON";
      if (randomNumber < 10) {
        Number.innerHTML = "No00" + randomNumber;
      } else if (randomNumber > 9 && randomNumber < 100) {
        Number.innerHTML = "No0" + randomNumber;
      } else {
        Number.innerHTML = "No" + randomNumber;
      }
      Name.innerHTML = res.varieties[0].pokemon.name;
      Genus.innerHTML = res.genera[7].genus.split(" ").slice(0, -1).join(" ");
      Image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/bf410e0800a1a755af809304346d0731879a7754/sprites/pokemon/other/dream-world/${randomNumber}.svg`;
      Flavor.innerHTML = res.flavor_text_entries[10].flavor_text;
      return P.getPokemonByName(randomNumber);
    })
    .then((res) => {
      Weight.innerHTML = Math.round(res.weight * 0.22046 * 10) / 10 + " lbs.";
      let heightInches = Math.round(res.height * 3.937);
      let heightFeet = heightInches / 12;
      let remainderInches = heightInches - Math.floor(heightFeet) * 12;
      Height.innerHTML =
        Math.floor(heightFeet) +
        "'" +
        remainderInches.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        '"';
    });
}).catch((err) => console.error(err));
