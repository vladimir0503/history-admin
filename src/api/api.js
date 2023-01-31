const url = 'https://history-db-d0fb4-default-rtdb.firebaseio.com/';

const getData = async name => {
    const res = await fetch(`${url}/${name}.json`);
    const data = await res.json();
    return data;
};

const changeAdminData = async data => {
    const res = await fetch(`${url}/admin.json`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    return await res.json();
};

const changeData = async (name, data, key = '') => {
    const res = await fetch(`${url}/${name}/${key}.json`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    return await res.json();
};

const addData = async (name, obj) => {
    const res = await fetch(`${url}/${name}.json`, {
        method: 'POST',
        body: JSON.stringify(obj)
    });

    return await res.json();
};

const deleteData = async (name, id) => {
    const res = await fetch(`${url}/${name}/${id}.json`, {
        method: 'DELETE'
    });

    return await res.json();
};

export const API = {
    getData,
    changeAdminData,
    changeData,
    addData,
    deleteData
};