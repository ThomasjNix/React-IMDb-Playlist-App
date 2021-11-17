import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
const Instruction = ({message}) => {
    return (
        <>
            <em className="instruction-message">
                <InfoIcon color="blue"></InfoIcon>
                <span>{message}</span>
            </em>
        </>
    )
}

export default Instruction
