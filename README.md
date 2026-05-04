# CloudinaryAssetAPI
A Node.js API to fetch and serve image assets from specific Cloudinary folders


Los archivos estan llegando dentro de un array al llamar a `form.parse` de formidable. Para normalizarlo se llama a una utilidad que extrae el primer elemento. 


*Entrada* 
```JSON
fields  { dogName: [ 'Pepe' ], description: [ 'Perro muy timido' ] }
```

*Salida*
```JSON
norm  { dogName: 'Pepe', description: 'Perro muy timido' }
```


