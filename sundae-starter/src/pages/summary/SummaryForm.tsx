import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
	<Popover id='popover-basic'>
		<Popover.Body>No ice cream will actually be delivered.</Popover.Body>
	</Popover>
);

export default function SummaryForm() {
	const [buttonState, setButtonState] = useState(true);

	function handleCheckboxChange() {
		setButtonState((prevState) => !prevState);
	}

	return (
		<form>
			<input
				type='checkbox'
				id='terms-and-conditions'
				defaultChecked={false}
				onChange={handleCheckboxChange}
			/>
			<OverlayTrigger trigger='hover' placement='right' overlay={popover}>
				<label htmlFor='terms-and-conditions'>
					Do you agree to the terms and conditions?
				</label>
			</OverlayTrigger>
			<input type='submit' value='Order now' disabled={buttonState} />
		</form>
	);
}
