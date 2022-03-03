export const AuthProvider = {
	login: (params: any) => {
		sessionStorage.setItem("auth", "true");
		return params.username !== "" ? Promise.resolve() : Promise.reject();
	},
	logout: (params: any) => {
		sessionStorage.removeItem("auth");
		return Promise.resolve();
	},
	checkAuth: (params: any) => {
		if(sessionStorage.getItem("auth")) return Promise.resolve(); 
		return Promise.reject();       
	},
	checkError: (params: any) => {
		if(params.status === 401 || params.status === 402){
			localStorage.removeItem("auth");
			return Promise.reject();
		}
		return Promise.resolve();
	},
	getPermissions: (params: any) => Promise.resolve(),
	getIdentity: () => Promise.resolve({
		id: 0,
		fullName: "Gabriel B. Malenowitch",
		avatar: "https://github.com/Gabriel-Malenowitch.png",
		
	}),
};
