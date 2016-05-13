/**
 * @author Hao Sun
 * @date 20160512
 * @fileoverview 圈子数据
 */
var util = require("../../utils"),
    _ = require("lodash");

module.exports = {
    groupOne(data) {
        var source = data.data,
            newData = {
                new_group_count : 0,
                new_group_user_count : 0,
                accumulated_group_all_count : 0,
                accumulated_group_user_all_count : 0,
                user_join_group_rate : 0,
                new_register_user_count : 0,
                register_user_all_count : 0
            };
        for(var key of source) {
            newData.new_group_count += key.new_group_count;
            newData.new_group_user_count += key.new_group_user_count;
            newData.new_register_user_count += key.new_register_user_count;
            newData.accumulated_group_all_count += key.accumulated_group_all_count;
            newData.accumulated_group_user_all_count += key.accumulated_group_user_all_count;
            newData.register_user_all_count += key.register_user_all_count;
        }
        newData.new_group_user_rate = util.toFixed(newData.new_group_user_count,
            newData.new_register_user_count);
        newData.user_join_group_rate = util.toFixed(newData.accumulated_group_user_all_count,
            newData.register_user_all_count);
        return util.toTable([[newData]], data.rows, data.cols);
    },
    groupTwo(data, filter_key, dates) {
        var source = data.data,
            type = "line",
            array = [{
                key : "新增圈子数",
                value: "6"
            }, {
                key : "新增入圈户数",
                value: "1"
            }, {
                key : "新增话题数",
                value: "2"
            }, {
                key : "DAU",
                value : "5"
            }],
            newData = {},
            map = {};
        map[filter_key + "_0"] = array[0].key;
        map[filter_key + "_1"] = array[1].key;
        map[filter_key + "_2"] = array[2].key;
        map[filter_key + "_3"] = array[3].key;
        for(var date of dates) {
            var obj = {};
            obj[filter_key + "_0"] = 0;
            obj[filter_key + "_1"] = 0;
            obj[filter_key + "_2"] = 0;
            obj[filter_key + "_3"] = 0;
            for(var key of source) {
                newData[util.getDate(key.date)].value += key[filter_key];
            }
            newData[date] = obj;
        }

        return [{
            type : type,
            map : map,
            data : newData,
            config: { // 配置信息
                stack: false, // 图的堆叠
                categoryY : false //柱状图竖着
            }
        }];
    },
    groupThree(data) {
        var source = data.data,
            type = "bar",
            map = {};
        
    },
    groupFour(data) {
        var source = data.data,
            newData = [],
            top = source.length > 100 ? 100 : source.length;
        for(var key of source) {
            key.rate = (key.DAU /
                (key.accumulated_group_user_all_count === 0 ? 1 : key.accumulated_group_user_all_count) * 100)
                .toFixed(2);
        }
        source.sort((a, b) => {
            return b.rate - a.rate;
        });
        for(var i = 0; i < top; i++) {
            source[i].id = i +1;
            newData.push(source[i]);
        }
        return util.toTable([newData], data.rows, data.cols);
    }
};