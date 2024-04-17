import React, {useState} from 'react';
import Modal from '@/Components/Modal.jsx';
import { useForm } from 'react-hook-form';
function AddCategoriesModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const addCategories = (formData) => {
        formData.categories = formData.categories || '';

        axios.post('/categories', formData).then((res) => {
            console.log(res.data);
            setIsOpen(false);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>

            <button onClick={() => setIsOpen(true)}
                    className="px-6 py-3 text-lg rounded-full active:bg-gray-100 border bg-gray-400 hover:border hover:border-gray-400 hover:bg-transparent transition">Add Categories
            </button>
            <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
                <div className="p-6">
                    <h1 className="text-2xl mb-4 font-semibold ">Add Categories</h1>
                    <form onSubmit={handleSubmit(addCategories)} encType="multipart/form-data">
                        <label htmlFor="">Category name:</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name', { required: true })}
                            className={`w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.name && <p className="text-red-500">Category name is required</p>}

                        <button type="submit"
                                className="w-full mt-4 px-5 py-2 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                        >Add
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default AddCategoriesModal;
