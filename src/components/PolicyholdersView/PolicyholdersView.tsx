import { useEffect, useState } from 'react';
import InfoTable from '../InfoTable';
import { Button, Box, List, ListItem } from '@mui/material';

function PolicyholdersView() {
  // challenge 6
  type TpolicyHolders = {
    name: string;
    age: number;
    address: {
      line1: string;
      line2: string | undefined;
      city: string;
      state: string;
      postalCode: string;
    };
    phoneNumber: string;
    isPrimary: boolean;
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [policyholders, setPolicyholders] = useState<any[]>([])

  useEffect(() => {
    fetch("https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders")
    .then(res => res.json())
    .then(
      (data) => {
        setIsLoaded(true);
        setPolicyholders(data.policyHolders);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])

  console.log(policyholders)

  const formatAddress = (address: TpolicyHolders["address"]): string => {
    if (!address) return "";
    const { line1, line2, city, state, postalCode } = address;
    const addressLine2 = line2 ? `, ${line2}` : "";

    return `${line1}${addressLine2}, ${city}, ${state} ${postalCode}`;
  };

  const tableRows = (policyholder: TpolicyHolders) => [
    { key: "Name", value: policyholder.name },
    { key: "Age", value: policyholder.age },
    { key: "Address", value: formatAddress(policyholder.address) },
    { key: "Phone Number", value: policyholder.phoneNumber },
    { key: "Primary Policyholder", value: policyholder.isPrimary ? 'Yes' : 'No' },
  ];

  // challenge 7 and challenge 8
 const postUrl = "https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders"

 const handleClick = async () => {
  try {
    const response = await fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Catherine Siller',
        age: 25,
        address: { 
          line1: '1861 Lake Shore Avenue',
          line2: undefined,
          city: 'Los Angeles',
          state: 'California',
          postalCode: '90026'
        },
        phoneNumber: '210-111-1111',
        isPrimary: false,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result is: ', JSON.stringify(result, null, 4));

      setPolicyholders(result);
    } catch (error) {
      //setError(true);
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {policyholders && policyholders.map((policyholder) => (
        <Box
          key={`policy-holder-${policyholder.name}`}
          sx={{ marginBottom: "16px" }}
        >
          <InfoTable 
            header={policyholder.name}
            rows={tableRows(policyholder)} 
          />
        </Box>
      ))}
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        size="large"
      >
        Add a policyholder
      </Button>
      <Box sx={{ marginBottom: "16px", marginTop: "16px" }}>
        Remaining TODOs:
        <List>
          <ListItem disablePadding>1. Challenge 3 debug</ListItem>
          <ListItem disablePadding>2. Challenge 8 debug</ListItem>
          <ListItem disablePadding>3. Remove 'View challenges' button from unnecessary pages</ListItem>
          <ListItem disablePadding>4. Are other two pages besides Policyholders necessary? Need updates?</ListItem>
          <ListItem disablePadding>5. Responsive</ListItem>
          <ListItem disablePadding>6. At least 85% test coverage</ListItem>
          <ListItem disablePadding>7. Check Lighthouse performance numbers, do necessary fixes</ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default PolicyholdersView;
