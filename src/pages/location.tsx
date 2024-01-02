import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Location } from "./interfaces/locations.interface";
import { getAllData } from "./api/ApiService";
import { applyLocFilters } from "./api/FiltersService";
import { useRouter } from "next/router";
import LocationFilters from "../../components/LocationFilters";
import { useScreenWidth } from "./api/WindowWidthService";
import LocationModalFilters from "../../components/LocationModalFilters";

const Location = () => {
  // * variables
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(data);
  const [showFilterList, setShowFilterList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    dimension: "all",
  });

  const router = useRouter();
  const screenWidth = useScreenWidth();

  // * get filtered locations list
  const handleFilterChange = (filterName: string, value: string) => {
    changeFiltersType(filterName, value);
  };

  // * change filter type
  const changeFiltersType = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
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
    const filteredFromService = applyLocFilters(data, filters);
    setFilteredData(filteredFromService);
  }, [filters, data]);

  // * sort data by data from input field
  useEffect(() => {
    if (inputValue !== "") {
      const findEls = data.filter((item) => item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
      setInputData(findEls);
    } else {
      setInputData([]);
    }
  }, [inputValue]);

  // * calc count of visible items + add all-filters button
  useEffect(() => {
    if (screenWidth !== null) {
      if (screenWidth <= 1050) {
        setShowFilterList(true);
      } else {
        setShowFilterList(false);
      }
    } else {
      setShowFilterList(false);
    }
  }, [screenWidth]);

  return (
    <Main>
      {loading ? (
        <div className="char_page">
          <img src="./Preloader.svg" alt="" className="preloader" />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="char_page">
          {showModal ? (
            <div className="modal_body">
              <div className="modal">
                <div className="modal_header">
                  <h2>Filters</h2>
                  <button
                    className="close_modal"
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                  >
                    <img src="/Close-modal.svg" alt="" />
                  </button>
                </div>
                <div className="modal_main">
                  <div className="modal_select_body"></div>
                  <LocationModalFilters onFilterChange={handleFilterChange}></LocationModalFilters>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
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
            {showFilterList ? (
              <div className="select_body">
                <button
                  className="adv_filters_btn"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <img src="/Filter-list.svg" alt="" />
                  Advanced Filters
                </button>
              </div>
            ) : (
              <LocationFilters onFilterChange={handleFilterChange}></LocationFilters>
            )}
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
