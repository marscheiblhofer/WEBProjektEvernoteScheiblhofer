<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notelist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'visibility', 'creator_id'
    ];

    public function creator():BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function notes():HasMany {
        return $this->hasMany(Note::class);
    }

    public function user() : BelongsToMany {
        return $this->belongsToMany(User::class, 'user_list')->withTimestamps();
    }
}
