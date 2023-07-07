<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'guardian_id',
        'first_name',
        'last_name',
        'address',
        'dob',
        'gender',
        'photo',
    ];

    public function getAllStudents(){

        return $this->all();
    }

    public function getStudentById($studentId){

        return $this->find($studentId);
    }

    public function removeStudent()
    {
        $this->delete();
    }
}
