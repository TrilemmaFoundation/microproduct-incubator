import {UNIVERSITY_TICKER_NAMES} from '../../constants/universities';
import styles from './styles.module.css';

function MarqueeSegment(props: {instanceId: string}) {
  const {instanceId} = props;

  return (
    <div className={styles.segment}>
      {UNIVERSITY_TICKER_NAMES.map((name, index) => (
        <span
          key={`${instanceId}-${name}-${index}`}
          className={styles.cluster}>
          {index > 0 ? <span className={styles.dot} aria-hidden /> : null}
          <span className={styles.item}>{name}</span>
        </span>
      ))}
    </div>
  );
}

export default function UniversityMarquee() {
  return (
    <section className={styles.section} aria-label="Partner universities">
      <div className={styles.inner}>
        <p className={styles.label}>Community</p>
        <div className={styles.viewport}>
          <div className={styles.track}>
            <MarqueeSegment instanceId="a" />
            <MarqueeSegment instanceId="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
