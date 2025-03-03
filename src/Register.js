import React, { useState } from "react";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError
} from "./elementos/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./componentes/Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);
  const [error, setError] = useState("");

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,12}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      cambiarPassword2({
        ...password2,
        valido: password.campo === password2.campo ? "true" : "false"
      });
    }
  };

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      try {
        await createUserWithEmailAndPassword(auth, correo.campo, password.campo);
        cambiarFormularioValido(true);
        alert("Usuario registrado con éxito");
        navigate("/login"); // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error("Error al registrar:", error.message);
        setError(error.message);
        cambiarFormularioValido(false);
      }
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario onSubmit={onSubmit}>
        <h2>Registro</h2>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          tipo="text"
          label="Usuario"
          placeholder="john123"
          name="usuario"
          leyendaError="Debe tener entre 4 y 16 caracteres."
          expresionRegular={expresiones.usuario}
        />
        <Input
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="John Doe"
          name="nombre"
          leyendaError="Solo letras y espacios."
          expresionRegular={expresiones.nombre}
        />
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          name="password"
          leyendaError="Debe tener entre 4 y 12 caracteres."
          expresionRegular={expresiones.password}
        />
        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Repetir Contraseña"
          name="password2"
          leyendaError="Deben coincidir."
          funcion={validarPassword2}
        />
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo Electrónico"
          placeholder="john@correo.com"
          name="correo"
          leyendaError="Correo no válido."
          expresionRegular={expresiones.correo}
        />
        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Teléfono"
          placeholder="4491234567"
          name="telefono"
          leyendaError="Solo números, entre 7 y 14 dígitos."
          expresionRegular={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input type="checkbox" checked={terminos} onChange={onChangeTerminos} />
            Acepto los Términos y Condiciones
          </Label>
        </ContenedorTerminos>

        {formularioValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Completa correctamente el formulario.
            </p>
          </MensajeError>
        )}

        {error && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> {error}
            </p>
          </MensajeError>
        )}

        <ContenedorBotonCentrado>
          <Boton type="submit">Registrarse</Boton>
          {formularioValido === true && <MensajeExito>¡Registro exitoso!</MensajeExito>}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default Register;
