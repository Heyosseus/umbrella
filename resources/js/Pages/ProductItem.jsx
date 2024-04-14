import {Link, Head} from '@inertiajs/react';

export default function Products({auth, product}) {
    console.log(product)
    return (
        <>
            <Head title="Product item"/>
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 p-6 sm:right-0 text-end flex gap-5 text-lg">

                    <Link
                        href={route('products.index')}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Product list
                    </Link>

                    <Link
                        href={route('dashboard')}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Add product
                    </Link>

                </div>

                <div className="w-full flex gap-10 flex-wrap justify-center">
                    <h1 className="text-5xl uppercase mt-40 ">Product Item</h1>
                    <div
                        className="flex flex-col w-1/2 p-12 items-start justify-center m-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div className="flex gap-10">
                            <img src={product.image} alt={product.name} className="w-80 h-64 rounded"/>
                            <div className='space-y-5'>
                                <h1 className=" text-4xl font-semibold">{product.name}</h1>
                                <div className="flex gap-3">{product.categories.map((el) => (
                                    <p className="text-gray-600 dark:text-gray-400 rounded-xl text-xl bg-gray-200 px-6 py-2">
                                        {el.name}</p>
                                ))}
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-gray-400 text-xl">
                                    <strong>Price: </strong>${product.price}</p>
                            </div>
                        </div>
                        <p className="mt-8 text-gray-600 dark:text-gray-400 text-2xl">
                            <strong>Description: </strong>{product.description.length > 30 ? product.description.substring(0, 30) + '...' : product.description}
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}
