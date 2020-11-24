import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// se crea el context
export const CategoriasContext = createContext();

// se crea el provider donde se encuentrasn las funciones y el state
const CategoriasProvider = (props) => {
  // se crea el state
  const [categorias, setCategorias] = useState([]);

  // se ejecuta el llamado a la api
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
      const categorias = await axios.get(url);
      setCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);
  return (
    <CategoriasContext.Provider
      value={{
        categorias,
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
