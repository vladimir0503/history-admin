import React from 'react';
import { Collapse } from 'antd';

const CollapseBlock = ({ children }) => {

    const { Panel } = Collapse;

    return (
        <Collapse defaultActiveKey={['0']}>
            <Panel header="Логин/пароль" key="1">
                {children}
            </Panel>
        </Collapse>
    );
};

export default CollapseBlock;