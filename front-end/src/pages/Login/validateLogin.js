import * as Yup from 'yup';

const min = 6;
const schema = Yup.object().shape({
  // email - deve conter um email válido. Um email válido possui o formato <nome>@<domínio>;
  loginEmail: Yup.string()
    .email('O email deve ter o formato nome@domínio.com')
    .required('É necessário inserir um email'),

  // senha - composta por, no mínimo, 6 números;
  loginPassword: Yup.string()
    .min(min, 'A senha deve conter pelo menos 6 números')
    .required('É necessário inserir uma senha'),
});

export default schema;
