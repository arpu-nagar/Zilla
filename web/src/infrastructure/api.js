const target = `${process.env.REACT_APP_API_URL}`;
export let access_token = null;

export async function login(data) {
	let requestOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	const response = await fetch('/auth/login', requestOptions);
	if (response.success === true) {
		access_token = response.token;
	}
	console.log(access_token);
	return response;
}

export async function secApiCall(url, data, method = 'POST') {
	if (!data) data = {};
	let requestOptions = {
		method: method,

		credentials: 'include',
		redirect: 'follow',
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: data,
	};
	const response = await fetch(target + url, requestOptions);
	if (response.status === 401) {
		access_token = null;
		// logout
		window.location.replace('/');
	}
	return response;
}

export async function apiCall(url, data, method = 'POST') {
	if (!data) data = {};
	let requestOptions = {
		method: method,
		credentials: 'include',
		redirect: 'follow',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		body: data,
	};
	const response = await fetch(target + url, requestOptions);
	return response;
}
