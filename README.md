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
**Driver:** Abril Saro Arteaga · **Navigator:** Diego Gerardo Cardoso Gómez
- **RED:** La prueba "crea una tarea pendiente con id y título" fallaba porque crearTarea() lanzaba un error en lugar de devolver un objeto.
- **GREEN:** Hice que devolviera { id, titulo, completada: false }.
- - **REFACTOR:** No hizo falta cambiar nada.

### Misión 3 · agregarTarea()
**Driver:** Diego Gerardo Cardoso Gómez · **Navigator:** Abril Saro Arteaga
- **RED:** Escribimos dos pruebas para `agregarTarea`: una que verifica que se agregue la tarea y otra que comprueba la inmutabilidad. Fallaron porque la función aún lanzaba un error (`throw new Error`).
- **GREEN:** El cambio mínimo fue implementar la función usando el operador spread: `return [...tareas, nuevaTarea];`. Al ejecutar `npm test`, ambas pruebas pasaron.
- **REFACTOR:** No hubo necesidad de refactorizar el código, ya que el operador spread es la forma más limpia, moderna y declarativa de crear un nuevo array sin mutar el original.

### Misión 4 · buscarTarea()
**Driver:** Abril Saro Arteaga · **Navigator:** Diego Gerardo Cardoso Gómez
- **RED:** Escribí dos pruebas, una con id existente y otra con id inexistente. Fallaron porque buscarTarea() lanzaba un error.
- **GREEN:** Usé find() para devolver la tarea cuyo id coincide. Si no hay coincidencia, find() devuelve undefined.
- **REFACTOR:** El código ya era mínimo, así que no hizo falta cambiar nada.

### Misión 5 · obtenerPendientes() y obtenerTerminadas()
**Driver:** Diego Gerardo Cardoso Gómez · **Navigator:** Abril Saro Arteaga
- **RED:** Escribimos tres pruebas: una con colección mixta (para verificar que separa correctamente), una sin coincidencias y una con colección vacía. Fallaron porque las funciones `obtenerPendientes` y `obtenerTerminadas` aún no estaban implementadas.
- **GREEN:** Implementamos ambas funciones usando `filter()`. La función `obtenerPendientes` filtra las tareas donde `!tarea.completada` es verdadero, y `obtenerTerminadas` filtra donde `tarea.completada` es verdadero. Al correr `npm test`, todas las pruebas pasaron.
- **REFACTOR:** No fue necesario refactorizar. `filter()` expresa perfectamente la intención de seleccionar un subconjunto sin mutar el array original, y el código quedó muy legible.

### Misión 6 · cambiarEstado()
**Driver:** Abril Saro Arteaga · **Navigator:** Diego Gerardo Cardoso Gómez
- **RED:** Escribí pruebas para el cambio correcto, otra tarea intacta, id inexistente y no mutación. Fallaron porque cambiarEstado() lanzaba un error.
- **GREEN:** Usé map() y spread para devolver una nueva colección donde solo la tarea con ese id tiene completada invertida.
- **REFACTOR:** El código ya era mínimo, así que no hizo falta cambiar nada.

### Misión 7 · eliminarTarea()
**Driver:** Diego Gerardo Cardoso Gómez · **Navigator:** Abril Saro Arteaga
- **RED:** Escribimos tres pruebas: eliminar un id existente, un id inexistente y una colección vacía. Fallaron porque `eliminarTarea()` aún no estaba implementada.
- **GREEN:** Implementamos la función usando `filter()` con la condición `tarea.id !== id`, lo que significa "conservar todos excepto el indicado". No usamos `splice` porque mutaría el array original.
- **REFACTOR:** No fue necesario refactorizar. `filter()` expresa perfectamente la intención de la operación y mantiene la inmutabilidad.

### Misión 8 · obtenerResumen()
**Driver:** Abril Saro Arteaga · **Navigator:** Diego Gerardo Cardoso Gómez
- **RED:** Escribí pruebas con colección mixta, vacía y toda terminada. Fallaron porque obtenerResumen() lanzaba un error.
- **GREEN:** Devolví un objeto con el total y las cantidades de pendientes y terminadas.
- **REFACTOR:** Reutilicé obtenerPendientes() y obtenerTerminadas() de la Misión 5 en lugar de repetir la lógica del filtrado.

### Misión 9 · Integrar con la interfaz
**Driver:** Diego Gerardo Cardoso Gómez · **Navigator:** Abril Saro Arteaga
- **RED:** No aplica para esta misión (las pruebas unitarias ya estaban en verde). En su lugar, realizamos pruebas de integración manuales en el navegador.
- **GREEN:** Conectamos `app.js` con las funciones de `taskService.js`. Ahora el DOM actúa como un adaptador: lee los eventos (submit, click), delega la lógica (agregar, cambiar estado, eliminar) y vuelve a renderizar el resultado sin mezclar reglas de negocio.
- **REFACTOR:** Eliminamos el uso de strings y el `splice` en `app.js`. Ahora todo el flujo de datos pasa por el servicio, lo que hace la aplicación mucho más mantenible.

**Pruebas de integración manual (exitosas):**
1. Alta válida: Aparece una nueva tarea pendiente y cambia el resumen.
2. Alta inválida: Se muestra mensaje de error y no se agrega.
3. Cambio de estado: Se tacha la tarea y cambia el resumen.
4. Filtro: Se muestran solo las tareas correspondientes (Pendientes/Terminadas).
5. Eliminar: Desaparece la tarea y se actualiza el resumen.
