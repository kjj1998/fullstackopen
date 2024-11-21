// import { useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
// import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


import { Patient, Gender, Entry } from "../../types";

interface PatientProps {
  patient: Patient | undefined
}

const displayEntries = (entries: Entry[]) => {
  if (entries.length > 0) {
    return (
      <div>
        <Typography variant="h6" style={{ marginTop: "1em", marginBottom: "1em" }} sx={{ fontWeight: 'bold' }}>entries</Typography>
        {entries.map(entry => {
          return (
            <div key ={entry.date + entry.description}>
              <Typography variant="body1">
                {entry.date} <i>{entry.description}</i>
              </Typography>
              <ul>
                {
                  entry.diagnosisCodes !== undefined ?
                    entry.diagnosisCodes.map(code => <li key={code}><Typography>{code}</Typography></li>)
                    : <></>
                }
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
};

const PatientPage = (props: PatientProps) => {
  if (props.patient !== undefined) {
    const { name, ssn, occupation, gender, entries } = props.patient;

    return (
      <div>
        <Typography variant="h5" style={{ marginTop: "1em", marginBottom: "1em" }} sx={{ fontWeight: 'bold' }}>
          {name} {(gender === Gender.Male ? <MaleIcon /> : gender === Gender.Female ? <FemaleIcon /> : <></>)}
        </Typography>
        <Typography variant="body1">ssn: {ssn}</Typography>
        <Typography variant="body1">occupation: {occupation}</Typography>
        {displayEntries(entries)}
      </div>
    );
  } 
};

export default PatientPage;