import Data.List
import System.IO
import System.Random

import qualified TicTacToe.JcE_F as JcE_F
import qualified TicTacToe.JcE_D as JcE_D
import qualified TicTacToe.JcJ as JcJ

-- La función main será la encargada de seleccionar y ejecutar el modo de juego seleccionado

ticTacToe :: IO ()
ticTacToe = do
  hSetBuffering stdout NoBuffering
  putStrLn "Seleccione un modo de juego -> JcJ / JcE"
  l <- getLine
  if l =="JcJ"
     then JcJ.main
     else (if l == "JcE" then putStrLn "Seleccione una dificultad -> Facil / Dificil" else putStrLn "Modo de juego no valido" )
  f<-getLine
  if f == "Facil"
     then JcE_F.main
     else (if f == "Dificil" then JcE_D.main  else putStrLn "Modo de juego no valido" )
