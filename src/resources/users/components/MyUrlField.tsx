import { TextFieldProps, useRecordContext } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyle = makeStyles({
	link: {
		textDecoration: "none",
		color: "#F34",
		fontSize: "1.3rem",
	},
	icon: {
		margin: 5,
		padding: 5,
		width: "0.5rem",
		height: "0.5rem",
	}
});


export const MyUrlField = ({ source }: TextFieldProps) => {
	const record = useRecordContext();
	const classes = useStyle();
	// console.log(record);
	return record ? (
		<a href={record[source!]} target="_blank" className={classes.link}>
			{record[source!]}
			<LaunchIcon className={classes.icon}/>
		</a>
	) : null;
};