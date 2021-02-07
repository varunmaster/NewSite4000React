import React from 'react';
import { Table } from 'reactstrap';

const MovieTable = ({ movieObj }) => {
  let movieList = Object.keys(movieObj);

  return (   
    movieList.map(movie => {
      <tr key={movieList.indexOf(movie)}>
        <th scope="row">{movieList.indexOf(movie)}</th>
        <td>{movie}</td>
        <td>{movieObj[movie]}</td>
      </tr>
    })
  );
};

export default MovieTable;
