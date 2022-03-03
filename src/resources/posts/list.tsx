import {
	List, Datagrid, TextField, ReferenceField, ListProps, EditButton,
	TextInput, ReferenceInput, SelectInput, Responsive, SimpleList,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";


const filters = [
	<TextInput alwaysOn source="q" label="Pesquisar"/>,
	<ReferenceInput source="userId" label="User" reference="users" allowEmpty>
		<SelectInput optionText="name"/>
	</ReferenceInput>
];

export const PostList = (props: ListProps) => {
	const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
	return (
		<List {...props} filters={filters}>
		
			{
				isSmall ? (
					<SimpleList 
						primaryText={record=>record.title}
						secondaryText={record=>record.views}
						tertiaryText={record=> new Date(record.published_at).toLocaleDateString()}
					/>
				) : (
					<Datagrid>
						<TextField source="id" />
						<ReferenceField source="userId" reference="users">
							<TextField source="name" />
						</ReferenceField>
						<TextField source="title" />
						<EditButton/>
					</Datagrid>
				)
			}			
			
		</List>
	);
};