import { useLazySignInQuery } from '../api/repository';
import { SignInFormValues } from '../api/models/auth.model';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [triggerSignInQuery] = useLazySignInQuery();
  const signIn = async (values: SignInFormValues) => {
    let token: string;
    try {
      const { data, isError, error } = await triggerSignInQuery(values, false);
      if (isError) {
        // @ts-ignore
        toast.error(error.data.message || "Something wen't wrong. Please, try again later");
        return;
      }
      token = data!.token;
      try {
        const decodedToken = jwt_decode(token);
        if (decodedToken) {
          localStorage.setItem('token', token);
        }
      } catch (e) {
        toast.error('Some error during parsing token');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
  };

  return { signIn, signOut };
};
