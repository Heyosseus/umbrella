import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '@/Components/Modal.jsx';
import { useForm } from 'react-hook-form';

function AddProductsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [images, setImages] = useState([]);
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };
    const getCategories = () => {
        axios.get('/categories').then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        getCategories();
    }, [])

    const addProduct = (data) => {
        const formData = new FormData();
        formData.append('name', data.name || '');
        formData.append('description', data.description || '');
        formData.append('price', data.price || '');

        selectedCategories.forEach((category) => {
            formData.append('categories[]', category);
        });

        images.forEach((image) => {
            formData.append('images[]', image);
        });

        axios.post('/products', formData)
            .then((res) => {
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}
                    className="px-6 py-3 text-lg rounded-full active:bg-gray-100  border border-gray-400  hover:bg-gray-400 transition">Add Products
            </button>
            <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth="2xl">
                <div className="p-6">
                    <h1 className="text-2xl mb-4 font-semibold">Add Product</h1>
                    <form onSubmit={handleSubmit(addProduct)} encType="multipart/form-data">
                        <label htmlFor="">Name:</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name', { required: true })}
                            className={`w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.name && <p className="text-red-500">Product name is required</p>}
                        <input
                            type="text"
                            placeholder="Description"
                            {...register('description', { required: true })}
                            className={`w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.name && <p className="text-red-500">Description is required</p>}
                        <select
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            multiple={true}
                            {...register('selectedCategories', { required: 'Please select at least one category' })}
                            value={selectedCategories}
                            onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
                        >
                            {categories.map((el) => (
                                <option key={el.id} value={el.id}>{el.name}</option>
                            ))}
                        </select>
                        {errors.selectedCategories && <span className="text-red-500">{errors.selectedCategories.message}</span>}
                        <input
                            type="number"
                            placeholder="Price"
                            {...register('price', { required: true })}
                            className={`w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.name && <p className="text-red-500">Price is required</p>}
                        <input
                            type="file"
                            placeholder="Image"
                            accept="image/*"
                            multiple
                            {...register('images', { required: 'Please select at least one image' })}
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {errors.images && <span className="text-red-500">{errors.images.message}</span>}
                        {images.map((image, idx) => (
                            <div key={`image-${idx}`}>
                                <img src={URL.createObjectURL(image)} alt={`image-${idx}`} className="w-40 h-40" />
                            </div>
                        ))}
                        <button
                            className="w-full mt-4 px-5 py-2 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                            type='submit'
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default AddProductsModal;
