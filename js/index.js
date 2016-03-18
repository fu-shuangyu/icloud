var reminder = angular.module('reminder', []);
reminder.filter('search',[function () {
	return function(data,key){
		var xx = function(items){
			for (var i = 0; i < items.length; i++) {
				if( items[i].name.indexOf(key) != -1 ){
					return true;
				}
			}
			return false;
		}
		var r = [];
		for (var i = 0; i < data.length; i++) {
			if ( data[i].name.indexOf(key) != -1 ){
				r.push(data[i]);
			} 
			if(xx(data[i].items)){
				r.push(data[i]);
			}
		}
		return r;
	}
}])
reminder.controller('rdCtrl', ['$scope', function($scope){
	$scope.showshijian = function(index){
		$scope.cindex = index;
	}
	$scope.colors = ['purple','green','blue','yellow','brown','pink','orange'];
	$scope.colors1 = ['purple1','green1','blue1','yellow1','brown1','pink1','orange1'];
	$scope.addshijian = function(){
		var data = {name:'新项目'+($scope.shijianliebiao.length+1),color:$scope.colors[$scope.shijianliebiao.length%7],items:[]};
		$scope.shijianliebiao.push(data);
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.cindex = 0;
	$scope.ctrue = 0;
	var d = localStorage.data;
	$scope.shijianliebiao = d?JSON.parse(d):[];

	/*$scope.clear = function(){
		localStorage.clear();
		location.reload();
	}*/
	$scope.zz = function(ev){
		ev.stopPropagation();
	}
	$scope.deleteItem = function(){
		var r = [];
		for (var i = 0; i < $scope.shijianliebiao.length; i++) {
			if(  i!= $scope.cindex){
				r.push($scope.shijianliebiao[i]);
			}
		}
		$scope.shijianliebiao = r;
		$scope.cindex = 0;
		localStorage.data = JSON.stringify($scope.shijianliebiao);
		$scope.xianshi = false;
	}
	//添加右侧条目
	$scope.addTodo = function(){
		var cu = $scope.shijianliebiao[$scope.cindex];
		var data = {name:"新条目" + (cu.items.length+1),isDone:false};
		cu.items.push(data);
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.deleteTodo = function(index){
		var cu = $scope.shijianliebiao[$scope.cindex];
		var r = [];
		for (var i = 0; i < cu.items.length; i++) {
			if(  i!= index){
				r.push(cu.items[i]);
			}
		}
		cu.items = r;
		localStorage.data = JSON.stringify($scope.shijianliebiao);
		$scope.xianshi = false;
	}
	$scope.save = function(){
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.xianshi =false;
	$scope.setTrue = function (){
		$scope.xianshi = true;
	}
	$scope.setFalse = function (){
		$scope.xianshi = false;
	}
	$scope.countDone = function () {
		var lis = $scope.shijianliebiao[$scope.cindex].items;
		var r = 0;
		for (var i = 0; i < lis.length; i++) {
			if(lis[i].isDone){
				r += 1;
			}
		}
		return r;
	}
	$scope.a = true;
}])