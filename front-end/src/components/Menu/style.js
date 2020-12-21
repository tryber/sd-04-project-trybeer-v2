import styled from 'styled-components';

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e85d04;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  width: 15rem;

  a {
    font-size: 16px;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #f3ebeb;
    text-decoration: none;
    transition: color 0.3s linear;
    text-align: center;
  }

  a:hover {
    color: #ffffff;
  }
`;

export default StyledMenu;
