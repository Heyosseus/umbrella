<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required',
        ]);

        return Category::create($attributes);
    }
}
