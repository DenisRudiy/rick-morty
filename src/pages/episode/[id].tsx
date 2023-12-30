import Main from "../../../components/Main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Episode } from "../interfaces/episode.interafce";
import { Character } from "../interfaces/character.interface";
import { getCurrEpisode } from "../api/ApiService";
import { getAllCharactersFromEpisode } from "../api/LoadDataService";

const CurrentEpisodePage = () => {
  // * variables
  const router = useRouter();
  const [data, setData] = useState<Episode>(Object);
  const [charData, setCharData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const { id } = router.query;

  // * show more characters
  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 12);
  };

  // * load episode
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        if (id !== undefined) {
          const result = await getCurrEpisode(id);
          setData(result);
        }
      } finally {
        setLoading(true);
      }
    };
    fetchDataFromApi();
  }, [id]);

  // * load characters from episode
  useEffect(() => {
    try {
      getAllCharactersFromEpisode(data, visibleItems, setCharData);
    } finally {
      setLoading(true);
    }
  }, [data, visibleItems]);

  // * break loading after characters loaded
  useEffect(() => {
    try {
      if (charData.length !== 0) {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    } finally {
    }
  }, [charData]);

  return (
    <Main>
      {loading ? (
        <div className="curr_loc_page_load">
          <img src="./../Preloader.svg" alt="" className="preloader" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="curr_loc_page">
          <div className="curr_loc_header">
            <Link className="loc_back_btn" href="/episode">
              <img src="/arrowBack.svg" alt="" />
              Go Back
            </Link>
            <p className="curr_loc_name">{data.name}</p>
          </div>
          <div className="curr_loc_details">
            <div className="curr_opt_1">
              <p className="opt_big">Episode</p>
              <p className="opt_small">{data.episode}</p>
            </div>
            <div className="curr_opt_2">
              <p className="opt_big">Date</p>
              <p className="opt_small">{data.air_date}</p>
            </div>
          </div>
          <div className="loc_data">
            <h3 className="loc_data_header">Residents</h3>
            <div className="loc_all_chars">
              {charData.map((item, index) => (
                <div className="loc_card" key={index}>
                  <img src={item.image} alt="" className="loc_image" />
                  <div className="loc_info">
                    <p className="loc_name">{item.name}</p>
                    <p className="loc_species">{item.species}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="loc_btn_block">
              <button className="show_btn" onClick={handleShowMore}>
                Load More
              </button>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default CurrentEpisodePage;
