import {FC, useState} from 'react';
import {useAuthRedirect} from "@/screens/auth/useAuthRedirect";
import {useAuth} from "@/hooks/useAuth";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthInput} from "@/screens/auth/auth.interface";

import styles from './Auth.module.scss';
import {Meta} from "@/utils/meta/Meta";
import {Heading} from "@/ui/heading/Heading";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {Button} from "@/ui/form-elements/Button";
import {AuthFields} from "@/screens/auth/AuthFields";

interface IAuthProps {

}

export const Auth: FC<IAuthProps> = () => {
  useAuthRedirect()

  const {isLoading}  = useAuth()

  const [type, setType] = useState<'login' | 'register'>('login')

  const {register: registerInput, handleSubmit, formState, reset} = useForm<IAuthInput>({
    mode: 'onChange'
  })

  const login = (data: any) => {
    console.table(data)
  }
  const register = (data: any) => {
    console.table(data)
  }

  const onSubmit:SubmitHandler<IAuthInput> = (data) => {
    if (type === 'login') login(data)
    else if (type === 'register') register(data)

    reset()
  }

  return <Meta title={'Auth'}>
    <section className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading title={'Auth'} className="mb-6"/>

        <AuthFields register={registerInput}
                    formState={formState}
                    isPasswordRequired
        />

      <div className={styles.buttons}>
        <Button type="submit" onClick={() => setType('login')} disabled={isLoading}>Login</Button>
        <Button type="submit" onClick={() => setType('register')} disabled={isLoading}>Register</Button>
      </div>
      </form>
    </section>
  </Meta>
};