import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import DataTable from 'react-data-table-component'


const CountriesTables = () => {
  const [search,setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries,setFilterCountries]=useState([]);
  const getCountries = async () =>{
    try {
      const response= await axios.get('https://restcountries.com/v2/all');
      setCountries(response.data);
      setFilterCountries(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  const columns=[
    {
      name: "Country Name",
      selector: row=> row.name,
      sortable: true
    },
    {
      name: "Country Native Name",
      selector: row=> row.nativeName,
      sortable: true
    },
    {
      name: "Country Capital",
      selector: row=> row.capital,
    },
    {
      name: "Country Flag",
      selector: row=> <img width={50} height={50} src={row.flag} alt=''/>,
    },
    {
        name: "Action",
        selector: (row) => (
        <button
         className="btn btn-primary"
         onClick={()=>alert(row.alpha2Code
            )}
        >
         Edit
        </button>
     ),
    }
  ]
  useEffect(() =>{
    getCountries();

  },[])
  useEffect(()=>{
    const result= countries.filter(country=>{
        return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilterCountries(result);

  },[countries, search])
  return (
     <DataTable 
        title="Country List"
        columns={columns} 
        data={filteredCountries} 
        pagination 
        fixedHeader
        fixedHeaderScrollHeight="450px" 
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={<button className="btn btn-info">Export</button>}
        subHeader
        subHeaderComponent={
            <input type="text" 
            placeholder="Search here" 
            className="w-25 form-control" 
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            />

        }
        subHeaderAlign='left'
      />
      );
};

export default CountriesTables