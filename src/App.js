import logo from "./logo.png";
import Spinner from "./Components/Spinner/index";
import { gapi } from "gapi-script";
import leaderboardBg from "./images/leaderboardBackground.jpg";
import Table from "./Components/Table/Table";
import "./App.css";
import wiply from "./images/wiply.svg";
import { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [isPlayer, setIsPlayer] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fullLeaderboard, setFullLeaderboard] = useState(false);
  const [localPlayers, setLocalPlayers] = useState([]);
  const apiKey = "AIzaSyBBEmslup8GcDHnBW0bBd8Ycf2r_iuc3wI";
  let params = new URLSearchParams(document.location.search);

  const currentPlayer = {
    username: params.get("name") || 0,
    email: params.get("email") || 0,
    score: params.get("score") || 0,
    unique: "unique",
  };

  const initClient = async () => {
    await gapi.client.init({
      apiKey,
      // clientId and scope are optional if auth is not required.
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest"],
      // clientId: "167078844237-56lpjp6m7mea4l1ac6qetq14f3jbrr7b.apps.googleusercontent.com",
      // scope: "profile",
    });
  };
  useEffect(() => {
    gapi.load("client", initClient);

    function getValues(client, spreadsheetId, range) {
      try {
        client.sheets.spreadsheets.values
          .get({
            spreadsheetId: spreadsheetId,
            range: range,
          })
          .then((response) => {
            const result = response.result.values;

            // organize player leaderboards
            result.shift();



            let temp = result.map((player) => {
              return {
                username: player[0],
                email: player[1],
                score: player[4],
              };
            });


            temp.push(currentPlayer);

            temp = temp.sort(
              (playerA, playerB) => playerB.score - playerA.score
            );

            const playerRank = (player) => player.hasOwnProperty("unique");
            const rank = temp.findIndex(playerRank);

            temp.splice(rank - 1, 1);

            if (temp.length >= 4) {
              // if current player is top 3, don't need to add them again as 4th
              if (
                currentPlayer === temp[0] ||
                currentPlayer === temp[1] ||
                currentPlayer === temp[4]
              ) {
                setLocalPlayers([
                  { ...temp[0], rank: 1 },
                  { ...temp[1], rank: 2 },
                  { ...temp[4], rank: 3 },
                ]);
              } else if (isPlayer) {
                setLocalPlayers([
                  { ...temp[0], rank: 1 },
                  { ...temp[1], rank: 2 },
                  { ...temp[4], rank: 3 },
                  currentPlayer.email !== 0 ? { ...currentPlayer, rank } : "",
                ]);
              } else if (!isPlayer) {
                setLocalPlayers([
                  { ...temp[0], rank: 1 },
                  { ...temp[1], rank: 2 },
                  { ...temp[4], rank: 3 },
                ]);
              } else setLocalPlayers(temp);
            }

            setPlayers(temp);
          });
      } catch (err) {
        console.log(err.message);
        return;
      }
    }
    // This creates reference to firebase firestores collection of player documents
    //  console.log(gapi.client)
    if (currentPlayer.username !== 0) {
      setIsPlayer(true);
    } else setIsPlayer(false);

    setTimeout(() => {
      getValues(
        gapi.client,
        "1JQ26sGSLqxXlWzwTZJ7mKXzXDwCXoC7WnFkPMrHbjKU",
        "Sheet1"
      );

      setLoading(false);
    }, 1200);
  }, [gapi.client]);

  return (
    <div
      className="App h-screen"
      style={{
        backgroundImage: `url(${leaderboardBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fullcontent">
        <header>
          <div className="navbar">
            <button onClick={() => setFullLeaderboard(!fullLeaderboard)}>
              {!fullLeaderboard ? "Full Leaderboards" : "TOP 3"}
            </button>
            <h1>Leaderboards</h1>
            <button
              onClick={() =>
                (window.location.href = "https://gp1.socio-fi.com/")
              }
            >
              Try Again?
            </button>
          </div>
        </header>
        {loading ? (
          <Spinner className="absolute " />
        ) : (
          <Table
            currentPlayer={currentPlayer}
            players={fullLeaderboard ? players : localPlayers}
          />
        )}
      </div>
    </div>
  );
}

export default App;
