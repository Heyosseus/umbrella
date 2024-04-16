import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from '@/Components/Modal.jsx';

function AddProductsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [images, setImages] = useState([]);

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

    const addProduct = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        selectedCategories.forEach((category) => {
            formData.append('categories[]', category);
        });
        images.forEach((image) => {
            formData.append('images[]', image);
        });

        axios.post('/products', formData)
            .then((res) => {
               window.location.href = '/'
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
                    <form onSubmit={addProduct} encType="multipart/form-data">
                        <label htmlFor="">Name:</label>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <textarea
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        ></textarea>
                        <select
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            multiple={true}
                            value={selectedCategories}
                            onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
                        >
                            {categories.map((el) => (
                                <option key={el.id} value={el.id}>{el.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <input
                            type="file"
                            placeholder="Image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {images.map((image, idx) => (
                            <div key={`image-${idx}`}>
                                <img src={URL.createObjectURL(image)} alt={`image-${idx}`} className="w-40 h-40"/>
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
