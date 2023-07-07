<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create guardians table
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contact_no');
            $table->string('address');
            $table->string('relation');
            $table->timestamps();
        });

        // Create students table
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guardian_id')->constrained('guardians');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('address');
            $table->date('dob');
            $table->string('gender');
            $table->string('photo')->nullable();
            $table->date('registered_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop students table
        Schema::dropIfExists('students');

        // Drop guardians table
        Schema::dropIfExists('guardians');
    }
};
