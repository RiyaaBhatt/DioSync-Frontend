import React, { useState, useEffect } from 'react';
import FormLabel from '../../../components/core/typography/FormLabel';
import InputTypeAdmin from '../../../components/core/formComponents/InputTypeAdmin';
import Button from '../../../components/core/formComponents/Button';
import SwitchToggle from '../../../components/core/formComponents/SwitchToggle';
import { ItemsApiAdd, UpdateItems } from '../../../services/itemsService';

function AddItems({ selectedItem, handleCloseModal, getItemsData }) {
  const [formData, setFormData] = useState({
    ItemName: '',
    BrandName: '',
    Category: '',
    Subcategory: '',
    unitSize: '',
    status: true,
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ItemName: selectedItem?.ItemName || '',
        BrandName: selectedItem?.BrandName || '',
        Category: selectedItem?.Category || '',
        Subcategory: selectedItem?.Subcategory || '',
        unitSize: selectedItem?.unitSize || '',
        status: selectedItem?.status || true,
      });
    }
  }, [selectedItem]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle switch toggle
  const handleSwitchChange = (value) => {
    console.log("handle switch change",value);
    
    setFormData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted with data:', formData);
      const bodyData = new FormData();
      Object.keys(formData).forEach((key) => {
        bodyData.append(key, formData[key]);
      });

      let response;
      if (selectedItem?.itemId) {
        console.log('Updating item with ID:', selectedItem.itemId);
        response = await UpdateItems(formData, selectedItem.itemId);
      } else {
        console.log('Adding a new item...');
        response = await ItemsApiAdd(formData);
      }

      if (response?.data?.status === 200 || response?.status === 200) {
        console.log('API call successful, refreshing data...');
        getItemsData();
        handleCloseModal();
      } else {
        console.error('API response error:', response);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <form className="grid grid-cols-12 gap-4" onSubmit={handleSubmit}>
      <div className="md:col-span-6 col-span-12">
        <FormLabel>Item Name</FormLabel>
        <InputTypeAdmin
          placeholder="Item name"
          type="text"
          name="ItemName"
          value={formData.ItemName}
          onChange={handleChange}
        />
      </div>

      <div className="md:col-span-6 col-span-12">
        <FormLabel>Brand Name</FormLabel>
        <InputTypeAdmin
          placeholder="Brand name"
          type="text"
          name="BrandName"
          value={formData.BrandName}
          onChange={handleChange}
        />
      </div>

      <div className="md:col-span-6 col-span-12">
        <FormLabel>Category</FormLabel>
        <InputTypeAdmin
          placeholder="Category"
          type="text"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
        />
      </div>

      <div className="md:col-span-6 col-span-12">
        <FormLabel>Subcategory</FormLabel>
        <InputTypeAdmin
          placeholder="Subcategory"
          type="text"
          name="Subcategory"
          value={formData.Subcategory}
          onChange={handleChange}
        />
      </div>

      <div className="md:col-span-6 col-span-12">
        <FormLabel>Unit Size</FormLabel>
        <InputTypeAdmin
          placeholder="Unit size"
          type="text"
          name="unitSize"
          value={formData.unitSize}
          onChange={handleChange}
        />
      </div>

      <div className="md:col-span-6 col-span-12">
        <FormLabel>Activate/Deactivate</FormLabel>
        <SwitchToggle
          onChange={handleSwitchChange}
          value={formData.status}
        />
      </div>

      <div className="col-span-12 text-end">
        <Button primary type="submit">
          {selectedItem?.itemId ? 'Edit' : 'Save'}
        </Button>
      </div>
    </form>
  );
}

export default AddItems;
