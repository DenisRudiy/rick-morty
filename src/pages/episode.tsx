import Main from "../../components/Main";
import { useEffect, useState } from "react";
import { Episode } from "./interfaces/episode.interafce";
import { getAllData } from "./api/ApiService";
import { useRouter } from "next/router";

const Episode = () => {
  const [data, setData] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(data);

  const router = useRouter();

  // * show more locations
  const handleShowMore = () => {
    if (data.length > visibleItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
    }
  };

  // * get current episode
  const getCurrentEpisode = (id: number) => {
    router.push(`/episode/${id}`);
  };

  // * load data from server
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getAllData("episode");
        setData(result);
        setFilteredData(result);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  return (
    <Main>
      {loading ? (
        <div className="ep_page">
          <img src="./Preloader.svg" alt="" className="preloader" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="ep_page">
          <img src="./Episodes_logo.svg" alt="" className="char_logo" />
          <div className="ep_input_fields">
            <div className="ep_input_section">
              <input type="text" className="ep_input" placeholder="Filter by name or episode (ex. S01 or S01E02)" />
            </div>
          </div>
          <div className="episodes">
            {filteredData.slice(0, visibleItems).map((item, index) => (
              <div className="ep_card" key={index} onClick={() => getCurrentEpisode(item.id)}>
                <p className="ep_name">{item.name}</p>
                <p className="ep_date">{item.air_date}</p>
                <p className="ep_episode">{item.episode}</p>
              </div>
            ))}
          </div>
          <button className="show_btn" onClick={handleShowMore}>
            Load More
          </button>
        </div>
      )}
    </Main>
  );
};

export default Episode;
