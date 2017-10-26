mk=angular.module('myapp',["ngRoute"]);
		
		mk.service('crsj',function(){
			this.cr=function(dataObj){
				if(dataObj){
					dataStr=JSON.stringify(dataObj);
					localStorage.setItem('ly',dataStr)
				}else{
					localStorage.setItem('ly','{"info":[]}');
				}
			}
			this.qu=function(){
				dataStr=localStorage.getItem('ly');
				if(dataStr){
					dataObj=JSON.parse(dataStr);
					console.log(dataObj)
					return dataObj;
				}
			}
		})
		
		mk.controller('tjsj',['$scope','crsj',function($scope,crsj){
			if(crsj.qu()){
				$scope.zhi=crsj.qu().info
			}else{
				crsj.cr();
			}
				$scope.add=function(){
	//				console.log(1)
					dataObj=crsj.qu();
					dataObj.info.push({'title':$scope.title,"content":$scope.content,"time":$scope.time});
						$scope.zhi=dataObj.info;
						console.log($scope.zhi)
						crsj.cr(dataObj);
						$scope.title=" ";
						
					}
				$scope.del=function(index){
					dataObj=crsj.qu();
					dataObj.info.splice(index,1);
					$scope.zhi=dataObj.info;
					crsj.cr(dataObj)
				}
		}])
//		$scope.bc=function(){
//			dataObj=crsj.qu();
//			dataObj.info.push({'title':$scope.title,"content":$scope.content,"time":$scope.time});
//			$scope.zhi=dataObj.info;
//			console.log($scope.zhi)
//			crsj.cr(dataObj);
//		}
//		
		
		
		mk.config(function($routeProvider){
				$routeProvider
				.when("/index1",{
					templateUrl:"index.html"
				})
				.when("/detail1",{
					templateUrl:"detail.html"
				})
				.otherwise({redirectTo:"/index1"})
			})