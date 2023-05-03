import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};
async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();
  console.log(lat, long);
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;
  console.log(results, lat, long);

  return (
    <div>
      <div>
        <div>
          <h2>Todays Overview</h2>
          <p>
            Last Updated at:{" "}
            {new Date(results.current_weather.time).toLocaleString()}(
            {results.timezone})
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
