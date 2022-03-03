import React from "react";
import { Admin, Resource } from "react-admin";
import { DataProvider, AuthProvider } from "./security";
import { UserList } from "./resources/users";
import { PostList, PostCreate, PostEdit, } from "./resources/posts";
import { api } from "./routes";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import "./App.css";

function App() {
	return (
		<Admin dataProvider={DataProvider} authProvider={AuthProvider}>
			<Resource name={api.users} list={UserList} icon={UserIcon}/>
			<Resource name={api.posts} list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
		</Admin>
	);
}

export default App;
