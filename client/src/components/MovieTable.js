import React, { useState } from 'react';
import { Table } from 'reactstrap';

const MovieTable = (props) => {

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Name
            </th>
            <th>First Added</th>
          </tr>
        </thead>
        <tbody>
          {console.log("PROPS HERE: ", props)}
        </tbody>
      </Table>
    </div>
  );
}

export default MovieTable;
