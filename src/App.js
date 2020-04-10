import React, { Component } from 'react';
import AdminFrontPage from './www/pages/index';
import { I18nextProvider } from "react-i18next";
import i18n from "./www/pages/i18n.js";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
    <AdminFrontPage></AdminFrontPage>
    </I18nextProvider>
    
  );
}

export default App;
