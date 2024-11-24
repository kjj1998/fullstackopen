// import { useState } from "react";
// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
// import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


import { Patient, Gender, Entry, Diagnosis } from "../../types";

interface PatientProps {
  patient: Patient | undefined
  diagnosisCodes: Diagnosis[] | undefined
}

const findDiagnosisDescription = (code: string, diagnosisCodes: Diagnosis[]) => {
  const foundDiagnosis = diagnosisCodes.filter((diagnosis) => diagnosis.code === code);

  return foundDiagnosis[0].name;
};

const displayEntries = (entries: Entry[], diagnosisCodes: Diagnosis[]) => {
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
                    entry.diagnosisCodes.map(code => <li key={code}><Typography>{code} {findDiagnosisDescription(code, diagnosisCodes)}</Typography></li>)
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
    const diagnosisCodes = props.diagnosisCodes as Diagnosis[];

    return (
      <div>
        <Typography variant="h5" style={{ marginTop: "1em", marginBottom: "1em" }} sx={{ fontWeight: 'bold' }}>
          {name} {(gender === Gender.Male ? <MaleIcon /> : gender === Gender.Female ? <FemaleIcon /> : <></>)}
        </Typography>
        <Typography variant="body1">ssn: {ssn}</Typography>
        <Typography variant="body1">occupation: {occupation}</Typography>
        {displayEntries(entries, diagnosisCodes)}
      </div>
    );
  } 
};

export default PatientPage;