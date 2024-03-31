
import React, {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useNavigate} from "react-router-dom";


const Grid = (data) => {
    const navigate = useNavigate();

        // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState(data.data);
    const [hasWinner, setHasWinner] = useState()

    useEffect(() => {
        setRowData(data.data);
        console.log(data.data);
        // Verifica si algún dato tiene un ganador no nulo
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
        }

        setColDefs(newColDefs);
    }, [data]);



    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([]);

    const onRowClicked = (event) => {
        const data = event.data
        navigate('/sports/'+data.sport_id+'/game/'+data.game_id);
    };


    return (
        <div
            className="ag-theme-quartz"
            style={{height: 200}}
        >
            <AgGridReact
                className='grid'
                rowData={rowData}
                columnDefs={colDefs}
                onRowClicked={onRowClicked}
            />
        </div>
    )
}

export default Grid