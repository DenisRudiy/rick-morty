interface UserFiltersProps {
  onFilterChange: (filterName: string, value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilterChange }) => {
  const changeFiltersType = (filterName: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFilterChange(filterName, value);
  };

  return (
    <div className="select_body">
      <select name="species" className="select" onChange={(e) => changeFiltersType("species", e)}>
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
      <select name="pets" id="pet-select" className="select" onChange={(e) => changeFiltersType("gender", e)}>
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
      <select name="pets" id="pet-select" className="select" onChange={(e) => changeFiltersType("status", e)}>
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
  );
};

export default UserFilters;
