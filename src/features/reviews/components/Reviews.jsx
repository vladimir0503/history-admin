import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../../../components/common/wrapper/Wrapper';
import Title from '../../../components/common/Title';
import Review from './Review';
import { fetchReview } from '../reviewsSlice';
import { Button } from 'antd';
import { addReviewsItem } from '../reviewsSlice';

import './Reviews.scss';

const Reviews = () => {

    const { reviews, update } = useSelector(state => state.reviews);

    const dispatch = useDispatch();

    const addReview = () => {
        const newReview = {
            key: 0,
            name: 'Имя Фамилия',
            text: 'Отзыв',
            url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
        };

        dispatch(addReviewsItem(newReview));
    };

    React.useEffect(() => {
        dispatch(fetchReview());
    }, []);

    return (
        <Wrapper>
            <Title text='Отзывы' />
            <Button
                style={{ marginBottom: '15px' }}
                loading={update}
                onClick={addReview}
                type="primary"
            >
                Добавить отзыв
            </Button>
            <div className='reviews'>
                {!!reviews.length && reviews.map(({key, url, name, text}) => (
                    <Review
                        key={key}
                        url={url}
                        name={name}
                        text={text}
                        id={key}
                    />
                ))}
            </div>
        </Wrapper>
    );
};

export default Reviews;