<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">
				<div class="panel-heading">
					<strong>角色列表</strong>
					<div class="add_role">
						<span class="fa fa-plus"></span>
						<input type="button" class="btn btn-default" value="新增角色" @click="addRole()">
					</div>
				</div>
				<div class="panel-body">
					<div class="user_table_con">
						<table class="table table-bordered table-hover user_table">
							<thead>
								<tr>
									<th>ID</th>
									<th>角色名称</th>
									<th>创建时间</th>
									<th>备注</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in roleListData" :class="{active: !item.status}">
									<td>{{item.id}}</td>
									<td>{{item.name}}</td>
									<td>{{item.date | Date 'yyyy-MM-dd hh:mm:ss'}}</td>
									<td>{{item.remark}}</td>
									<td>
										<ul>
											<li v-show="item.status"><a @click="modifyRole(item.id, item.limited, item.export, item.name, item.remark)" class="btn btn-default" href="javascript:void(0)">修改<i class="fa fa-pencil-square-o"></i></a></li>
											<li v-show="item.status"><a @click="forbidden(item.id, item.name)" class="btn btn-default" href="javascript:void(0)">禁用<i class="fa fa-remove"></i></a></li>
											<li v-show="!item.status"><a @click="startUsing(item.id, item.name)" class="btn btn-default" href="javascript:void(0)">启用<i class="fa fa-check-square-o"></i></a></li>
										</ul>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="panel-footer">
					<m-pagination :pagination-conf="paginationConf"></m-pagination>
				</div>
			</div>
		</div>
	</div>
	<m-loading :loading.sync="loading"></m-loading>
	<m-alert></m-alert>
	<div class="modal" id="modal_table" v-show="modal.show" transtion="fade">
	    <div class="modal-dialog modal-lg">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h4 class="modal-title">{{modal.title}}</h4>
	            </div>
	            <div class="modal-body">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label" for="juese_name">角色名称</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="juese_name" placeholder="请输入角色名称" v-model="modifyName">
							</div>
						</div>
						<div class="form-group">
							<label for="juese_remark" class="col-sm-2 control-label">角色备注</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="juese_remark" maxlength="128" placeholder="请输入角色备注" v-model="modifyRemark">
								<span>{{modifyRemark | length}}/128</span>
							</div>
						</div>
					</form>
	            	<m-limit-list :id="id" :limited="limited" :export-limit="exportLimit"></m-limit-list>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn default" data-dismiss="modal" @click="apply()">确定</button>
	                <button type="button" class="btn default" data-dismiss="modal" @click="hideModal()">取消</button>
	            </div>
	        </div>
	    </div>
	</div>
	<m-confirm></m-confirm>
</template>

<style>
.add_role{
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	width: 120px;
}
.add_role span{
	position: absolute;
	top: 50%;
	left: 5px;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	z-index: 7;
	color: #666;
}
.add_role input{
	padding-left: 23px!important;
}
</style>

<script>
var Vue = require('Vue');

var $ = require('jQuery');

var Pagination = require('../common/pagination.vue');

var UserVm = null;

var store = require('../../store/store.js');
var actions = require('../../store/actions.js');

var Loading = require('../common/loading.vue');
var Alert = require('../common/alert.vue');

var LimitList = require('../common/limitList.vue');

var Confirm = require('../common/confirm.vue');

