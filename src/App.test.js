import React from 'react';
import { render } from '@testing-library/react';
import ScrumPokerApp from './ScrumPokerApp';

test('Render poker table', () => {
  const { getByText } = render(<ScrumPokerApp />);
  const linkElement = getByText(/scrum poker/i);
  expect(linkElement).toBeInTheDocument();
});
