(function(){
	var permToggle = document.getElementById('permission'),
		emailToggle = document.getElementById('email'),
		calendarToggle = document.getElementById('calendar'),
		fbToggle = document.getElementById('fb');

	var showNotificationsButton = document.getElementById('showNotifications');

	if (typeof Notification === 'function') { 
		checkPermission();
	} else {
		disableAllToggles();
		alert('Your browser does not support Web Notifications API.');
		return;
	}

	disableToggles();

	permToggle.addEventListener('click', function(e){
		checkPermissions();
	});

	showNotificationsButton.addEventListener('click', function(e){
		showNotifications();
	});

	function checkPermission(){
		if(permToggle.checked === false){
			showNotificationsButton.setAttribute('disabled', 'disabled');
			return;
		}

		Notification.requestPermission(function (status){
			if(Notification.permission !== status){
				Notification.permission = status;
			}
			if(Notification.permission === 'granted'){
				showNotificationsButton.removeAttribute('disabled');
			}else{
				disableToggles();
			}
		});
	}

	function disableToggles(){
		permToggle.checked = false;
		emailToggle.checked = false;
		calendarToggle.checked = false;
		fbToggle.checked = false;

		permToggle.setAttribute('disabled', 'disabled');
		emailToggle.setAttribute('disabled', 'disabled');
		calendarToggle.setAttribute('disabled', 'disabled');
		fbToggle.setAttribute('disabled', 'disabled');
		showNotificationsButton.setAttribute('disabled', 'disabled');
	}

	function showNotifications(){
		var ms = 10000;

		if(emailToggle.checked) {
			var en = new Notification('Confirm Your Payment of $500,000', { 
				body: 'From: Nigerian Prince',
				icon: 'images/email.png' 
			});
			en.onshow = function() { setTimeout(en.close, ms) }
		}
		if(calendarToggle.checked) {
			var cn = new Notification('Shaolin Kung-Fu Class', { 
				body: 'Sunday, March 23 5:30 PM',
				icon: 'images/calendar.png' 
			});
			cn.onshow = function() { setTimeout(cn.close, ms) }
		}
		if(fbToggle.checked) {
			var fn = new Notification('Chuck Norris poked you', { 
				icon: 'images/fb.png' }
			);
			fn.onshow = function() { setTimeout(fn.close, ms) }
		}
	}
})();