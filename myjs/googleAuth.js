function onSignIn(googleUser) {

	var profile = googleUser.getBasicProfile();
	// console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	// console.log('Name: ' + profile.getName());
	// console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

	console.log(googleUser.getAuthResponse().id_token);

	let token = googleUser.getAuthResponse().id_token;

	$.ajax({

		url: "https://us-central1-primehackathon.cloudfunctions.net/api/login",
		type: "POST",
		data: {
			"idToken": token
		},
		success: function(result, status) {

			console.log("query baji");
			if(status === 'success') {

				console.log(result);
				if(result.success === true) {
					
					if(result.onBoard === false) {

						// redirect to onBoard page
						window.location.href = "primeHackathonFront/onboard.html"

					}
				}
			}
			else {
				signOut();
				console.log("error occured while requesting");
			}

		}
	})
}

/* <a href="#" onclick="signOut();">Sign out</a> */
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}
