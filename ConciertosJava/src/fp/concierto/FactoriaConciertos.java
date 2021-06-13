package fp.concierto;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.stream.Stream;

import fp.utiles.Checkers;




public class FactoriaConciertos {

		public static Conciertos leerConciertos (String fichero) {
			Conciertos res = null;
			try {
				Stream<Concierto> st = Files.lines(Paths.get(fichero))
						.skip(1)
						.map(FactoriaConciertos::parsearConcierto);
				res = new Conciertos(st);
			}
			catch(IOException e) {
				System.out.println("El fichero no se ha encontrado " + fichero);
				e.printStackTrace();
			}
			return res;

		}
			
		private static Concierto parsearConcierto(String linea) {
			String [] trozos= linea.split(";");
			Checkers.check("La cadena no se trocea bien", trozos.length==10);				
			String nombreGrupo = trozos[0].trim();
			String ciudad = trozos[1].trim();				
			TipoGuitarra tipoGuitarra = TipoGuitarra.valueOf((trozos[2].trim()));				
			String album = trozos[3].trim();		
			Integer espectadores = Integer.valueOf(trozos[4].trim());				
			Double precioEntrada = Double.valueOf(trozos[5].trim());				
			TipoRock tipoRock = TipoRock.valueOf((trozos[6].trim()));				
			LocalDate fecha = LocalDate.parse(trozos[7].trim(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
			LocalTime hora = LocalTime.parse(trozos[8].trim(),DateTimeFormatter.ofPattern("HH:mm"));				
			Boolean esBenefico = Boolean.valueOf(trozos[9].trim());						
			return new Concierto(nombreGrupo,ciudad,tipoGuitarra,album,espectadores,
					precioEntrada,tipoRock,fecha,hora,esBenefico);
		}
		

}
