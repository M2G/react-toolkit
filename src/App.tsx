/* eslint-disable */
import React, { useState } from "react";
import Modal from "./Modal";

const modalRoot = document.getElementById("modal-root");

export default function App() {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const close = () => setOpen(false);

  console.log("open", open)

  return (
    <>
      <button onClick={show}>Show modal</button>
      <Modal
        mountNode={modalRoot}
        isOpen={open}
        onClose={close}
        closeOnEscape
      >
        <h1>Modal example</h1>
      </Modal>
    </>
  );
}
