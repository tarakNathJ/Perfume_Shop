// to gate the data..
export const LoadState = (key, defaultValue) => {
    try {
        const SerializedState = sessionStorage.getItem(key);
        if (SerializedState === null) {
            return defaultValue;
        }

        return JSON.parse(SerializedState);
    } catch (error) {
        return defaultValue;
    }
};

// to set The data.. .

export const StoreData = (key, Obj) => {
    try {
    sessionStorage.setItem(key,JSON.stringify(Obj));
    } catch (error) {
    }

}

export const RemoveData = (key) => {
    try {
    sessionStorage.setItem(key,[]);
    } catch (error) {
    }

}