import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN } from "../utils/constants";

export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.empresa) {
        return { ok: true, message: result.message };
      }
      return { ok: false, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function mostrarEmpresaApi(token, id) {
  const url = `${basePath}/${apiVersion}/empresa/${id}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function cargarCCApi(token, camara_comercio, empresaId) {
  const url = `${basePath}/${apiVersion}/cargar-cc/${empresaId}`;

  const formData = new FormData();
  formData.append("camara_comercio", camara_comercio, camara_comercio.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function cargarRutApi(token, rut, empresaId) {
  const url = `${basePath}/${apiVersion}/cargar-rut/${empresaId}`;

  const formData = new FormData();
  formData.append("rut", rut, rut.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function obtenerCCApi(camara_comercioName) {
  const url = `${basePath}/${apiVersion}/obtener-cc/${camara_comercioName}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(ACCESS_TOKEN),
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function obtenerRutApi(rutName) {
  const url = `${basePath}/${apiVersion}/obtener-rut/${rutName}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem(ACCESS_TOKEN),
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function actualizarEmpresaApi(token, empresa, empresaId) {
  const url = `${basePath}/${apiVersion}/actualizar-empresa/${empresaId}`;

  const params = {
    method: "PUT",
    body: JSON.stringify(empresa),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
