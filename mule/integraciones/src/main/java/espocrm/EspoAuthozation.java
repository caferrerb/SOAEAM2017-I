package espocrm;

import java.util.HashMap;
import java.util.Map;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

import util.Constantes;

import org.apache.commons.codec.binary.Base64;

public class EspoAuthozation implements Callable {

	@SuppressWarnings({ "unchecked" })
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		Map<String, String> payLoad = (HashMap<String, String>) eventContext.getMessage().getPayload();
		String cadena = payLoad.get(Constantes.USER) + Constantes.DOS_PUNTOS + payLoad.get(Constantes.PASSWORD);
		System.out.println("Cadena a convertir: " + cadena);
		byte[] encodeBytes = Base64.encodeBase64(cadena.getBytes());
		String encode = new String(encodeBytes);
		System.out.println("Header Espo CRM: " +encode);
		return encode;
	}
	
//	public static void main(String[] args) {
//		String user = "user";
//		String pass = "Xwap3deg";
//		String cadena = user + ":" + pass;
//		byte[] encodeBytes = Base64.encodeBase64(cadena.getBytes());
//		System.out.println(new String(encodeBytes));
//	}
	
}
