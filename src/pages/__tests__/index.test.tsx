import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home page', () => {
  it('renders launchpad sections and agent entry links', () => {
    render(<Home />);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Agent launchpad for building and auditing microproducts' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Start an agent' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ship a microproduct' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /AGENTS\.md/i })).toHaveAttribute('href', 'pathname:///AGENTS.md');
    expect(screen.getByRole('link', { name: /product\.schema\.json/i })).toHaveAttribute(
      'href',
      'pathname:///schemas/product.schema.json',
    );
  });
});
