import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { changeReviewsData, deleteReviewsItem } from '../reviewsSlice';

const Review = ({ url, name, text, id }) => {

    const [editMode, setEditMode] = React.useState(false);
    const [update, setUpdate] = React.useState(false);

    const { Meta } = Card;

    const dispatch = useDispatch();

    const onFinish = async values => {
        setUpdate(update => !update);
        await dispatch(changeReviewsData({ ...values, key: id }))
        setEditMode(editMode => !editMode);
        setUpdate(update => !update);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const toggleMode = () => {
        setEditMode(editMode => !editMode);
    };

    const deleteItem = () => {
        dispatch(deleteReviewsItem(id))
    };

    return (
        <Card
            style={{
                width: 300,
                marginRight: '10px',
                marginBottom: '10px'
            }}
            cover={
                !editMode
                && <img
                    alt="example"
                    src={url}
                />
            }
            actions={[
                <EditOutlined onClick={toggleMode} key="edit" />,
                <DeleteFilled onClick={deleteItem} key="delete" />
            ]}
        >
            {!editMode
                ? <Meta
                    title={name}
                    description={text}
                />
                : <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ url, name, text }}
                >
                    <Form.Item
                        name="url"
                        rules={[
                            {
                                required: true,
                                message: 'Введите url картинки'
                            },
                            {
                                pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                message: 'Не корректный url!'
                            }
                        ]
                        }
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Введите имя' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Введите отзыв' }]}
                    >
                        <Input.TextArea style={{ height: '285px' }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button loading={update} type="primary" htmlType="submit">
                            Редактировать
                        </Button>
                    </Form.Item>
                </Form>
            }
        </Card>
    );
};

export default Review;