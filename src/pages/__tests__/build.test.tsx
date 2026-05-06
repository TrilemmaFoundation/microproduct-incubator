import React from 'react';
import { render, screen } from '@testing-library/react';
import BuildPage from '../build';

describe('BuildPage', () => {
  it('renders the operational build sequence', () => {
    render(<BuildPage />);
    expect(
      screen.getByRole('heading', { name: 'Ship a microproduct through the canonical 4-step sequence' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Anchor the problem and folder contract' })).toBeInTheDocument();
    expect(screen.getAllByText('npm run validate:registry && npm run test -- --runInBand')).toHaveLength(2);
  });
});
