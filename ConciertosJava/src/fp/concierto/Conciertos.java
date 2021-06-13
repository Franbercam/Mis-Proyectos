package fp.concierto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


import fp.utiles.Checkers;

public class Conciertos {
	
	private Set<Concierto> conciertos;
	
	
	public Conciertos() {
		this.conciertos = new HashSet<Concierto>();
	}
	
	public Conciertos (Stream<Concierto> s){
		this.conciertos= s.collect(Collectors.toSet());
	}
	
	
	public void añadirConcierto(Concierto c) {
		Checkers.checkNoNull(c);
		this.conciertos.add(c);
	}

	
	public Integer getNumeroConciertos() {
		return conciertos.size();
	}
	

	@Override
	public String toString() {
		return "Conciertos [conciertos=" + conciertos + "]";
	}

	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((conciertos == null) ? 0 : conciertos.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Conciertos other = (Conciertos) obj;
		if (conciertos == null) {
			if (other.conciertos != null)
				return false;
		} else if (!conciertos.equals(other.conciertos))
			return false;
		return true;
	}
	
	
// --------------------- TRATAMIENTOS SECUENCIALES(I) ---------------------
	
	public Long numeroConciertosRock(TipoRock r) {
		return this.conciertos.stream()
				.filter(x -> x.getTipoRock().equals(r))
				.count();
	}
	
	
	public Boolean existeConciertoEnCiudad(String ciudad) {
		return this.conciertos.stream()
				.anyMatch(x -> x.getCiudad().equals(ciudad));
	}	
	
	
	public Integer numeroEspectadoresCiudad(String ciudad){
		return this.conciertos.stream()
				.filter(x -> x.getCiudad().equals(ciudad))
				.mapToInt(x -> x.getEspectadores())
				.sum();				
	}
	
	
	public Double mediaPrecioEntradaPorFecha(LocalDate m) {
		return this.conciertos.stream()
				.filter(x -> x.getFecha().equals(m))
				.mapToDouble(x -> x.getPrecioEntrada())
				.average()
				.orElse(0.0);
	}
	
	
	public List<Concierto> listaConciertoPorGuitarra(TipoGuitarra g, Integer n) {
		return this.conciertos.stream()
				.filter(x -> x.getTipoGuitarra().equals(g))
				.limit(n)
				.collect(Collectors.toList());											
	}

// --------------------- TRATAMIENTOS SECUENCIALES(II) ---------------------
	
	public TipoRock calcularRockPredominanteDeCiudad(String c) {
		return this.conciertos.stream()
				.filter(x -> x.getCiudad().equals(c))
				.collect(Collectors.groupingBy(Concierto::getTipoRock,Collectors.counting()))
				.entrySet().stream()
				.min(Comparator.comparing(x -> x.getValue()))
				.orElse(null)
				.getKey();
	}	
	
	
	public Map<String,Double> calcularPromedioEspectadoresPorCiudadDeUnTipoRock(TipoRock r) {
		return this.conciertos.stream()
				.filter(x -> x.getTipoRock().equals(r))
				.collect(Collectors.groupingBy(Concierto::getCiudad,
						Collectors.averagingDouble(Concierto::getEspectadores)));
	}
	
	
	public List<String> listaNCiudadesMenorNumeroPromedioEspectadores(Integer n) {
		return this.conciertos.stream()
				.collect(Collectors.groupingBy(Concierto::getCiudad,
						Collectors.averagingDouble(Concierto::getEspectadores)))  
				.entrySet().stream()											   
				.sorted(Comparator.comparing(x->x.getValue()))					   
				.limit(n)														   
				.map(x->x.getKey())											   
				.collect(Collectors.toList());									
	}
	
	
	public Concierto conciertoMasBaratoPeriodoTiempo(LocalDate f1, LocalDate f2) {
		return this.conciertos.stream()
				.filter(x->x.getFecha().isAfter(f1))
				.filter(x->x.getFecha().isBefore(f2))
				.min(Comparator.comparing(Concierto::getPrecioEntrada))
				.orElse(null);			
	}
	
	
	public void modificarValorConciertosBeneficosGrupo(Double p, String n){
		this.conciertos.stream()
		.filter(x->x.getEsBenefico().equals(Boolean.TRUE))
		.filter(x->x.getNombreGrupo().equals(n))
		.forEach(x->x.setPrecioEntrada(p));					
	}
	
	
	public List<Concierto> ayuda() {
		return this.conciertos.stream()
		.filter(x->x.getPrecioEntrada() > 25)
		.collect(Collectors.toList());
	}
	
	
}
