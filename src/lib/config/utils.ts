export function normalizePort(port?: string): number | string | boolean {
    if (!port) {
        return false;
    }

    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
        return port;
    }

    if (parsedPort >= 0) { // port number
        return parsedPort;
    }

    return false;
}
