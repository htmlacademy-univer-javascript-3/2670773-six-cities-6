import styles from './spinner.module.css';

export default () => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px'}}>
    <div className={styles.spinner}/>
  </div>
);
