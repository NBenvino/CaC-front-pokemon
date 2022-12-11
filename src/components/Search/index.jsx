import axios from "axios";
import React, { useState } from "react";

const capitalize = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

export function Search({ addPkmn, teamCount }) {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      setPokemon(data);
    } catch (error) {
      setPokemon({});
      console.log(`Error! ${error}`);
    }
  };

  return (
    <>
      <h3 className="m-3 text-center">
        Para buscar un pokemon, ingresa su nombre o numero en la dex
      </h3>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="pikachu"
          />
          <button className="btn btn-outline-info" type="submit">
            Buscar
          </button>
        </div>
      </form>

      {pokemon.name ? (
        <>
          <div className="card text-bg-dark">
            <img
              src={pokemon.sprites.front_default}
              className="img-fluid mx-auto"
              alt=""
            />
            <div className="card-header text-center">
              {capitalize(pokemon.name)}
            </div>
            <div className="card-body">
              <div className="card-text d-flex justify-content-center">
                {pokemon.types[0] ? (
                  <div className="card-text m-1">
                    <img
                      className="rounded-pill"
                      src={require(`../../img/${pokemon.types[0].type.name}.jpg`)}
                      alt=""
                    ></img>
                  </div>
                ) : (
                  <></>
                )}
                {pokemon.types[1] ? (
                  <div className="card-text m-1">
                    <img
                      className="rounded-pill"
                      src={require(`../../img/${pokemon.types[1].type.name}.jpg`)}
                      alt=""
                    ></img>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <table className="table table-dark table-borderless text-center">
                <thead>
                  <tr>
                    <th>HP</th>
                    <th>Atk</th>
                    <th>Def</th>
                    <th>SAtk</th>
                    <th>SDef</th>
                    <th>Vel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {pokemon.stats.map((stat, index) => {
                      return <td key={index}>{stat.base_stat}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                {localStorage.userId && teamCount < 6 ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => addPkmn(pokemon.id)}
                  >
                    Agregar al equipo
                  </button>
                ) : (
                  <button className="btn btn-outline-secondary disabled">
                    Agregar al equipo
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No se encontró ningún pokemon</p>
      )}
    </>
  );
}
