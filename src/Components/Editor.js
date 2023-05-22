import {useNavigate, useParams}  from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import {useState, useEffect} from 'react';
import {collection, doc, updateDoc, onSnapshot} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Editor({database}) {
    const [editorData,setEditorData] = useState("");
    const [title, setTitle] = useState("");
    let navigate = useNavigate();
    
    let params = useParams();
    let databaseCollection = collection(database,'docs-data');

    const getEditorData = (value) => {
        setEditorData(value);
    }

    useEffect(()=>{
        const updateDocument = setTimeout(()=>{
            let docToupdate = doc(databaseCollection,params.id);
            updateDoc(docToupdate,{
                body: editorData
            })
            .then(()=>{
                toast.success('Document updated',{
                    autoClose: 1000
                })
            })
            .catch(()=>{
                toast.error('Couldn\'t update Document');
            });
        },2000);

        return () => clearTimeout(updateDocument);
    },[editorData]);

    useEffect(()=>{
        const document = doc(databaseCollection,params.id);

        onSnapshot(document,(docs)=>{
            if(docs.data())
                setTitle(docs.data().title);
            (docs.data() && setEditorData(docs.data().body));
        })
    },[])

    return (
    <div>
        <ToastContainer/>
        <div>
            <button 
            className='back-btn'
            onClick={()=> navigate('/home')}>Back</button>
        </div>
        <h3>{title}</h3>
      <ReactQuill value={editorData} 
      onChange={getEditorData}/>
    </div>
  )
}
