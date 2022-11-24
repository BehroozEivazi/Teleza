import Icon from "@ant-design/icons/lib/components/Icon";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import api from "../../common/api";

function Login(props) {
    useEffect(() => {}, []);

    async function onFinish(value) {
        try {
            let res = await api.login(value);
            console.log(res);
            if (res.Token) {
                localStorage.setItem("usertoken", JSON.stringify(res));
                window.location.replace("/");
            } else {
                console.log("password kososhere dorost bezan");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form onFinish={onFinish} className="login-form">
            <Form.Item name={"Email"}>
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name={"Password"}>
                <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
}

export default React.memo(Login);
