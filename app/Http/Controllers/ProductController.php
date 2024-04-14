<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index() : \Inertia\Response
    {
        $products = Product::with('categories')->get();
        $categories = Category::limit(5)->get();

        return Inertia::render('Products', array_merge([
            'products' => $products,
            'categories' => $categories,
        ], [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]));
    }

    public function show(Product $product) : \Inertia\Response
    {
        return Inertia::render('ProductItem', [
            'product' => $product->load('categories'),
        ]);
    }

    public function destroy($product) : void
    {
        $product = Product::findOrFail($product);
        $product->delete();
    }
}
