import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ initializeGame, movesCount }) => (
  <div className={classes.wrapper}>
    <div className={classes.modalWindow}>
      <h1 className={classes.congratulation}>
        Congratulations, you won in {movesCount} rounds!
      </h1>
      <button className={classes.button} onClick={initializeGame}>
        Play again
      </button>
    </div>
  </div>
);

export default Modal;
