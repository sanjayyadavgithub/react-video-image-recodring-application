import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState();
    const [perPage, setPerPage] = useState();
    const [dropDown, setDropDown] = useState(2);
    const navigate = useNavigate(); 
  
    async function fetchData(page, dropDownValue) {
      const data = await axios.get('http://localhost:8800/api/list')
      setTableData([...new Set(data?.data?.files)])
    }
    useEffect(() => {
      fetchData();
    }, []);
  
   
    const CreateGallery = (type) =>{
        navigate(`/create/${type}`)
    }
  
    return (
      <div className="App">
        <div className='image-video'>
            <button onClick={()=>CreateGallery("Image")}>Image</button>
            <button onClick={()=>CreateGallery("Video")}>Video</button>
        </div>
        <header className="App-header">React Capture Images And Video</header>
        <div className="App-table">
          <table className="table-container">
            <thead>
              <tr>
                <th>
                  <h5>Id </h5>
                </th>
                <th>
                  <h5>Images/Video</h5>
                </th>
                <th>
                  <h5>Type</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length !== 0 ? (
                tableData.map((value,ind) => (
                  <tr key={ind}>
                    <td>{ind+1}</td>
                    <td>{value}</td>
                    <td>{value.includes('webm') ? "Video" :"Image"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No More Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  
       
      </div>
    );
  }
  
