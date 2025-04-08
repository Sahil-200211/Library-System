import React from 'react';
import { LoanRecord } from '../../../../models/LoanRecord';

import { Stack, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

interface ProfileLoanRecordProps {
  record: LoanRecord;
}

export const ProfileLoanRecord: React.FC<ProfileLoanRecordProps> = ({ record }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={600}>
        Title: {record.item.title}
      </Typography>

      <Chip
        label={record.status === 'AVAILABLE' ? 'RETURNED' : 'LOANED'}
        color={record.status === 'AVAILABLE' ? 'success' : 'error'}
        icon={record.status === 'AVAILABLE' ? <CheckCircleIcon /> : <HourglassBottomIcon />}
        sx={{ width: 'fit-content' }}
      />

      <Typography variant="body2" color="text.secondary">
        Loan Date: {new Date(record.loanedDate).toDateString()}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Return by Date: {new Date(record.dueDate).toDateString()}
      </Typography>

      {record.returnDate && (
        <Typography variant="body2" color="text.secondary">
          Date Returned: {new Date(record.returnDate).toDateString()}
        </Typography>
      )}
    </Stack>
  );
};
