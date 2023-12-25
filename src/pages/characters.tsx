import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Character } from "./interfaces/character.interface";
import getAllCharacters from "./api/ApiService";

const Characters = () => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getAllCharacters();
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleShowMore = () => {
    if (data.length > visibleItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
    }
  };

  return (
    <Main>
      {loading ? (
        <div className="char_page">
          <img src="./Preloader.svg" alt="" className="preloader" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="char_page">
          <img src="./Characters_logo.svg" alt="" className="char_logo" />
          <div className="char_input_fields">
            <input
              type="text"
              className="char_input"
              placeholder=" Filter by name..."
            />
            <select name="pets" id="pet-select" className="char_select">
              <option value="all" className="char_opt">
                Species
              </option>
              <option value="human" className="char_opt">
                Human
              </option>
              <option value="alien" className="char_opt">
                Alien
              </option>
            </select>
            <select name="pets" id="pet-select" className="char_select">
              <option value="gender" className="char_opt">
                Gender
              </option>
              <option value="male" className="char_opt">
                Male
              </option>
              <option value="female" className="char_opt">
                Female
              </option>
            </select>
            <select name="pets" id="pet-select" className="char_select">
              <option value="status" className="char_opt">
                Status
              </option>
              <option value="alive" className="char_opt">
                Alive
              </option>
              <option value="unknown" className="char_opt">
                unknown
              </option>
              <option value="dead" className="char_opt">
                Dead
              </option>
            </select>
          </div>
          <div className="chars">
            {data.slice(0, visibleItems).map((item, index) => (
              <div className="char_card">
                <img src={item.image} alt="" className="char_image" />
                <div className="char_info">
                  <p className="char_name">{item.name}</p>
                  <p className="char_species">{item.species}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="char_show_btn" onClick={handleShowMore}>
            Load More
          </button>
        </div>
      )}
    </Main>
  );
};

export default Characters;
