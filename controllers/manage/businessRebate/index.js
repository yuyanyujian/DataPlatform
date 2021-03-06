/**
 * @author yanglei
 * @date 201600405
 * @fileoverview 商家返利汇总
 */
var api = require("../../../base/api"),
    help = require("../../../base/help"),
    _ = require("lodash"),
    config = require("../../../utils/config.json"),
    businessRebate = require("../../../filters/businessRebate");

module.exports = (Router) => {
    Router = new api(Router, {
        router: "/businessRebate/businessAllOne",
        modelName: ["RebateShopOverview", "RebateShopRefund"],
        //date_picker_data: 1,
        platform : false,
        filter(data, filter_key, dates) {
            return businessRebate.businessAllOne(data);
        },
        flexible_btn: [{
            content: '<a href="javascript:void(0)" help_url="/businessAll/help_json">帮助</a>',
            preMethods: ["show_help"],
            customMethods: ''
        }],
        rows: [
            ["name", "order_num", "order_amount", "shop_num", "user_num", "product_sku_num"],
            ["rebate_order_num",
                //"rebate_amount_total", "rebate_amount_actual",
                "rebate_amount",
                //"rate",
                "platform_amount"],
            ["name", "spu_num", "sku_num", "user_num", "amount",
                //"amount_actual"
            ]
        ],
        cols: [
            [{
                caption: "",
                type: "string"
            }, {
                caption: "订单数",
                type: "string"
            }, {
                caption: "订单总金额",
                type: "string"
            }, {
                caption: "商家数",
                type: "string"
            }, {
                caption: "用户数",
                type: "string"
            }, {
                caption: "商品件数",
                type: "string"
            }],
            [{
                caption: "返利到账订单数",
                type: "string"
            //}, {
            //    caption: "返利到账订单总金额",
            //    type: "string"
            //}, {
            //    caption: "返利到账订单实付金额",
            //    type: "string"
            }, {
                caption: "返利到账金额",
                type: "string"
            //}, {
            //    caption: "返利比率",
            //    type: "string"
            }, {
                caption: "平台到账金额",
                type: "string"
            }],
            [{
                caption: "",
                type: "string"
            }, {
                caption: "退货商品数",
                type: "string"
            }, {
                caption: "退货商品件数",
                type: "string"
            }, {
                caption: "退货用户数",
                type: "string"
            }, {
                caption: "退货商品总金额",
                type: "string"
            //}, {
            //    caption: "实际退货金额",
            //    type: "string"
            }]
        ]
    });

    Router = new api(Router,{
        router : "/businessRebate/businessAllTwo",
        modelName : [ "RebateShopOrderTredencyDetails", "TypeFlow" ],
        orderParams : {
            type : 2,
            type_code : 3,
            status : 1
        },
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        fixedParams(query, filter_key, req, cb) {
            if(query.category_id === undefined) {
                query.category_id = "all";
            }
            query.day_type = 1;
            cb(null, query);
        },
        platform : false,
        filter_select: [{
            title: '指标选择',
            filter_key: 'filter_key',
            groups: [{
                key: 'order_num',
                value: '订单数'
            }, {
                key: 'order_amount',
                value: '订单总金额'
            }, {
                key: 'product_sku_num',
                value: '商品件数'
            }]
        }],
        filter(data, filter_key, dates) {
            return businessRebate.businessAllTwe(data, filter_key, dates);
        }
    });

    Router = new api(Router,{
        router : "/businessRebate/businessAllThree",
        modelName : [ "RebateShopTypeLevelDetails", "TypeFlow" ],
        orderParams : {
            type : 2,
            type_code : 3,
            status : 1
        },
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        fixedParams(query, filter_key, req, cb) {
            if(query.category_id === undefined) {
                query.category_id = "all";
            }
            query.day_type = 1;
            cb(null, query);
        },
        platform : false,
        filter_select: [
            {
                title: '指标选择',
                filter_key: 'filter_key',
                groups: [{
                    key: 'product_sku_num',
                    value: '商品件数'
                }, {
                    key: 'item_amount',
                    value: '商品总金额'
                }, {
                    key: 'rebate_amount',
                    value: '返利到账金额'
                }]
            }
        ],
        filter(data, filter_key, dates) {
            return businessRebate.businessAllThree(data, filter_key);
        }
    });

    Router = new api(Router,{
        router : "/businessRebate/businessAllFour",
        modelName : [ "RebateShopTypeLevelDetails", "TypeFlow" ],
        orderParams : {
            type : 2,
            type_code : 3,
            status : 1
        },
        level_select : true,
        level_select_name : "category_id",
        level_select_url : "/api/categories",
        fixedParams(query, filter_key, req, cb) {
            if(query.category_id === undefined) {
                query.category_id = "all";
            }
            query.day_type = 1;
            cb(null, query);
        },
        platform : false,
        filter_select: [
            {
                title: '指标选择',
                filter_key: 'filter_key',
                groups: [{
                    key: 'product_sku_num',
                    value: '商品件数'
                }, {
                    key: 'item_amount',
                    value: '商品总金额'
                }, {
                    key: 'rebate_amount',
                    value: '返利到账金额'
                }]
            }
        ],
        filter(data, filter_key, dates) {
            return businessRebate.businessAllFour(data, filter_key);
        }
    });

    Router = new api(Router,{
        router : "/businessRebate/businessAllFive",
        modelName : [ "RebateShopTop" ],
        showDayUnit : true,
        date_picker_data : 1,
        platform : false,
        paging : true,
        order : ["-order_num", "-pay_order_num"],
        filter(data, filter_key, dates, filter_key2, page) {
            return businessRebate.businessAllFive(data, page);
        },
        rows : [
            [ "id", "shop_name", "plan_num", "spu_num", "user_num", "pay_rate", "pay_price_rate",
                "plan_rebate_amount", "rebate_amount", "platform_amount" ]
        ],
        cols : [
            [
                {
                    caption : "排名",
                    type : "number"
                },{
                caption : "商家名称",
                type : "string"
            },{
                caption : "计划数",
                type : "number"
            },{
                caption : "参与商品数",
                type : "number"
            },{
                caption : "参与用户数",
                type : "number"
            },{
                caption : "新增订单数/订单总数",
                type : "string"
            },{
                caption : "新增订单金额/订单总金额",
                type : "string"
            },{
                caption : "预计返利金额",
                type : "number"
            },{
                caption : "返利到账金额",
                type : "number"
            },{
                caption : "平台到账金额",
                type : "number"
            }
            ]
        ]
    });

    Router = new api(Router,{
        router : "/businessRebate/businessAllSix",
        modelName : [ "RebateShopPlanTop", "TypeFlow" ],
        orderParams : {
            type : 2,
            type_code : 3,
            status : 1,
            limit : 100
        },
        platform : false,
        paging : true,
        order : ["-order_num", "-pay_order_num"],
        showDayUnit : true,
        date_picker_data : 1,
        flexible_btn : [
            {
                content: '<a href="#!/businessRebate/plan">更多</a>',
                preMethods: [],
                customMethods: ''
            }
        ],
        filter(data, filter_key, dates, filter_key2, page) {
            return businessRebate.businessAllSix(data, page);
        },
        rows : [
            [ "id", "plan_name", "shop_name", "deadline", "related_flow", "level", "spu_num", "user_num",
                "pay_rate", "pay_price_rate", "rebate_amount", "refund_rate" ]
        ],
        cols : [
            [
                {
                    caption : "序号",
                    type : "number"
                },{
                caption : "返利计划名称",
                type : "string"
            },{
                caption : "商家名称",
                type : "string"
            },{
                caption : "有效期",
                type : "string"
            },{
                caption : "相关流程",
                type : "string"
            },{
                caption : "层级",
                type : "string"
            },{
                caption : "参与商品数",
                type : "number"
            },{
                caption : "参与用户数",
                type : "number"
            },{
                caption : "新增订单数/订单总数",
                type : "string"
            },{
                caption : "新增订单金额/订单总金额",
                type : "string"
            },{
                caption : "返利到账金额",
                type : "number"
            },{
                caption : "退货率",
                type : "string"
            }
            ]
        ]
    });

    Router = new api(Router,{
        router : "/businessRebate/planOne",
        modelName : [ "RebateShopPlanTop", "TypeFlow" ],
        orderParams : {
            type : 2,
            type_code : 3,
            status : 1,
            limit : 100
        },
        excel_export : true,
        platform : false,
        paging : true,
        order : ["-date"],
        showDayUnit : true,
        date_picker_data : 1,
        selectFilter(req, cb) {
            req.models.TypeFlow.find({
                type : 2,
                type_code : 3,
                status : 1
            }, (err, data) => {
                if(err) {
                    cb(err);
                } else {
                    var filter_select = [],
                        related_flow = _.uniq(_.pluck(data, "flow_code"));
                    filter_select.push({
                        title: '关联流程',
                        filter_key: 'related_flow',
                        groups: [{
                            key: related_flow,
                            value: '全部返利'
                        }]
                    });
                    for(var key of data) {
                        filter_select[0].groups.push({
                            key : key.flow_code,
                            value : key.flow_name
                        })
                    }
                    cb(null, filter_select);
                }
            });
        },
        flexible_btn : [{
            content: '<a href="javascript:void(0)">导出</a>',
            preMethods: ['excel_export']
        }],
        //date_picker_data: 1,
        filter(data, filter_key, dates, filter_key2, page) {
            return businessRebate.planOne(data, page);
        },
        rows : [
            [ "id", "plan_name", "shop_name", "deadline", "related_flow", "level", "spu_num", "user_num",
                "pay_rate", "pay_price_rate", "rebate_amount", "refund_rate" ]
        ],
        cols : [
            [
                {
                    caption : "序号",
                    type : "number"
                },{
                caption : "返利计划名称",
                type : "string"
            },{
                caption : "商家名称",
                type : "string"
            },{
                caption : "有效期",
                type : "string"
            },{
                caption : "相关流程",
                type : "string"
            },{
                caption : "层级",
                type : "string"
            },{
                caption : "参与商品数",
                type : "number"
            },{
                caption : "参与用户数",
                type : "number"
            },{
                caption : "新增订单数/订单总数",
                type : "string"
            },{
                caption : "新增订单金额/订单总金额",
                type : "string"
            },{
                caption : "返利到账金额",
                type : "number"
            },{
                caption : "退货率",
                type : "string"
            }
            ]
        ]
    });

    Router = new help(Router, {
        router : "/businessAll/help",
        rows : config.help.rows,
        cols : config.help.cols,
        data : [
            {
                name : "商家返利TOP50",
                help : "按新增订单数由高到低排序"
            },
            {
                name : "商家返利计划TOP50",
                help : "按新增订单数由高到低排序"
            },
            {
                name : "平台到账金额",
                help : "时间段内商家设置返利中平台到账总金额，统计时间为订单返利到账时间"
            },
            {
                name : "退货率",
                help : "统计周期内，退货商品件数/销售商品总件数，统计时间为订单生成时间"
            }
        ]
    });

    return Router;
};
