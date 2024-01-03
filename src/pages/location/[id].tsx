import Main from "../../../components/Main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrData } from "../api/ApiService";
import { Location } from "../../interfaces/locations.interface";
import { Character } from "../../interfaces/character.interface";
import { getAllCharactersFromLocation } from "../api/LoadDataService";

const CurrentLocationPage = () => {
  // * variables
  const router = useRouter();
  const [data, setData] = useState<Location>(Object);
  const [charData, setCharData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const { id } = router.query;

  // * show more characters
  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 12);
  };

  // * get current character
  const getCurrentCharacter = (id: number) => {
    router.push(`/character/${id}`);
  };

  // * load location
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        if (id !== undefined) {
          const result = await getCurrData(id, "location");
          setData(result);
        }
      } finally {
        setLoading(true);
      }
    };
    fetchDataFromApi();
  }, [id]);

  // * load characters from location
  useEffect(() => {
    try {
      getAllCharactersFromLocation(data, visibleItems, setCharData);
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
      } else {
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
            <Link className="loc_back_btn" href="/location">
              <img src="/arrowBack.svg" alt="" />
              Go Back
            </Link>
            <p className="curr_loc_name">{data.name}</p>
          </div>
          <div className="curr_loc_details">
            <div className="curr_opt_1">
              <p className="opt_big">Type</p>
              <p className="opt_small">{data.type}</p>
            </div>
            <div className="curr_opt_2">
              <p className="opt_big">Dimension</p>
              <p className="opt_small">{data.dimension}</p>
            </div>
          </div>
          <div className="loc_data">
            <h3 className="loc_data_header">Residents</h3>
            <div className="loc_all_chars">
              {charData.map((item, index) => (
                <div className="loc_card" key={index} onClick={() => getCurrentCharacter(item.id)}>
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

export default CurrentLocationPage;
