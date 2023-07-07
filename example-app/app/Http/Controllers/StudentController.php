<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function addStudent(Request $request)
    {
        $request->validate([
            'guardian_id' => 'required|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'photo' => 'required|string',
        ]);

        $student = Student::create([
            'guardian_id' => $request->input('guardian_id'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'address' => $request->input('address'),
            'dob' => $request->input('dob'),
            'gender' => $request->input('gender'),
            'photo' => $request->input('photo'),
        ]);

        return response()->json(['message' => 'Student created successfully', 'student' => $student]);
    }

    public function getAll(){

        $studentModel = new Student;
        $students = $studentModel->getAllStudents(); 

        return response()->json($students, 200);

    }

    public function getStudentById($id){

        $student = Student::find($id);

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        return response()->json($student, 200);
    }

    public function removeStudent($id){
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], Response::HTTP_NOT_FOUND);
        }

        $student->delete();

        return response()->json(['message' => 'Student removed successfully']);
       
    }

    public function updateStudent(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'guardian_id' => 'required|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'photo' => 'required|string',
        ]);

        $student->guardian_id = $request->input('guardian_id');
        $student->first_name = $request->input('first_name');
        $student->last_name = $request->input('last_name');
        $student->address = $request->input('address');
        $student->dob = $request->input('dob');
        $student->gender = $request->input('gender');
        $student->photo = $request->input('photo');
        $student->save();

        return response()->json(['message' => 'Student updated successfully', 'Student' => $student]);
    }
}


