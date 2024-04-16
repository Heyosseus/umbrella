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
    public function index(): \Inertia\Response
    {
        $products = Product::with('categories')->get();
        $categories = Category::all();

        return Inertia::render('Products', array_merge([
            'products' => $products,
            'categories' => $categories,
        ], [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]));
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product = Product::create($request->only('name', 'description', 'price'));

        $imageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = $image->getClientOriginalName();
                $path = $image->storeAs('public/images', $filename);
                $relativePath = str_replace('public', 'storage', $path);
                $imageUrls[] = $relativePath;
            }
        }
        $product->update(['image' => json_encode($imageUrls)]);  // Store the image URLs in the 'images' column

        $product->categories()->attach($request->categories);

        return redirect()->route('products.index');
    }

    public function show(Product $product): \Inertia\Response
    {
        return Inertia::render('ProductItem', [
            'product' => $product->load('categories'),
        ]);
    }

    public function destroy($product): void
    {
        $product = Product::findOrFail($product);
        $product->delete();
    }
}
