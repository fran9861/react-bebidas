import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "100%",
    maxHeight: 600,
    display: "block",
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: "12px 0",
    overflow: "scroll",
  },
}));

const Receta = ({ receta }) => {
  //se extraen los valores del context
  const { setIdReceta, recetaAPI, setReceta } = useContext(ModalContext);

  // coniguracion del modal del material-ui

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //muestra y formatea los ingredientes
  const mostrarIngreientes = (recetaAPI) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (recetaAPI[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {recetaAPI[`strIngredient${i}`]} {recetaAPI[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>

        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        ></img>
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              setReceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{recetaAPI.strDrink}</h2>
              <h3>Instruciones</h3>
              <p>{recetaAPI.strInstructions}</p>
              <img
                className="img-fluid my-4"
                src={recetaAPI.strDrinkThumb}
                alt=""
              />
              <h3>Ingredintes y cantidades</h3>
              <ul>{mostrarIngreientes(recetaAPI)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
