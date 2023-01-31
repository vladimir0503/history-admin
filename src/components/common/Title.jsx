import React from 'react';
import { Typography } from 'antd';

const Title = ({ text }) => {

    const { Title } = Typography;

    return (
        <Title level={2} style={{ color: '#001529' }}>{text}</Title>
    );
};

export default Title;