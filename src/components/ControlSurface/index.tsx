import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: 'default' | 'hero';
  className?: string;
};

type ActionItem = {
  label: string;
  href?: string;
  to?: string;
  description?: string;
  external?: boolean;
  copyValue?: string;
};

type ActionCardProps = {
  title: string;
  description: string;
  actions: ActionItem[];
  aside?: ReactNode;
};

type MetadataPillProps = {
  children: ReactNode;
  tone?: 'default' | 'accent';
};

type CommandBlockProps = {
  label: string;
  value: string;
  language?: string;
};

type StepItemProps = {
  index: number;
  title: string;
  description: string;
  command?: string;
  artifacts?: string[];
  outcome?: string;
};

export function copyToClipboard(value: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(value);
    return;
  }

  /* istanbul ignore next -- jsdom test environment always provides document */
  if (typeof document === 'undefined') {
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function CopyButton({
  value,
  label = 'Copy',
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={() => {
        copyToClipboard(value);
        setCopied(true);
      }}
      aria-label={`${label} to clipboard`}
    >
      {copied ? 'Copied' : label}
    </button>
  );
}

export function PageSection({
  eyebrow,
  title,
  description,
  children,
  variant = 'default',
  className,
}: SectionProps) {
  return (
    <section
      className={clsx(
        styles.section,
        variant === 'hero' && styles.sectionHero,
        className,
      )}
    >
      <div className={styles.sectionHeader}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        {description ? <p className={styles.sectionDescription}>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function ActionCard({
  title,
  description,
  actions,
  aside,
}: ActionCardProps) {
  return (
    <article className={styles.panel}>
      <div className={styles.panelBody}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.actionList}>
          {actions.map((action) => {
            const content = (
              <>
                <span className={styles.actionLabel}>{action.label}</span>
                {action.description ? (
                  <span className={styles.actionDescription}>{action.description}</span>
                ) : null}
              </>
            );

            return (
              <div key={`${action.label}-${action.href ?? action.to ?? action.copyValue ?? 'action'}`} className={styles.actionRow}>
                {action.href ? (
                  <Link
                    className={styles.actionLink}
                    href={action.href}
                    rel={action.external ? 'noreferrer noopener' : undefined}
                  >
                    {content}
                  </Link>
                ) : (
                  <Link className={styles.actionLink} to={action.to ?? '/'}>
                    {content}
                  </Link>
                )}
                {action.copyValue ? <CopyButton value={action.copyValue} /> : null}
              </div>
            );
          })}
        </div>
      </div>
      {aside ? <div className={styles.cardAside}>{aside}</div> : null}
    </article>
  );
}

export function MetadataPill({
  children,
  tone = 'default',
}: MetadataPillProps) {
  return (
    <span
      className={clsx(styles.metadataPill, tone === 'accent' && styles.metadataPillAccent)}
    >
      {children}
    </span>
  );
}

export function CommandBlock({
  label,
  value,
  language = 'text',
}: CommandBlockProps) {
  return (
    <div className={styles.commandBlock}>
      <div className={styles.commandHeader}>
        <span className={styles.commandLabel}>{label}</span>
        <CopyButton value={value} />
      </div>
      <pre className={styles.commandPre}>
        <code className={`language-${language}`}>{value}</code>
      </pre>
    </div>
  );
}

export function StepItem({
  index,
  title,
  description,
  command,
  artifacts,
  outcome,
}: StepItemProps) {
  return (
    <article className={styles.stepItem}>
      <div className={styles.stepMarker} aria-hidden>
        {index}
      </div>
      <div className={styles.stepBody}>
        <Heading as="h3" className={styles.stepTitle}>
          {title}
        </Heading>
        <p className={styles.stepDescription}>{description}</p>
        {command ? <CommandBlock label="Command" value={command} language="bash" /> : null}
        {artifacts?.length ? (
          <div className={styles.detailGroup}>
            <span className={styles.detailLabel}>Expected artifacts</span>
            <div className={styles.chipRow}>
              {artifacts.map((artifact) => (
                <MetadataPill key={artifact}>{artifact}</MetadataPill>
              ))}
            </div>
          </div>
        ) : null}
        {outcome ? (
          <p className={styles.outcome}>
            <strong>What good looks like:</strong> {outcome}
          </p>
        ) : null}
      </div>
    </article>
  );
}
