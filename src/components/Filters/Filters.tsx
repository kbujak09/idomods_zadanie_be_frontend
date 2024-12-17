import styles from './filters.module.scss';

import downloadIcon from '../../assets/download.svg';

type FilterBarProps = {
  setSort: (arg: string) => void,
  setMinWorth: (arg: string) => void,
  setMaxWorth: (arg: string) => void,
  downloadCSV: () => void,
}

const Filters = ({setSort, setMinWorth, setMaxWorth, downloadCSV}: FilterBarProps) => {
  const clearFilters = () => {
    const select = document.getElementById('select') as HTMLSelectElement;
    const minWorthInput = document.getElementById('minWorth') as HTMLInputElement;
    const maxWorthInput = document.getElementById('maxWorth') as HTMLInputElement;

    if (select) {
      select.value = '';
    }
    if (minWorthInput) {
      minWorthInput.value = '';
    }
    if (maxWorthInput) {
      maxWorthInput.value = '';
    }


    setSort('');
    setMinWorth('');
    setMaxWorth('');
  }

  return (
    <div className={styles.container}>                    
      <div className={styles.worthFilterContainer}>
        <label htmlFor="minWorth" className={styles.worthFilterLabel}>Minimalna wartość: </label>
        <input type="number" name="minWorth" id="minWorth" onChange={(e) => setMinWorth(e.target.value)} className={styles.worthFilterInput}/>
      </div>
      <div className={styles.worthFilterContainer}>
        <label htmlFor="maxWorth" className={styles.worthFilterLabel}>Maksymalna wartość: </label>
        <input type="number" name="maxWorth" id="maxWorth" onChange={(e) => setMaxWorth(e.target.value)} className={styles.worthFilterInput}/>
      </div>
      <div className={styles.flexbox}>
        <div className={styles.filtersContainer}> 
          <span>Sortowanie: </span>
          <select name="select" id="select" onChange={(e) => setSort(e.target.value)} className={styles.filtersSelect}>
            <option value="">-</option>
            <option value="id_asc">ID rosnąco</option>
            <option value="id_des">ID malejąco</option>
            <option value="quan_asc">Ilość rosnąco</option>
            <option value="quan_des">Ilość malejąco</option>
            <option value="worth_asc">Wartość rosnąco</option>
            <option value="worth_des">Wartość malejąco</option>
          </select>
        </div>
        <button type="button" onClick={clearFilters} className={styles.clearButton}>wyczyść</button>
        <button type="button" onClick={downloadCSV} className={styles.downloadButton}>
          <img src={downloadIcon} alt="pobieranie wszystkich zamówień" className={styles.downloadButtonIcon} />
        </button>
      </div>
    </div>
  );
};

export default Filters;