-- Definimos el submódulo Jugador contra Entorno // Difícil
module TicTacToe.JcE_D
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
, ia 
, muestraArbol
, posiblesTableros
, construyeArbol
, valores
, maximiza
, minimiza
, poda
, seleccionaTablero
, jugadaIA
) where

{-# OPTIONS_GHC -Wno-incomplete-patterns #-}
import Data.List
import System.IO
import System.Random

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

continuaJuego :: Tablero -> Bool
continuaJuego (Tab xs os)
    | null (posicionesLibres (Tab xs os)) = False
    | otherwise = True

--Devuelve True si el jugador X o el jugador O consigue una de las combinaciones ganadoras
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

--muestra una linea
muestraLinea :: Tablero -> [Pos] -> String
muestraLinea t = intercalate "|" . map (muestraPosicion t)

--muestra el tablero completo
muestraTablero :: Tablero -> String
muestraTablero t =
    muestraLinea t [1..3] ++ "\n-+-+-\n" ++
    muestraLinea t [4..6] ++ "\n-+-+-\n" ++
    muestraLinea t [7..9]


-- Implementamos la IA mediante el algoritmo Minimax, optimizado mediante poda
-- Creamos el dato Arbol / Estrán compuestos por una Etiqueta<Integer> seguido de una lista con sus hijos
data Arbol a = Etiqueta a [Arbol a]

-- Convertimos los arboles a string mediante show para poder visualizarlos
-- muestraArbol (Etiqueta 1 [Etiqueta 2 [Etiqueta 4 []], Etiqueta 3 []])

instance Show a => Show (Arbol a) where
  show = muestraArbol


muestraArbol :: Show a => Arbol a -> [Char]
muestraArbol (Etiqueta x xs) =
    show x ++ '\n' : (unlines . map ("--"++) . concatMap (lines . show)) xs


-- Elaboramos todas las combinaciones posibles con el tablero actual
posiblesTableros :: Tablero -> [Tablero]
posiblesTableros t
    | tieneGanador t = []
    | otherwise      = map (ponerFicha t) (posicionesLibres t)


-- Se forman arboles con todas las variantes posibles de la partida
construyeArbol :: Tablero -> Arbol Tablero
construyeArbol t = Etiqueta t (map construyeArbol (posiblesTableros t))


-- Para optimizar la jugada asignaremos un valor a cada tablero, esto se hará mediante el tipo definido "Valor" y las funciones maximiza y minimiza
type Valor = Int

valores :: [Arbol (Valor,Tablero)] -> [Valor]
valores vts = [v | Etiqueta (v,_) _ <- vts]

-- Ambas funciones son parte del algoritmo Minimax, algoritmo imprescindible para la elaboración de una IA competente en TicTacToe
-- Cargará el nivel del arbol con los posibles movimientos de la IA / estos "maximizan" su utilidad
maximiza :: Arbol Tablero -> Arbol (Valor,Tablero)
maximiza (Etiqueta t ts) = case ts of 
    [] -> if tieneGanador t then Etiqueta (-1,t) [] else Etiqueta (0,t) []
    _ ->  Etiqueta (maximum (valores vts),t) vts
        where vts = map minimiza ts

-- Cargará el nivel del arbol con los posibles movimientos del contrincante/ estos "minimizan" su utilidad
minimiza :: Arbol Tablero -> Arbol (Valor,Tablero)
minimiza (Etiqueta t ts) = case ts of
    [] -> if tieneGanador t then Etiqueta (1,t) [] else Etiqueta (0,t) []
    _ -> Etiqueta (minimum (valores vts),t) vts
        where vts = map maximiza ts

-- Es necesario aplicar un algoritmo de optimización para poder simplificar el arbol// El programa comienza a ser mas lento cuanto mayor sea el arbol 
poda :: Int -> Arbol a -> Arbol a
poda 0 (Etiqueta x as) = Etiqueta x []
poda n (Etiqueta x as) = Etiqueta x (map (poda (n-1)) as)

-- Seleccionamos el tablero óptimo que marcará la siguiente jugada
seleccionaTablero :: Arbol (Valor,Tablero) -> Tablero
seleccionaTablero (Etiqueta (v,_) ts) = head [t | Etiqueta (v',t) _ <- ts, v'==v]

-- La ia realiza su jugada // podamos por el nivel numero 4
jugadaIA :: Tablero -> Tablero
jugadaIA = seleccionaTablero . maximiza . poda 4 . construyeArbol

main :: IO ()
main = do
  hSetBuffering stdout NoBuffering
  putStrLn "Tres en raya"
  putStrLn (muestraTablero tableroInicial) 
  putStr "¿Desea ser la primera jugada? (s/n) "
  l <- getLine
  if head l `elem` "sS"
     then jugador1 tableroInicial
     else ia tableroInicial


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
             else ia t'


ia :: Tablero -> IO ()
ia t = do
  putStrLn "\nMi jugada:"     
  let t' = jugadaIA t 
  putStrLn (muestraTablero t')
  if tieneGanador t' 
     then putStrLn "Gana la IA"
     else if not (continuaJuego t') 
             then putStrLn "Empate."
             else jugador1 t'
            







