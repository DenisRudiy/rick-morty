import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Character } from "../interfaces/character.interface";
import { getCurrData } from "../api/ApiService";
import { Episode } from "../interfaces/episode.interafce";
import Link from "next/link";
import Main from "../../../components/Main";
import { getAllEpisodesFromCharacter } from "../api/LoadDataService";

const CurrentCharacterPage = () => {
  const router = useRouter();
  const [data, setData] = useState<Character>(Object);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;
  const [visibleItems, setVisibleItems] = useState(4);
  const [epData, setEpData] = useState<Episode[]>([]);

  // * get location url
  const getCurrentLocation = (url: string) => {
    const match = url.match(/\d+$/);
    const id = match ? parseInt(match[0], 10) : null;
    router.push(`/location/${id}`);
  };

  // * show more characters
  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  // * get current episode
  const getCurrentEpisode = (id: number) => {
    router.push(`/episode/${id}`);
  };

  // * load current character
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        if (id !== undefined) {
          const result = await getCurrData(id, "character");
          setData(result);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [id]);

  // * load episodes from character
  useEffect(() => {
    try {
      getAllEpisodesFromCharacter(data, visibleItems, setEpData);
    } finally {
      setLoading(true);
    }
  }, [data, visibleItems]);

  // * break loading after episodes loaded
  useEffect(() => {
    try {
      if (epData.length !== 0) {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    } finally {
    }
  }, [epData]);

  return (
    <Main>
      {loading ? (
        <div className="char_page">
          <img src="./../Preloader.svg" alt="" className="preloader" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="curr_char_page">
          <div className="curr_char_page_back_btn">
            <Link className="char_back_btn" href="/character">
              <img src="/arrowBack.svg" alt="" />
              Go Back
            </Link>
          </div>
          <div className="curr_char_info">
            <img src={data.image} alt="" className="char_image" />
            <div className="curr_char_details">
              <p className="curr_char_name">{data.name}</p>

              <div className="curr_char_more_info">
                <div className="curr_char_stat">
                  <h3>Informations</h3>
                  <div className="char_stat_item">
                    <p className="char_stat_title">Gender</p>
                    <p className="char_stat_info">{data.gender}</p>
                  </div>
                  <div className="char_stat_item">
                    <p className="char_stat_title">Status</p>
                    <p className="char_stat_info">{data.status}</p>
                  </div>
                  <div className="char_stat_item">
                    <p className="char_stat_title">Specie</p>
                    <p className="char_stat_info">{data.species}</p>
                  </div>
                  <div className="char_stat_item">
                    <p className="char_stat_title">Origin</p>
                    <p className="char_stat_info">{data.origin?.name}</p>
                  </div>
                  <div className="char_stat_item">
                    <p className="char_stat_title">Type</p>
                    <p className="char_stat_info">{data.type === "" ? "Unknown" : data.type}</p>
                  </div>
                  <div
                    className="char_stat_item_click"
                    onClick={() => {
                      getCurrentLocation(data.location?.url);
                    }}
                  >
                    <div className="click_stat">
                      <p className="char_stat_title">Location</p>
                      <p className="char_stat_info">{data.location?.name}</p>
                    </div>
                    <img src="/arrowOpen.svg" alt="" className="arrow" />
                  </div>
                </div>
                <div className="curr_char_episodes">
                  <div className="curr_char_stat">
                    <h3>Episodes</h3>

                    {epData.map((item, index) => (
                      <div className="char_ep_body" onClick={() => getCurrentEpisode(item.id)}>
                        <div className="char_ep_item">
                          <p className="char_ep_title">{item.episode}</p>
                          <p className="char_ep_info">{item.name}</p>
                          <p className="char_ep_info">{item.air_date}</p>
                        </div>
                        <img src="/arrowOpen.svg" alt="" className="arrow" />
                      </div>
                    ))}
                    <div className="ep_more">
                      <button className="show_btn" onClick={handleShowMore}>
                        Load More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default CurrentCharacterPage;
