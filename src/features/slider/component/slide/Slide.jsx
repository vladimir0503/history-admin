import React from 'react';
import { Button, Image } from 'antd';

import './Slide.scss';

const Slide = ({ inx, url, deleteSlide}) => {

    const deleteItem = key => {
        deleteSlide(key);
    };

    return (
        <div className='slide'>
            <Image
                style={{ marginBottom: '20px' }}
                width={200}
                src={url}
            />
            <Button
                type="primary"
                onClick={() => deleteItem(inx)}
            >
                Удалить
            </Button>
        </div>
    );
};

export default Slide;