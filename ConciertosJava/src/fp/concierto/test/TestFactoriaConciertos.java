package fp.concierto.test;

import fp.concierto.Conciertos;
import fp.concierto.FactoriaConciertos;

public class TestFactoriaConciertos {

	public static void main(String[] args) {
		testCreacionConciertos();
	}

	private static void testCreacionConciertos() {
		System.out.println("TEST Conciertos");
		try {
			Conciertos res = FactoriaConciertos.leerConciertos("data/rock.csv");
			System.out.println("  Conciertos:" + res.getNumeroConciertos());
			System.out.println("  Conciertos:" + res);
		} catch(Exception e) {
			System.out.println("Excepción capturada:\n  " + e);
		}
		
	}
	

}
