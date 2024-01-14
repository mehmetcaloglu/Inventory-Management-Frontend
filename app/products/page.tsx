'use client';
import React, { useState, useEffect } from 'react';
import EditItem from './EditProduct';
import ItemList from './ProductList';
import IProduct from '../types/product.item';
import ItemService from '../services/item.service';
import ShowModalBtn from '../components/ShowModalBtn';
import SearchField from './SearchField';
import ICategory from '../types/category.type';
import CategoryService from '../services/category.service';
import { useUserContext } from '../context/user';


const initialState: IProduct = {
  name: '',
  description: '',
  price: 0,
  quantity: 0,
};

const Page = () =>
{
  const [ items, setItems ] = useState<IProduct[]>( [] );
  const [ loading, setLoading ] = useState( false );
  const [ itemToUpdate, setItemToUpdate ] = useState<IProduct>( initialState );
  const [ error, setError ] = useState( '' );
  const [ notification, setNotification ] = useState( '' );
  const [ editMode, setEditMode ] = useState( false );
  const [ categories, setCategories ] = useState<ICategory[]>( [] );
  const [ filterParams, setFilterParams ] = useState( {} );
  const { user } = useUserContext() || { user: undefined };

  useEffect( () =>
  {
    const fetchCategories = async () =>
    {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories( response.data );
      } catch ( err: any ) {
        let errMsg = 'Unable to load categories';
        if ( err.response ) {
          errMsg = err.response.data?.message || errMsg;
        }
        console.error( errMsg );
        setError( errMsg );
      }
    };
    fetchCategories();
  }, [] );

  useEffect( () =>
  {
    setLoading( true );
    const fetchItems = async () =>
    {
      try {
        const response = await ItemService.getAllProducts();
        setItems( response.data );
        setError( '' );
      } catch ( err: any ) {
        let errMsg = 'Unable to load items';
        if ( err.response ) {
          errMsg = err.response.data?.message || errMsg;
        }
        console.error( errMsg );
        setError( errMsg );
      } finally {
        setLoading( false );
      }
    };

    fetchItems();
  }, [ filterParams ] );

  const deleteItem = async ( id: number ) =>
  {
    try {
      const response = await ItemService.deleteProduct( id );
      setItems( ( items ) =>
      {
        return items.filter( ( item: IProduct ) => item.id !== id );
      } );
      displayNotification( 'Item deleted successfully' );
      setError( '' );
    } catch ( err: any ) {
      let errMsg = 'Unable to delete item';
      if ( err.response ) {
        errMsg = err.response.data?.message || errMsg;
      }
      console.error( errMsg );
      setError( errMsg );
    }
  };

  const displayNotification = ( message: string ) =>
  {
    setNotification( message );
    // Automatically hide the notification after 5 seconds (5000 milliseconds)
    setTimeout( () =>
    {
      setNotification( '' );
    }, 5000 );
  };

  const handleUpdateItem = async ( item: IProduct ) =>
  {
    toggleModal();
    try {
      if ( item.id ) {
        const updatedItem = await ItemService.updateProduct( item.id, item );
        setItems( ( items ) =>
        {
          return items.map( ( item: IProduct ) =>
          {
            if ( item.id === updatedItem.data.id ) {
              return updatedItem.data;
            }
            return item;
          } );
        } );
        displayNotification( 'Item updated successfully' );
      } else {
        const createdItem = await ItemService.createProduct( item );
        setItems( ( items ) =>
        {
          return [ ...items, createdItem.data ];
        } );
        displayNotification( 'Item added successfully' );
      }

      setError( '' );
    } catch ( error: any ) {
      const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to update item';
      setError( errMsg );
    }
  };

  const editItem = ( item: IProduct ) =>
  {
    setItemToUpdate( item );
    toggleModal();
  };

  const toggleModal = () =>
  {
    setEditMode( ( editMode ) =>
    {
      const newState = !editMode;
      if ( !newState ) setItemToUpdate( initialState );
      return newState;
    } );
  };

  return (
    <div>
      { notification && <div onClick={ () => setNotification( '' ) } className='z-50 toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{ notification }</div></div> }
      { error && <div className="alert alert-danger mb-2">{ error }</div> }
      { loading && <div className="loading loading-bars loading-lg mb-2"></div> }
      <div>
        { user?.admin &&
          <ShowModalBtn text="Add Item" toggleModal={ toggleModal } style="btn-accent" /> }
        <SearchField categories={ categories } filterParams={ filterParams } setFilterParams={ setFilterParams } />
      </div>

      <ItemList items={ items } editItem={ editItem } deleteItem={ deleteItem } />
      <EditItem
        item={ itemToUpdate }
        handleUpdateItem={ handleUpdateItem }
        open={ editMode }
        toggleModal={ toggleModal }
        categories={ categories }
      />
    </div>
  );
};

export default Page;
