package payu;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;

public class MD5Payu implements Callable {

	private static final char[] CONSTS_HEX = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
			'e', 'f' };
	private static final String SEPARADOR = "~";

	@SuppressWarnings("unchecked")
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		Map<String, String> map = (Map<String, String>) eventContext.getMessage().getPayload();
		String cadena = map.get("apiKey") + SEPARADOR + map.get("merchantId") + SEPARADOR + map.get("referenceCode")
				+ SEPARADOR + map.get("value") + SEPARADOR + map.get("coin");
		String result = md5(cadena);
		return result;
	}
	
	/**
	 * Método para encritar en MD5
	 * @param cadena, cadena a encriptar
	 * @return
	 */
	public static String md5(String cadena) {
		try {
			MessageDigest msgd = MessageDigest.getInstance("MD5");
			byte[] bytes = msgd.digest(cadena.getBytes());
			StringBuilder strbCadenaMD5 = new StringBuilder(2 * bytes.length);
			for (int i = 0; i < bytes.length; i++) {
				int bajo = (int) (bytes[i] & 0x0f);
				int alto = (int) ((bytes[i] & 0xf0) >> 4);
				strbCadenaMD5.append(CONSTS_HEX[alto]);
				strbCadenaMD5.append(CONSTS_HEX[bajo]);
			}
			return strbCadenaMD5.toString();
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}

}
