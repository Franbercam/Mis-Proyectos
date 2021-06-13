package fp.concierto;

import java.time.LocalDate;
import java.time.LocalTime;

import fp.utiles.Checkers;

public class Concierto {
	private String nombreGrupo;
	private String ciudad;
	private TipoGuitarra tipoGuitarra;
	private String album;
	private Integer espectadores;
	private Double precioEntrada;
	private TipoRock tipoRock;
	private LocalDate fecha;
	private LocalTime hora;
	private Boolean esBenefico;
	
	
	public Double getPrecioEntrada() {
		return precioEntrada;
	}
	public void setPrecioEntrada(Double precioEntrada) {
		Checkers.checkNoNull(precioEntrada);
		this.precioEntrada = precioEntrada;
	}
	public LocalDate getFecha() {
		return fecha;
	}
	public void setFecha(LocalDate fecha) {
		Checkers.checkNoNull(fecha);
		this.fecha = fecha;
	}
	public LocalTime getHora() {
		return hora;
	}
	public void setHora(LocalTime hora) {
		Checkers.checkNoNull(hora);
		this.hora = hora;
	}
	public String getNombreGrupo() {
		return nombreGrupo;
	}
	public String getCiudad() {
		return ciudad;
	}
	public TipoGuitarra getTipoGuitarra() {
		return tipoGuitarra;
	}
	public String getAlbum() {
		return album;
	}
	public Integer getEspectadores() {
		return espectadores;
	}
	public TipoRock getTipoRock() {
		return tipoRock;
	}
	public Boolean getEsBenefico() {
		return esBenefico;
	}


	public Concierto(String nombreGrupo, String ciudad, TipoGuitarra tipoGuitarra, String album, Integer espectadores,
			Double precioEntrada, TipoRock tipoRock, LocalDate fecha, LocalTime hora, Boolean esBenefico) {
		Checkers.checkNoNull(nombreGrupo);
		Checkers.checkNoNull(fecha);
		Checkers.checkNoNull(hora);
		Checkers.checkNoNull(esBenefico);
		this.nombreGrupo = nombreGrupo;
		this.ciudad = ciudad;
		this.tipoGuitarra = tipoGuitarra;
		this.album = album;
		this.espectadores = espectadores;
		this.precioEntrada = precioEntrada;		
		Checkers.check("El precio de los conciertos benéficos debe ser"
				+ " igual o superior a 5€",(this.esBenefico == Boolean.FALSE || this.precioEntrada>=5.0));			
		this.tipoRock = tipoRock;
		this.fecha = fecha;
		Checkers.check("Ningún concierto podrá estar fechado mas tarde que el 31/12/2022.",
				this.fecha.isBefore(LocalDate.of(2022,12,31)));
		this.hora = hora;
		Checkers.check("Todo concierto deberá comenzar posterior a las 14:00 PM.",
				this.hora.isAfter(LocalTime.of(14,00)));
		this.esBenefico = esBenefico;
	}


	public Concierto(String nombreGrupo, String ciudad, TipoGuitarra tipoGuitarra, String album, Integer espectadores,
			TipoRock tipoRock, LocalDate fecha, LocalTime hora, Boolean esBenefico) {
		Checkers.checkNoNull(nombreGrupo);
		Checkers.checkNoNull(fecha);
		Checkers.checkNoNull(hora);
		Checkers.checkNoNull(esBenefico);
		this.nombreGrupo = nombreGrupo;
		this.ciudad = ciudad;
		this.tipoGuitarra = tipoGuitarra;
		this.album = album;
		this.espectadores = espectadores;
		this.tipoRock = tipoRock;
		this.fecha = fecha;
		Checkers.check("Ningún concierto podrá estar fechado mas tarde que el 31/12/2022.",
				this.fecha.isBefore(LocalDate.of(2022,12,31)));
		this.hora = hora;
		Checkers.check("Todo concierto deberá comenzar posterior a las 14:00 PM.",
				this.hora.isAfter(LocalTime.of(14,00)));
		this.esBenefico = esBenefico;
		if (this.esBenefico == Boolean.TRUE) {
			this.precioEntrada = 25.00;
		}
		else {
			throw new IllegalArgumentException("Debe añadir un valor al precio de entrada");
		}
	}
	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fecha == null) ? 0 : fecha.hashCode());
		result = prime * result + ((hora == null) ? 0 : hora.hashCode());
		result = prime * result + ((nombreGrupo == null) ? 0 : nombreGrupo.hashCode());
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
		Concierto other = (Concierto) obj;
		if (fecha == null) {
			if (other.fecha != null)
				return false;
		} else if (!fecha.equals(other.fecha))
			return false;
		if (hora == null) {
			if (other.hora != null)
				return false;
		} else if (!hora.equals(other.hora))
			return false;
		if (nombreGrupo == null) {
			if (other.nombreGrupo != null)
				return false;
		} else if (!nombreGrupo.equals(other.nombreGrupo))
			return false;
		return true;
	}
	
	
	public int compareTo(Concierto o) {
		int res=this.getFecha().compareTo(o.getFecha());
		if (res==0) {
			res=this.getHora().compareTo(o.getHora());
			if(res==0) {
				res=this.getNombreGrupo().compareTo(o.getNombreGrupo());
			}
		}
		return res;
	}

	
	@Override
	public String toString() {
		return  nombreGrupo + ", Álbum elegido: " + album + ", Fechado en " + fecha + " / " + hora
				+ ", Entrada por " + precioEntrada + "€" + ", Fines no lucrativos = " + esBenefico;
	}
		
	
}
