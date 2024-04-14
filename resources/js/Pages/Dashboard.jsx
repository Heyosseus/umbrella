import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {useEffect, useState} from 'react'
import {Dialog} from '@headlessui/react'

export default function Dashboard({auth}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    // const [categories, setCategories] = useState([]);

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

        axios.post('/products', formData).then((res) => {
            console.log(res.data);
            setIsOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
                </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>

            <div className="p-10 flex gap-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 text-xl rounded-full active:bg-gray-100 bg-gray-400"
                >
                    Add Product
                </button>

                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 text-xl rounded-full active:bg-gray-100 bg-gray-400"
                >
                    Add Categories
                </button>

            </div>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-10 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen p-4">
                    <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 z-50 space-y-5">
                        <Dialog.Title>Add product</Dialog.Title>
                        <form onSubmit={addProduct} encType="multipart/form-data">
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
                                defaultValue={[]}
                                onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
                            >
                                {categories.map((el, idx) => (
                                    <option key={`category-${idx}`} value={el.id}>{el.name}</option>
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
                    </Dialog.Panel>
                </div>
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-gray-300 bg-opacity-75"
                ></div>
            </Dialog>

        </AuthenticatedLayout>
    );
}
