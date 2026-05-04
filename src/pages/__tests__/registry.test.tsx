import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RegistryPage from '../registry';

jest.mock('@site/static/registry.json', () => ({
  __esModule: true,
  default: {
    version: '1.0.0',
    canonical_url: 'https://build.trilemma.foundation/registry.json',
    description: 'Test registry.',
    products: [
      {
        id: 'alpha-demo',
        name: 'Alpha',
        status: 'mvp',
        maturity: 3,
        maturity_label: 'mvp',
        scope: 'community',
        archetype: 'data-to-decision-tool',
        problem: 'Choose better.',
        target_users: ['operators'],
        primary_decision: 'Which branch?',
        inputs: ['table'],
        outputs: ['signal'],
        tags: ['finance'],
        docs: 'https://example.com/docs-alpha',
        agent_entrypoint: 'https://example.com/AGENTS.md',
      },
      {
        id: 'beta-demo',
        name: 'Beta',
        status: 'idea',
        maturity: 0,
        scope: 'external',
        archetype: 'forecasting-product',
        problem: 'Predict demand.',
        target_users: ['planners'],
        primary_decision: 'How much stock?',
        inputs: ['orders'],
        outputs: ['curve'],
        tags: ['retail'],
        repo: 'https://example.com/repo',
        site: 'https://example.com',
      },
    ],
  },
}));

describe('RegistryPage', () => {
  it('shows every product initially', () => {
    render(<RegistryPage />);
    expect(screen.getByRole('heading', { name: 'Microproduct registry' })).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'https://example.com/docs-alpha' })).toBeInTheDocument();
  });

  it('filters products by status', () => {
    render(<RegistryPage />);
    const select = screen.getByLabelText('Filter by status');
    fireEvent.change(select, { target: { value: 'mvp' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('shows empty state copy when filters miss', () => {
    render(<RegistryPage />);
    const select = screen.getByLabelText('Filter by status');
    fireEvent.change(select, { target: { value: 'archived' } });
    expect(screen.getByText('No entries match those filters.')).toBeInTheDocument();
  });

  it('filters tags via text input and quick buttons', () => {
    render(<RegistryPage />);
    const input = screen.getByLabelText('Filter by tag substring');
    fireEvent.change(input, { target: { value: 'fin' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'finance' }));
    expect((input as HTMLInputElement).value).toBe('finance');
  });
});
