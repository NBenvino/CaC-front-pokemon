import axios from "axios";
import React, { useState, useEffect } from "react";

const capitalize = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

const pokemonBase = {
  name: null,
  sprite: null,
  type1: null,
  type2: null,
};

export function Pokemon({ id, deleteThis, index }) {
  const [pokemon, setPokemon] = useState(pokemonBase);

  const getPokemonData = async () => {
    let pkmn = pokemonBase;
    if (id && id !== 0 && id !== "0") {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        pkmn = {
          name: data.name,
          sprite: data.sprites.front_default,
          type1: data.types[0] ? data.types[0].type.name : null,
          type2: data.types[1] ? data.types[1].type.name : null,
        };
      } catch (error) {
        console.log(`Error en el id ${id}! ${error}`);
      }
    }
    setPokemon(pkmn);
  };

  useEffect(() => {
    getPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div
        className="card bg-secondary m-1 flex-grow-2"
        style={{ width: 115, height: 225 }}
      >
        {pokemon.sprite ? (
          <>
            <div className="d-flex position-absolute">
              <button
                onClick={() => {
                  deleteThis(index);
                }}
                className="btn btn-outline-danger rounded-pill border-0"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            <img src={pokemon.sprite} alt="" className="mt-2"></img>
          </>
        ) : (
          <i
            className="fa-sharp fa-solid fa-plus d-flex justify-content-center align-items-center mt-2"
            style={{ height: 103 }}
          ></i>
        )}

        <div className="card-body text-center px-2 pt-0">
          <div
            className="card-title m-0 align-center mb-2"
            style={{ height: 48 }}
          >
            {pokemon.name ? capitalize(pokemon.name) : <>----------</>}
          </div>
          <div className="d-flex flex-column card-body p-0 align-items-center justify-content-center h-50">
            {pokemon.type1 ? (
              <div className="card-text ">
                <img
                  className="rounded-pill"
                  src={require(`../../img/${pokemon.type1}.jpg`)}
                  alt=""
                ></img>
              </div>
            ) : (
              <></>
            )}
            {pokemon.type2 ? (
              <div className="card-text">
                <img
                  className="rounded-pill"
                  src={require(`../../img/${pokemon.type2}.jpg`)}
                  alt=""
                ></img>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
