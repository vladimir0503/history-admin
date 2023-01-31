import React from 'react';
import Title from '../../../components/common/Title';
import Wrapper from '../../../components/common/wrapper/Wrapper';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminData, changeAdminData } from '../adminSlice';

const Admin = () => {
  const { adminData, isLoading } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const changeData = value => {
    dispatch(changeAdminData(value));
  };

  React.useEffect(() => {
    dispatch(fetchAdminData())
  }, []);

  return (
    <Wrapper>
      <Title text='Логин/пароль' />
      <Form
        name="basic"
        onFinish={changeData}
        autoComplete="off"
        wrapperCol={{ span: 15 }}
      >
        <Form.Item
          name="login"
        >
          <Input
            placeholder={adminData?.login}
          />
        </Form.Item>

        <Form.Item
          name="password"
        >
          <Input
            placeholder={adminData?.password}
          />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            {!isLoading ? 'Изменить данные' : 'Обновление'}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Admin;