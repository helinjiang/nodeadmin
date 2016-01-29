//mock data
var menus = {
    name: 'Home',
    active: false,
    children: [{
        name: 'Dashboard',
        url: 'index.html',
        icon: 'home',
        active: false
    }, {
        name: 'Page Layoutsx',
        icon: 'home',
        active: false,
        children: [{
            name: 'Sidebar Fixed Page',
            url: 'layout_sidebar_fixed.html',
            icon: 'anchor',
            active: false,
            badge: {
                type: 'warning',
                value: 'new'
            }
        }, {
            name: 'Sidebar Closed Page',
            url: 'test.html',
            icon: 'anchor',
            active: false,
            badge: 'new'
        }, {
            name: 'Boxed Page',
            url: 'layout_sidebar_fixed.html',
            icon: 'pin',
            active: false
        }, {
            name: 'Session Timeout',
            url: 'layout_sidebar_fixed.html',
            icon: 'vector',
            active: false
        }]
    }, {
        name: '4 Level Menu',
        icon: 'share',
        active: false,
        children: [{
            name: 'Item 1',
            icon: 'anchor',
            active: false,
            children: [{
                name: ' Sample Link 1',
                url: 'layout_sidebar_fixed.html',
                icon: 'anchor',
                active: false,
                children: [{
                    name: 'sub-4',
                    url: 'layout_sidebar_fixed.html',
                    icon: 'anchor',
                    active: false
                }, {
                    name: 'sub-4',
                    url: 'layout_sidebar_closed.html',
                    icon: 'anchor',
                    active: false
                }, {
                    name: 'sub-4',
                    url: 'layout_sidebar_closed.html',
                    icon: 'anchor',
                    active: false
                }]
            }, {
                name: ' Sample Link 2',
                url: 'layout_sidebar_closed.html',
                icon: 'anchor',
                active: false
            }, {
                name: ' Sample Link 2',
                url: 'layout_sidebar_closed.html',
                icon: 'anchor',
                active: false
            }]
        }, {
            name: 'Item 2',
            icon: 'anchor',
            active: false
        }, {
            name: 'Item 3',
            url: 'layout_sidebar_fixed.html',
            icon: 'pin',
            active: false
        }]
    }, {
        name: 'Login',
        url: 'login.html',
        icon: 'user',
        active: false
    }]
};

module.exports = menus;
