# Práctica 9: Ejercicios - PE103
Alumno: Carlos Javier Delgado Hernandez  
Correo: alu0101016054@ull.edu.es
# Ejemplo de uso:
## Implemente un programa que muestre por pantalla los nombre de los archivos almacenados en un directorio en concreto.

````typescript
[~/P9_Ejer_PE103()]$node dist/main.js list --directory="dir"
dir:
- file1.txt
- file2.txt
- file3.txt
````

## Muestre por pantalla el contenido de todos los archivos almacenados en el mismo. Por cada fichero, muestre también el número de lineas, palabras y caracteres.
````typescript
[~/P9_Ejer_PE103()]$node dist/main.js show --directory="dir"
dir:
file1.txt content:
Text1 file

file2.txt content:
text 2 file test
adasdas
asdasdasd
asdasdasdad

file3.txt content:
text 3 test amazing
hello

File file2.txt has 3 lines
File file2.txt has 7 words
File file2.txt has 46 characters

File file1.txt has 0 lines
File file1.txt has 2 words
File file1.txt has 10 characters

File file3.txt has 1 lines
File file3.txt has 5 words
File file3.txt has 25 characters
````

## Muestre por pantalla aquel fichero que contiene más caracteres.
````typescript
[~/P9_Ejer_PE103()]$node dist/main.js get --directory="dir"
File with higher characters from dir is file2.txt with 46 characters
````