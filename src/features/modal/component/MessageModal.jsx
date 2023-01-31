import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import { toggleModal } from '../sliceModal';

const MessageModal = () => {

    const { isOpen, text } = useSelector(state => state.modal);

    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch(toggleModal({
            open: false,
            text: ''
        }));
    };

    const handleCancel = () => {
        dispatch(toggleModal({
            open: false,
            text: ''
        }));
    };

    return (
        <Modal title="Внимание!" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>{text}</p>
        </Modal>
    );
}

export default MessageModal