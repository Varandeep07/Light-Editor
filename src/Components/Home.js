import React, { useState } from 'react';
import {signOut, getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc
  } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home({database}) {

  let auth = getAuth();
  let navigate = useNavigate();
  let userEmail = localStorage.getItem('userEmail');
  let databaseCollection = collection(database,'docs-data');
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const logout = () => {
    signOut(auth).then(()=>{
      navigate("/");
    });
  };

  useEffect(()=>{
    onAuthStateChanged(auth,(response)=>{
      // console.log(response);
      if(response){
        navigate('/home');
      }
      else{
        navigate('/');
      }
    });
  },[]);

  const addDocument = () => {
    console.log(title);
    addDoc(databaseCollection,{
      title : title,
      author: userEmail,
      body: ''
    }).then(res => {
      toast.success('Document Created',{
        autoClose: 1000
      });
      setIsAdd(false);
      setTitle('');
    })
    .catch(()=>{
      toast.error('Error in Adding Data',{
        autoClose: 1000
      });
    })
  };

  useEffect(()=>{
    onSnapshot(databaseCollection,(res)=>{
      setDocsData(res.docs.map((doc)=>{
        return {...doc.data(), id: doc.id}
      }))
    })
  },[])

  const openEditor = (id) => {
    if(!isDeleteClicked)
      navigate(`/editor/${id}`);
  };

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    setIsDeleteClicked(true);
    const docRef = doc(databaseCollection, id);
  
    try {
      await deleteDoc(docRef);
      toast.success('Document deleted',{
        autoClose: 1000
      });
    } catch (error) {
      toast.error('Error deleting document',{
        autoClose: 1000
      });
    }
    setIsDeleteClicked(false);
  };

  return (
    <div>
        <ToastContainer />
        <button className='log-out-btn'
        onClick={logout}
        >Log Out</button>
        <div className='add-doc-btn'>
          <Button variant="outlined" startIcon={<AddIcon/>}
          onClick={()=>setIsAdd(!isAdd)}>
          Add Document
          </Button>
        </div>
        {
          isAdd && 
          <div className='title-input'>
          <input placeholder='Add a Title'
          className='add-title'
          value = {title} 
          onChange = {(event) => setTitle(event.target.value)}
          />
          <button className='add-btn' 
          onClick = {addDocument}
          >Add</button>
          </div>
        }

        <div className='grid-main'>
          {
            docsData.map((doc)=>{
              return (
                <div className='grid-child' onClick={()=> openEditor(doc.id) }>
                  <h3>{doc.title}</h3>
                  <span className='delete-btn' onClick={(event)=> handleDelete(event,doc.id)}>
                    <DeleteIcon/>
                  </span>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}
