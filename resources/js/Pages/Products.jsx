import {Link, Head} from '@inertiajs/react';
import ViewIcon from '@/Icons/ViewIcon.jsx';
import DeleteIcon from "@/Icons/DeleteIcon.jsx";

export default function Products({auth, laravelVersion, phpVersion, products}) {
    console.log(products)
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

                <div>
                    {
                        products.length > 0 ?
                            <div className="mt-20 w-full flex flex-wrap justify-center">
                                {products.map((el) => (
                                    <div key={el.id}
                                         className="relative flex flex-col w-1/3 px-10 py-6 items-start justify-center m-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                        <div className="flex gap-4">
                                            <img src={el.image} alt={el.name} className="w-44 h-40 rounded"/>
                                            <div className='space-y-4'>
                                                <h1 className=" text-2xl font-semibold">{el.name}</h1>
                                                <div className="flex gap-3">{el.categories.map((el) => (
                                                    <p className="text-gray-600 dark:text-gray-400 rounded-xl text-lg bg-gray-200 px-4 py-1" key={el.id}>
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
                                                <DeleteIcon/>
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

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
