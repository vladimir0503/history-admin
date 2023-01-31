import React from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogIn } from '../../features/auth/authSlice';
import MessageModal from '../../features/modal/component/MessageModal';
import { remindAuthData } from '../../api/telegramApi';

import './Login.scss';
import { toggleModal } from '../../features/modal/sliceModal';

const Login = () => {

    const { isLoading } = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const onFinish = values => {
        const { username, password } = values
        dispatch(fetchLogIn(username, password));
        console.log('Success:', values);
    };

    const handleRemindAuthData = async () => {
        try {
            await remindAuthData();
            dispatch(toggleModal({
                open: true,
                text: 'Данные отправлены в telegram!'
            }));
        } catch (error) {
            dispatch(toggleModal({
                open: true,
                text: 'Ошибка отправки'
            }));
            console.log(error);
        };
    };

    return (
        <div className='Login'>
            <MessageModal />
            <div className='Login__wrapper'>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Введите логин!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <a onClick={handleRemindAuthData}>Не помню логин и пароль</a>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            {!isLoading ? 'Войти' : 'Загрузка'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;