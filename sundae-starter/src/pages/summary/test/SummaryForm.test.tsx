import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';
import { describe, expect } from 'vitest';
import { as } from 'vitest/dist/reporters-5f784f42';

test('Initial state', () => {
	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const submitButton = screen.getByRole('button', { name: /order/i });

	// initial state
	expect(checkbox).not.toBeChecked();
	expect(submitButton).toBeDisabled();
});

test('Checking the checkbox enables the submit button and disables when unchecked', async () => {
	const user = userEvent.setup();

	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	});
	const submitButton = screen.getByRole('button', { name: /order/i });

	// check the checkbox
	await user.click(checkbox);
	expect(submitButton).toBeEnabled();

	// uncheck the checkbox
	await user.click(checkbox);
	expect(submitButton).toBeDisabled();
});

test('popover responds to hover', async () => {
	const user = userEvent.setup();
	render(<SummaryForm />);

	// initial: hidden
	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);
	expect(nullPopover).toBeNull();

	// popover appears on label hover
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	await user.hover(termsAndConditions);

	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	// popover disappears on mouse unhover?
	await user.unhover(termsAndConditions);
	expect(popover).not.toBeInTheDocument();
});
