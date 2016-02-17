//mock data
var menus = {
    id:'home',
    name: 'Home',
    active: false,
    children: [{
        id:'dashboard',
        name: 'Dashboard',
        url: 'index.html',
        icon: 'home',
        active: false
    }, {
        id:'menuSystem',
        name: '系统管理',
        icon: 'home',
        active: false,
        children: [{
            id:'menuUser',
            name: '用户管理',
            url: '/admin/user',
            icon: 'pin',
            active: false
        }]
    }, {
        id:'2',
        name: 'Page Layouts',
        icon: 'home',
        active: false,
        children: [{
            id:'21',
            name: 'Sidebar Fixed Page',
            url: 'layout_sidebar_fixed.html',
            icon: 'anchor',
            active: false,
            badge: {
                type: 'warning',
                value: 'new'
            }
        }, {
            id:'test',
            name: 'Sidebar Closed Page',
            url: 'test.html',
            icon: 'anchor',
            active: false,
            badge: 'new'
        }, {
            id:'23',
            name: 'Boxed Page',
            url: 'layout_sidebar_fixed.html',
            icon: 'pin',
            active: false
        }]
    }, {
        id:'3',
        name: '4 Level Menu',
        icon: 'share',
        active: false,
        children: [{
            id:'31',
            name: 'Item 1',
            icon: 'anchor',
            active: false,
            children: [{
                id:'311',
                name: ' Sample Link 1',
                url: 'layout_sidebar_fixed.html',
                icon: 'anchor',
                active: false,
                children: [{
                    id:'3111',
                    name: 'sub-4',
                    url: 'layout_sidebar_fixed.html',
                    icon: 'anchor',
                    active: false
                }, {
                    id:'3112',
                    name: 'sub-4',
                    url: 'layout_sidebar_closed.html',
                    icon: 'anchor',
                    active: false
                }, {
                    id:'3113',
                    name: 'sub-4',
                    url: 'layout_sidebar_closed.html',
                    icon: 'anchor',
                    active: false
                }]
            }, {
                id:'312',
                name: ' Sample Link 2',
                url: 'layout_sidebar_closed.html',
                icon: 'anchor',
                active: false
            }, {
                id:'313',
                name: ' Sample Link 2',
                url: 'layout_sidebar_closed.html',
                icon: 'anchor',
                active: false
            }]
        }, {
            id:'32',
            name: 'Item 2',
            icon: 'anchor',
            active: false
        }, {
            id:'33',
            name: 'Item 3',
            url: 'layout_sidebar_fixed.html',
            icon: 'pin',
            active: false
        }]
    }, {
        id:'4',
        name: 'Login',
        url: 'login.html',
        icon: 'user',
        active: false
    }]
};

module.exports = menus;
