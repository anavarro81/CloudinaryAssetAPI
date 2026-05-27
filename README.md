# CloudinaryAssetAPI

A Node.js API to fetch and serve image assets from specific Cloudinary folders

Los archivos estan llegando dentro de un array al llamar a `form.parse` de formidable. Para normalizarlo se llama a una utilidad que extrae el primer elemento.

_Entrada_

```JSON
fields  { dogName: [ 'Pepe' ], description: [ 'Perro muy timido' ] }
```

_Salida_

```JSON
norm  { dogName: 'Pepe', description: 'Perro muy timido' }
```

## Subir imagenes a Cloudinary

- Se usa el endpoint: `/dogs/photos`

- Se usa _formidable_ para subir los archivos

- Los datos de texto (fields) pueden venir dentro de un array, por eso se llama `normalizeFields` para extraer
  esos datos en caso de que sea necesario.

## Borrado de ficheros temporales si no es correcto.

Es buena practica borrar los archivos temporales si no se pueden subir por tamaño o tipo.
Se usa la función `cleanupUploadedFiles(file)` para hacerlo
Se llama al método `fs.unlink` con el path del fichero


## Scripts

### Creación de usuarios

- Comando: `npm run seeds`
  Crea los usuarios por defecto "Antonio" y "Karlos" con los roles de "admin" y "editor" respectivamente.
