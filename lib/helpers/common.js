export const isPresent = (attribute) => {
    return (attribute !== undefined && attribute !== null)
};

export const isJSON = (str) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}
