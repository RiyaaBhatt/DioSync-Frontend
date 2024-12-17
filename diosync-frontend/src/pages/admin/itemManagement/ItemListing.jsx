import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import WhiteCard from '../../../components/themeComponents/WhiteCard'
import SearchFilter from '../../../components/core/formComponents/SearchFilter'
import Button from '../../../components/core/formComponents/Button'
import TableLayout from '../../../components/themeComponents/TableLayout'
import Modal from '../../../components/core/Modal'
import AdminDeleteModal from '../../../components/core/AdminDeleteModal'
import { BulkAction, BulkActionModel, DELETE, UPDATE } from '../../../constants/roleConstants'
import AddItems from './AddItems'
import { DeleteItems, GetItems, UpdateItems } from '../../../services/itemsService'
import { deleteToastFun } from '../../../utils/commonHelper'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../redux/slices/siteLoaderSlice'
import BulkHeader from '../../../components/themeComponents/BulkHeader'
import { BulkPerformAction } from '../../../services/commonService'
import axios from 'axios'
const ItemsListing = () => {
  const dispatch = useDispatch()
  const [totalItemsOnPage, setTotalItemsOnPage] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [currentItems, setCurrentItems] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [orderby, setOrderby] = useState('')
  const [order, setOrder] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState()
  const [searchItem, setSearchItem] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedAction, setSelectedAction] = useState('')

  const tableHeader = [
    {
      key: 'Item name',
      value: 'name',
      sorting: true,
      sortkey: 'name',
      clickable: false,
    },
    {
      key: 'Brand name',
      value: 'brand_name',
      sorting: true,
      sortkey: 'brand_name',
      clickable: false,
    },
    {
      key: 'Category',
      value: 'category.name',
      sorting: true,
      sortkey: 'category__name',
      clickable: false,
    },
    {
      key: 'Subcategory',
      value: 'sub_category.sub_category_name',
      sorting: true,
      sortkey: 'sub_category__sub_category_name',
      clickable: false,
    },
    {
      key: 'Unit size',
      value: 'unit_size',
      sorting: true,
      sortkey: 'unit_size',
      clickable: false,
    },
    { key: 'Status', value: 'is_active', sorting: true, sortkey: 'is_active', clickable: false },
    {
      key: 'Actions',
      value: 'actions',
      sorting: false,
      clickable: false,
    },
  ]

  useEffect(() => {
    const debounce = setTimeout(() => {
      getItemsData()
    }, 300)

    return () => {
      clearTimeout(debounce)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItem, orderby, order, itemOffset])

  useEffect(() => {
    setItemOffset(0)
  }, [searchItem])
  const getItemsData = async () => {
    console.log("hi this is getItemsDATA method and i am inside Item Listing componenent");

    dispatch(showLoader())
    const orderVal = order ? '' : '-'
    let queryString = ``
    if (orderby) {
      queryString += ``
    }
    if (searchItem) {
      queryString += ``
    }
    const response = await GetItems(queryString)
    console.log("this is response ", response);


    const results = response?.data?.data || []
    console.log("Hello I came from axios middleware", results)
    const count = response?.data?.data?.count || 0
    setTotalCount(count)
    setCurrentItems(results)
    console.log("hi i am cuureent item ")
    setPageCount(Math.ceil(count / itemsPerPage))
    setTotalItemsOnPage(results.length)
    dispatch(hideLoader())
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage
    setItemOffset(newOffset)
  }

  const handleSorting = (data, order) => {
    setOrderby(data)
    setOrder(order)
  }



  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedItem('')
  }

  const handleItem = () => {
    setOpenModal(true)
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    setSelectedItem('')
  }
  const handleUpdateItems = async (data, id) => {
    dispatch(showLoader())
    console.log(data);

    setSelectedItem(data);
    setOpenModal(true);

    const response = await UpdateItems(data)
    if (response?.status === 200) {
      deleteToastFun('Item updated successfully', 'success')
      handleCloseModal()

      getItemsData()

    } else {
      deleteToastFun('Something went wrong', 'error')
    }
    dispatch(hideLoader())
  }

  const handleDeleteItems = async (id) => {
    dispatch(showLoader())

    const response = await DeleteItems(id)
    if (response?.status === 200) {
      deleteToastFun('Item deleted successfully', 'success')
      handleCloseDeleteModal()

      getItemsData()

    } else {
      deleteToastFun('Something went wrong', 'error')
    }
    dispatch(hideLoader())
  }
  const handleOptions = (optionValue, item) => {
    console.log("hello i am update item ", item)
    console.log(optionValue);

    switch (optionValue) {
      case UPDATE:
        console.log("hello i am inside update item ", item)
        setSelectedItem(item); // Set the selected item for editing
        setOpenModal(true); // Open the modal for editing
        break;
      case DELETE:
        setOpenDeleteModal(true); // Open the delete confirmation modal
        setSelectedItem(item?.id); // Set the selected item ID for deletion
        break;
      default:
        console.log("hello i am default case");

        break;
    }
  };
  const handleApplyAction = () => {
    if (selectedAction) {
      switch (selectedAction) {
        case 'active':
          const activeBody = {
            model: BulkActionModel?.item,
            ids: selectedIds,
            action: BulkAction?.ACTIVE,
          }
          handleBulkApplyAction(activeBody)
          break
        case 'delete':
          const deleteBody = {
            model: BulkActionModel?.item,
            ids: selectedIds,
            action: BulkAction?.DELETED,
          }
          handleBulkApplyAction(deleteBody)
          break
        case 'inactive':
          const inActiveBody = {
            model: BulkActionModel?.item,
            ids: selectedIds,
            action: BulkAction?.INACTIVE,
          }
          handleBulkApplyAction(inActiveBody)
          break
        default:
          break
      }
    }
  }
  const handleBulkApplyAction = async (data) => {
    dispatch(showLoader())
    const response = await BulkPerformAction(data)
    if (response?.status === 200) {
      getItemsData()
      setSelectedIds([])
      setSelectedAction('')
    }
    dispatch(hideLoader())
  }

  const handleSelectAction = (data) => {
    setSelectedAction(data)
  }

  const handleBulk = (data) => {
    const updatedSelectedIds = selectedIds?.includes(data.id)
      ? selectedIds?.filter((id) => id !== data.id)
      : [...selectedIds, data.id]

    setSelectedIds(updatedSelectedIds)
  }

  const handleAllBulk = (data) => {
    if (selectedIds?.length === data?.length) {
      setSelectedIds([])
    } else {
      const allIds = data?.map((item) => item.id)
      setSelectedIds(allIds)
    }
  }

  return (
    <>
      <WhiteCard>
        <div className='grid grid-cols-12 gap-4'>
          <BulkHeader
            addName='Add Item'
            handleAddFun={handleItem}
            selectedIds={selectedIds}
            setSearchItem={setSearchItem}
            searchItem={searchItem}
            selectedAction={selectedAction}
            handleSelectAction={handleSelectAction}
            handleApplyAction={handleApplyAction}
          />

          <div className='col-span-12'>
            <TableLayout
              tableHeader={tableHeader}
              totalCount={totalCount}
              handleOptions={handleOptions}
              currentItems={currentItems}
              handleDeleteItems={handleDeleteItems}
              handleUpdateItems={handleUpdateItems}
              isEdit={true}
              isDelete={true}
              isView={false}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              itemOffset={itemOffset}
              itemsPerPage={itemsPerPage}
              handleSorting={handleSorting}
              handleBulk={handleBulk}
              handleAllBulk={handleAllBulk}
              selectedIds={selectedIds}
              isBulkActive={true}
            />
          </div>
        </div>
      </WhiteCard>
      {openModal && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          header
          headingText={selectedItem?.id ? 'Edit Item' : 'Add Item'}
          width={'md:w-[700px]'}
        >
          <AddItems selectedItem={selectedItem} getItemsData={getItemsData} handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      {openDeleteModal && (
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          headingText={'Delete Confirmation'}
          width={'md:w-[700px]'}
        >
          <AdminDeleteModal
            openDeleteModal={openDeleteModal}
            handleCloseDeleteModal={handleCloseDeleteModal}
            deleteFunction={handleDeleteItems}
            deleteLabel={'Are you sure you want to delete this item?'}
          />
        </Modal>
      )}
    </>
  )
}
export default ItemsListing
