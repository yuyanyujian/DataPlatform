/**
 * @author yanglei
 * @date 20160413
 * @fileoverview 版本分析
 */
var api = require("../../../base/api"),
    moment = require("moment"),
    userAnalysis = require("../../../filters/userAnalysis");

module.exports = (Router) => {
    Router = new api(Router,{
        router : "/userAnalysis/versionOne",
        modelName : ["NewAccount"],
        filter_select: [{
            title: '',
            filter_key : 'filter_key',
            groups: [{
                key: 'new_users',
                value: '新增用户'
            }, {
                key: 'active_users',
                value: '活跃用户'
            }, {
                key: 'start_up',
                value: '启动次数'
            }]
        }],
        filter(data, filter_key, dates) {
            return userAnalysis.versionOne(data, filter_key, dates);
        }
    });

    Router = new api(Router,{
        router : "/userAnalysis/versionTwo",
        modelName : ["NewAccount"],
        rows : [],
        cols : [],
        excel_export : true,
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        filter(data, filter_key, dates) {
            return userAnalysis.versionTwo(data, dates);
        }
    });

    return Router;
};