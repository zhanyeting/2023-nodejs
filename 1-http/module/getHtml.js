function renderHtml(pathname){
    switch(pathname) {
        case "/": 
        return "home页面";

        case "/home":
        return "home页面"

        case "/list": 
        return "list 页面"

        default: 
        return " 404 not found"
    }
}

exports.renderHtml = renderHtml;