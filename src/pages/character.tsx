import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Character } from "./interfaces/character.interface";
import { getAllCharacters } from "./api/ApiService";
import { applyCharFilters } from "./api/FiltersService";
import { useRouter } from "next/router";

const Character = () => {
  // * variables
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(data);
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const router = useRouter();

  // * get filtered chars list
  const handleFilterChange = () => {
    const filteredFromService = applyCharFilters(data, speciesFilter, genderFilter, statusFilter);
    setFilteredData(filteredFromService);
  };

  // * show more characters
  const handleShowMore = () => {
    if (data.length > visibleItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
    }
  };

  // * get current character
  const getCurrentCharacter = (id: number) => {
    router.push(`/character/${id}`);
  };

  // * get value from input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // * load data from server
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

  // * call filter function if options is changed
  useEffect(() => {
    handleFilterChange();
  }, [speciesFilter, genderFilter, statusFilter, data]);

  // * sort data by data from input field
  useEffect(() => {
    if (inputValue !== "") {
      const findEls = data.filter((item) => item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
      setInputData(findEls);
    } else {
      setInputData([]);
    }
  }, [inputValue]);

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
            <div className="char_input_section">
              <input
                type="text"
                className="char_input"
                placeholder="Filter by name..."
                value={inputValue}
                onChange={handleChange}
              />
              {inputValue && (
                <div className="input_result">
                  {inputData.length > 0 ? (
                    inputData.map((item, index) => (
                      <div className="char_card" key={index}>
                        <button className="input_result_button" onClick={() => getCurrentCharacter(item.id)}>
                          {item.name}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no_results">No results found</div>
                  )}
                </div>
              )}
            </div>

            <select name="species" className="select" onChange={(e) => setSpeciesFilter(e.target.value)}>
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
            <select name="pets" id="pet-select" className="select" onChange={(e) => setGenderFilter(e.target.value)}>
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
            <select name="pets" id="pet-select" className="select" onChange={(e) => setStatusFilter(e.target.value)}>
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
              <div className="char_card" key={index}>
                <img src={item.image} alt="" className="char_image" onClick={() => getCurrentCharacter(item.id)} />
                <div className="char_info">
                  <p className="char_name">{item.name}</p>
                  <p className="char_species">{item.species}</p>
                </div>
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

export default Character;
