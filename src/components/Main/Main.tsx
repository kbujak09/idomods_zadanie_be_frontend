import styles from './main.module.scss';

import { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import { OrderType } from "../../types";
import Filters from '../Filters/Filters';

const Main = () => {
  const [data, setData] = useState<OrderType[]>([]);
  const [sortedData, setSortedData] = useState<OrderType[]>([]);
  const [minWorth, setMinWorth] = useState<string>('');
  const [maxWorth, setMaxWorth] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const sortData = () => {
    if (!data) {
      return;
    }

    let sorted = [...data];

    if (minWorth) {
      sorted = sorted.filter(item => item.orderWorth >= +minWorth);
    }

    if (maxWorth) {
      sorted = sorted.filter(item => item.orderWorth <= +maxWorth);
    }

    switch (sort) {
      case 'id_asc':
        sorted.sort((a, b) => a.orderId.localeCompare(b.orderId));
        break;    
      case 'id_des':
        sorted.sort((a, b) => b.orderId.localeCompare(a.orderId));
        break;
      case 'quan_asc':
        sorted.sort((a, b) => a.products.length - b.products.length);
        break;
      case 'quan_des':
        sorted.sort((a, b) => b.products.length - a.products.length);
        break;
      case 'worth_asc':
        sorted.sort((a, b) => a.orderWorth - b.orderWorth);
        break;
      case 'worth_des':
        sorted.sort((a, b) => b.orderWorth - a.orderWorth);
        break;
      default:
        break;
    }

    setSortedData(sorted);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
        }
      });

      if (!res.ok) {
        throw new Error('Błąd przy pobieraniu danych');
      }

      const json = await res.json();

      setData(json);
      sortData();
    }
    catch (err) {
      console.error(err);
    }
  }

  const downloadCSV = async () => {
    try {
      const res = await fetch(`http://localhost:5000/orders/csv?minWorth=${minWorth}&maxWorth=${maxWorth}&sort=${sort}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
        }
      });

      if (!res.ok) {
        throw new Error('Błąd przy pobieraniu pliku');
      }
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'orders.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    catch (err) {
      console.error(err);
    }
  } 

  const downloadOneCSV = async (orderId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}/csv`, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`,
        }
      });

      if (!res.ok) {
        throw new Error('Błąd przy pobieraniu pliku');
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `order_${orderId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      sortData();
    }
  }, [minWorth, maxWorth, data, sort])

  return (
    sortedData && 
    <div className={styles.container}>
      <header className={styles.title}>
        Zamówienia
      </header>
      <Filters setSort={setSort} setMinWorth={setMinWorth} setMaxWorth={setMaxWorth} downloadCSV={downloadCSV}/>
      <div className={styles.content}>
        {sortedData.map((item: OrderType) => (
          <Order key={item.orderId} data={item} downloadOneCSV={downloadOneCSV}/>
        ))}
      </div>
    </div>
  );
};

export default Main;