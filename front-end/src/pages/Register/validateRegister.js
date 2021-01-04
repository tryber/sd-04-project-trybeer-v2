import * as yup from 'yup';

const minName = 12;
const minPassword = 6;

const schema = yup.object().shape({
  // nome - deve conter, no mínimo, 12 letras, sem números ou caracteres especiais;
  signName: yup
    .string()
    .min(minName, 'O nome deve conter pelo menos 12 letras')
    .matches(/^([a-zA-Z ])*$/gmi, 'O Nome deve conter somente letras')
    .required('É necessário inserir um nome'),

  // email - deve conter um email válido. Um email válido possui o formato <nome>@<domínio>;
  signEmail: yup
    .string()
    .email('O email deve ter o formato nome@domínio.com')
    .required('É necessário inserir um email'),

  // senha - composta por, no mínimo, 6 números;
  signPassword: yup
    .string()
    .min(minPassword, 'A senha deve conter pelo menos 6 números')
    .required('É necessário inserir uma senha'),
});

// "Testes" de validação com console.log
/*
let userTest = {
  signName: 'brunobatista',
  signEmail: 'email@gmail.com',
  signPassword: '1234567',
};

schema.validate(userTest)
  .then(function (valid) {
    console.log('Validação: ', valid)})
  .catch(function (err) {
    console.log('Erro de validação: ', err);
  });

schema.fields.signEmail.validate(userTest.signEmail)
  .then(function (valid) {
    console.log('Validação: ', valid)})
  .catch(function (err) {
    console.log('Erro de validação: ', err);
  });
*/

export default schema;
