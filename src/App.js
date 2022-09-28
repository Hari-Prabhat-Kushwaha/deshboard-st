import { useState,useEffect} from "react";
import './App.css';
import {db} from './firebase-config';
import database from './db.js';
import {collection, getDocs,addDoc,updateDoc,doc} from "firebase/firestore";

function App() {
  // const [newLastName,setNewLastName]=useState("");
  // const [newFirstName,setNewFirstName]=useState("");
  // const [newEmail,setNewEmail]=useState("");
  // const [newIsPaid,setNewIsPaid]=useState("");

  const [Students,setStudents] =useState([]);
  const StudentsCollectionRef= collection(db, "students");

  const createStudents=()=>{
    database.forEach(async (d)=>{
      await addDoc(StudentsCollectionRef,{
        first_name:d.first_name,last_name:d.last_name,email_id:d.email_id,is_paid:d.is_paid
      })
    })
  }
  
 const updateStudent=async(id,is_paid)=>{
  const userDoc=doc(db, "students", id)
 const newFields={is_paid : !is_paid}
 await updateDoc(userDoc,newFields)
 }

  useEffect(()=> {
     const getStudents=async()=>{
      const data =await getDocs(StudentsCollectionRef);
      setStudents(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
     }
    
     getStudents();
  }, []);

  return (
    <div className="App">
      {/* <input placeholder="firstname.." 
      onChange={(event)=>{
        setNewFirstName(event.target.value);
      }}
      />
      <input placeholder="lastname.." 
      onChange={(event)=>{
        setNewLastName(event.target.value);
      }}
      />
      <input  placeholder="emailid.."
       onChange={(event)=>{
        setNewEmail(event.target.value);
      }}
      />
      <input placeholder="is_paid" 
      onChange={(event)=>{
        setNewIsPaid(event.target.value);
      }}
      /> */}
      <button onClick={createStudents}>Create student</button>
      {Students.map((student)=>{
        return (
          <div key={student.id}>
          <h1>FirstName:{student.first_name}</h1>
          <h1>LastName:{student.last_name}</h1>
          <h1>email:{student.email_id}</h1>
          <h1>is_paid:{(student.is_paid)? "Yes":"No"}</h1>
          <h1>{(student.is_paid)? "":<button onClick={()=>{updateStudent(student.id,student.is_paid)}}>Mark as Paid</button>}</h1>
           
          </div>
        );
          })}

        </div>
      
  );
}

export default App;
