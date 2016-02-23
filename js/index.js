var reminder = angular.module('reminder', []);
reminder.controller('rdCtrl', ['$scope', function($scope){
	$scope.showshijian = function(index){
		$scope.cindex = index;
	}
	$scope.colors = ['purple','green','blue','yellow','brown','pink','orange'];
	$scope.addshijian = function(){
		var data = {name:'新项目'+($scope.shijianliebiao.length+1),color:$scope.colors[$scope.shijianliebiao.length%7],items:[]};
		$scope.shijianliebiao.push(data);
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.cindex = 0;
	var d = localStorage.data;
	$scope.shijianliebiao = d?JSON.parse(d):[];
	$scope.clear = function(){
		localStorage.clear();
		location.reload();
	}
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
	}
	$scope.save = function(){
		localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
	$scope.xianshi =false;
	
}])