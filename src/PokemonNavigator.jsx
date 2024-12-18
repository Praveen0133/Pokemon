import { useEffect, useState } from "react";
import usePokemonNavigator from "./usePokemonNavigator";
import axios from "axios";

const PokemonNavigator = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://react-projrct-cfffa-default-rtdb.firebaseio.com/users.json"
        );

        const data = response.data;

        if (Array.isArray(data)) {
          const pokemonData = data.map((pokemon) => ({
            name: pokemon.name,
            image: pokemon.image, 
          }));
          setPokemonList(pokemonData);
        } else {
          console.error("Invalid API data format. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    currentIndex,
    isFirst,
    isLast,
    selectPokemon,
    nextPokemon,
    prevPokemon,
  } = usePokemonNavigator(pokemonList);

  if (loading) {
    return <h2>Loading... Pokemon.......</h2>;
  }

  const currentPokemonData = pokemonList[currentIndex];
  const currentPokemonName = currentPokemonData ? currentPokemonData.name : "";
  const currentPokemonImage = currentPokemonData ? currentPokemonData.image : "";

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{border:"1px solid black ",padding:"20px",borderRadius:"16px" ,width:"50%",margin:"auto"}}>Pokemon Navigator</h1>

      {}
      <select style={{    padding: "16px",
    borderRadius: "10px", marginTop:"20px"}}
        value={currentIndex}
        onChange={(e) => selectPokemon(Number(e.target.value))}
      >
        {pokemonList.map((pokemon, index) => (
          <option key={index} value={index}>
            {pokemon.name}
          </option>
        ))}
      </select>

      <div style={{ margin: "20px 0" }}>
        {}


        {}
        <div style={{  border:"1px solid black" ,margin:"auto", width: "24%",
    padding: "16px",
    borderRadius: "16px",
    color: "red"}}>
          <span style={{ margin: "0 15px", fontSize: "1.2em" }}>
            {currentPokemonName || "No Pokemon Selected"}
          </span>
        </div>

        {}
        {currentPokemonImage && (
          <div>
            <img
              src={currentPokemonImage}
              alt={currentPokemonName}
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        )}

        {}
        <button style={{    padding: "12px",
    width: "9%",
    borderRadius: "16px",
    border: "1px solid black",
    color: "white",
    backgroundColor: "teal",
    margin: "0 12px 0 0",
}} onClick={prevPokemon} disabled={isFirst}>
          Prev
        </button>
        

        <button style={{    padding: "12px",
    width: "9%",
    borderRadius: "16px",
    border: "1px solid black",
    color: "white",
    backgroundColor: "teal",
    margin: "0 12px 0 0",
}} onClick={nextPokemon} disabled={isLast}>
          Next
        </button>


      </div>
    </div>
  );
};

export default PokemonNavigator;
