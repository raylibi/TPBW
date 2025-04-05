import TravelMap from "../components/TravelMap";

const HomePage = () => {
  return (
    <div>      
      <h1 className="text-2xl font-bold mb-4">Travel Agent Map</h1>
      <TravelMap /> {/* This will display the OpenStreetMap */}
    </div>
  );
};

export default HomePage;