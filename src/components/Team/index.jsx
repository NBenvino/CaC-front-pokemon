import axios from "axios";
import React, { useEffect } from "react";

import { Pokemon } from "../Pokemon";

export function Team({ teamCount, setTeamCount, team, setTeam }) {
  useEffect(() => {
    setTeam(JSON.parse(localStorage.team));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (index) => {
    const newTeam = [...team];
    newTeam.splice(index, 1);
    newTeam.push(0);
    localStorage.team = JSON.stringify(newTeam);
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}${localStorage.userId}`,
      {
        team: JSON.stringify(newTeam),
      }
    );
    setTeam(newTeam);
    setTeamCount(teamCount - 1);
  };

  return (
    <>
      <div className="card-deck d-flex justify-content-center flex-wrap">
        {
          <>
            <div className="d-flex">
              <Pokemon
                key={0}
                index={0}
                id={team[0]}
                deleteThis={handleDelete}
              />
              <Pokemon
                key={1}
                index={1}
                id={team[1]}
                deleteThis={handleDelete}
              />
              <Pokemon
                key={2}
                index={2}
                id={team[2]}
                deleteThis={handleDelete}
              />
            </div>
            <div className="d-flex">
              <Pokemon
                key={3}
                index={3}
                id={team[3]}
                deleteThis={handleDelete}
              />
              <Pokemon
                key={4}
                index={4}
                id={team[4]}
                deleteThis={handleDelete}
              />
              <Pokemon
                key={5}
                index={5}
                id={team[5]}
                deleteThis={handleDelete}
              />
            </div>
          </>
        }
      </div>
    </>
  );
  //   return (
  //     <>
  //       <div className="card-deck d-flex justify-content-center flex-wrap gap-3">
  //         {team.map((value, index) => {
  //           return (
  //             <Pokemon
  //               key={index}
  //               index={index}
  //               id={value}
  //               deleteThis={handleDelete}
  //             />
  //           );
  //         })}
  //       </div>
  //     </>
  //   );
}
