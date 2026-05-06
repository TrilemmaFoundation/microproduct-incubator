import React from 'react';
import { render, screen } from '@testing-library/react';
import { SITE_URL } from '@site/siteUrl';
import SchemasPage from '../schemas';

describe('SchemasPage', () => {
  it('links to downloadable schema artifacts and validation guidance', () => {
    render(<SchemasPage />);
    expect(
      screen.getByRole('link', { name: /product\.schema\.json/i }).getAttribute('href'),
    ).toBe(`${SITE_URL}/schemas/product.schema.json`);
    expect(screen.getByText('npm run validate:registry')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What usually breaks validation' })).toBeInTheDocument();
  });
});
