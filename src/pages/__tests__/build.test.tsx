import React from 'react';
import { render, screen } from '@testing-library/react';
import BuildPage from '../build';

describe('BuildPage', () => {
  it('renders ordered guidance', () => {
    render(<BuildPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Build workspace (MVP)' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
