import React from 'react';
import { AuthContext } from '../App';

export default function useAuth() {
  const { user, setUser } = React.useContext(AuthContext);

  return { user, setUser }
}