var modArr = [
    // 'modules/lib/bootstrap/**.js'
];

// 设置工程的根目录为src文件夹
fis.project.setProjectRoot('clientsrc');
fis.processCWD = fis.project.getProjectPath();

// 指定别名
fis.hook('commonjs', {
    packages: [{
        name: 'common',
        location: '/common/scripts'
    }, {
        name: 'lib',
        location: '/common/lib'
    }, {
        name: 'components',
        location: '/components'
    }, {
        name: 'mixins',
        location: '/mixins'
    }, {
        name: 'modules',
        location: '/modules'
    }]
});

// 根目录下的文件都不发布，需要发布的内容在后面再重新配置
fis.match('/*', {
    release: false
});

// pages\modules\components下的所有js都需要处理识别CommonJS，但压缩文件和部分文件除外
// common/lib和common/scripts下也要识别，但common/lib/mod.js除外
fis.match('/{mixins,components,modules,pages}/**.js', {
    isMod: true
}).match('**.min.js', {
    isMod: false
}).match('/common/{lib,scripts}/(**).js', {
    isMod: true
}).match('/common/lib/mod.js', {
    isMod: false
});


modArr.forEach(function(item) {
    fis.match(item, {
        isMod: true
    });
});

// 使用babel处理es6/es7
fis.match('/{mixins,components,modules,pages}/**.js', {
    parser: fis.plugin('babel')
}).match('/common/scripts/**.js', {
    parser: fis.plugin('babel')
});

// sass的编译
fis.match('*.scss', {
        rExt: '.css',
        parser: fis.plugin('node-sass')
    })
    .match('_*.scss', {
        release: false
    })
    .match('*.{scss,css}', {
        useSprite: true,
        postprocessor: [
            fis.plugin('autoprefixer', {
                browsers: ['Android >= 2.3', 'iOS >= 6'],
                cascade: true
            })
        ]
    });


//page里的页面发布到根目录
fis.match("/pages/(*)/*(.html)", {
    release: '/$1$2',
    useCache: false
});


fis.match('::packager', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            resourceType: 'mod',
            useInlineMap: true // 资源映射表内嵌
        }),
        packager: fis.plugin('map'),
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '15'
        })

    })
    .match('/{common,components,modules,pages}/**.{css,scss}', {
        packTo: '/static/all.css' //css打成一个包
    })
    .match('/common/{css,plugins}/**.{css,scss}', { //TODO后期优化，要解决合并顺序的问题
        packTo: ''
    })
    .match('{common,mixins,components,modules,pages}/**.js', {
        packTo: '/static/all.js'
    })
    .match('/common/plugins/**.js', {
        packTo: ''
    })
    .match('/common/lib/mod.js', {
        packTo: '/static/mod.js'
    });


fis.match("/common/(img/**)", {
        release: 'static/$1',
        deploy: fis.plugin('local-deliver', {
            to: '../www'
        })
    })
    .match("/common/(fonts/**)", {
        release: 'static/$1',
        deploy: fis.plugin('local-deliver', {
            to: '../www'
        })
    })
    .match("/common/(plugins/**)", {
        release: 'static/$1',
        deploy: fis.plugin('local-deliver', {
            to: '../www'
        })
    })
    .match("/static/**", {
        deploy: fis.plugin('local-deliver', {
            to: '../www'
        })
    })
    .match("/pages/*_*/*.html", {
        deploy: fis.plugin('local-deliver', {
            to: '../view/admin'
        })
    });
// 将所有的静态资源都放入到/static文件夹下，因为thinkjs的静态资源文件夹就是这个


if (fis.project.currentMedia() === 'dev' || fis.project.currentMedia() === 'dist') {
    fis.util.del(fis.project.getProjectPath('../www/static'));
}

fis.media('dev')
    .match("/common/(css/**)", {
        release: 'static/$1',
        deploy: fis.plugin('local-deliver', {
            to: '../www'
        })
    });

fis.media('dist')
    .match("/common/(css/**)", {
        release: 'static/$1',
        deploy: fis.plugin('local-deliver', {
            to: '../www'
        })
    })
    .match('*.{css,scss}', {
        useHash: true,
        optimizer: fis.plugin('clean-css')
    }).match('/common/plugins/**.{css,scss}', {
        useHash: false,
        optimizer: null
    }).match('/common/css/**.{css,scss}', {
        useHash: false
    }).match('*.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
    .match('/common/plugins/**.js', {
        useHash: false,
        optimizer: null
    })
    .match('*.min.js', {
        useHash: false,
        optimizer: null
    });
