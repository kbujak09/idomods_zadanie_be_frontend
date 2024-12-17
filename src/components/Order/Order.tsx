import styles from './order.module.scss';

import { OrderType, ProductType } from '../../types';
import arrowIconDown from '../../assets/arrow_down.svg';
import arrowIconUp from '../../assets/arrow_up.svg';
import downloadIcon from '../../assets/download.svg';

import { useState } from 'react';

type OrderProps = {
  data: OrderType,
  downloadOneCSV: (arg: string) => void
}

const Order = ({data, downloadOneCSV}: OrderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleExpand = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dataCell}>ID: 
        <span className={styles.lightText}>{data.orderId}</span>
      </div>
      { !isOpen ?
      <div className={styles.dataCell}>Ilość produktów: 
        <span className={styles.lightText}>{data.products.length}</span>
      </div>
      :
      <div className={styles.productsContainer}>
        <div className={styles.productsContainerHeader}>
          <div className={styles.dataCell}>Produkty:</div>
          <button type="button" onClick={() => downloadOneCSV(data.orderId)} className={styles.downloadButton}>
            <img src={downloadIcon} alt="pobieranie wszystkich zamówień" className={styles.downloadButtonIcon} />
          </button>
        </div>
        {data.products.map((item: ProductType) => {
          return (
            <div className={styles.product} key={item.productId}>
              
              <div className={styles.dataCell}>ID:
                <span className={styles.lightText}>{item.productId}</span>
              </div>
              <div className={styles.dataCell}>Ilość:
                <span className={styles.lightText}>{item.quantity}</span>
              </div>
            </div>
          )
        })}
      </div>
      }
      <div className={styles.dataCell}>Wartość zamówienia: 
        <span className={styles.lightText}>{data.orderWorth} zł</span>
      </div>
      <div className={styles.expand} onClick={handleExpand}>
        <img src={isOpen ? arrowIconUp : arrowIconDown} alt="expand arrow" />
      </div>
    </div>
  );
};

export default Order;