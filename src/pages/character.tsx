import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Character } from "./interfaces/character.interface";
import { getAllData } from "./api/ApiService";
import { applyCharFilters } from "./api/FiltersService";
import { useScreenWidth } from "./api/WindowWidthService";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import UserFilters from "../../components/UserFilters";
import UserModalFilters from "../../components/UserModalFilters";
import { useRouter } from "next/navigation";

const Character = () => {
  // * variables
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState(data);
  const [filters, setFilters] = useState({
    species: "all",
    gender: "all",
    status: "all",
  });
  const [showFilterList, setShowFilterList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const screenWidth = useScreenWidth();

  // * get filtered chars list
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

  // * show more characters
  const handleShowMore = () => {
    if (data.length > visibleItems) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 12);
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
        const result = await getAllData("character");
        setData(result);
        setFilteredData(result);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  // * call filter function if options are changed
  useEffect(() => {
    const filteredFromService = applyCharFilters(data, filters);
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
      setShowFilterList(true);
    } else {
      setShowFilterList(false);
    }
  }, [screenWidth]);

  // * use body-scroll-lock lib to lock scroll when modal is shown
  useEffect(() => {
    if (showModal) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [showModal]);

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
                  <UserModalFilters onFilterChange={handleFilterChange}></UserModalFilters>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

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
              <div className="select_body">
                <UserFilters onFilterChange={handleFilterChange}></UserFilters>
              </div>
            )}
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
