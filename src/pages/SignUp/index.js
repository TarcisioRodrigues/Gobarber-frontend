import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

// import { Container } from './styles';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string('Insira seu nome').required('Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6)
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Go Barber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
