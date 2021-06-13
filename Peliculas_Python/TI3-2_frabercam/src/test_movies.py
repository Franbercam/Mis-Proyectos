#-*- encoding:utf-8 -*-
'''
Created on 1 nov. 2020

@author: franb
'''
from movies import *

registros = (lectura_fichero("../data/moviesD.csv"))

"""
----------------- FUNCIÓN AUXILIAR -----------------
"""
"""
Las funciones "mostrar" se encargan de enumerar el contenido de las tuplas y mostrarlas con mayor legibilidad.
"""
def mostrar_tres_primeros():
    i=0
    val = registros[:3]
    for p in val:
        i=i+1
        print (i, p)
        
def mostrar_tres_ultimos():
    i=len(registros)-3
    val = registros[len(registros)-3:len(registros)]
    for p in val:
        i=i+1
        print (i, p)
        
def mostrar_numerado(coleccion):
    i=0
    for p in coleccion:
        i=i+1
        print (i, p) 

"""
----------------- FUNCIONES TEST -----------------
"""
def test_lectura_fichero():
    print("Total de archivos leídos:",len(registros))
    print('Primeros tres registros leídos: ')
    mostrar_tres_primeros()
    print('Ultimos tres registros leídos: ')
    mostrar_tres_ultimos()

def test_mostrar_cartelera_registros():
    print("Total de películas registradas:")
    mostrar_numerado(mostrar_cartelera_registros(registros))
    
def test_mostrar_peliculas_por_año(año):
    print("Películas del año",año,":")
    mostrar_numerado(mostrar_peliculas_por_año(registros,año))   

def test_suma_votos_imdb(imdb=81):   
    print("El número de votos para el imdb",imdb,"es",suma_votos_imdb(registros, imdb))
    
def test_media_por_año(anno=2019):
    res = []
    res.append(media_por_año(registros,anno))
    print("La valoración media del año",anno,"es",res)
    
def test_pelicula_menor_duracion(año):
    print("La(s) película(s) de menor duración del año",año,":")
    print("Nº----Nombre----Metascore----Duración(min)")
    mostrar_numerado(pelicula_menor_duracion(registros,año))
    
def test_mayores_votos_por_año(año,n):
    print("Top",n,"películas mas votadas por la audiencia del año",año)
    mostrar_numerado(mayores_votos_por_año(registros,año,n))
    
def test_peliculas_por_genero():
    obj = peliculas_por_genero(registros)
    res = (list(obj.items())[:5])
    print("Peliculas ordenadas por géneros:")
    mostrar_numerado(res)
       
def test_peliculas_valoradas_años(n):
    res = peliculas_valoradas_años(registros,n)
    print("Mejores películas por año:")    
    mostrar_numerado(res)
    
        
"""
----------------- PROGRAMA PRINCIPAL -----------------
"""

#test_lectura_fichero()
#test_mostrar_cartelera_registros()
#test_mostrar_peliculas_por_año(2019)
test_suma_votos_imdb(77)
#test_media_por_año(2001)
#test_pelicula_menor_duracion(2019)
#test_mayores_votos_por_año(2001,5)
#test_peliculas_por_genero()
#test_peliculas_valoradas_años(5)