const routeList = [
    '/', '/home', '/list',
    '/api/home', '/api/list',
]
function  renderStatus (pathname) {
    return routeList.includes(pathname) ? 200 : 400;
}


module.exports = {
    renderStatus,
}