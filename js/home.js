mui.init();

mui.plusReady(function() {

	//注释掉本地存储
	// storage.init();
	// storageUser = kidstorageuser.getInstance();


	//绑定报修按钮
	document.getElementById("repair").addEventListener("tap", function() {
		openNew("repair.html");
	});
})