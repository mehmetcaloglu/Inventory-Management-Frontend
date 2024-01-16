import React, { useState, useEffect } from "react";
import PurchaseOrderBody from "./PurchaseOrderBody";
import IPurchaseOrder from "../types/purchaseOrder.type";
import AddStoreModal from "./AddStoreModal";
import IOrderStatus from "../types/orderStatus.type";
import EditIListModal from "./EditIListModal";
import ChangeStatusModal from "./ChangeStatusModal";
import IStoreType from "../types/storeType.type";

const PurchaseOrder = () =>
{
  // const [ updatedPurchaseOrder, setUpdatedPurchaseOrder ] = useState<IPurchaseOrder>( purchaseOrder );
  const [ editItemsModalOpen, setEditItemsModalOpen ] = useState<boolean>( false );
  const [ editStoreModalOpen, setEditStoreModalOpen ] = useState<boolean>( false );
  const [ changeStatusModalOpen, setChangeStatusModalOpen ] = useState<boolean>( false );

  const toggleModal = ( stateFunc: any ) => () => stateFunc( ( prev: boolean ) => !prev );


  // const updatePurchaseOrder = ( update: Partial<IPurchaseOrder> ) =>
  // {
  //   if ( updatedPurchaseOrder ) {
  //     const updated = { ...updatedPurchaseOrder, ...update };
  //     setUpdatedPurchaseOrder( updated );
  //     updatePurchaseOrders( updated, { type: 'UPDATE' } );
  //   }
  // };

  // const deletePurchaseOrder = () =>
  // {
  //   if ( updatedPurchaseOrder ) {
  //     updatePurchaseOrders( updatedPurchaseOrder, { type: 'DELETE' } );
  //   }
  // };

  const mockCategory = {
    id: 1,
    name: "Example Category",
    description: "Example Description"
  };
  const mockProduct1 = {
    id: 1,
    name: "Example Product 1",
    price: 5.99,
    description: "Example Description 1",
    quantity: 10,
    category: mockCategory,
  };


  const mockStore = {
    id: 1,
    name: "Example Store",
    location: "123 Main St",
    type: IStoreType.STORE, // Replace YOUR_STORE_TYPE with the correct value
  };

  const mockPurchaseOrderItems = [
    { id: 1, item: mockProduct1, quantity: 10, price: 5.99 },
    { id: 2, item: mockProduct1, quantity: 5, price: 9.99 }
  ];

  const mockPurchaseOrder =
  {
    id: 101,
    store: mockStore,
    purchaseOrderItems: mockPurchaseOrderItems,
    status: IOrderStatus.PENDING,
    totalQuantity: 15,
    totalPrice: 99.85,
    lastUpdated: "2024-01-16"
  };


  console.log( "mockOrder", mockPurchaseOrder );


  return (
    <>
      <PurchaseOrderBody
        purchaseOrder={ mockPurchaseOrder }
      // openChangeStatusModal={ toggleModal( setChangeStatusModalOpen ) }
      // openEditStoreModal={ toggleModal( setEditStoreModalOpen ) }
      // openEditItemsModal={ toggleModal( setEditItemsModalOpen ) }
      // deletePurchaseOrder={ deletePurchaseOrder }
      />
      {/* { updatedPurchaseOrder.id ? <EditIListModal
        storeName={ updatedPurchaseOrder.store?.name || '' }
        status={ updatedPurchaseOrder.status || IOrderStatus.PENDING }
        purchaseOrder={ updatedPurchaseOrder }
        purchaseOrderItems={ updatedPurchaseOrder.purchaseOrderItems || [] }
        updateIList={ ( items ) => updatePurchaseOrder( { purchaseOrderItems: items } ) }
        open={ editItemsModalOpen }
        toggleModal={ toggleModal( setEditItemsModalOpen ) }
      /> : null }
      { updatedPurchaseOrder.status ? <ChangeStatusModal
        status={ updatedPurchaseOrder.status }
        changeStatus={ ( status ) => updatePurchaseOrder( { status } ) }
        open={ changeStatusModalOpen }
        toggleModal={ toggleModal( setChangeStatusModalOpen ) }
      /> : null }
      { updatedPurchaseOrder.store ? <AddStoreModal
        store={ updatedPurchaseOrder.store }
        addStore={ ( store ) => updatePurchaseOrder( { store } ) }
        open={ editStoreModalOpen }
        toggleModal={ toggleModal( setEditStoreModalOpen ) }
      /> : null } */}
    </>
  );
};

export default PurchaseOrder;
