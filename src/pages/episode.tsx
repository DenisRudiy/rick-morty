import Main from "../../components/Main";
import { useEffect, useState } from "react";
import { Episode } from "./interfaces/episode.interafce";
import { getAllData } from "./api/ApiService";
import { useRouter } from "next/router";

const Episode = () => {
  // * variables
  const [data, setData] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(data);
  const [typeData, setTypeData] = useState("name");

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

  // * get value from input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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

  // * sort data by data from input field
  useEffect(() => {
    if (inputValue !== "") {
      const findEls = data.filter((item) => item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
      if (findEls.length === 0) {
        const findElsEpisode = data.filter((item) => item.episode.toLowerCase().startsWith(inputValue.toLowerCase()));
        setInputData(findElsEpisode);
        setTypeData("episode");
      } else {
        setInputData(findEls);
        setTypeData("name");
      }
    } else {
      setInputData([]);
    }
  }, [inputValue]);

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
              <input
                type="text"
                className="ep_input"
                placeholder="Filter by name or episode (ex. S01 or S01E02)"
                value={inputValue}
                onChange={handleChange}
              />
              {inputValue && (
                <div className="input_ep_result">
                  {inputData.length > 0 ? (
                    inputData.map((item, index) => (
                      <div className="char_card" key={index}>
                        <button className="input_result_ep_button" onClick={() => getCurrentEpisode(item.id)}>
                          {typeData === "name" ? item.name : item.episode}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no_results">No results found</div>
                  )}
                </div>
              )}
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
