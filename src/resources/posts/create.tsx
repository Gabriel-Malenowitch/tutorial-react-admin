import {
	Create, SimpleForm, ReferenceInput, 
	SelectInput, TextInput, EditProps,
} from "react-admin";


export const PostCreate = (props: EditProps) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="id" />
			<ReferenceInput source="userId" reference="users">
				<SelectInput optionText="name" />
			</ReferenceInput>
			<TextInput source="title" />
			<TextInput multiline source="body" />
		</SimpleForm>
	</Create>
);