import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});

// MISIÓN 3: agrega al menos dos pruebas para agregarTarea().
describe("agregarTarea", () => {
  it("agrega una tarea a la colección", () => {
    const tareas = [crearTarea(1, "Tarea 1")];
    const nueva = crearTarea(2, "Tarea 2");
    const resultado = agregarTarea(tareas, nueva);
    expect(resultado).toHaveLength(2);
    expect(resultado).toContainEqual(nueva);
  });

  it("no modifica la colección original (inmutabilidad)", () => {
    const tareas = [crearTarea(1, "Tarea 1")];
    const original = [...tareas];
    agregarTarea(tareas, crearTarea(2, "Tarea 2"));
    expect(tareas).toEqual(original);
  });
});

// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
describe("buscarTarea", () => {
  const tareas = [
    { id: 1, titulo: "Revisar requisitos", completada: false },
    { id: 2, titulo: "Diseñar pruebas", completada: true }
  ];

  it("devuelve la tarea cuando el id existe", () => {
    // Act
    const resultado = buscarTarea(tareas, 2);

    // Assert
    expect(resultado).toEqual({ id: 2, titulo: "Diseñar pruebas", completada: true });
  });

  it("devuelve undefined cuando el id no existe", () => {
    // Act
    const resultado = buscarTarea(tareas, 99);

    // Assert
    expect(resultado).toBeUndefined();
  });
});

// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
describe("obtenerPendientes y obtenerTerminadas", () => {
  const pendiente = crearTarea(1, "Pendiente");
  const terminada = { ...crearTarea(2, "Terminada"), completada: true };
  const tareas = [pendiente, terminada];

  it("obtenerPendientes devuelve solo las no completadas", () => {
    expect(obtenerPendientes(tareas)).toEqual([pendiente]);
  });

  it("obtenerTerminadas devuelve solo las completadas", () => {
    expect(obtenerTerminadas(tareas)).toEqual([terminada]);
  });

  it("devuelve array vacío si no hay coincidencias", () => {
    expect(obtenerPendientes([])).toEqual([]);
    expect(obtenerTerminadas([pendiente])).toEqual([]);
  });
});

// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
describe("cambiarEstado", () => {
  const tareas = [
    { id: 1, titulo: "Revisar requisitos", completada: false },
    { id: 2, titulo: "Diseñar pruebas", completada: true }
  ];

  it("invierte el estado de la tarea indicada", () => {
    const resultado = cambiarEstado(tareas, 1);

    expect(resultado[0].completada).toBe(true);
  });

  it("deja intactas las demás tareas", () => {
    const resultado = cambiarEstado(tareas, 1);

    expect(resultado[1]).toEqual({ id: 2, titulo: "Diseñar pruebas", completada: true });
  });

  it("no modifica nada si el id no existe", () => {
    const resultado = cambiarEstado(tareas, 99);

    expect(resultado).toEqual(tareas);
  });

  it("no muta el arreglo original", () => {
    cambiarEstado(tareas, 1);

    expect(tareas[0].completada).toBe(false);
  });
});
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void agregarTarea;
void buscarTarea;
void obtenerPendientes;
void obtenerTerminadas;
void cambiarEstado;
void eliminarTarea;
void obtenerResumen;
