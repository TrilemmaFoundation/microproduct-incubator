import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type HeroCta = {
  label: string;
  to: string;
};

export type HeroProps = {
  title: string;
  description: string;
  actions: HeroCta[];
};

export default function Hero({ title, description, actions }: HeroProps) {
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <Link
              key={`${action.label}-${action.to}`}
              className={clsx(
                'button button--lg',
                index === 0 ? 'button--primary' : 'button--secondary',
              )}
              to={action.to}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
