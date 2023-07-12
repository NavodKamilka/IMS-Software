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

export default function Guardian() {
  const [guardians, setGuardians] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [name, setName] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [relation, setRelation] = useState('');
  const [address, setAddress] = useState('');




  const [selectedGuardian, setSelectedGuardian] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {

    const fetchGuardians = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/guardian/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGuardians(response.data);
      } catch (error) {
        console.error('Error fetching guardians:', error);
      }
    };


    fetchGuardians();
  }, [token]);


  const handleDelete = (guardianId) => {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this guardian?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGuardian(guardianId);
      }
    });
  };

  const deleteGuardian = async (guardianId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/guardian/delete/${guardianId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGuardians((prevGuardians) => prevGuardians.filter((guardian) => guardian.id !== guardianId));

      Swal.fire('Deleted!', 'The guardian has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting guardian:', error);
      Swal.fire('Error', 'Failed to delete the guardian.', 'error');
    }
  };

  const handleAddGuardian = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/guardian/add',
        {
          name: name,
          contact_no: contact_no,
          relation: relation,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setName('');
      setContactNo('');
      setRelation('');
      setAddress('');
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  

  const handleUpdateGuardian = async () => {
    // console.log("Called")
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/guardian/updateGuardian/${selectedGuardian.id}`,
        {
          name: name,
          contact_no: contact_no,
          relation: relation,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Called")
      console.log(response.data);
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (guardian) => {
    setSelectedGuardian(guardian);
    setName(guardian.name);
    setContactNo(guardian.contact_no);
    setRelation(guardian.relation);
    setAddress(guardian.address);
    setOpenDialog(true);
  };

  return (
    <div>
      <MiniDrawer />
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '300px' }}>
        <Typography style={{ fontSize: '25px', fontWeight: 'bold' }}>All Guardians</Typography>
        <Button variant="contained" style={{ marginLeft: '800px' }} onClick={() => setOpenDialog(true)}>
          Add New Guardian
        </Button>
      </Box>
      <br />
      <br />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>
          {selectedGuardian ? 'Edit Guardian' : 'Add New Guardian'}
        </DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Contact Number"
            value={contact_no}
            onChange={(e) => setContactNo(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          />
          <TextField
            type="text"
            label="Relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            fullWidth
            style={{ marginBottom: '25px' }}
          /> 
          <TextField
            type="text"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'red', marginRight: '10px' }} onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={selectedGuardian ? handleUpdateGuardian : handleAddGuardian}
          >
            {selectedGuardian ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ width: '1000px' }}>
        <Table size="small" aria-label="guardians" style={{ marginLeft: '350px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Guardian Name</TableCell>
              <TableCell align="left">Contact Number</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Relation</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>

          <br />
          <TableBody>
            {guardians.map((guardian) => (
              <TableRow key={guardian.id}>
                <TableCell align="left">{guardian.name}</TableCell>
                <TableCell align="left">{guardian.contact_no}</TableCell>
                <TableCell align="left">{guardian.address}</TableCell>
                <TableCell align="left">{guardian.relation}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(guardian)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(guardian.id)}>
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
