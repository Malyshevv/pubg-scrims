<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $news = DB::table('news', 'n')->orderByDesc('n.id')->get();
        return Inertia::render('Dashboard', ['result' => $news]);
    }

    public function view(Request $request)
    {
        $id = $request->get('id');
        $news = DB::table('news', 'n')->where('n.id', '=', $id)->first();
        return Inertia::render('News/News', ['result' => $news]);
    }

}
