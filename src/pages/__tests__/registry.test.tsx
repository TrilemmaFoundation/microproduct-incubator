import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegistryPage from '../registry';

const mockManifest = {
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
};

function mockFetchOk() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockManifest,
  });
}

describe('RegistryPage', () => {
  beforeEach(() => {
    mockFetchOk();
  });

  it('shows every product after load', async () => {
    render(<RegistryPage />);
    expect(screen.getByText('Please wait…')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Microproduct registry' })).toBeInTheDocument();
    });

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('2 results')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/registry.json');
  });

  it('filters products by status', async () => {
    render(<RegistryPage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by status')).toBeInTheDocument();
    });

    const select = screen.getByLabelText('Filter by status');
    fireEvent.change(select, { target: { value: 'mvp' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('shows empty state copy when filters miss', async () => {
    render(<RegistryPage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by status')).toBeInTheDocument();
    });

    const select = screen.getByLabelText('Filter by status');
    fireEvent.change(select, { target: { value: 'archived' } });
    expect(screen.getByText('No entries match those filters.')).toBeInTheDocument();
  });

  it('filters via search and quick tag buttons', async () => {
    render(<RegistryPage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Search registry')).toBeInTheDocument();
    });

    const input = screen.getByLabelText('Search registry');
    fireEvent.change(input, { target: { value: 'fin' } });
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'finance' }));
    expect((input as HTMLInputElement).value).toBe('finance');
  });

  it('resets filters back to the full registry', async () => {
    render(<RegistryPage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by status')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Filter by status'), { target: { value: 'idea' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
    expect(screen.getByText('Showing the full registry.')).toBeInTheDocument();
    expect(screen.getByText('2 results')).toBeInTheDocument();
  });

  it('shows error when fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    render(<RegistryPage />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Could not load the registry');
    });
  });

  it('shows error when fetch rejects with a non-Error value', async () => {
    global.fetch = jest.fn().mockRejectedValue('offline');

    render(<RegistryPage />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Could not load the registry');
    });
    expect(screen.getByRole('alert')).toHaveTextContent('offline');
  });
});
