export const appendParams = (path, params) => {
    let result = path;

    if (params !== null && JSON.stringify(params) !== '{}' ) {
        result = `${path}?${new URLSearchParams(params).toString()}`
    }

    return result;
}
