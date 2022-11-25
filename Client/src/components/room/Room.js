import React, { useEffect, useMemo, useState } from "react";
import api from "../../common/api";
import utils from "../../common/utils";
import { Table } from "antd";
import { Link } from "react-router-dom";

function Room() {
    let [rooms, setRooms] = useState([]);
    let user = useMemo(() => {
        return utils.userInfo();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            let res = await api.roomsList({ Token: user.token, UserID: user.id });
            if (res && res.length > 0) {
                setRooms(res);
            }
        } catch (error) {
            console.log(error);
        }
    }

    let cols = [
        {
            title: "نام اتاق",
            dataIndex: "Name",
        },
        {
            title: "تعداد اعضا",
            dataIndex: "MemberCount",
        },
        {
            title: "ویرایش",
            dataIndex: "MemberCount",
            render: (text, row, index) => <a>ویرایش</a>,
        },
        {
            title: "شروع کنفرانس",
            dataIndex: "MemberCount",
            render: (text, row, index) => <Link to={`/ChatRoom/${row._id}`}>شروع کنفرانس</Link>,
        },
    ];
    return <Table columns={cols} dataSource={rooms} bordered rowKey="_id" pagination={false} />;
}

export default Room;
