<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index() : \Inertia\Response
    {
        $products = Product::with('categories')->get();

        return Inertia::render('Products', array_merge([
            'products' => $products,
        ], [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]));
    }

    public function show(Product $product) : \Inertia\Response
    {
        return Inertia::render('ProductItem', [
            'product' => $product->load('categories'),
        ]);
    }
}
