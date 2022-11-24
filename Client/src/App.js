import React from "react";
import { Routes, Route } from "react-router-dom";
import utils from "./common/utils";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/home/Home";
import Header from "./components/navigation/Header";
import { Layout } from "antd";
import Aside from "./components/navigation/Aside";
import Footers from "./components/navigation/Footer";
const { Content } = Layout;
function App() {
    if (utils.userInfo().isLogin) {
        return (
            <Layout>
                <Header />
                <Layout>
                    <Aside />
                    <Content>
                        <Routes>
                            <Route exact path="/" element={<Home />}></Route>
                        </Routes>
                        {/* <Footers /> */}
                    </Content>
                </Layout>
            </Layout>
        );
    } else {
        return (
            <Routes>
                <Route exact path="/" element={<Login />}></Route>
                <Route exact path="login" element={<Login />}></Route>
                <Route exact path="signUp" element={<SignUp />}></Route>
            </Routes>
        );
    }
}

export default App;
