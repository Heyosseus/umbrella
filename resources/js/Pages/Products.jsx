import {Head, Link} from '@inertiajs/react';
import ViewIcon from '@/Icons/ViewIcon.jsx';
import DeleteIcon from "@/Icons/DeleteIcon.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Products({auth, products, categories}) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(products);
    let categoryItems = categories;
    let deleteItem = (id) => {
        axios.delete('/products/' + id).then((res) => {
            setSelectedFilters([]);
            document.getElementById('product-' + id).remove();
        }).catch((err) => {
        });
    }

    const handleFilter = (selectedCateogry) => {
        if (selectedFilters.includes(selectedCateogry)) {
            let filters = selectedFilters.filter((el) => el !== selectedCateogry);
            setSelectedFilters(filters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCateogry]);
        }
    }

    useEffect(() => {
        filterItems();
    }, [selectedFilters])

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            let tempItems = selectedFilters.map((el) => {
                let temp = products.filter((item) => item.categories.map((el) => el.name).includes(el.name));
                console.log(temp, 'temp')
                return temp;

            });
            setFilteredItems(tempItems.flat());
            console.log(tempItems.flat(), 'tempItems')
        } else {
            setFilteredItems([...products]);
        }
    }
    return (
        <>
            <Head title="Products"/>
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 p-6 sm:right-0 text-end ">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Add product
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className='mt-28 flex flex-col'>
                    <h1 className="text-5xl uppercase text-center mb-6 ">Products</h1>
                    <div>
                        {categoryItems.length > 0 ?
                            <div className="flex gap-3 cursor-pointer justify-center">
                                {categories.map((el, idx) => (
                                    <p key={`filters-${idx}`}
                                       onClick={() => handleFilter(el)}
                                       className={`text-gray-600 dark:text-gray-400 rounded-xl text-lg ${selectedFilters?.includes(el) ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-1`}>
                                        {el.name}
                                    </p>
                                ))}
                            </div>
                            :
                            <h1 className=" text-3xl uppercase">No categories yet.</h1>
                        }
                    </div>
                    {
                        filteredItems.length > 0 ?
                            <div className="mt-20 w-full flex flex-wrap justify-center">
                                {filteredItems.map((el) => (
                                    <div key={el.id} id={'product-' + el.id}
                                         className="relative flex flex-col w-1/3 px-10 py-6 items-start justify-center m-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                        <div className="flex gap-4">
                                            <img src={el.image} alt={el.name} className="w-44 h-40 rounded"/>
                                            <div className='space-y-4'>
                                                <h1 className=" text-2xl font-semibold">{el.name}</h1>
                                                <div className="flex gap-3">{el.categories.map((el) => (
                                                    <p className="text-gray-600 dark:text-gray-400 rounded-xl text-lg bg-gray-200 px-4 py-1"
                                                       key={el.id}>
                                                        {el.name}</p>
                                                ))}
                                                </div>
                                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                                    <strong>Price: </strong>${el.price}</p>
                                            </div>

                                            <div className="flex gap-2 absolute top-6 right-3">
                                                <Link href={route('products.show', el.id)}>
                                                    <ViewIcon/>
                                                </Link>
                                                <div className="cursor-pointer" onClick={() => deleteItem(el.id)}>
                                                    <DeleteIcon/>
                                                </div>
                                            </div>


                                        </div>
                                        <p className="mt-2 text-gray-600 dark:text-gray-400 text-xl">
                                            <strong>Description: </strong>{el.description.length > 30 ? el.description.substring(0, 30) + '...' : el.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            :
                            <h1 className=" text-3xl uppercase">No products yet.</h1>

                    }
                </div>
            </div>
        </>
    );
}