var Role = Vue.extend({
	name: 'Role',
	data: function(){
		return {
			paginationConf: {
				currentPage: 1,     // 当前页
				totalItems: 30,     // 总条数
				itemsPerPage: 10,    // 每页条数
				pagesLength: 5,     // 显示几页( 1,2,3 / 1,2,3,4,5)
				onChange: function() {
					// 回调
					UserVm.createTableBySearchStr();
				}
			},
			roleListData: null,
			loading: {
				show: true,
                noLoaded: 0
			},
			modal: {
				show: false,
				title: '弹出层'
			},
			id: null,
			limited: {},
			exportLimit: {},
			modifyName: '',
			modifyRemark: '',
			modifyType: null,
			modifyLimited: {},
			modifyExportLimited: {}
		}
	},
	store: store,
	vuex: {
	    getters: {
	        alertConfig: function() {
	            return store.state.alertConfig;
	        }
	    },
	    actions: actions
	},
	components: {
		'm-pagination': Pagination,
		'm-loading': Loading,
		'm-alert': Alert,
		'm-limit-list': LimitList,
		'm-confirm': Confirm
	},
	created: function(){
		this.createTableBySearchStr();
	},
	methods: {
		createTableBySearchStr: function(){
			var _this = this;
			$.ajax({
				url: '/role/find',
				type: 'get',
				data: {
					limit: 10,
					page: _this.paginationConf.currentPage
				},
				success: function(data){
					_this.paginationConf.totalItems = data.count;
					_this.roleListData = data.data;
					_this.loading.show = false;
				}
			})
		},
		addRole: function(){
			this.exportLimit = {};
			this.limited = {};
			this.modal.show = true;
			this.modal.title = '新增角色';
			this.modifyRemark = '';
			this.modifyName = '';
			this.modifyType = 'add';
		},
		modifyRole: function(id, limited, exportLimit, name, remark){
			this.id = id;
			this.exportLimit = JSON.parse(exportLimit);
			this.limited = JSON.parse(limited);
			this.modal.show = true;
			this.modal.title = '修改角色';
			this.modifyRemark = remark;
			this.modifyName = name;
			this.modifyType = 'modify';
		},
		apply: function(){
			var _this = this;
			if(_this.modifyName === '' || _this.modifyRemark === ''){
				actions.alert(store, {
					show: true,
					msg: '角色名或备注不能为空',
					type: 'danger'
				})
				return;
			}
			if(this.modifyType === 'modify'){
				for(var item in _this.modifyLimited){
					if(_this.modifyLimited[item].length === 0){
						Vue.delete(_this.modifyLimited, item);
					}
				}
				for(var item in _this.modifyExportLimited){
					if(_this.modifyExportLimited[item].length === 0){
						Vue.delete(_this.modifyExportLimited, item);
					}
				}
				$.ajax({
					url: '/role/update',
					type: 'post',
					data: {
						id: _this.id,
						name: _this.modifyName,
						remark: _this.modifyRemark,
						limited: JSON.stringify(_this.modifyLimited),
						export: JSON.stringify(_this.modifyExportLimited)
					},
					success: function(data){
						if(!data.success){
							actions.alert(store, {
								show: true,
								msg: data.msg,
								type: 'danger'
							})
							return;
						}
						actions.alert(store, {
							show: true,
							msg: '修改成功',
							type: 'success'
						})
						_this.createTableBySearchStr();
						_this.modal.show = false;
					}
				})
			}else if(this.modifyType === 'add'){
				$.ajax({
					url: '/role/add',
					type: 'post',
					data: {
						name: _this.modifyName,
						remark: _this.modifyRemark,
						limited: JSON.stringify(_this.modifyLimited),
						export: JSON.stringify(_this.modifyExportLimited)
					},
					success: function(data){
						if(!data.success){
							actions.alert(store, {
								show: true,
								msg: data.msg,
								type: 'danger'
							})
							return;
						}
						actions.alert(store, {
							show: true,
							msg: '新增成功',
							type: 'success'
						})
						_this.createTableBySearchStr();
						_this.modal.show = false;
					}
				})
			}
		},
		forbidden: function(id, name){
			var _this = this;
			actions.confirm(store, {
				show: true,
				msg: '是否禁用角色 ' + name + '？',
				apply: function(){
					$.ajax({
						url: '/role/update',
						type: 'post',
						data: {
							id: id,
							status: 0
						},
						success: function(data){
							actions.alert(store, {
								show: true,
								msg: '禁用成功',
								type: 'success'
							})
							_this.createTableBySearchStr();
							_this.modal.show = false;
						}
					})
				}
			})
		},
		startUsing: function(id, name){
			var _this = this;
			actions.confirm(store, {
				show: true,
				msg: '是否启用角色 ' + name + '？',
				apply: function(){
					$.ajax({
						url: '/role/update',
						type: 'post',
						data: {
							id: id,
							status: 1
						},
						success: function(data){
							actions.alert(store, {
								show: true,
								msg: '启用成功',
								type: 'success'
							})
							_this.createTableBySearchStr();
							_this.modal.show = false;
						}
					})
				}
			})
		},
		hideModal: function(){
			// 隐藏弹窗，初始化数据
			this.modal.show = false;
			this.id = null;
			this.limited = {};
			this.exportLimit = {};
			this.modifyName = '';
			this.modifyRemark = '';
			this.modifyType = null;
			this.modifyLimited = {};
			this.modifyExportLimited = {};
		}
	},
	events: {
		borcastLimit: function(limit){
			this.modifyLimited = limit
		},
		borcastExportLimit: function(limit){
			this.modifyExportLimited = limit;
		}
	}
})

module.exports = Role;

</script>