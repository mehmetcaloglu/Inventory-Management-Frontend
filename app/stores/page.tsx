'use client'
import React, { useState, useEffect } from 'react';
import EditStore from './EditStore';
import StoreList from './StoreList';
import IStore from '../types/store.type';
import StoreService from '../services/store.service';
import IStoreType from '../types/storeType.type';
import ShowModalBtn from '../components/ShowModalBtn';

const initialState: IStore = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: IStoreType.RETAIL,
  openingDate: new Date().toLocaleDateString()
};


const Page = () => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [storeToUpdate, setStoreToUpdate] = useState<IStore>(initialState);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStores();
        setStores(response.data);
        setError('')
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Unexpected error');
        }
      } finally {
        setLoading(false)
      }

    }
    fetchStores()
  }, []);

  const deleteStore = async (id: number) => {
    try {
      await StoreService.deleteStore(id);
      setStores((stores) => {
        return stores.filter((store: IStore) => store.id !== id);
      });
      displayNotification('Store deleted successfully');
      setError('')
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Unexpected error');
      }
    }
  };

  const displayNotification = (message: string) => {
    setNotification(message);
    // Automatically hide the notification after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleUpdateStore = async (store: IStore) => {
    setLoading(true)
    try {
      if (store.id) {
        const updatedStore = await StoreService.updateStore(store.id, store)
        setStores((stores) => {
          return stores.map((store: IStore) => {
            if (store.id === updatedStore.data.id) {
              return updatedStore.data;
            }
            return store;
          })
        })
        displayNotification('Store updated successfully');

      } else {
        const createdStore = await StoreService.createStore(store)
        setStores((stores) => {
          return [...stores, createdStore.data]
        })
        displayNotification('Store added successfully');

      }

      setError('')
    } catch (err: any) {
      let errMsg = 'Unexpected error'
      if (err.response) {
        errMsg = err.response.data?.message;
      }
      setError(errMsg);
    }

    // clean up
    toggleModal()
    setLoading(false)
    setStoreToUpdate(initialState);
  }

  const editStore = (store: IStore) => {
    setStoreToUpdate(store);
    toggleModal()
  };

  const toggleModal = () => {
    setEditMode((editMode) => {
      const newState = !editMode;
      if (!newState) setStoreToUpdate(initialState)
      return newState
    })
  }

  return (
    <div>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      <ShowModalBtn text="Add Store" toggleModal={toggleModal} style="btn-accent" />

      <StoreList stores={stores} editStore={editStore} deleteStore={deleteStore} />
      <EditStore
        store={storeToUpdate}
        handleUpdateStore={handleUpdateStore}
        open={editMode}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Page;