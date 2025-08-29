import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "aluno@email.com" && senha === "1234") {
      navigate("/dashboard");
    } else {
      setError("Email ou senha inválidos!");
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Coluna esquerda */}
        <Col md={6} className="d-none d-md-flex flex-column justify-content-center align-items-center login-left">
          <div className="text-white text-start p-5">
            <h3 className="mb-4">🎓 VestLink</h3>
            <blockquote>
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
            <h3 className="text-center mb-3">Acesse sua conta</h3>
            <p className="text-center text-muted">
              Entre com seus dados para continuar
            </p>

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

              {error && <p className="text-danger">{error}</p>}

              <Button variant="primary" type="submit" className="w-100">
                Entrar
              </Button>
            </Form>

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