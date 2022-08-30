import { useState, useEffect } from "react";

function getSavedValue(key, initialvalue) {
    const savedValue =JSON.parse(sessionStorage.getItem(key));
    if (savedValue){
        return savedValue;
    }else{
        return initialvalue;
    }
}

export default function SessionStorage(key, initialvalue){
    let [value, setValue] = useState(() => {
        return getSavedValue(key, initialvalue);
    });

    useEffect(() =>{
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}