"use client";
import React, { useState, useEffect } from "react";
import EditItem from "./EditProduct";
import ItemList from "./ProductList";
import IProduct from "../types/product.item";
import ItemService from "../services/item.service";
import ShowModalBtn from "../components/ShowModalBtn";
import SearchField from "./SearchField";
import ICategory from "../types/category.type";
import CategoryService from "../services/category.service";
import { useUserContext } from "../context/user";

const initialState: IProduct = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

const Page = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [filteredItems, setFilteredItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<IProduct>(initialState);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filterParams, setFilterParams] = useState({ name: "" });
  const { user } = useUserContext() || { user: undefined };

  useEffect(() => {
    setLoading(true);

    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.data);
        setError("");
      } catch (err: any) {
        let errMsg = "Unable to load categories";
        if (err.response) {
          errMsg = err.response.data?.message || errMsg;
        }
        console.error(errMsg);
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    const fetchItems = async () => {
      try {
        const response = await ItemService.getAllProducts();
        setItems(response.data);
        setError("");
      } catch (err: any) {
        let errMsg = "Unable to load items";
        if (err.response) {
          errMsg = err.response.data?.message || errMsg;
        }
        console.error(errMsg);
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter((item: IProduct) => {
      if (filterParams.name == "") return items;
      return item.name
        .toLowerCase()
        .includes(filterParams.name?.toLowerCase() ?? "");
    });
    // setFilteredItems(filtered);
  }, [filterParams]);

  const deleteItem = async (id: number) => {
    try {
      const response = await ItemService.deleteProduct(id);
      setItems((items) => {
        return items.filter((item: IProduct) => item.id !== id);
      });
      displayNotification("Item deleted successfully");
      setError("");
    } catch (err: any) {
      let errMsg = "Unable to delete item";
      if (err.response) {
        errMsg = err.response.data?.message || errMsg;
      }
      console.error(errMsg);
      setError(errMsg);
    }
  };

  const displayNotification = (message: string) => {
    setNotification(message);
    // Automatically hide the notification after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const handleUpdateItem = async (item: IProduct) => {
    toggleModal();
    try {
      if (item.id) {
        const updatedItem = await ItemService.updateProduct(item.id, item);
        setItems((items) => {
          return items.map((item: IProduct) => {
            if (item.id === updatedItem.data.id) {
              return updatedItem.data;
            }
            return item;
          });
        });
        displayNotification("Item updated successfully");
      } else {
        const createdItem = await ItemService.createProduct(item);
        setItems((items) => {
          return [...items, createdItem.data];
        });
        displayNotification("Item added successfully");
      }

      setError("");
    } catch (error: any) {
      const errMsg = error.response?.data?.message
        ? error.response.data.message
        : "Unable to update item";
      setError(errMsg);
    }
  };

  const editItem = (item: IProduct) => {
    setItemToUpdate(item);
    toggleModal();
  };

  const toggleModal = () => {
    setEditMode((editMode) => {
      const newState = !editMode;
      if (!newState) setItemToUpdate(initialState);
      return newState;
    });
  };

  console.log("items", items);

  return (
    <div>
      {notification && (
        <div
          onClick={() => setNotification("")}
          className="z-50 toast toast-end toast-bottom"
        >
          <div className="alert alert-info text-white p-2">{notification}</div>
        </div>
      )}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      <div>
        {user?.admin && (
          <>
            <ShowModalBtn
              text="Add Item"
              toggleModal={toggleModal}
              style="btn-accent"
            />
            <EditItem
              item={itemToUpdate}
              handleUpdateItem={handleUpdateItem}
              open={editMode}
              toggleModal={toggleModal}
              categories={categories}
            />
          </>
        )}
        <SearchField
          categories={categories}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
        />
      </div>

      <ItemList items={items} editItem={editItem} deleteItem={deleteItem} />
    </div>
  );
};

export default Page;
