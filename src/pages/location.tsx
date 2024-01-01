import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Location } from "./interfaces/locations.interface";
import { getAllData } from "./api/ApiService";
import { applyLocFilters } from "./api/FiltersService";
import { useRouter } from "next/router";

const Location = () => {
  // * variables
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(data);
  const [typeFilter, setTypeFilter] = useState("all");
  const [dimensionFilter, setDimensionFilter] = useState("all");

  const router = useRouter();

  // * get filtered locations list
  const handleFilterChange = () => {
    const filteredFromService = applyLocFilters(data, typeFilter, dimensionFilter);
    setFilteredData(filteredFromService);
  };

  // * show more locations
  const handleShowMore = () => {
    if (data.length > visibleItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
    }
  };

  // * get current location
  const getCurrentLocation = (id: number) => {
    router.push(`/location/${id}`);
  };

  // * get value from input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // * load data from server
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getAllData("location");
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
  }, [typeFilter, dimensionFilter, data]);

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
          <img src="./Locations_logo.svg" alt="" className="char_logo" />
          <div className="char_input_fields">
            <div className="char_input_section">
              <input
                type="text"
                className="loc_input"
                placeholder="Filter by name..."
                value={inputValue}
                onChange={handleChange}
              />
              {inputValue && (
                <div className="input_loc_result">
                  {inputData.length > 0 ? (
                    inputData.map((item, index) => (
                      <div className="char_card" key={index}>
                        <button className="input_result_loc_button" onClick={() => getCurrentLocation(item.id)}>
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

            <select name="type" className="select" onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all" className="char_opt">
                Type
              </option>
              <option value="Planet" className="char_opt">
                Planet
              </option>
              <option value="Cluster" className="char_opt">
                Cluster
              </option>
              <option value="Space station" className="char_opt">
                Space station
              </option>
              <option value="Microverse" className="char_opt">
                Microverse
              </option>
              <option value="TV" className="char_opt">
                TV
              </option>
              <option value="Resort" className="char_opt">
                Resort
              </option>
              <option value="Fantasy town" className="char_opt">
                Fantasy town
              </option>
              <option value="Dream" className="char_opt">
                Dream
              </option>
            </select>
            <select name="dimension" className="select" onChange={(e) => setDimensionFilter(e.target.value)}>
              <option value="all" className="char_opt">
                Dimension
              </option>
              <option value="Dimension C-137" className="char_opt">
                Dimension C-137
              </option>
              <option value="unknown" className="char_opt">
                unknown
              </option>
              <option value="Post-Apocalyptic Dimension" className="char_opt">
                Post-Apocalyptic Dimension
              </option>
              <option value="Replacement Dimension" className="char_opt">
                Replacement Dimension
              </option>
              <option value="Cronenberg Dimension" className="char_opt">
                Cronenberg Dimension
              </option>
              <option value="Fantasy Dimension" className="char_opt">
                Fantasy Dimension
              </option>
              <option value="Dimension 5-126" className="char_opt">
                Dimension 5-126
              </option>
            </select>
          </div>
          <div className="locations">
            {filteredData.slice(0, visibleItems).map((item, index) => (
              <div className="loc_card" key={index} onClick={() => getCurrentLocation(item.id)}>
                <p className="loc_name">{item.name}</p>
                <p className="loc_type">{item.type}</p>
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

export default Location;
