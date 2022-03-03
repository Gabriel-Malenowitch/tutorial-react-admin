import {
	Edit, SimpleForm, ReferenceInput, 
	SelectInput, TextInput, EditProps, TitleProps,
} from "react-admin";




export const PostEdit = (props: EditProps) => (
	<Edit {...props} title={<PostTitle/>} mutationMode="pessimistic">
		<SimpleForm>
			<TextInput source="id" />
			<ReferenceInput source="userId" reference="users">
				<SelectInput optionText="name" />
			</ReferenceInput>
			<TextInput source="title" />
			<TextInput multiline source="body" />
		</SimpleForm>
	</Edit>
);

const PostTitle = (props: TitleProps) => <span>Post {props.record ? `"${props.record.title}"`: ""}</span>;