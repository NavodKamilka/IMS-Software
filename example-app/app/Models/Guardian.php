<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact_no',
        'address',
        'relation',
    ];

    public function getAllGuardians(){

        return $this->all();
    }

    public function getGuardianById($guardianId){

        return $this->find($guardianId);
    }

    public function removeGuardian()
    {
        $this->delete();
    }
}
