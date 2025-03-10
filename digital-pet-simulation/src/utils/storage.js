const STORAGE_KEY = 'digitalPetData';

export const savePetData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadPetData = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearPetData = () => {
    localStorage.removeItem(STORAGE_KEY);
};