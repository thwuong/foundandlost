import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      Home Page
      <Link to={"/login"}>login</Link>
    </div>
  );
}

export default Home;
