import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Novo estado para controlar a exibição do formulário de cadastro
  const [nome, setNome] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerSenha, setRegisterSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Armazenar userId e nome no localStorage
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.nome);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao tentar fazer login. Tente novamente.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerSenha !== confirmSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email: registerEmail, senha: registerSenha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setError("");
        setIsRegistering(false);
        setNome("");
        setRegisterEmail("");
        setRegisterSenha("");
        setConfirmSenha("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError('Erro ao tentar registrar. Tente novamente.');
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">

        {/* Coluna esquerda */}
        <Col md={6} className="d-none d-md-flex flex-column justify-content-center align-items-center login-left">
          <div className="text-white text-start p-5">
            <img
              src="/vestlink_logo.png"
              alt="VestLink Logo"
              className="login-logo mb-4"
            />
            <blockquote className="login-quote">
              <p className="fs-5">
                “A plataforma que transformou minha preparação para o ENEM.
                Os cronogramas de estudo personalizados e a busca inteligente
                de materiais são incríveis!”
              </p>
              <footer className="blockquote-footer text-white mt-2">
                Sofia, Estudante Aprovada
              </footer>
            </blockquote>
          </div>
        </Col>

        {/* Coluna direita */}
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center login-right">
          <Card className="p-4 shadow-lg rounded-4 w-75">
            <h2 className="text-center mb-4">
              {isRegistering ? "Cadastre-se" : "Bem-vindo de volta!"}
            </h2>
            <p className="text-center text-muted">
              {isRegistering
                ? "Crie sua conta para começar"
                : "Entre com seus dados para continuar"}
            </p>

            {error && <p className="text-danger text-center">{error}</p>}

            {isRegistering ? (
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerSenha}
                    onChange={(e) => setRegisterSenha(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Cadastrar
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Entrar
                </Button>
              </Form>
            )}

            <p className="text-center mt-3 small text-muted">
              {isRegistering ? "Já tem uma conta? " : "Não tem uma conta? "}
              <a href="#" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Faça login" : "Cadastre-se"}
              </a>
            </p>
            <p className="text-center mt-3 small text-muted">
              Ao continuar, você concorda com nossos{" "}
              <a href="#">Termos de Serviço</a> e{" "}
              <a href="#">Política de Privacidade</a>.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;