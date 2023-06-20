export const getCurrentHost = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    const url = window.location.hostname;
    //remove the port number
    return url.split(':')[0];
};

export const getCurrentHostWithPortAndProtocol = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    // current host
    const host = getCurrentHost();
    // current port
    const port = window.location.port === '80' || window.location.port === '' ? '' : window.location.port;

    // current protocol
    const protocol = window.location.protocol;

    return `${protocol}//${host}${port === '' ? '' : ':' + port}`;
};
