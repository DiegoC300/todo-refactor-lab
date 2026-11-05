# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código

Responde aquí:

1. **¿Dónde almacenarías ahora el estado `completada` de una tarea?**
   En una propiedad dentro de un objeto tarea. En lugar de ser solo un string, la tarea ahora es un objeto como `{ id: 1, titulo: "Diseñar pruebas", completada: false }`. El estado vive dentro del objeto de la tarea.

2. **¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?**
   Si usáramos strings, tendríamos que crear arrays paralelos o separar el texto con comas (lo cual es propenso a errores). Al usar objetos, simplemente agregamos nuevas propiedades al objeto (ej. `{ id, titulo, completada, prioridad, fecha }`) sin afectar el resto de la lógica. El modelo evoluciona sin romperse.

3. **¿Qué parte del código representa datos y qué parte representa interfaz?**
   - **Datos:** El array `tareas` y las propiedades de cada tarea (`id`, `titulo`, `completada`).
   - **Interfaz:** La función `mostrarTareas()`, el uso de `document.querySelector`, `lista.innerHTML` y la manipulación de elementos HTML.

4. **¿Qué comportamiento debemos conservar durante el refactor?**
   Debemos conservar las reglas de negocio y la funcionalidad visible: poder agregar una tarea, eliminarla, cambiar su estado (pendiente/terminada), filtrar la vista para mostrar solo un tipo de tareas y que el resumen (total, pendientes, terminadas) se actualice correctamente.

1. Al agregar una tarea con un título válido, esta debe aparecer en la lista y el total del resumen debe aumentar en 1.
2. Al marcar el estado de una tarea, su texto debe reflejar el cambio (ej. tacharse) y los contadores del resumen deben actualizarse.
3. Los filtros de "Pendientes" y "Terminadas" solo deben mostrar las tareas que correspondan a ese estado, ocultando el resto, sin eliminar los datos originales.
## Pair Programming

## Registro RED → GREEN → REFACTOR

### Misión 2 · crearTarea()
- **Driver:** Abril Saro Arteaga · **Navigator:** Diego Gerardo Cardoso Gómez
- **RED:** La prueba "crea una tarea pendiente con id y título" fallaba porque crearTarea() lanzaba un error en lugar de devolver un objeto.
- **GREEN:** Hice que devolviera { id, titulo, completada: false }.
### Misión 3 · agregarTarea()
**Driver:** Diego Gerardo Cardoso Gómez · **Navigator:** Abril Saro Arteaga

### Misión 3 · agregarTarea()
**Driver:** Diego Gerardo Cardoso Gómez · **Navigator:** Abril Saro Arteaga
- **RED:** Escribimos dos pruebas para `agregarTarea`: una que verifica que se agregue la tarea y otra que comprueba la inmutabilidad. Fallaron porque la función aún lanzaba un error (`throw new Error`).
- **GREEN:** El cambio mínimo fue implementar la función usando el operador spread: `return [...tareas, nuevaTarea];`. Al ejecutar `npm test`, ambas pruebas pasaron.
- **REFACTOR:** No hubo necesidad de refactorizar el código, ya que el operador spread es la forma más limpia, moderna y declarativa de crear un nuevo array sin mutar el original.
