import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { RootState } from '../../../../redux/ReduxStore';
import { LoanRecord } from '../../../../models/LoanRecord';
import { ProfileLoanRecord } from '../ProfileLoanRecord/ProfileLoanRecord';

import { Box, Typography, CircularProgress, Divider, Card, CardContent } from '@mui/material';

export const ProfileLoanHistory: React.FC = () => {
  const user = useSelector((state: RootState) => state.authentication.profileUser);
  const [records, setRecords] = useState<LoanRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecordsForUser = async () => {
    if (user) {
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:8000/loan/query', {
          property: 'patron',
          value: user._id,
        });
        setRecords(res.data.records);
      } catch {
        // handle error (optional)
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordsForUser();
  }, [user]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          py: 2,
          zIndex: 1,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {user?.firstName}'s Loan History
        </Typography>
        <Divider />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : records.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Typography variant="body1" color="text.secondary">
            No loan records found.
          </Typography>
        </Box>
      ) : (
        records.map((record) => (
          <Card key={record._id} sx={{ my: 2, borderRadius: '12px' }}>
            <CardContent>
              <ProfileLoanRecord record={record} />
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};
