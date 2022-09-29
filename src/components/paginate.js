// import {useEffect,useState} from "react";
// import ReactPaginate from "react-paginate";
// export default function Paginate(props){
      
//       const{data}=props;   
//       const [currentItems, setCurrentItems] = useState([]);
//       const [pageCount, setPageCount] = useState(0);
//       const [itemOffset, setItemOffset] = useState(0);
//       const itemsPerPage=6;
    
//       useEffect(() => {
     
//         const endOffset = itemOffset + itemsPerPage;
       
//         setCurrentItems(data.slice(itemOffset, endOffset));
//         setPageCount(Math.ceil(data.length / itemsPerPage));
//       }, [itemOffset, itemsPerPage,data]);
    
     
//       const handlePageClick = (event) => {
//         const newOffset = (event.selected * itemsPerPage) % data.length;
         
//         setItemOffset(newOffset);
//       };
    
//       return (
//         <>
//            <div className="students">
//            {data.map((student)=>{
//         return (
//           <div key={student.id}>
//           <h1>FirstName:{student.first_name}</h1>
//           <h1>LastName:{student.last_name}</h1>
//           <h1>email:{student.email_id}</h1>
//           <h1>is_paid:{(student.is_paid)? "Yes":"No"}</h1>
//           <h1>{(student.is_paid)? "":<button onClick={()=>{updateStudent(student.id,student.is_paid)}}>Mark as Paid</button>}</h1>
           
//           </div>
//         );
//           })}
//            </div>
//           <ReactPaginate
//             breakLabel="..."
//             nextLabel="next >"
//             onPageChange={handlePageClick}
//             pageRangeDisplayed={3}
//             pageCount={pageCount}
//             previousLabel="< previous"
//             renderOnZeroPageCount={null}
//           />
//         </>
//       );
    
// };

