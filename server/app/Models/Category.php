<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category'
    ];

    /** * category belongs to many notes (m:n) */
    public function notes() : BelongsToMany {
        return $this->belongsToMany(Note::class)->withTimestamps();
    }

}
