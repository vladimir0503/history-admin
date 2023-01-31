import React from 'react';
import { Layout, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';

const Header = () => {

    const dispatch = useDispatch();

    const {Title} = Typography;

    const { Header } = Layout;

    const exit = () => {
        sessionStorage.clear();
        dispatch(logOut());
    };

    return (
        <Layout className="layout">
            <Header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Title style={{color: 'white', margin: '0px'}}>Админ-панель</Title>
                <Button onClick={exit}>Выйти</Button>
            </Header>
        </Layout>
    );
};

export default Header;