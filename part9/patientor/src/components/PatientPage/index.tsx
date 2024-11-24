
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { Patient, Gender, Entry, Diagnosis, HealthCheckRating } from "../../types";

interface PatientProps {
  patient: Patient | undefined
  diagnosisCodes: Diagnosis[] | undefined
}

interface EntryProps {
  entry: Entry
}

const displayHealthCheckRatingIcon = (healthCheckRating: HealthCheckRating) => {
  switch (healthCheckRating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: 'green' }}/>;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: 'yellow' }}/>;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: 'orange' }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon sx={{ color: 'red' }} />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HopsitalEntry entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry}/>;
    case "HealthCheck":
      return <HealthcheckEntry entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

const HopsitalEntry = (props: EntryProps) => {
  const { entry } = props;
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
       <Typography variant="body1">
        {entry.date} <LocalHospitalIcon />
      </Typography>
      <i>{entry.description}</i>
      diagnosed by {entry.specialist}
    </Box>
  );
};

const OccupationalHealthcareEntry = (props: EntryProps) => {
  const { entry } = props;
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
       <Typography variant="body1">
        {entry.date} <WorkIcon /> <i>{entry.employerName}</i>
      </Typography>
      <i>{entry.description}</i>
      <div>
        diagnosed by {entry.specialist}
      </div>
    </Box>
  );
};

const HealthcheckEntry = (props: EntryProps) => {
  const { entry } = props;
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
       <Typography variant="body1">
        {entry.date} <MedicalInformationIcon />
      </Typography>
      <i>{entry.description}</i>
      <div>
        {displayHealthCheckRatingIcon(entry.healthCheckRating)}
      </div>
      <div>
        diagnosed by {entry.specialist}
      </div>
    </Box>
  );
};

const displayEntries = (entries: Entry[]) => {
  if (entries.length > 0) {
    return (
      <div>
        <Typography variant="h6" style={{ marginTop: "1em", marginBottom: "1em" }} sx={{ fontWeight: 'bold' }}>entries</Typography>
        {entries.map(entry => {
          return (<EntryDetails key={entry.id} entry={entry} />);
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