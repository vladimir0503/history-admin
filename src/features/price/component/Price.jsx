import React from 'react';
import Wrapper from '../../../components/common/wrapper/Wrapper';
import Title from '../../../components/common/Title';
import { Form, Input, Button, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPriceData, changePriceData, addPriceItem, deletePriceItem } from '../priceSlice';

import './Price.scss';

const Price = () => {

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = React.useState('');

    const { priceData, update } = useSelector(state => state.price);

    const dispatch = useDispatch();

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Поле не должно быть пустым!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            new: '',
            constant: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {

        try {
            const row = await form.validateFields();
            const newData = [...priceData];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                dispatch(changePriceData(newData, key));
                setEditingKey('');
            } else {
                newData.push(row);
                dispatch(changePriceData(newData, key));
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleAdd = () => {
        const newItem = {
            key: priceData.length,
            new: 0,
            constant: 0,
            name: 'Название услуги'
        };

        dispatch(addPriceItem(newItem));
    };

    const handleDelete = key => {
        dispatch(deletePriceItem(key));
    };

    const columns = [
        {
            title: 'Наименование услуги',
            dataIndex: 'name',
            width: '20%',
            editable: true,
        },
        {
            title: 'Стоимость услуг для новых клиентов',
            dataIndex: 'new',
            width: '20%',
            editable: true,
        },
        {
            title: 'Стоимость услуг для постоянных клиентов',
            dataIndex: 'constant',
            width: '20%',
            editable: true,
        },
        {
            title: 'Редактировать',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Сохранить
                        </Typography.Link>
                        <Popconfirm title="Вы уверены?" onConfirm={cancel}>
                            <a>Отмена</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Редактировать
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Удаление',
            dataIndex: 'delete',
            render: (_, record) =>
                priceData.length >= 1 ? (
                    <Popconfirm title="Вы уверены?" onConfirm={() => handleDelete(record.key)}>
                        <a>Удалить</a>
                    </Popconfirm>
                ) : null,
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    React.useEffect(() => {
        dispatch(fetchPriceData());
    }, []);

    return (
        <Wrapper>
            <Title text='Прайслист' />
            <Button
                loading={update}
                style={{ marginBottom: '15px' }}
                onClick={handleAdd}
                type="primary"
            >
                {update ? 'Добавление' : 'Добавить услугу'}
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={priceData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </Wrapper>
    );
};

export default Price;