const objToArray = obj => {
    const array = obj ? Object.keys(obj).map((item, i) => {
        return {
            ...Object.values(obj)[i],
            key: item,
        };
    }) : [];

    return array;
};

export default objToArray;