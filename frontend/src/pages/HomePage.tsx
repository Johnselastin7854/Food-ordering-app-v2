import LandingImage from "../assets/landing.png";
import DownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handlesubmit = (searchFormvalues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormvalues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 xbg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl ">Food is just a click away!</span>
        <SearchBar
          placeHolder="search by City or Town"
          onSubmit={handlesubmit}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={LandingImage} alt="Landing Image" />
        <div className="flex flex-col items-center md:items-start justify-center gap-4 ">
          <span className="font-bold text-orange-600 text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations.
          </span>
          <img
            src={DownloadImage}
            alt="app download link"
            className="md:w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
