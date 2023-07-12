import React, { useEffect, useState } from 'react';
import MiniDrawer from '../Components/MiniDrawer';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

import { uploadImageToCloudinary , getImageUrlFromCloudinary  } from '../Components/cloudinary' // Assuming you have a utility function to handle Cloudinary uploads
import FormData from 'form-data';



export default function Student() {

  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [guardian_id, setGuardianId] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');



  const [selectedStudent, setSelectedStudent] = useState(null);


  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/student/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching Students:', error);
      }
    };

    fetchStudents();
  }, [token]);

  const handleDelete = (studentId) => {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(studentId);
      }
    });
  };

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/student/delete/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));

      Swal.fire('Deleted!', 'The student has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting student:', error);
      Swal.fire('Error', 'Failed to delete the student.', 'error');
    }
  };

  // const handleAddStudent = async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://127.0.0.1:8000/api/student/add',
  //       {
  //         guardian_id: guardian_id,
  //         first_name: first_name,
  //         last_name: last_name,
  //         address: address,
  //         dob: dob,
  //         gender: gender,
  //         photo: photo,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //     setGuardianId('');
  //     setFirstName('');
  //     setLastName('');
  //     setAddress('');
  //     setDob('');
  //     setGender('');
  //     setPhoto('');
  //     setOpenDialog(false);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAddStudent = async () => {
    try {
      const formData = new FormData();
      formData.append('file', photo);
  
      const uploadedImage = await uploadImageToCloudinary(formData);
      const imageUrl = getImageUrlFromCloudinary(uploadedImage);
  
      const response = await axios.post(
        'http://127.0.0.1:8000/api/student/add',
        {
          guardian_id: guardian_id,
          first_name: first_name,
          last_name: last_name,
          address: address,
          dob: dob,
          gender: gender,
          photo: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      setGuardianId('');
      setFirstName('');
      setLastName('');
      setAddress('');
      setDob('');
      setGender('');
      setPhoto('');
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  

  // const handleUpdateStudent = async () => {
  //   console.log("Called")
  //   try {
  //     const response = await axios.put(
  //       `http://127.0.0.1:8000/api/student/updateStudent/${selectedStudent.id}`,
  //       {
  //         guardian_id: guardian_id,
  //         first_name: first_name,
  //         last_name: last_name,
  //         address: address,
  //         dob: dob,
  //         gender: gender,
  //         photo: photo,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //     setOpenDialog(false);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleUpdateStudent = async () => {
    try {
      const formData = new FormData();
      formData.append('file', photo);
  
      const uploadedImage = await uploadImageToCloudinary(formData);
      const imageUrl = getImageUrlFromCloudinary(uploadedImage);
  
      const response = await axios.put(
        `http://127.0.0.1:8000/api/student/updateStudent/${selectedStudent.id}`,
        {
          guardian_id: guardian_id,
          first_name: first_name,
          last_name: last_name,
          address: address,
          dob: dob,
          gender: gender,
          photo: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setGuardianId(student.guardian_id);
    setFirstName(student.first_name);
    setLastName(student.last_name);
    setAddress(student.address);
    setDob(student.dob);
    setGender(student.gender);
    setPhoto(student.photo);
    setOpenDialog(true);
  };

  return (
    <div>
      <MiniDrawer />
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '300px' }}>
        <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>All Students</Typography>
        <Button variant="contained" style={{ marginLeft: '800px' }} onClick={() => setOpenDialog(true)}>
          Add New Student
        </Button>
      </Box>
      <br />
      <br />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>{selectedStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        <DialogContent><br></br>
        <TextField
            type="text"
            label="Guardian Id"
            value={guardian_id}
            onChange={(e) => setGuardianId(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          /> 
          <TextField
            type="text"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ marginBottom: '25px' }}
          />

        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red', marginRight: '10px' }} onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={selectedStudent ? handleUpdateStudent : handleAddStudent}
          >
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ width: '1000px' }}>
        <Table size="small" aria-label="purchases" style={{ marginLeft: '350px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Guardian Id</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Date of Birth</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Photo</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <br />
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="left">{student.guardian_id}</TableCell>
                <TableCell align="left">{student.first_name}</TableCell>
                <TableCell align="left">{student.last_name}</TableCell>
                <TableCell align="left">{student.address}</TableCell>
                <TableCell align="left">{student.dob}</TableCell>
                <TableCell align="left">{student.gender}</TableCell>
                <TableCell align="left"><img src={student.photo} alt="Student" style={{ width: '50px', height: '50px', borderRadius: '50%',objectFit: 'cover' }} /></TableCell>
                <TableCell align="left">
                  <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(student)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
