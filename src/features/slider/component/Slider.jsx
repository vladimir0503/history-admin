import React from 'react';
import { Input, Form, Button } from 'antd';
import Title from '../../../components/common/Title';
import Wrapper from '../../../components/common/wrapper/Wrapper';
import Slide from './slide/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSlides, addSliderItem, deleteSliderItem } from '../sliderSlice'

import './Slider.scss';
import FormItem from 'antd/es/form/FormItem';

const Slider = () => {

  const [form] = Form.useForm();

  const { slides, loadingSlide } = useSelector(state => state.slider)

  const dispatch = useDispatch();

  const handleAdd = ({ url }) => {
    const newSlide = {
      url,
      key: ''
    };
    dispatch(addSliderItem(newSlide));
    form.resetFields()
  };

  const handleDelete = key => {
    dispatch(deleteSliderItem(key));
  };

  React.useEffect(() => {
    dispatch(fetchSlides());
  }, []);

  return (
    <Wrapper>
      <Title text='Слайдер' />
      <Form
        form={form}
        name='slider'
        onFinish={handleAdd}
        style={{ display: 'flex' }}
      >
        <FormItem
          name='url'
          rules={[
            {
              required: true,
              message: 'Поле должно быть заполненным!'
            },
            {
              pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
              message: 'Не корректный url!'
            }
          ]}
        >
          <Input
            style={{ width: '600px', marginRight: '10px' }}
            placeholder='Вставте url изображения'
          />
        </FormItem>
        <FormItem>
          <Button
            htmlType="submit"
            type="primary"
            loading={loadingSlide}
          >
            Добавить
          </Button>
        </FormItem>
      </Form>
      <div className='slider'>
        {
          !!slides.length && slides.map((slide, i) =>
            <Slide
              key={i}
              inx={slide.key}
              url={slide.url}
              deleteSlide={handleDelete}
            />)}
      </div>
    </Wrapper>
  );
};

export default Slider;