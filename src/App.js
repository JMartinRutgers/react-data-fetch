import "./styles.css";
import { useState, useEffect } from "react";

const query = `
query{
  alllifts{
    name
    elevationGain
    status
  }
}
`;
const opts = {
  method: "POST",
  Headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
};

function Lift({ name, elevationGain, status }) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://snowtooth.moonhighway.com", opts)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;
  console.log(data, "DATA!!!");
  return (
    <div>
      {data.data.allLifts.map((lift) => (
        <Lift
          name={lift.name}
          elevationGain={lift.elevationGain}
          status={lift.status}
        />
      ))}
    </div>
  );
}
