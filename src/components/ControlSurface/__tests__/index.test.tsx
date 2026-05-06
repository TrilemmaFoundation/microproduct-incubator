import React from 'react';
import { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  ActionCard,
  CommandBlock,
  MetadataPill,
  PageSection,
  StepItem,
} from '../index';

describe('ControlSurface', () => {
  const writeText = jest.fn();
  const originalClipboard = navigator.clipboard;
  const originalExecCommand = document.execCommand;

  beforeEach(() => {
    writeText.mockReset();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });
  });

  afterEach(() => {
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
    document.execCommand = originalExecCommand;
  });

  it('copies command block values to the clipboard', () => {
    jest.useFakeTimers();
    render(<CommandBlock label="Validation command" value="npm run validate:registry" />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    expect(writeText).toHaveBeenCalledWith('npm run validate:registry');
    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toHaveTextContent('Copied');
    expect(screen.getByText('npm run validate:registry')).toHaveClass('language-text');

    act(() => {
      jest.advanceTimersByTime(1600);
    });

    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toHaveTextContent('Copy');
    jest.useRealTimers();
  });

  it('renders action links with optional copy controls', () => {
    render(
      <ActionCard
        title="Canonical artifacts"
        description="Stable URLs for agents."
        actions={[
          {
            label: 'registry.json',
            href: '/registry.json',
            description: 'Machine-readable manifest.',
            copyValue: '/registry.json',
          },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: /registry\.json/i })).toHaveAttribute('href', '/registry.json');
    fireEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));
    expect(writeText).toHaveBeenCalledWith('/registry.json');
  });

  it('falls back to document.execCommand when navigator clipboard is unavailable', () => {
    Object.assign(navigator, {
      clipboard: undefined,
    });
    document.execCommand = jest.fn().mockReturnValue(true);

    render(<CommandBlock label="Fallback command" value="echo test" language="bash" />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('renders non-hero sections and optional content branches', () => {
    render(
      <>
        <PageSection title="Default section">
          <div>Body</div>
        </PageSection>
        <ActionCard
          title="Internal action"
          description="Minimal card"
          actions={[
            { label: 'Fallback route' },
            { label: 'External doc', href: 'https://example.com', external: true },
          ]}
        />
        <MetadataPill tone="accent">Accent</MetadataPill>
        <StepItem index={1} title="Minimal step" description="No extra blocks" />
      </>,
    );

    expect(screen.getByRole('heading', { name: 'Default section' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Fallback route' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'External doc' })).toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
    expect(screen.getByText('Accent')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Minimal step' })).toBeInTheDocument();
    expect(screen.queryByText('Expected artifacts')).not.toBeInTheDocument();
  });
});
