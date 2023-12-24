import { useEffect, useState } from "react";
import Main from "../../components/Main";
import { Character } from "./interfaces/character.interface";

const Characters = ({ characters }: any) => {
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    setData(characters);
  });

  console.log(data);

  return (
    <Main>
      <div className="char_page">
        <img src="./Characters_logo.svg" alt="" className="char_logo" />
        <div className="char_input_fields">
          <input
            type="text"
            className="char_input"
            placeholder=" Filter by name..."
          />
          <select name="pets" id="pet-select" className="char_select">
            <option value="">Species</option>
            <option value="dog">Dog</option>
          </select>
          <select name="pets" id="pet-select" className="char_select">
            <option value="">Gender</option>
            <option value="dog">Dog</option>
          </select>
          <select name="pets" id="pet-select" className="char_select">
            <option value="">Status</option>
            <option value="dog">Dog</option>
          </select>
        </div>
        {/* {data.map((item, index) => (
          <img key={index} src={item.image}></img>
        ))} */}
        <div className="char_card">
          <img
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            alt=""
            className="char_image"
          />
          <div className="char_info"></div>
        </div>
      </div>
    </Main>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return {
    props: { characters: data.results },
  };
};

export default Characters;