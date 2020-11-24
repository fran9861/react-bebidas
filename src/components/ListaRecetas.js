import React, { useContext } from "react";
import { RecetasContext } from "../context/RecetasContext";
import Receta from "./Receta";
const ListaRecetas = () => {
  // se extraen las rcetas
  const { recetas } = useContext(RecetasContext);

  return (
    <div>
      <div className="row mt-5">
        {recetas.map((receta) => (
          <Receta key={receta.idDrink} receta={receta} />
        ))}
      </div>
    </div>
  );
};

export default ListaRecetas;
