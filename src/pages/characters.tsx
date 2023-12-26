import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Character } from "./interfaces/character.interface";
import { getAllCharacters } from "./api/ApiService";
import { applyFilters } from "./api/charFiltersService";
import { useRouter } from "next/router";

const Characters = () => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  const [filteredData, setFilteredData] = useState(data);

  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const router = useRouter();

  const handleFilterChange = () => {
    const filteredFromService = applyFilters(data, speciesFilter, genderFilter, statusFilter);
    setFilteredData(filteredFromService);
  };

  const handleShowMore = () => {
    if (data.length > visibleItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
    }
  };

  const getCurrentCharacter = (id: number) => {
    router.push(`/characters/${id}`);
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getAllCharacters();
        setData(result);
        setFilteredData(result);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [speciesFilter, genderFilter, statusFilter, data]);

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
            <input type="text" className="char_input" placeholder=" Filter by name..." />
            <select name="species" className="char_select" onChange={(e) => setSpeciesFilter(e.target.value)}>
              <option value="all" className="char_opt">
                Species
              </option>
              <option value="Human" className="char_opt">
                Human
              </option>
              <option value="Alien" className="char_opt">
                Alien
              </option>
            </select>
            <select
              name="pets"
              id="pet-select"
              className="char_select"
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="all" className="char_opt">
                Gender
              </option>
              <option value="Male" className="char_opt">
                Male
              </option>
              <option value="Female" className="char_opt">
                Female
              </option>
            </select>
            <select
              name="pets"
              id="pet-select"
              className="char_select"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all" className="char_opt">
                Status
              </option>
              <option value="Alive" className="char_opt">
                Alive
              </option>
              <option value="unknown" className="char_opt">
                unknown
              </option>
              <option value="Dead" className="char_opt">
                Dead
              </option>
            </select>
          </div>
          <div className="chars">
            {filteredData.slice(0, visibleItems).map((item, index) => (
              <div className="char_card" key={item.id}>
                <img src={item.image} alt="" className="char_image" onClick={() => getCurrentCharacter(item.id)} />
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
