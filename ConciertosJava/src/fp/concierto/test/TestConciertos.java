package fp.concierto.test;

import java.time.LocalDate;

import fp.concierto.Conciertos;
import fp.concierto.FactoriaConciertos;
import fp.concierto.TipoGuitarra;
import fp.concierto.TipoRock;

public class TestConciertos {

	public static void main(String[] args) {
		
//		testNumeroConciertosRock(TipoRock.POP_ROCK);
//		testExisteConciertoEnCiudad("Sevilla");
//		testNumeroEspectadoresCiudad("Barcelona");
//		testMediaPrecioEntradaPorFecha(LocalDate.of(2016,9,14));
//		testListaConciertoPorGuitarra(TipoGuitarra.FENDER_TELECASTER, 3);
//		testCalcularRockPredominanteDeCiudad("Córdoba");
//		testCalcularPromedioEspectadoresPorCiudadDeUnTipoRock(TipoRock.HARD_ROCK);
//		testListaNCiudadesMenorNumeroPromedioEspectadorese(5);
//		TestConciertoMasBaratoPeriodoTiempo(LocalDate.of(2014,9,1),LocalDate.of(2020,9,30));
//		TestModificarValorConciertosBeneficosGrupo(19.53,"AC/DC");

	}
	
	private static void testNumeroConciertosRock(TipoRock c) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("El número de conciertos de " + c + " es: " + conciertos.numeroConciertosRock(c));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}			
	}
	
	
	private static void testExisteConciertoEnCiudad(String c) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("Busqueda de concierto. \n"
					+"true --> Existe concierto. \n"
					+ "false --> No existe concierto. \n"
					+ "Resultado de la busqueda: " + conciertos.existeConciertoEnCiudad(c));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}				

	}
	
	
	private static void testNumeroEspectadoresCiudad(String c) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("El número de espectadores totales en\s" + c + "\ses: " + conciertos.numeroEspectadoresCiudad(c));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}				
	}
	
	
	private static void testMediaPrecioEntradaPorFecha(LocalDate d) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("Valor medio de entrada del dia " + d + ": " + conciertos.mediaPrecioEntradaPorFecha(d));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}	
	}
	
	
	private static void testListaConciertoPorGuitarra(TipoGuitarra g, Integer n) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("Los " + n + " conciertos donde usarán " + " son:\n" + conciertos.listaConciertoPorGuitarra(g, n));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}
	}
	
	
	private static void testCalcularRockPredominanteDeCiudad(String c) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("El rock que predomina en la ciudad de "+ c +" es: " + conciertos.calcularRockPredominanteDeCiudad(c));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}				
	}
	
	
	private static void testCalcularPromedioEspectadoresPorCiudadDeUnTipoRock(TipoRock r) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("La media de espectadores por ciudades del tipo "+ r +" es:");
			System.out.println(conciertos.calcularPromedioEspectadoresPorCiudadDeUnTipoRock(r));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}		
	}
	
	
	private static void testListaNCiudadesMenorNumeroPromedioEspectadorese(Integer n) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("Las " + n + " ciudades con menor media de espectadores son: ");
			System.out.println(conciertos.listaNCiudadesMenorNumeroPromedioEspectadores(n));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}		
	}
	
	
	private static void TestConciertoMasBaratoPeriodoTiempo(LocalDate f1, LocalDate f2) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("El concierto benéfico mas barato es: " + conciertos.conciertoMasBaratoPeriodoTiempo(f1, f2));
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}		
	}
	
	
	private static void  TestModificarValorConciertosBeneficosGrupo(Double p, String n) {
		try {
			Conciertos conciertos = FactoriaConciertos.leerConciertos("data/rock.csv");
			conciertos.modificarValorConciertosBeneficosGrupo(p, n);
			System.out.println("El precio de la entrada de los conciertos benéficos de " + n + " ha sido modificado a " + p + "€");
				
		}
		catch(Exception e){
			System.out.println("Capturada la excepción"+e);
		}		
	}
	

}
