import React, { useState } from "react";
import {
  Formulario,
  Label,
  ContenedorBotonCentrado,
  Boton,
  MensajeError
} from "./elementos/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./componentes/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Login = () => {
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (correo.valido === "true" && password.valido === "true") {
      try {
        await signInWithEmailAndPassword(auth, correo.campo, password.campo);
        cambiarFormularioValido(true);
        alert("Inicio de sesión exitoso");
      } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        cambiarFormularioValido(false);
      }
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario onSubmit={onSubmit}>
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo Electrónico"
          placeholder="john@correo.com"
          name="correo"
          leyendaError="El correo debe ser válido."
          expresionRegular={expresiones.correo}
        />
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          name="password"
          leyendaError="La contraseña debe tener entre 4 y 12 caracteres."
          expresionRegular={expresiones.password}
        />

        {formularioValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Credenciales incorrectas o formulario inválido.
            </p>
          </MensajeError>
        )}

        <ContenedorBotonCentrado>
          <Boton type="submit">Iniciar Sesión</Boton>
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default Login;
