import React from 'react';
import DataTable from 'react-data-table-component';
// import { useSelector } from 'react-redux'
import img from '../layout/logo.webp'
import { Link } from 'react-router-dom';
// import useFetch from '../hooks/useFetch'

const customStyles = {
  header: {
    style: {
      fontSize: '18px',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
    },
  },
};

const movies = [
  {
    id: 1,
    image: img,
    name: 'TV Shows 1',
    releaseDate: '2022-01-01',
    rating: '8.5'
  },
  {
    id: 2,
    image: img,
    name: 'TV Shows 2',
    releaseDate: '2022-02-01',
    rating: '7.2'
  },
  // Add more movie objects here
];

const columns = [
  {
    name: 'Image',
    selector: row => <img src={row.image} alt={row.name} className="img-thumbnail" style={{ width: '50px' }} />,
    sortable: false,
    // center: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Release Date',
    selector: row => row.releaseDate,
    sortable: true,
  },
  {
    name: 'Rating',
    selector: row => row.rating,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: row => (
      <div className="d-flex justify-content-center">
        <Link to={`/movies/details/${row.id}`} className="btn btn-lists mr-2"><i className="far fa-eye"></i></Link>
        <Link to={`/movies/edit/${row.id}`} className="btn btn-lists"><i className="fas fa-plus"></i></Link>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    center: true,
  },
];

const TvShowList = () => {
  // const imageURL = useSelector(state => state.movieoData.imageURL)
  // const { moviesData } = useFetch('/movie/popular')

  // console.log(moviesData);

  return (
    <div className="container"> 
      <h2 className="list-heading">TV Shows List</h2>
      <DataTable
        columns={columns}
        data={movies}
        defaultSortFieldId={2}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
};

export default TvShowList;