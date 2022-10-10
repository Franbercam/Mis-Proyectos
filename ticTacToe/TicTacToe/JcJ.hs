-- Definimos el submódulo Jugador contra Jugador
module TicTacToe.JcJ
( tableroInicial
, turno
, ponerFicha
, elementoEnLista
, posicionesLibres
, continuaJuego
, tieneGanador
, muestraPosicion
, muestraLinea
, muestraTablero
, main
, jugador1
, jugador2 
) where

import Data.List
import System.IO

--Definimos Pos, Posiciones y Tablero
type Pos = Int
type Posiciones = [Pos]
data Tablero = Tab Posiciones Posiciones
                deriving Show


-- Definimos Tablero inicial
tableroInicial :: Tablero
tableroInicial = Tab [] []

--Turno de cada jugador: si es true es turno de X, si es false es turno de O
turno :: Tablero -> Bool
turno (Tab xs os) = length xs == length os

--Actualización de tablero al poner una ficha
ponerFicha :: Tablero -> Pos -> Tablero
ponerFicha (Tab xs os) p
                    | turno (Tab xs os) = Tab (p:xs) os
                    | otherwise         = Tab xs (p:os)

--Función auxiliar para comprobar si el elemento x esta contenido en la lista xs
elementoEnLista :: Eq a => [a] -> a -> Bool
elementoEnLista [] _ = False
elementoEnLista (x:xs) a
    | x == a    = True
    | otherwise = elementoEnLista xs a

--Función para comprobarlas posiciones libres que quedan en el tablero
posicionesLibres :: Tablero -> Posiciones
posicionesLibres (Tab xs os) = [x | x<-[1..9], not(elementoEnLista (xs++os) x)]

--Si continuaJuego = True el tablero aún no esta lleno y el juego sigue
continuaJuego :: Tablero -> Bool
continuaJuego t
    | null (posicionesLibres t) = False
    | otherwise = True

--Función para comprobar si hay un ganador. Devuelve True si el jugador X o el jugador O consigue una de las combinaciones ganadoras
tieneGanador :: Tablero -> Bool
tieneGanador (Tab xs os) = tieneLinea xs || tieneLinea os
    where tieneLinea ps = all (`elem` ps) [1,2,3] || all (`elem` ps) [4,5,6] || all (`elem` ps) [7,8,9] ||
                          all (`elem` ps) [1,4,7] || all (`elem` ps) [2,5,8] || all (`elem` ps) [3,6,9] ||
                          all (`elem` ps) [1,5,9] || all (`elem` ps) [3,5,7]

--Muestra X si la posición p esta en xs, O si esta en os y la propia p si la posición esta vacía
muestraPosicion :: Tablero -> Pos -> String
muestraPosicion (Tab xs os) p
    | p `elem` xs = "X"
    | p `elem` os = "O"
    | otherwise   = show p

--Función para mostrar una linea del tablero
muestraLinea :: Tablero -> [Pos] -> String
muestraLinea t = intercalate "|" . map (muestraPosicion t)

--muestra el tablero completo
muestraTablero :: Tablero -> String
muestraTablero t = 
    muestraLinea t [1..3] ++ "\n-+-+-\n" ++
    muestraLinea t [4..6] ++ "\n-+-+-\n" ++
    muestraLinea t [7..9]


main :: IO ()
main = do
  hSetBuffering stdout NoBuffering
  putStrLn "Tres en raya"
  putStrLn (muestraTablero tableroInicial) 
  putStr "Comienza jugador 1 (j1 -> X // j2 -> 0)"  
  jugador1 tableroInicial
      

jugador1 :: Tablero -> IO ()
jugador1 t = do 
  putStr "\nJugador1, indica el lugar donde colocar la ficha: "
  l <- getLine
  let t' = ponerFicha t (read l :: Pos)
  putStrLn (muestraTablero t')
  if tieneGanador t'
     then putStrLn "Ha ganado el jugador 1."               
     else if not(continuaJuego t') 
             then putStrLn "Empate."
             else jugador2 t'

jugador2 :: Tablero -> IO ()
jugador2 t = do 
  putStr "\nJugador 2, indica el lugar donde colocar la ficha: "
  l <- getLine
  let t' = ponerFicha t (read l :: Pos)
  putStrLn (muestraTablero t')
  if tieneGanador t'
     then putStrLn "Ha ganado el jugador 2."
     else if not(continuaJuego t')
             then putStrLn "Empate."
             else jugador1 t'
