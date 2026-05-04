import React from 'react';
import { render, screen } from '@testing-library/react';
import { SITE_URL } from '@site/siteUrl';
import SchemasPage from '../schemas';

describe('SchemasPage', () => {
  it('links to downloadable schema artifacts', () => {
    render(<SchemasPage />);
    expect(
      screen.getByRole('link', { name: /Product metadata \(JSON Schema draft 2020-12\)/ }).getAttribute('href'),
    ).toBe(`${SITE_URL}/schemas/product.schema.json`);
  });
});
