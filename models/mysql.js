/**
 * @author fuqiang
 * @fileoverview orm for dataabase
 * @date 20151201
 */

var orm = require('orm'),
    config = require('../db/config.json'),
    db = require('../db/mysql.json'),
    mysql = db[config.db],
    fs = require("fs"),
    path = require("path"),
    files = fs.readdirSync(path.join(__dirname)),
    obj = {},
    rebateDb = require("../db/rebate.json"),
    rebate = rebateDb[config.rebate];

    for(var key of files) {
        if(key !== "mysql.js" && key.indexOf(".js") > 0) {
            var fileName = key.replace(".js", "");
            obj[fileName] = require("./" + key);
        }
    }

function connect(app) {
    app.use(orm.express('mysql://' + mysql.username + ':' + mysql.pwd + '@' + mysql.host + '/' + mysql.database + '?timezone=CST', {
        define: function(db, models, next) {
            db.settings.set('instance.cache', false);
            db.settings.set('instance.autoFetch', true);
            //db.settings.set('instance.autoFetchLimit', 9999);
            //db.settings.set('instance.cacheSaveCheck', false);
            //db.settings.set('instance.autoSave', true);
            models.NewAccount = db.define("tbl_rt_useranalysis_newuser", obj.NewAccount);
            models.Configure = db.define("tbl_rt_configure", obj.Configure);
            models.UsersAccess = db.define("tbl_rt_user_access", obj.UsersAccess);
            models.UserCompose = db.define("tbl_rt_use_time", obj.UserCompose);
            models.MarketingFlow = db.define("tbl_rt_marketing_flow", obj.MarketingFlow);
            models.MarketingCoupon = db.define("tbl_rt_marketing_coupon", obj.MarketingCoupon);
            models.MarketingCouponDetails = db.define("tbl_rt_marketing_coupon_details", obj.MarketingCouponDetails);
            models.OverviewPage = db.define("tbl_rt_overview_page", obj.OverviewPage);
            models.OverviewPlatf = db.define("tbl_rt_overview_platf", obj.OverviewPlatf);
            models.KpiValue = db.define("tbl_rt_kpi_value", obj.KpiValue);
            models.Rebate = db.define("tbl_rt_rebate", obj.Rebate);
            models.RebateRefund = db.define("tbl_rt_rebate_refund", obj.RebateRefund);
            models.RebateShopOverview = db.define("tbl_rt_rebate_shop_overview", obj.RebateShopOverview);
            models.RebateShopRefund = db.define("tbl_rt_rebate_shop_refund", obj.RebateShopRefund);
            models.RebateShopTop = db.define("tbl_rt_rebate_shop_top", obj.RebateShopTop);
            models.RebateShopPlanTop = db.define("tbl_rt_rebate_shop_plan_top", obj.RebateShopPlanTop);
            models.RebateInvitepartner = db.define("tbl_rt_rebate_invitepartner", obj.RebateInvitepartner);
            models.RebatetSheduleDetails = db.define("tbl_rt_rebate_schedule_details", obj.RebatetSheduleDetails);
            models.RebatetInviteseller = db.define("tbl_rt_rebate_inviteseller", obj.RebatetInviteseller);
            models.RebatetRegisterTrendency = db.define("tbl_rt_rebate_register_trendency", obj.RebatetRegisterTrendency);
            models.RebatetRegisterSheduleDetails = db.define("tbl_rt_rebate_register_schedule_details", obj.RebatetRegisterSheduleDetails);
            models.ConfCategories = db.define("ecp_back_categories", obj.ConfCategories);
            models.UrlAccessWap = db.define("tbl_rt_url_access_wap", obj.UrlAccessWap);
            models.KeyValue = db.define("tbl_rt_key_value", obj.KeyValue);
            models.RebateOrderTredencyDetails = db.define("tbl_rt_rebate_order_tredency_details", obj.RebateOrderTredencyDetails);
            models.RebateTypeLevelDetails = db.define("tbl_rt_rebate_type_level_details", obj.RebateTypeLevelDetails);
            models.RebateShopOrderTredencyDetails = db.define("tbl_rt_rebate_shop_order_tredency_details", obj.RebateShopOrderTredencyDetails);
            models.RebateShopTypeLevelDetails = db.define("tbl_rt_rebate_shop_type_level_details", obj.RebateShopTypeLevelDetails);
            models.Count = db.define("tbl_dataplatform_count", obj.Count);
            models.User2 = db.define("tbl_dataplatform_nodejs_users2", obj.User2);
            models.Role = db.define("tbl_dataplatform_nodejs_role", obj.Role);
            models.Log = db.define("tbl_dataplatform_nodejs_log", obj.Log);
            models.Group = db.define("tbl_rt_group", obj.Group);
            models.GroupDataTendency = db.define("tbl_rt_group_tendency", obj.GroupDataTendency);
            models.GroupDataDistribution = db.define("tbl_rt_group_distribution", obj.GroupDataDistribution);
            models.GroupDataTop = db.define("tbl_rt_group_top", obj.GroupDataTop);
            models.Topics = db.define("tbl_rt_group_topic", obj.Topics);
            models.TopicsTendency = db.define("tbl_rt_group_topic_tendency", obj.TopicsTendency);
            models.TopicsDistribution = db.define("tbl_rt_group_topic_distribution", obj.TopicsDistribution);
            models.TopicsTop = db.define("tbl_rt_group_topic_top", obj.TopicsTop);
            models.Host = db.define("tbl_rt_group_owner", obj.Host);
            models.HostTendency = db.define("tbl_rt_group_owner_tendency", obj.HostTendency);
            models.HostDistribution = db.define("tbl_rt_group_owner_distribution", obj.HostDistribution);
            models.HostTop = db.define("tbl_rt_group_owner_top", obj.HostTop);
            models.SocialCategory = db.define("tbl_social_category", obj.SocialCategory);
            models.ShopPayTop = db.define("tbl_rt_shop_pay_top", obj.ShopPayTop);
            models.ShopAccesTop = db.define("tbl_rt_shop_acces_top", obj.ShopAccesTop);
            models.TradeCaty = db.define("tbl_rt_deal_caty", obj.TradeCaty);
            models.TradeUser = db.define("tbl_rt_deal_user", obj.TradeUser);
            models.SalesPerfProductKv = db.define("tbl_rt_sales_perf_product_kv", obj.SalesPerfProductKv);
            models.SalesPerfShopKv = db.define("tbl_rt_sales_perf_shop_kv", obj.SalesPerfShopKv);
            models.SalesPerfTranKv = db.define("tbl_rt_sales_perf_tran_kv", obj.SalesPerfTranKv);
            models.SalesProductMarketTop = db.define("tbl_rt_sales_product_market_top", obj.SalesProductMarketTop);
            models.SalesProductFlowtTop = db.define("tbl_rt_sales_product_flow_top", obj.SalesProductFlowtTop);
            models.UserKeepResult = db.define("tbl_rt_user_keep_result", obj.UserKeepResult);
            models.ChannelAnalysis = db.define("tbl_rt_channel_analysis", obj.ChannelAnalysis);
            models.ChannelUserKeep = db.define("tbl_rt_channel_user_keep", obj.ChannelUserKeep);
            models.ChannelUserActive = db.define("tbl_rt_channel_user_active", obj.ChannelUserActive);
            models.ChannelIdNameChart = db.define("tbl_rt_channel_id_name_chart", obj.ChannelIdNameChart);
            models.ShareAnalyzeOverview = db.define("tbl_rt_share_analyze_overview", obj.ShareAnalyzeOverview);
            models.ShareAnalyzeTrend = db.define("tbl_rt_share_analyze_trend", obj.ShareAnalyzeTrend);
            models.ShareAnalyzeChannel = db.define("tbl_rt_share_analyze_channel", obj.ShareAnalyzeChannel);
            models.ShareAnalyzeChannelTrend = db.define("tbl_rt_share_analyze_channel_trend", obj.ShareAnalyzeChannelTrend);
            models.UrlToName = db.define("tbl_rt_url_to_name", obj.UrlToName);
            models.db1 = db;
            next();
        }
    }));
    app.use(orm.express('mysql://' + rebate.username + ':' + rebate.pwd + '@' + rebate.host + '/' + rebate.database + '?timezone=CST', {
        define: function(db, models, next) {
            db.settings.set('instance.cache', false);
            db.settings.set('instance.autoFetch', true);
            models.TypeFlow = db.define("t_rebate_type_flow", obj.TypeFlow);
            models.db2 = db;
            next();
        }
    }));
};

module.exports = connect;
