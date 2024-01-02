interface UserFiltersProps {
  onFilterChange: (filterName: string, value: string) => void;
}

const LocationFilters: React.FC<UserFiltersProps> = ({ onFilterChange }) => {
  const changeFiltersType = (filterName: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFilterChange(filterName, value);
  };

  return (
    <div className="select_body">
      <select name="type" className="select" onChange={(e) => changeFiltersType("type", e)}>
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
      <select name="dimension" className="select" onChange={(e) => changeFiltersType("dimension", e)}>
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
  );
};

export default LocationFilters;
