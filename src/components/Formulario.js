import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  const { categorias } = useContext(CategoriasContext);

  const { buscarRecetas, setConsultar } = useContext(RecetasContext);
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const obtenerBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        buscarRecetas(busqueda);
        setConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Buscar bebidas por categoría o ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4 mt-3">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por ingrediente"
            onChange={obtenerBusqueda}
          />
        </div>
        <div className="col-md-4  mt-3">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerBusqueda}
          >
            <option value="">---Seleccione una categoría----</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4  mt-3">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar recetas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
