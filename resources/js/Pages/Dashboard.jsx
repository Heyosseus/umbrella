import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import AddCategoriesModal from "@/Pages/components/AddCategoriesModal.jsx";
import AddProductsModal from "@/Pages/components/AddProductsModal.jsx";

export default function Dashboard({auth, categories}) {
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

            <div className="p-10 flex gap-4 mx-auto w-full items-center justify-center">

                <AddProductsModal/>

                <AddCategoriesModal/>

            </div>


        </AuthenticatedLayout>
    );
}
