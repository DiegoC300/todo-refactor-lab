/*
 * MISIÓN 9 · ADAPTADOR DE INTERFAZ
 *
 * El DOM debe leer eventos, delegar reglas al servicio y renderizar resultados.
 */
import {
  crearTarea, agregarTarea, buscarTarea,
  obtenerPendientes, obtenerTerminadas,
  cambiarEstado, eliminarTarea, obtenerResumen
} from './taskService.js';

// --- Estado de la aplicación (solo datos) ---
let tareas = [
  crearTarea(1, "Revisar requisitos"),
  crearTarea(2, "Diseñar pruebas"),
  crearTarea(3, "Refactorizar código")
];
let siguienteId = 4;
let filtro = "todas";

// --- Referencias al DOM ---
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filters = [...document.querySelectorAll("[data-filter]")];

// --- Render (solo pinta el estado) ---
function render() {
  let tareasVisibles = tareas;

  if (filtro === "pendientes") tareasVisibles = obtenerPendientes(tareas);
  else if (filtro === "terminadas") tareasVisibles = obtenerTerminadas(tareas);

  list.innerHTML = "";
  tareasVisibles.forEach(tarea => {
    const li = document.createElement("li");
    li.className = `task ${tarea.completada ? "done" : ""}`;
    li.innerHTML = `
      <span class="title">${tarea.titulo}</span>
      <span class="task-actions">
        <button data-toggle="${tarea.id}">${tarea.completada ? "Desmarcar" : "Marcar"}</button>
        <button data-delete="${tarea.id}">Eliminar</button>
      </span>`;
    list.appendChild(li);
  });

  const resumen = obtenerResumen(tareas);
  summary.textContent = `Total: ${resumen.total} | Pendientes: ${resumen.pendientes} | Terminadas: ${resumen.terminadas}`;
}

// --- Eventos (leen eventos y delegan al servicio) ---
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }
  const nueva = crearTarea(siguienteId++, titulo);
  tareas = agregarTarea(tareas, nueva);
  input.value = "";
  message.textContent = "";
  render();
});

list.addEventListener("click", (event) => {
  const idToggle = event.target.dataset.toggle;
  const idDelete = event.target.dataset.delete;

  if (idToggle) {
    tareas = cambiarEstado(tareas, Number(idToggle));
    render();
  } else if (idDelete) {
    tareas = eliminarTarea(tareas, Number(idDelete));
    render();
  }
});

filters.forEach(button => button.addEventListener("click", () => {
  filtro = button.dataset.filter;
  filters.forEach(b => b.classList.toggle("active", b === button));
  render();
}));

// Iniciar la app
render();
