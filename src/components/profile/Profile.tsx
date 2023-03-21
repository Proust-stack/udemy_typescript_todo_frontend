import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const ProfileWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})) as typeof Box;

const AvatarComponent = styled(Avatar)(({ theme }) => ({
  width: '6rem',
  height: '6rem',
  backgroundColor: theme.palette.primary.main,
  marginBottom: '16px',
})) as typeof Box;

interface IProfile {
  name?: string;
}

export const Profile: FC<IProfile> = (props): ReactElement => {
  const { name = 'John' } = props;
  return (
    <ProfileWrapper>
      <AvatarComponent>
        <Typography variant="h4" color="text.primary">
          {name.charAt(0)}
        </Typography>
      </AvatarComponent>
      <Typography variant="h6" color="text.primary">
        {`Welcome, ${name}`}
      </Typography>
      <Typography variant="body1" color="text.primary">
        This is your personal tasks manager
      </Typography>
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
};
