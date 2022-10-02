import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import database from "./db.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
// import Paginate from "./components/paginate";
import ReactPaginate from "react-paginate";

function App() {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const [Students, setStudents] = useState([]);
  const StudentsCollectionRef = collection(db, "students");
  const [query, setQuery] = useState("");
  const [showResult, setShowResult] = useState([]);

  

  const createStudents = () => {
    database.forEach(async (d) => {
      await addDoc(StudentsCollectionRef, {
        first_name: d.first_name,
        last_name: d.last_name,
        email_id: d.email_id,
        is_paid: d.is_paid,
      });
    });
  };


  const updateStudent = async (id, is_paid) => {
    const userDoc = doc(db, "students", id);
    const newFields = { is_paid: !is_paid };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getStudents = async () => {
      const data = await getDocs(StudentsCollectionRef);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getStudents();
  }, []);

 const keys=["first_name", "email_id"]

  useEffect(()=>{
    const Result= Students.filter((item)=> 
    keys.some(key=>item[key].toLowerCase().includes(query.toLowerCase()))
    );
    setShowResult(Result);
  },[query, Students]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(showResult.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Students.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, Students,showResult]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Students.length;

    setItemOffset(newOffset);
  };


  return (
    <div className="App">
      
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={(e) => setQuery(e.target.value)}
        />

    

        <button onClick={createStudents}>Create student</button>
        <table className="table">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            
            {currentItems.map((student) => (
          
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email_id}</td>
              <td>{student.is_paid ? "Yes" : "No"}</td>
              <td>
                {student.is_paid ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      updateStudent(student.id, student.is_paid);
                    }}
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          
        ))}
          </tbody>
        </table>
      

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  );
}

export default App;
