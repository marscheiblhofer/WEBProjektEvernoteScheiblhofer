<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'due_date', 'visibility', 'completed', 'notelist_id', 'note_id', 'responsible_person_id', 'creator_id'
    ];

    public function notelist():BelongsTo {
        return $this->belongsTo(Notelist::class);
    }
    public function note():BelongsTo {
        return $this->belongsTo(Note::class);
    }
    public function responsible_person():BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function creator():BelongsTo {
        return $this->belongsTo(User::class);
    }
}
