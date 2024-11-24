import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";

import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnosisCodes = async () => {
      const diagnosisCodes = await diagnosisService.getAll();
      console.log(diagnosisCodes);
      setDiagnosisCodes(diagnosisCodes);
    };

    void fetchPatientList();
    void fetchDiagnosisCodes();
  }, []);

  const match = useMatch('/patients/:id');
  const patient = match 
    ? (
        patients.find(patient => {
          return patient.id === match.params.id;
        })
    )
    : undefined;
  
  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/patients/:id" element={<PatientPage patient={patient} diagnosisCodes={diagnosisCodes} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
