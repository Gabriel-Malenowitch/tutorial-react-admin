import jsonServerProvider from "ra-data-json-server";
import { domain } from "../routes";

const dp = jsonServerProvider(domain);

import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const f = fetchUtils.fetchJson;

export const DataProvider = {
	// Original q está no tutorial
	// getList: (resource: string, params: any) => {
	// 	const { page, perPage } = params.pagination;
	// 	const { field, order } = params.sort;
	// 	const query = {
	// 		sort: JSON.stringify([field, order]),
	// 		range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
	// 		filter: JSON.stringify(params.filter),
	// 	};
	// 	const url = `${domain}/${resource}?${stringify(query)}`;

	// 	return f(url).then(({ headers, json }: any) => ({
	// 		data: json,
	// 		total: parseInt(headers.get("content-range")?.split("/").pop(), 10),
	// 	}));
	// },

	// ===============================

	// Minha adaptação
	// getList: (resource: string, params: any) => {
	// 	const { page, perPage } = params.pagination;
	// 	const { field, order } = params.sort;
	// 	const query = {
	// 		range: JSON.stringify([(page-1) * perPage, page * perPage -1]),
	// 		sort: JSON.stringify([field, order]),
	// 		filter: JSON.stringify(params.filter)
	// 	};
	// 	const url = `${domain}/${resource}?${stringify(query)}`;

	// 	const n = f(url).then(({headers, json}: any)=>({
	// 		data: json,
	// 		total: parseInt(headers.get("content-range").split("/").pop(), 10),
	// 	}));

	// 	n.then(e=>console.log(e));
	// 	return n;
	// },

	getList: dp.getList,

	getOne: (resource: string, params: any) => {
		const n = f(`${domain}/${resource}/${params.id}`)
			.then(({json})=>({ data: json }));
		n.then(e=>console.log(e));
		return n;
	},

	getMany: (resource: string, params: any) => {
		const query = {
			filter: JSON.stringify({id: params.ids})
		};
		const url = `${domain}/${resource}?${stringify(query)}`;
		return f(url).then(({json})=>({data: json}));
	},

	getManyReference: (resource: string, params: any) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			range: JSON.stringify([(page-1) * perPage, page * perPage -1]),
			sort: JSON.stringify([field, order]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			})
		};
		const url = `${domain}/${resource}?${stringify(query)}`;

		return f(url).then(({headers, json}: any)=>({
			data: json,
			total: parseInt(headers.get("content-range")?.split("/").pop(), 10),
		}));
	},

	update: (resource: string, params: any) => {
		return f(`${domain}/${resource}/${params.id}`, {
			method: "PUT",
			body: JSON.stringify(params.data)
		}).then(({json})=>({ data: json }));
	},

	updateMany: (resource: string, params: any) => {
		const query = {
			filter: JSON.stringify({id: params.ids})		
		};
		return f(`${domain}/${resource}/${stringify(query)}`, {
			method: "put",
			body: JSON.stringify(params.data),
		}).then(({json})=>({data: json}));
	},

	create: (resource: string, params: any) => {
		return f(`${domain}/${resource}`, {
			method: "POST",
			body: JSON.stringify(params.data)
		}).then(({ json })=>({
			data: { ...params.data, id: json.id}
		}));
	},

	delete: (resource: string, params: any) => {
		return f(`${domain}/${resource}/${params.id}`, {
			method: "DELETE",
		}).then(({json})=>({ data: json }));
	},

	deleteMany: (resource: string, params: any) => {
		const query = {
			filter: JSON.stringify({id: params.ids})
		};
		return f(`${domain}/${resource}/${stringify(query)}`, {
			method: "DELETE",
		}).then(({json})=>({ data: json }));
	}

};

