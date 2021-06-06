import { Card, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { List, arrayMove } from 'react-movable';

const useStyles = makeStyles(theme => ({}));

function Bugs() {
	const [unresolvedBugs, setUnresolvedBugs] = React.useState([
		'aaaa bbb  ccc',
		'b',
		'c',
	]);
	const [resolvedBugs, setResolvedBugs] = React.useState([]);
	const classes = useStyles();
	return (
		<div>
			{/* Two blocks, one for unresolved bugs, one for done and under review*/}
			<Card className={classes.root} variant="outlined">
				<CardContent>
					<List
						values={unresolvedBugs}
						onChange={({ oldIndex, newIndex }) => {
							if (newIndex === -1) {
							} else
								setUnresolvedBugs(
									arrayMove(
										unresolvedBugs,
										oldIndex,
										newIndex,
									),
								);
						}}
						renderList={({ children, props }) => (
							<ul {...props}>{children}</ul>
						)}
						renderItem={({ isOutOfBounds, value, props }) => (
							<div isOutOfBounds={true} {...props}>
								{value}
							</div>
						)}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

export default Bugs;
