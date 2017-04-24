package zohoInvoice;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

import util.Constantes;

public class GenerarCadenaZoho implements Callable {

	private static final String IGUAL = "=";
	private static final String Y = "&";
	private static final String MAIL = "EMAIL_ID";
	private static final String PASSWORD = "PASSWORD";

	private static final String TOKEN = "authtoken";
	private static final String ORGANIZATION_ID = "organization_id";
	private static final String JSON_STRING = "JSONString";

	@SuppressWarnings({ "unchecked" })
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		Map<String, String> map = (Map<String, String>) eventContext.getMessage().getPayload();
		String cadena = "";
		if (map.get(Constantes.ACTION).equals(Constantes.AUTHENTICATION)) {
			cadena = generarCadenaAutenticacion(map);
		} else if (map.get(Constantes.ACTION).equals(Constantes.CREATE_CUSTOMER)) {
			cadena = generarCadenaCrearCustomer(map);
		} else if (map.get(Constantes.ACTION).equals(Constantes.CREATE)) {
			cadena = generarCadenaCrear(map);
		}
		return cadena;
	}

	/**
	 * Método para obtener la cadena de la autenticación de zoho
	 * 
	 * @param map
	 * @return
	 */
	public String generarCadenaAutenticacion(Map<String, String> map) {
		String cadena = MAIL + IGUAL;
		cadena += map.get("mail") + Y;
		cadena += PASSWORD + IGUAL + map.get("pass");
		return cadena;
	}
	
	/**
	 * Método el cual construye la url pare crear un producto en zoho
	 * @param map
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String generarCadenaCrear(Map<String, String> map) throws UnsupportedEncodingException {
		String cadena = TOKEN + IGUAL + map.get("token") + Y;
		cadena += ORGANIZATION_ID + IGUAL + map.get("organization") + Y;
		cadena += JSON_STRING + IGUAL;		
		String cadenaPrincipal = cadena;
		// contruirmos el json
		cadena = "{\"name\":\"" + map.get("name") + "\","
				+ "\"rate\":\"" + map.get("rate") + "\","
				+ "\"description\":\"" + map.get("description") + "\","
				+ "\"sku\":\"" + map.get("sku") + "\","
				+ "\"product_type\":\"" + map.get("product_type") + "\"}";
		cadena = URLEncoder.encode(cadena, "UTF-8");
		cadena = cadenaPrincipal + cadena;
		return cadena;
	}
	
	/**
	 * Método el cual contruye la cadena para crear un cliente en zoho
	 * @param map
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String generarCadenaCrearCustomer(Map<String, String> map) throws UnsupportedEncodingException {
		String cadena = TOKEN + IGUAL + map.get("token") + Y;
		cadena += ORGANIZATION_ID + IGUAL + map.get("organization") + Y;
		cadena += JSON_STRING + IGUAL;		
		String cadenaPrincipal = cadena;
		// contruirmos el json
		cadena = map.get(Constantes.VALUE);		
		cadena = URLEncoder.encode(cadena, "UTF-8");
		System.out.println(cadena);
		cadena = cadenaPrincipal + cadena;
		return cadena;
	}

}
