import { useState, useEffect } from "react";

import { Team } from "../Team";
import { Search } from "../Search";
import axios from "axios";

export function Home() {
  const [teamCount, setTeamCount] = useState(0);
  const [team, setTeam] = useState([]);

  const teamCounter = () => {
    let team = [0];
    if (localStorage.team) team = JSON.parse(localStorage.team);
    let counter = 0;
    team.forEach((pkmn) => (pkmn !== 0 ? counter++ : counter));
    setTeamCount(counter);
  };

  useEffect(() => {
    teamCounter();
    // eslint-disable-next-line
  }, []);

  const handleTeam = async (pkmnId) => {
    let team = JSON.parse(localStorage.team);
    team[teamCount] = pkmnId;
    setTeamCount(teamCount + 1);
    localStorage.team = JSON.stringify(team);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}${localStorage.userId}`,
        {
          team: JSON.stringify(team),
        }
      );
    } catch (error) {
      console.log(error);
    }
    setTeam(team);
  };

  return (
    <>
      <section className="d-flex flex-column align-items-center m-2">
        {localStorage.userId ? (
          <>
            <h2>Hola {localStorage.userNick}!</h2>
            <Team
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              team={team}
              setTeam={setTeam}
            />
          </>
        ) : (
          <>
            <p className="text-center">
              Hola extraño! Si quieres crear y guardar tu propio equipo,
              regístrate e ingresa!
            </p>
          </>
        )}
      </section>
      <Search addPkmn={handleTeam} teamCount={teamCount} />
    </>
  );
}
