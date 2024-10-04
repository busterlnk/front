
import React, {useEffect, useRef, useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {deleteGame} from "../api/request/sportRequest";


const Grid = (data, updateData) => {
    const gridRef = useRef(null);
    const navigate = useNavigate();
    const [rowData, setRowData] = useState(data.data);


    useEffect(() => {
        setRowData(data.data);
        const hasWinner = data.data.some(item => item.winner !== null);
        const newColDefs = [
            { field: "player_one", headerName: "Player One", flex: 1 },
            { field: "player_two", headerName: "Player Two", flex: 1},
            { field: "created_at", headerName: "Created At", flex: 1 },
        ];

        if (hasWinner) {
            newColDefs.push(
                { field: "winner", headerName: "Winner", flex: 1 },
                { field: "duration", flex: 1 }
            );
        }else{
            newColDefs.push(
                { headerName: 'Delete', cellRenderer: (params) => <DeleteButtonCellRenderer params={params} /> }
            )
        }

        setColDefs(newColDefs);
    }, [data.data]);

    const DeleteButtonCellRenderer = ({ params }) => {
        const handleDelete = async() => {
            await deleteGame(params.data);
            data.updateData();
        };

        return <Button style={{marginBottom: '5px'}} variant="danger" onClick={handleDelete}>Eliminar</Button>;
    };

    const [colDefs, setColDefs] = useState([]);

    const onRowClicked = (event) => {
        if (event.event.target.tagName === 'BUTTON') {
            return;
        }
        const data = event.data
        navigate('/sports/'+data.sport_id+'/game/'+data.game_id);
    };


    return (
        <div
            className="ag-theme-quartz"
            style={{height: '70vh'}}
        >
            <AgGridReact
                ref={gridRef}
                className='grid'
                rowData={rowData}
                columnDefs={colDefs}
                onRowClicked={onRowClicked}
            />
        </div>
    )
}

export default Grid