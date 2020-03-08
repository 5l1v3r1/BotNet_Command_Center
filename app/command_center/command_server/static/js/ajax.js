
function ajaxGetLastShout(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "/last/");
	xhr.send();

	xhr.onload = function(){
		let response = JSON.parse(xhr.responseText);
		let shoutList = document.getElementsByTagName("ul");
		let lastMessage = shoutList[0].firstElementChild.firstElementChild.value;
		if (lastMessage < response.created){
			let date = new Date(response.created * 1000);
			let shoutTimeCreated = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
			let newShout = '<li><input type=\"hidden\" value=\"' + response.created +'\"/>';
				//Hidden field need to contain UNIXTIME, what use in Shouts.time
				newShout += '<div class=\"card bg-light mb-3\"'; 
				newShout += 'style=\"max-width: 35rem;';
				newShout += 'margin-right: auto; margin-left: auto;';
				newShout += 'margin-top: 2%; margin-bottom: 2%\">';
				newShout += '<div class=\"card-header\">' + shoutTimeCreated + '</div>';
				newShout += '<div class=\"card-body\">';
				newShout += '<h5 class=\"card-title\">' + response.name + '</h5>';
				newShout += '<p class=\"card-text\">' + response.text + '</p></div></div></li>';

			shoutList[0].firstElementChild.insertAdjacentHTML('beforebegin', newShout);
		}
	};	
}

function ajaxGetAllShouts(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "/allshouts/");
	xhr.send();

	xhr.onload = function(){
		let response = JSON.parse(xhr.responseText);
		let shoutbox = document.getElementsByTagName("ul");
		let shouts = response.shouts;

		for (let i of shouts){
			let date = new Date(i.created * 1000);
			let hours = date.getHours()
			if (hours < 10)
				hours = "0" + hours;
			let minutes = date.getMinutes();
			if (minutes < 10)
				minutes = "0" + minutes;
			let seconds = date.getSeconds();
			if (seconds < 10)
				seconds = "0" + seconds; 
			let shoutTimeCreated = hours + ":" + minutes + ":" + seconds;

			let newShout = '<li><input type=\"hidden\" value=\"' + i.created +'\"/>';
				//Hidden field need to contain UNIXTIME, what use in Shouts.time
				newShout += '<div class=\"card bg-light mb-3\"'; 
				newShout += 'style=\"max-width: 35rem;';
				newShout += 'margin-right: auto; margin-left: auto;';
				newShout += 'margin-top: 2%; margin-bottom: 2%\">';
				newShout += '<div class=\"card-header\">' + shoutTimeCreated + '</div>';
				newShout += '<div class=\"card-body\">';
				newShout += '<h5 class=\"card-title\">' + i.name + '</h5>';
				newShout += '<p class=\"card-text\">' + i.text + '</p></div></div></li>';

			shoutbox[0].firstElementChild.insertAdjacentHTML('beforebegin', newShout);
		}
	};
}

function pushShout(){
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/push/')
	let pushingText = document.getElementById('shoutFromMaster').value;

	let body = new FormData();
	body.append("name","master");
	body.append("text", pushingText);
	xhr.send(body);
}


let loopRequestLastShout = setInterval(ajaxGetLastShout, 5000);
window.onload = ajaxGetAllShouts;
let pushShoutSubmit = document.getElementById("sendMessage");
pushShoutSubmit.onclick = pushShout;

