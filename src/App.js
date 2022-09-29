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
  // const [query, setQuery] = userState("");

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(Students.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Students.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, Students]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Students.length;

    setItemOffset(newOffset);
  };

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

  return (
    <div className="App">
      <div>
        {/* <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={(e) => setQuery(e.target.value)}
        /> */}

        <button onClick={createStudents}>Create student</button>
        {currentItems.map((student) => {
          return (
            <div key={student.id}>
              <h1>FirstName:{student.first_name}</h1>
              <h1>LastName:{student.last_name}</h1>
              <h1>email:{student.email_id}</h1>
              <h1>is_paid:{student.is_paid ? "Yes" : "No"}</h1>
              <h1>
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
              </h1>
            </div>
          );
        })}
      </div>

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
