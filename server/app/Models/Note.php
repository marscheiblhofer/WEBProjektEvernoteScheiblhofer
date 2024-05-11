<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'notelist_id'
    ];

    public function notelist():BelongsTo {
        return $this->belongsTo(Notelist::class);
    }

    public function images():HasMany {
        return $this->hasMany(Image::class);
    }

    /** * note belongs to many categories (n:m) */
    public function categories() : BelongsToMany {
        return $this->belongsToMany(Category::class, 'note_category')->withTimestamps();
    }
}
