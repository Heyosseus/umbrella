import {Head, Link} from '@inertiajs/react';
import ViewIcon from '@/Icons/ViewIcon.jsx';
import DeleteIcon from "@/Icons/DeleteIcon.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Products({auth, products, categories}) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(products);
    const [sort, setSort] = useState('asc');
    const [colName, setColName] = useState('name');



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
    }, [selectedFilters, sort, colName]);

    const filterItems = () => {
        let tempItems = [...products];

        selectedFilters.forEach((selectedCategory) => {
            tempItems = tempItems.filter((item) => item.categories.some((category) => category.id === selectedCategory.id));
        });

        tempItems.sort((a, b) => {
            if (sort === 'asc') {
                return a[colName] > b[colName] ? 1 : -1;
            } else {
                return a[colName] < b[colName] ? 1 : -1;
            }
        });

        setFilteredItems(tempItems);
    };

    const sortByColumn = (columnName) => {
        if (columnName === colName) {
            setSort(sort === 'asc' ? 'desc' : 'asc');
            console.log(sort)
        } else {
            setColName(columnName);
            setSort('asc');
        }
    };

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
                        <div className="flex gap-3 cursor-pointer justify-center">
                            {categories.map((el, idx) => (
                                <p key={`filters-${idx}`}
                                   onClick={() => handleFilter(el)}
                                   className={`text-gray-600 dark:text-gray-400 rounded-xl text-lg ${selectedFilters?.includes(el) ? 'bg-gray-400' : 'bg-gray-200'} px-4 py-1`}>
                                    {el.name}
                                </p>
                            ))}
                        </div>

                    </div>
                    {
                        filteredItems.length > 0 ?
                            <div className="mt-10 w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                    <tr>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => sortByColumn('name')}
                                        >
                                            Name
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        >
                                            Categories
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => sortByColumn('price')}
                                        >
                                            Price
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredItems.map((el) => (
                                        <tr key={el.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{el.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {el.categories.map((cat) => (
                                                    <span key={cat.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{cat.name}</span>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">${el.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={route('products.show', el.id)}>
                                                    <a className="text-blue-600 hover:text-blue-900">View</a>
                                                </Link>
                                                <button className="text-red-600 hover:text-red-900 ml-2" onClick={() => deleteItem(el.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <h1 className="text-3xl uppercase text-center mt-6">No products yet.</h1>
                    }

                </div>
            </div>
        </>
    );
}
