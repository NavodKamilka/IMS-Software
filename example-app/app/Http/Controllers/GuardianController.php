<?php

namespace App\Http\Controllers;

use App\Models\Guardian;
use Illuminate\Http\Request;

class GuardianController extends Controller
{
    public function addGuardian(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'contact_no' => 'required|string',
            'address' => 'required|string',
            'relation' => 'required|string',
        ]);

        $guardian = Guardian::create([
            'name' => $request->input('name'),
            'contact_no' => $request->input('contact_no'),
            'address' => $request->input('address'),
            'relation' => $request->input('relation'),
        ]);

        return response()->json(['message' => 'Guardian created successfully', 'guardian' => $guardian]);
    }

    public function getAll(){

        $guardianModel = new Guardian;
        $guardian = $guardianModel->getAllGuardians(); 

        return response()->json($guardian, 200);

    }

    public function getGuardianById($id){

        $guardian = Guardian::find($id);

        if (!$guardian) {
            return response()->json(['error' => 'Guardian not found'], 404);
        }

        return response()->json($guardian, 200);
    }

    public function removeGuardian($id){
        $guardian = Guardian::find($id);

        if (!$guardian) {
            return response()->json(['message' => 'Guardian not found'], Response::HTTP_NOT_FOUND);
        }

        $guardian->delete();

        return response()->json(['message' => 'Guardian removed successfully']);
       
    }

    public function updateGuardian(Request $request, $id)
    {
        $guardian = Guardian::find($id);

        if (!$guardian) {
            return response()->json(['message' => 'Guardian not found'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'name' => 'required|string',
            'contact_no' => 'required|string',
            'address' => 'required|string',
            'relation' => 'required|string',
        ]);

        $guardian->name = $request->input('name');
        $guardian->contact_no = $request->input('contact_no');
        $guardian->address = $request->input('address');
        $guardian->relation = $request->input('relation');
        $guardian->save();

        return response()->json(['message' => 'Guardian updated successfully', 'Guardian' => $guardian]);
    }
}


