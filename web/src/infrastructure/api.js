import axios from 'axios';
const target = `${process.env.REACT_APP_API_URL}`;
export let access_token = null;

export async function login(data) {
	const response = await axios.post('/auth/login', data);
	if (response.data.success) access_token = response.data.token;
	return response.data;
}

export async function logout() {
	access_token = null;
}

export async function checkLogin() {}

export async function secApiCall(url, data, method = 'POST') {
	if (!data) data = {};
	let requestOptions = {
		credentials: 'include',
		redirect: 'follow',
		headers: {
			Authorization: `Bearer ${access_token}`,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	};
	const response = await axios.post(target + url, data, requestOptions);
	if (response.status === 401 || response.status === 403) {
		access_token = null; // weird logout works
		window.location.replace('/');
	}
	return response.data;
}

export async function apiCall(url, data, method = 'POST') {
	if (!data) data = {};
	let requestOptions = {
		credentials: 'include',
		redirect: 'follow',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	};
	const response = await axios.post(target + url, data, requestOptions);
	return response.data;
}
