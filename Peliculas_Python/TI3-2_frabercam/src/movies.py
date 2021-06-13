#-*- encoding:utf-8 -*-
'''
Created on 1 nov. 2020

@author: frabercam
'''
from collections import namedtuple
import csv

#------------------------- Bloque 1 -------------------------
Registro = namedtuple("Registro","movie_name,genre,year,timeMin,imdb,metascore,votes,us_grossMillions")

def lectura_fichero(fichero):
    with open(fichero, 'r', encoding='utf-8') as f:
        lector = csv.reader(f,delimiter=";")
        next(lector)
        lista=[]
        for movie_name,genre,year,timeMin,imdb,metascore,votes,us_grossMillions in lector:
            tupla=Registro(movie_name,genre,int(year),int(timeMin),
                           int(imdb),int(metascore),int(votes),int(us_grossMillions))                            
            lista.append(tupla)
    return lista

#------------------------- Bloque 2 -------------------------
"""
b.- Obtener un conjunto con alguno de los campos.
    Muestra el conjunto de todas las películas registradas.
"""

def mostrar_cartelera_registros(registros):
    return set(e.movie_name for e in registros)
        
"""
d.- Obtener una lista con dos o tres de los campos de cada registro
    en los que otro campo cumple determinada condición.
    La función devuelve una lista de tuplas con las películas junto su género y duración
    de un determinado año.
"""

def mostrar_peliculas_por_año(registros,año):
    return list(((e.movie_name,e.genre,e.timeMin) for e in registros if e.year==año))
    
#------------------------- Bloque 3 -------------------------
"""
a.- Calcular la suma de alguna propiedad numérica de los registros que cumplan determinada condición.
    Muestra por pantalla el número de votos totales para las películas catalogadas por el mismo imdb.
"""

def suma_votos_imdb(registros,imdb=81):
    aux = ((e.votes) for e in registros if e.imdb==imdb)
    res = sum(aux)
    return res
   
"""
e.-  Cualquier otro que al alumno se le ocurra relacionado con los tipos de este bloque.
     Devuelve la valoración media del us_grossMillions de un año, en caso de no seleccionar ningún año
     devolverá la media del año más reciente del csv (2019).
"""

def media_por_año(registros,año=2019):
    suma = sum(e.us_grossMillions for e in registros if e.year == año)
    lonj = len([e.movie_name for e in registros if e.year == año])
    res = suma/lonj
    return res

#------------------------- Bloque 4 -------------------------
"""
a.-  Obtener el registro (o algunos campos del registro) que contiene el valor máximo o mínimo de un campo determinado.
     Muestra la(s) película(s) de menor duración junto a su valoración de un año determinado.
"""

def pelicula_menor_duracion(registros,año):
    aux = [(e.timeMin) for e in registros if e.year==año]
    m = min(aux)
    return [(r.movie_name,r.metascore,r.timeMin) for r in registros if r.timeMin==m]
    

#------------------------- Bloque 5 -------------------------
"""
b.-  Obtener una lista de registros (o algunos campos del registro) ordenada con los n registros
     con mayor (o menor) valor en un campo determinado, de los registros que cumplen determinada condición.
     Donde “n” es un parámetro que debe recibir la función.
     Accedemos a las n películas con mayor registro de votos del cualquier año marcado como parámetro.     
"""

def mayores_votos_por_año(registros,año,n):
    res = [(e.movie_name,e.votes) for e in registros if e.year==año]
    return sorted(res, key=lambda x:x[1], reverse=True)[:n]

#------------------------- Bloque 6 -------------------------
"""
a.-  Obtener un diccionario que permita agrupar, los registros que cumplen determinada condición,
     por algún campo (clave). A cada clave se le hará corresponder una lista con los registros que
     contienen esa clave.
     Genera un diccionario que contiene como clave los distintos géneros o conjuntos de géneros de
     una película y asocia a ellos las películas como valores
"""

def peliculas_por_genero(registros):
    dicc = {}
    for e in registros:
        if e.genre in dicc:
            dicc[e.genre].append(e.movie_name)
        else:
            dicc[e.genre] = [e.movie_name]
    return dicc

"""
d.-  Obtener un diccionario que permita agrupar, los registros que cumplen determinada condición,
     por algún campo (clave) y que haga corresponder a cada clave una lista, con los “n” registros,
     ordenados de mayor a menor o de menor a mayor por algún campo que no sea la clave.
     Obtenemos todas las películas existentes en el csv mejor valoradas, mostrando las n primeras,
     serán imprimidas mostrando los años más actuales.
     La función cuenta con una función auxiliar para crear una lista con las peliculas y su valoración
     ordenadas de mayor a menor.
"""

def aux_años(registros,año):
    aux = list(((e.movie_name,e.metascore) for e in registros if e.year==año))
    res = sorted(aux, key=lambda x:x[1], reverse=True)
    return res 

def peliculas_valoradas_años(registros,n):
    dicc = {}
    order_annos = list((e.year for e in registros))
    order_annos.sort(reverse=True)
    for e in order_annos:
        dicc[e]=(aux_años(registros,e))
    ldicc = dicc.items()
    res = list(ldicc)
    return res[:n]
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

