import React from "react";
import "./App.css";
import { hot } from "react-hot-loader/root";

import "./firebase";
import ContactUsForm from "./pages/ContactUsForm";

const App = () => {
  return (
    <>
      <ContactUsForm />
    </>
  );
};

export default hot(App);
