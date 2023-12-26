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
        $news = DB::table('news', 'n')
            ->selectRaw("
                n.id,
                n.description,
                u.name,
                n.created_at,
                n.title
            ")
            ->leftJoin('users as u', 'u.id', '=', 'n.user_id')
            ->where('status', '=', true)
            ->orderByDesc('n.id')->paginate(5);
        return Inertia::render('Dashboard', ['result' => $news]);
    }

    public function view($id)
    {
        $news = DB::table('news', 'n')
            ->selectRaw("
                n.id,
                n.text,
                u.name,
                n.created_at,
                n.title
            ")
            ->leftJoin('users as u', 'u.id', '=', 'n.user_id')
            ->where('status', '=', true)
            ->where('n.id', '=', $id)->first();

        return Inertia::render('News/News', ['result' => $news]);
    }

}
