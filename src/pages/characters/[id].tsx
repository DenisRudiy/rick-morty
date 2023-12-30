import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Main from "../../../components/Main";
import { Character } from "../interfaces/character.interface";
import { getCurrCharacter } from "../api/ApiService";
import Link from "next/link";

const CurrentCharacterPage = () => {
  const router = useRouter();
  const [data, setData] = useState<Character>(Object);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  // * get location url
  const getCurrentLocation = (url: string) => {
    const match = url.match(/\d+$/);
    const id = match ? parseInt(match[0], 10) : null;
    router.push(`/location/${id}`);
  };

  // * load current character
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        if (id !== undefined) {
          const result = await getCurrCharacter(id);
          setData(result);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [id]);

  return (
    <Main>
      {loading ? (
        <div className="char_page">
          <img src="./../Preloader.svg" alt="" className="preloader" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="curr_char_page">
          <Link className="char_back_btn" href="/characters">
            <img src="/arrowBack.svg" alt="" />
            Go Back
          </Link>
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
                    <img src="/arrowOpen.svg" alt="" />
                  </div>
                </div>
                <div className="curr_char_more_info">
                  <div className="curr_char_stat">
                    <h3>Episodes</h3>
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
                    <div className="char_stat_item">
                      <p className="char_stat_title">Location</p>
                      <p className="char_stat_info">{data.location?.name}</p>
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
