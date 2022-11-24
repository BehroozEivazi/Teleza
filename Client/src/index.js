import React from "react";

import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import App from "./App";
import "./assets/style.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ConfigProvider direction="rtl">
        <Router>
            <App />
        </Router>
    </ConfigProvider>
);
