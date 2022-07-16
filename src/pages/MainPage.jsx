import React from 'react';
import {Table,Form} from "react-bootstrap";



const MainPage = () =>{

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>1</th>
                    </tr>
                </thead>i
                <tbody>
                    <tr>
                        <td>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default MainPage;